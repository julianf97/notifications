import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';

import type { notifications } from '../../../generated/prisma/client';

import type { CreateNotificationDto } from './dto/create/create.notification.dto';

import type { UpdateNotificationDto } from './dto/update-notification.dto';

import { NotificationSenderFactory } from './factories/notification-sender.factory';

import type { DeleteNotificationResponse } from './types/delete-notification-response.type';

// Permite que NestJS administre e inyecte esta clase
@Injectable()

// Contiene la lógica principal de las notificaciones
export class NotificationsService {

  // Recibe Prisma y la Factory mediante inyección de dependencias
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationSenderFactory: NotificationSenderFactory,
  ) { }

  // Crea una notificación, intenta enviarla y registra el resultado
  async createNotification(
    userId: number,
    data: CreateNotificationDto,
  ): Promise<notifications> {

    // Guarda solamente los datos generales de la notificación
    // Primero valida que exista una estrategia para el canal
    const sender =
      this.notificationSenderFactory.create(
        data.channel,
      );

    // Después guarda la notificación
    const notification =
      await this.prisma.notifications.create({
        data: {
          user_id: userId,
          title: data.title,
          content: data.content,
          channel: data.channel,
        },
      });

    try {

      // Cada Sender interpreta los datos que necesita
      const result =
        await sender.send(data);

      // Registra que el envío fue exitoso
      await this.prisma.notifications_logs.create({
        data: {
          notification_id: notification.id,
          status: result.status,
          recipient: result.recipient ?? null,
          error_message: null,
        },
      });

    } catch (error: unknown) {

      // Obtiene el mensaje del error
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Error desconocido durante el envío';

      // Registra que el envío falló
      await this.prisma.notifications_logs.create({
        data: {
          notification_id: notification.id,
          status: 'failed',
          recipient: null,
          error_message: errorMessage,
        },
      });

      // Propaga el error
      throw error;
    }

    // Devuelve la notificación creada
    return notification;
  }

  // Obtiene todas las notificaciones de un usuario
  async getNotificationsByUser(
    userId: number,
  ): Promise<notifications[]> {

    // Busca solamente las notificaciones del usuario
    return this.prisma.notifications.findMany({
      where: {
        user_id: userId,
      },

      // Ordena desde la más nueva hasta la más vieja
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  // Obtiene una notificación específica de un usuario
  async getNotificationById(
    userId: number,
    notificationId: number,
  ): Promise<notifications> {

    // Busca la notificación por id y verifica que pertenezca al usuario
    const notification =
      await this.prisma.notifications.findFirst({
        where: {
          id: notificationId,
          user_id: userId,
        },
      });

    // Si no existe o pertenece a otro usuario devuelve 404
    if (!notification) {
      throw new NotFoundException(
        'Notificación no encontrada',
      );
    }

    // Devuelve la notificación encontrada
    return notification;
  }

  // Modifica una notificación específica de un usuario
  async updateNotification(
    userId: number,
    notificationId: number,
    data: UpdateNotificationDto,
  ): Promise<notifications> {

    // Busca la notificación y verifica que pertenezca al usuario
    const notification =
      await this.prisma.notifications.findFirst({
        where: {
          id: notificationId,
          user_id: userId,
        },
      });

    // Si no existe o pertenece a otro usuario devuelve 404
    if (!notification) {
      throw new NotFoundException(
        'Notificación no encontrada',
      );
    }

    // Actualiza solamente los campos recibidos
    return this.prisma.notifications.update({
      where: {
        id: notificationId,
      },
      data: {
        title: data.title,
        content: data.content,
        channel: data.channel,
      },
    });
  }

  // Elimina una notificación específica de un usuario
  async deleteNotification(
    userId: number,
    notificationId: number,
  ): Promise<DeleteNotificationResponse> {

    // Busca la notificación y verifica que pertenezca al usuario
    const notification =
      await this.prisma.notifications.findFirst({
        where: {
          id: notificationId,
          user_id: userId,
        },
      });

    // Si no existe o pertenece a otro usuario devuelve 404
    if (!notification) {
      throw new NotFoundException(
        'Notificación no encontrada',
      );
    }

    // Elimina los logs relacionados con la notificación
    await this.prisma.notifications_logs.deleteMany({
      where: {
        notification_id: notificationId,
      },
    });

    // Elimina la notificación
    await this.prisma.notifications.delete({
      where: {
        id: notificationId,
      },
    });

    // Devuelve una respuesta definida
    return {
      message: 'Notificación eliminada correctamente',
      id: notificationId,
    };
  }
}