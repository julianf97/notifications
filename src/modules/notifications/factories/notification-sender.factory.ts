import {
  Inject,
  Injectable,
} from '@nestjs/common';

import type { NotificationSender } from '../senders/notification-sender.interface';

import { NOTIFICATION_SENDERS } from '../constants/notification-senders.token';

// Permite que NestJS administre e inyecte esta clase
@Injectable()

// Se encarga de encontrar qué sender usar según el channel
export class NotificationSenderFactory {

  // Recibe todas las estrategias registradas en el módulo
  constructor(
    @Inject(NOTIFICATION_SENDERS)
    private readonly senders: NotificationSender[],
  ) {}

  // Devuelve la estrategia correspondiente al canal recibido
  create(
    channel: string,
  ): NotificationSender {

    // Busca una estrategia que tenga el mismo channel
    const sender =
      this.senders.find(
        (sender) =>
          sender.channel === channel,
      );

    // Verifica que exista una estrategia para ese canal
    if (!sender) {
      throw new Error(
        `Canal de notificación no soportado: ${channel}`,
      );
    }

    // Devuelve la estrategia encontrada
    return sender;
  }
}