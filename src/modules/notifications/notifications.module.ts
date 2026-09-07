import { Module } from '@nestjs/common';

import { AuthModule } from '../../auth/auth.module';
import { PrismaModule } from '../../database/prisma.module';

import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

import { NotificationSenderFactory } from './factories/notification-sender.factory';

import { EmailSender } from './senders/email.sender';
import { SmsSender } from './senders/sms.sender';
import { PushSender } from './senders/push.sender';

import { NOTIFICATION_SENDERS } from './constants/notification-senders.token';

// Define el módulo de notificaciones
@Module({
  // Importa autenticación y acceso a la base de datos
  imports: [
    AuthModule,
    PrismaModule,
  ],

  // Registra el controller de notificaciones
  controllers: [
    NotificationsController,
  ],

  // Registra todos los providers usados por este módulo
  providers: [
    // Registra el service principal
    NotificationsService,

    // Registra las estrategias de envío
    EmailSender,
    SmsSender,
    PushSender,

    // Registra el array de estrategias disponibles
    {
      provide: NOTIFICATION_SENDERS,

      // Recibe las instancias creadas por Nest
      useFactory: (
        emailSender: EmailSender,
        smsSender: SmsSender,
        pushSender: PushSender,
      ) => [
        emailSender,
        smsSender,
        pushSender,
      ],

      // Indica qué providers debe inyectar Nest
      inject: [
        EmailSender,
        SmsSender,
        PushSender,
      ],
    },

    // Registra la Factory de estrategias
    NotificationSenderFactory,
  ],
})

// Crea el módulo de notificaciones
export class NotificationsModule {}