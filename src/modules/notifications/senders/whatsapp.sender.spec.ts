import { BadRequestException } from '@nestjs/common';

import { WhatsappSender } from './whatsapp.sender';

describe('WhatsappSender', () => {
  const sender = new WhatsappSender();

  it('rechaza un número de WhatsApp inválido', async () => {
    await expect(
      sender.send({
        title: 'Prueba de WhatsApp',
        content: 'Contenido de prueba',
        channel: 'whatsapp',
        recipient: 'numero-invalido',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('envía una notificación de WhatsApp válida', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();

    await expect(
      sender.send({
        title: 'Prueba de WhatsApp',
        content: 'Contenido de prueba',
        channel: 'whatsapp',
        recipient: '+5491112345678',
      }),
    ).resolves.toEqual({
      status: 'sent',
      recipient: '+5491112345678',
    });

    expect(logSpy).toHaveBeenCalledTimes(1);
    logSpy.mockRestore();
  });
});
