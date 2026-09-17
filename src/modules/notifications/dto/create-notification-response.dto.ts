import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 4 })
  user_id!: number;

  @ApiProperty({ example: 'Email de prueba' })
  title!: string;

  @ApiProperty({ example: 'Contenido de prueba por Email' })
  content!: string;

  @ApiProperty({ enum: ['email', 'sms', 'push'], example: 'email' })
  channel!: string;

  @ApiProperty({
    format: 'date-time',
    nullable: true,
    example: '2026-09-17T18:30:00.000Z',
  })
  created_at!: Date | null;
}
