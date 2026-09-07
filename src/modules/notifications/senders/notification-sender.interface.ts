import type { CreateNotificationDto } from '../dto/create.notification.dto';

import type { SendNotificationResult } from '../types/send-notification-result.type';

// Define el contrato común de todas las estrategias
export interface NotificationSender {

  // Indica qué canal maneja esta estrategia
  readonly channel: string;

  // Ejecuta el envío de la notificación
  send(
    data: CreateNotificationDto,
  ): Promise<SendNotificationResult>;
}