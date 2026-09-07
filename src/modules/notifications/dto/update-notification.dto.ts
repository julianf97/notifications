import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

// Define los campos que se pueden modificar
export class UpdateNotificationDto {

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  channel?: string;
}