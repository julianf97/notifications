import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Notification } from '../../database/entities/notification.entity';
import { NotificationLog } from '../../database/entities/notification-log.entity';
import type { CreateNotificationDto } from './dto/create.notification.dto';
import type { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationSenderFactory } from './factories/notification-sender.factory';
import type { DeleteNotificationResponse } from './types/delete-notification-response.type';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,
    @InjectRepository(NotificationLog)
    private readonly notificationLogsRepository: Repository<NotificationLog>,
    private readonly dataSource: DataSource,
    private readonly notificationSenderFactory: NotificationSenderFactory,
  ) {}

  async createNotification(
    userId: number,
    data: CreateNotificationDto,
  ): Promise<Notification> {
    const sender = this.notificationSenderFactory.create(data.channel);
    const notification = this.notificationsRepository.create({
      user_id: userId,
      title: data.title,
      content: data.content,
      channel: data.channel,
    });
    const savedNotification =
      await this.notificationsRepository.save(notification);

    try {
      const result = await sender.send(data);
      const log = this.notificationLogsRepository.create({
        notification_id: savedNotification.id,
        status: result.status,
        recipient: result.recipient ?? null,
        error_message: null,
      });
      await this.notificationLogsRepository.save(log);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Error desconocido durante el envío';
      const log = this.notificationLogsRepository.create({
        notification_id: savedNotification.id,
        status: 'failed',
        recipient: null,
        error_message: errorMessage,
      });
      await this.notificationLogsRepository.save(log);
      throw error;
    }

    return savedNotification;
  }

  getNotificationsByUser(userId: number): Promise<Notification[]> {
    return this.notificationsRepository.find({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
    });
  }

  async getNotificationById(
    userId: number,
    notificationId: number,
  ): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({
      where: { id: notificationId, user_id: userId },
    });

    if (!notification) {
      throw new NotFoundException('Notificación no encontrada');
    }

    return notification;
  }

  async updateNotification(
    userId: number,
    notificationId: number,
    data: UpdateNotificationDto,
  ): Promise<Notification> {
    const notification = await this.getNotificationById(userId, notificationId);

    this.notificationsRepository.merge(notification, data);
    return this.notificationsRepository.save(notification);
  }

  async deleteNotification(
    userId: number,
    notificationId: number,
  ): Promise<DeleteNotificationResponse> {
    await this.getNotificationById(userId, notificationId);

    await this.dataSource.transaction(async (manager) => {
      await manager.delete(NotificationLog, {
        notification_id: notificationId,
      });
      await manager.delete(Notification, { id: notificationId });
    });

    return {
      message: 'Notificación eliminada correctamente',
      id: notificationId,
    };
  }
}
