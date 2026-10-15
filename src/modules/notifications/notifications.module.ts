import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../../auth/auth.module';

import { Notification } from '../../database/entities/notification.entity';
import { NotificationLog } from '../../database/entities/notification-log.entity';

import { UsersModule } from '../users/users.module';

import { NotificationsController } from './notifications.controller';

import { NotificationsService } from './notifications.service';

import { EmailSender } from './senders/email.sender';

import { SmsSender } from './senders/sms.sender';

import { PushSender } from './senders/push.sender';

import { WhatsappSender } from './senders/whatsapp.sender';

import { NotificationSenderFactory } from './factories/notification-sender.factory';

import { NOTIFICATION_SENDERS } from './constants/notification-senders.token';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Notification, NotificationLog]),
    UsersModule,
  ],

  controllers: [NotificationsController],

  providers: [
    NotificationsService,
    EmailSender,
    SmsSender,
    PushSender,
    WhatsappSender,

    {
      provide: NOTIFICATION_SENDERS,

      useFactory: (
        emailSender: EmailSender,
        smsSender: SmsSender,
        pushSender: PushSender,
        whatsappSender: WhatsappSender,
      ) => [emailSender, smsSender, pushSender, whatsappSender],

      inject: [EmailSender, SmsSender, PushSender, WhatsappSender],
    },

    NotificationSenderFactory,
  ],
})
export class NotificationsModule {}
