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

    {
      provide: NOTIFICATION_SENDERS,

      useFactory: (
        emailSender: EmailSender,
        smsSender: SmsSender,
        pushSender: PushSender,
      ) => [emailSender, smsSender, pushSender],

      inject: [EmailSender, SmsSender, PushSender],
    },

    NotificationSenderFactory,
  ],
})
export class NotificationsModule {}
