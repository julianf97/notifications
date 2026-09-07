import { Injectable,
  BadRequestException
 } from '@nestjs/common';

import type { NotificationSender } from './notification-sender.interface';

import type { CreateNotificationDto } from '../dto/create/create.notification.dto';

import type { SendNotificationResult } from '../types/send-notification-result.type';

// Permite que NestJS administre e inyecte esta clase
@Injectable()

// Implementa la estrategia para enviar notificaciones por SMS
export class SmsSender implements NotificationSender {

  // Identifica el canal que maneja esta estrategia
  readonly channel = 'sms';

  // Recibe los datos necesarios para ejecutar el envío por SMS
  async send(
    data: CreateNotificationDto,
  ): Promise<SendNotificationResult> {

    // Define el formato permitido para un número de teléfono
    const phoneRegex =
      /^\+?[0-9]{8,15}$/;

    // Verifica que el destinatario tenga un formato válido
    if (!phoneRegex.test(data.recipient)) {
      throw new BadRequestException(
        'El número de teléfono no tiene un formato válido',
      );
    }

    // Limita el contenido del SMS a un máximo de 160 caracteres
    const limitedContent =
      data.content.slice(0, 160);

    // Guarda la fecha en la que se realiza el envío
    const sentAt =
      new Date();

    // Simula el envío del SMS
    console.log({
      phoneNumber: data.recipient,
      limitedContent,
      sentAt,
    });

    // Devuelve el resultado del envío
    return {
      status: 'sent',
      recipient: data.recipient,
    };
  }
}