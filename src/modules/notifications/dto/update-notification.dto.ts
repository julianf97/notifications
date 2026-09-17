import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

// Define los campos que se pueden modificar
export class UpdateNotificationDto {
  @ApiPropertyOptional({
    description: 'Nuevo título de la notificación',
    example: 'Título actualizado',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiPropertyOptional({
    description: 'Nuevo contenido de la notificación',
    example: 'Contenido actualizado',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string;

  @ApiPropertyOptional({
    description: 'Nuevo canal de la notificación',
    enum: ['email', 'sms', 'push'],
    example: 'email',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  channel?: string;
}
