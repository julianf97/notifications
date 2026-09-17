import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOperation,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { UserResponseDto } from '../../users/dto/user-response.dto';

export function ApiSyncUser() {
  return applyDecorators(
    ApiExtraModels(UserResponseDto),
    ApiOperation({
      summary: 'Sincronizar usuario',
      description:
        'Obtiene auth0_id desde el access token y el email desde Auth0 /userinfo. No recibe body.',
    }),
    ApiCreatedResponse({
      description: 'Usuario sincronizado correctamente',
      schema: {
        allOf: [{ $ref: getSchemaPath(UserResponseDto) }],
        example: {
          id: 4,
          auth0_id: 'auth0|usuario-prueba',
          email: 'usuario-prueba@test.com',
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: 'Token faltante o inválido',
      example: {
        message: 'Unauthorized',
        statusCode: 401,
      },
    }),
  );
}
