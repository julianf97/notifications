import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'Identificador local del usuario',
  })
  id!: number;

  @ApiProperty({
    description: 'Identificador del usuario en Auth0',
  })
  auth0_id!: string;

  @ApiProperty({
    description: 'Email obtenido desde Auth0',
  })
  email!: string;
}