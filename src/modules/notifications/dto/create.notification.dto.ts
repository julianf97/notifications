import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Define los datos necesarios para crear cualquier notificación
export class CreateNotificationDto {
  @ApiProperty({
    description: 'Título de la notificación',
    example: 'Email de prueba',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'Contenido de la notificación',
    example: 'Contenido de prueba por Email',
  })
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiProperty({
    description: 'Canal utilizado para enviar la notificación',
    enum: ['email', 'sms', 'push'],
    example: 'email',
  })
  @IsString()
  @IsNotEmpty()
  channel!: string;

  @ApiProperty({
    description: 'Email, teléfono o device token según el canal',
    example: 'usuario-prueba@test.com',
  })
  @IsString()
  @IsNotEmpty()
  recipient!: string;
}
