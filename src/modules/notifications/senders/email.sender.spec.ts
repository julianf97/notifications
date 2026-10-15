import { BadRequestException } from '@nestjs/common';

import { EmailSender } from './email.sender';

describe('EmailSender', () => {
  it('rechaza un destinatario sin arroba', async () => {
    const sender = new EmailSender();

    await expect(
      sender.send({
        title: 'Prueba de email',
        content: 'Contenido de prueba',
        channel: 'email',
        recipient: 'destinatario-invalido',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
