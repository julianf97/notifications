import { Injectable,
  BadRequestException
 } from '@nestjs/common';

import type { NotificationSender } from './notification-sender.interface';

import type { CreateNotificationDto } from '../dto/create.notification.dto';

import type { SendNotificationResult } from '../types/send-notification-result.type';

// Permite que NestJS administre e inyecte esta clase
@Injectable()

// Implementa la estrategia para enviar notificaciones por Email
export class EmailSender implements NotificationSender {

  // Identifica el canal que maneja esta estrategia
  readonly channel = 'email';

  // Recibe los datos necesarios para ejecutar el envío por Email
  async send(
    data: CreateNotificationDto,
  ): Promise<SendNotificationResult> {

    // Verifica que el destinatario tenga un formato básico de email válido
    const isValidEmail =
      data.recipient.includes('@');

    // Lanza un error si el email no es válido
    if (!isValidEmail) {
      throw new BadRequestException(
        'El formato del email no es válido',
      );
    }

    // Genera el template del email
    const template = {
      to: data.recipient,
      content: data.content,
    };

    // Guarda la fecha del envío
    const sentAt =
      new Date();

    // Simula el envío del Email
    console.log({
      template,
      sentAt,
    });

    // Devuelve el resultado del envío
    return {
      status: 'sent',
      recipient: data.recipient,
    };
  }
}