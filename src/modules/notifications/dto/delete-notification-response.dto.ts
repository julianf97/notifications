import { ApiProperty } from '@nestjs/swagger';

export class DeleteNotificationResponseDto {
  @ApiProperty({ example: 'Notificación eliminada correctamente' })
  message!: string;

  @ApiProperty({ example: 1 })
  id!: number;
}
