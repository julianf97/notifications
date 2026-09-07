import { Injectable } from '@nestjs/common';

import type { NotificationSender } from './notification-sender.interface';

import type { CreateNotificationDto } from '../dto/create/create.notification.dto';

import type { SendNotificationResult } from '../types/send-notification-result.type';

// Permite que NestJS administre e inyecte esta clase
@Injectable()

// Implementa la estrategia para enviar notificaciones Push
export class PushSender implements NotificationSender {

  // Identifica el canal que maneja esta estrategia
  readonly channel = 'push';

  // Recibe los datos necesarios para ejecutar el envío Push
  async send(
    data: CreateNotificationDto,
  ): Promise<SendNotificationResult> {

    // Genera el payload de la notificación Push
    const payload = {
      deviceToken: data.recipient,
      content: data.content,
    };

    // Define el estado del envío simulado
    const status = 'sent';

    // Simula el envío Push
    console.log({
      payload,
      status,
    });

    // Devuelve el resultado del envío
    return {
      status: 'sent',
      recipient: data.recipient,
    };
  }
}