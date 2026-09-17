import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 4 })
  id!: number;

  @ApiProperty({ example: 'auth0|usuario-prueba' })
  auth0_id!: string;

  @ApiProperty({ example: 'usuario-prueba@test.com' })
  email!: string;
}
