import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

// Define los datos necesarios para crear cualquier notificación
export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsString()
  @IsNotEmpty()
  channel!: string;

  @IsString()
  @IsNotEmpty()
  recipient!: string;
}