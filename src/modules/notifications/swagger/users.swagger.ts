import {
  applyDecorators,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

// Documenta POST /users/sync
export function ApiSyncUser() {
  return applyDecorators(

    // Describe qué hace el endpoint
    ApiOperation({
      summary: 'Sincronizar usuario',
      description:
        'Obtiene el usuario autenticado desde Auth0 y lo sincroniza con la base de datos local.',
    }),

    // Usuario sincronizado correctamente
    ApiResponse({
      status: 201,
      description:
        'Usuario sincronizado correctamente',
      schema: {
        example: {
          id: 2,
          auth0_id: 'auth0|6a8cdc7de472e483bc883fa5',
          email: 'usuario@gmail.com',
        },
      },
    }),

    // Token faltante o inválido
    ApiResponse({
      status: 401,
      description:
        'No autorizado',
      schema: {
        example: {
          message: 'Unauthorized',
          statusCode: 401,
        },
      },
    }),
  );
}