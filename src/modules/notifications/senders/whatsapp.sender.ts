import { BadRequestException, Injectable } from '@nestjs/common';

import type { CreateNotificationDto } from '../dto/create.notification.dto';

import type { NotificationSender } from './notification-sender.interface';

import type { SendNotificationResult } from '../types/send-notification-result.type';

// Permite que NestJS administre e inyecte esta clase
@Injectable()

// Implementa la estrategia para enviar notificaciones por WhatsApp
export class WhatsappSender implements NotificationSender {
  // Identifica el canal que maneja esta estrategia
  readonly channel = 'whatsapp';

  // Recibe los datos necesarios para ejecutar el envío por WhatsApp
  async send(data: CreateNotificationDto): Promise<SendNotificationResult> {
    // Define el formato permitido para un número de WhatsApp
    const phoneRegex = /^\+?[0-9]{8,15}$/;

    // Verifica que el destinatario tenga un formato válido
    if (!phoneRegex.test(data.recipient)) {
      throw new BadRequestException(
        'El número de WhatsApp no tiene un formato válido',
      );
    }

    // Genera el mensaje de WhatsApp
    const message = {
      phoneNumber: data.recipient,
      content: data.content,
    };

    // Guarda la fecha en la que se realiza el envío
    const sentAt = new Date();

    // Simula el envío del mensaje de WhatsApp
    console.log({
      message,
      sentAt,
    });

    // Devuelve el resultado del envío
    return {
      status: 'sent',
      recipient: data.recipient,
    };
  }
}
