import {
  applyDecorators,
} from '@nestjs/common';

import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

// Documenta POST /notifications
export function ApiCreateNotification() {
  return applyDecorators(

    // Describe qué hace el endpoint
    ApiOperation({
      summary: 'Crear una notificación',
      description:
        'Crea una notificación para el usuario autenticado y ejecuta el envío según el canal seleccionado.',
    }),

    // Documenta el body
    ApiBody({
      schema: {
        type: 'object',

        required: [
          'title',
          'content',
          'channel',
          'recipient',
        ],

        properties: {
          title: {
            type: 'string',
            description:
              'Título de la notificación',
            example:
              'Email de prueba',
          },

          content: {
            type: 'string',
            description:
              'Contenido de la notificación',
            example:
              'Contenido de prueba por Email',
          },

          channel: {
            type: 'string',
            description:
              'Canal utilizado para enviar la notificación',
            enum: [
              'email',
              'sms',
              'push',
            ],
            example:
              'email',
          },

          recipient: {
            type: 'string',
            description:
              'Email, número telefónico o device token según el canal',
            example:
              'usuario@gmail.com',
          },
        },
      },

      // Ejemplos para cada canal
      examples: {
        email: {
          summary:
            'Notificación por Email',
          value: {
            title:
              'Email de prueba',
            content:
              'Contenido de prueba por Email',
            channel:
              'email',
            recipient:
              'usuario@gmail.com',
          },
        },

        sms: {
          summary:
            'Notificación por SMS',
          value: {
            title:
              'SMS de prueba',
            content:
              'Contenido de prueba por SMS',
            channel:
              'sms',
            recipient:
              '+543364024379',
          },
        },

        push: {
          summary:
            'Notificación Push',
          value: {
            title:
              'Push de prueba',
            content:
              'Contenido de prueba Push',
            channel:
              'push',
            recipient:
              'device-token-123456',
          },
        },
      },
    }),

    // Notificación creada correctamente
    ApiResponse({
      status: 201,
      description:
        'Notificación creada correctamente',
      schema: {
        example: {
          id: 28,
          user_id: 2,
          title:
            'Email de prueba',
          content:
            'Contenido de prueba por Email',
          channel:
            'email',
          created_at:
            '2026-09-07T18:30:00.000Z',
        },
      },
    }),

    // Datos inválidos
    ApiResponse({
      status: 400,
      description:
        'Datos de la notificación inválidos',
      content: {
        'application/json': {
          examples: {

            // Error del ValidationPipe
            recipientRequired: {
              summary:
                'Recipient faltante',
              value: {
                message: [
                  'recipient should not be empty',
                  'recipient must be a string',
                ],
                error:
                  'Bad Request',
                statusCode:
                  400,
              },
            },

            // Error del EmailSender
            invalidEmail: {
              summary:
                'Email inválido',
              value: {
                message:
                  'El formato del email no es válido',
                error:
                  'Bad Request',
                statusCode:
                  400,
              },
            },

            // Error del SmsSender
            invalidSmsPhone: {
              summary:
                'Número de teléfono inválido',
              value: {
                message:
                  'El número de teléfono no tiene un formato válido',
                error:
                  'Bad Request',
                statusCode:
                  400,
              },
            },

            // Error del PushSender
            invalidPushToken: {
              summary:
                'Device token inválido',
              value: {
                message:
                  'El token del dispositivo no tiene un formato válido',
                error:
                  'Bad Request',
                statusCode:
                  400,
              },
            },

            // Error de la Factory
            unsupportedChannel: {
              summary:
                'Canal no soportado',
              value: {
                message:
                  'Canal de notificación no soportado: whatsapp',
                error:
                  'Bad Request',
                statusCode:
                  400,
              },
            },
          },
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
          message:
            'Unauthorized',
          statusCode:
            401,
        },
      },
    }),

    // Usuario no sincronizado
    ApiResponse({
      status: 404,
      description:
        'Usuario no encontrado',
      schema: {
        example: {
          message:
            'Usuario no encontrado',
          error:
            'Not Found',
          statusCode:
            404,
        },
      },
    }),
  );
}

// Documenta GET /notifications
export function ApiGetNotifications() {
  return applyDecorators(

    // Describe qué hace el endpoint
    ApiOperation({
      summary:
        'Obtener todas las notificaciones',
      description:
        'Devuelve únicamente las notificaciones pertenecientes al usuario autenticado.',
    }),

    // Lista obtenida correctamente
    ApiResponse({
      status: 200,
      description:
        'Notificaciones obtenidas correctamente',
      schema: {
        type:
          'array',

        items: {
          type:
            'object',

          properties: {
            id: {
              type:
                'number',
              example:
                28,
            },

            user_id: {
              type:
                'number',
              example:
                2,
            },

            title: {
              type:
                'string',
              example:
                'Email de prueba',
            },

            content: {
              type:
                'string',
              example:
                'Contenido de prueba por Email',
            },

            channel: {
              type:
                'string',
              example:
                'email',
            },

            created_at: {
              type:
                'string',
              format:
                'date-time',
              nullable:
                true,
              example:
                '2026-09-07T18:30:00.000Z',
            },
          },
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
          message:
            'Unauthorized',
          statusCode:
            401,
        },
      },
    }),

    // Usuario no sincronizado
    ApiResponse({
      status: 404,
      description:
        'Usuario no encontrado',
      schema: {
        example: {
          message:
            'Usuario no encontrado',
          error:
            'Not Found',
          statusCode:
            404,
        },
      },
    }),
  );
}

// Documenta GET /notifications/:id
export function ApiGetNotificationById() {
  return applyDecorators(

    // Describe qué hace el endpoint
    ApiOperation({
      summary:
        'Obtener una notificación por id',
      description:
        'Devuelve una notificación solamente si pertenece al usuario autenticado.',
    }),

    // Documenta el id
    ApiParam({
      name:
        'id',
      type:
        Number,
      example:
        28,
      description:
        'Id de la notificación',
    }),

    // Notificación encontrada
    ApiResponse({
      status: 200,
      description:
        'Notificación obtenida correctamente',
      schema: {
        example: {
          id:
            28,
          user_id:
            2,
          title:
            'Email de prueba',
          content:
            'Contenido de prueba por Email',
          channel:
            'email',
          created_at:
            '2026-09-07T18:30:00.000Z',
        },
      },
    }),

    // Id inválido
    ApiResponse({
      status: 400,
      description:
        'Id inválido',
      schema: {
        example: {
          message:
            'Validation failed (numeric string is expected)',
          error:
            'Bad Request',
          statusCode:
            400,
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
          message:
            'Unauthorized',
          statusCode:
            401,
        },
      },
    }),

    // Notificación inexistente o de otro usuario
    ApiResponse({
      status: 404,
      description:
        'Notificación no encontrada',
      schema: {
        example: {
          message:
            'Notificación no encontrada',
          error:
            'Not Found',
          statusCode:
            404,
        },
      },
    }),
  );
}

// Documenta PATCH /notifications/:id
export function ApiUpdateNotification() {
  return applyDecorators(

    // Describe qué hace el endpoint
    ApiOperation({
      summary:
        'Modificar una notificación',
      description:
        'Modifica una notificación solamente si pertenece al usuario autenticado.',
    }),

    // Documenta el id
    ApiParam({
      name:
        'id',
      type:
        Number,
      example:
        28,
      description:
        'Id de la notificación',
    }),

    // Documenta el body
    ApiBody({
      schema: {
        type:
          'object',

        properties: {
          title: {
            type:
              'string',
            description:
              'Nuevo título de la notificación',
            example:
              'Título actualizado',
          },

          content: {
            type:
              'string',
            description:
              'Nuevo contenido de la notificación',
            example:
              'Contenido actualizado',
          },

          channel: {
            type:
              'string',
            description:
              'Nuevo canal de la notificación',
            enum: [
              'email',
              'sms',
              'push',
            ],
            example:
              'email',
          },
        },
      },

      examples: {
        complete: {
          summary:
            'Modificar varios campos',
          value: {
            title:
              'Título actualizado',
            content:
              'Contenido actualizado',
            channel:
              'email',
          },
        },

        titleOnly: {
          summary:
            'Modificar solamente el título',
          value: {
            title:
              'Nuevo título',
          },
        },

        contentOnly: {
          summary:
            'Modificar solamente el contenido',
          value: {
            content:
              'Nuevo contenido',
          },
        },
      },
    }),

    // Notificación modificada
    ApiResponse({
      status: 200,
      description:
        'Notificación modificada correctamente',
      schema: {
        example: {
          id:
            28,
          user_id:
            2,
          title:
            'Título actualizado',
          content:
            'Contenido actualizado',
          channel:
            'email',
          created_at:
            '2026-09-07T18:30:00.000Z',
        },
      },
    }),

    // Datos inválidos
    ApiResponse({
      status: 400,
      description:
        'Datos inválidos',
      content: {
        'application/json': {
          examples: {

            // Id inválido
            invalidId: {
              summary:
                'Id inválido',
              value: {
                message:
                  'Validation failed (numeric string is expected)',
                error:
                  'Bad Request',
                statusCode:
                  400,
              },
            },

            // Propiedad extra
            extraProperty: {
              summary:
                'Propiedad no permitida',
              value: {
                message: [
                  'property recipient should not exist',
                ],
                error:
                  'Bad Request',
                statusCode:
                  400,
              },
            },

            // Campo vacío
            emptyTitle: {
              summary:
                'Título vacío',
              value: {
                message: [
                  'title should not be empty',
                ],
                error:
                  'Bad Request',
                statusCode:
                  400,
              },
            },
          },
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
          message:
            'Unauthorized',
          statusCode:
            401,
        },
      },
    }),

    // Notificación inexistente o de otro usuario
    ApiResponse({
      status: 404,
      description:
        'Notificación no encontrada',
      schema: {
        example: {
          message:
            'Notificación no encontrada',
          error:
            'Not Found',
          statusCode:
            404,
        },
      },
    }),
  );
}

// Documenta DELETE /notifications/:id
export function ApiDeleteNotification() {
  return applyDecorators(

    // Describe qué hace el endpoint
    ApiOperation({
      summary:
        'Eliminar una notificación',
      description:
        'Elimina una notificación solamente si pertenece al usuario autenticado.',
    }),

    // Documenta el id
    ApiParam({
      name:
        'id',
      type:
        Number,
      example:
        28,
      description:
        'Id de la notificación',
    }),

    // Notificación eliminada
    ApiResponse({
      status: 200,
      description:
        'Notificación eliminada correctamente',
      schema: {
        example: {
          message:
            'Notificación eliminada correctamente',
          id:
            28,
        },
      },
    }),

    // Id inválido
    ApiResponse({
      status: 400,
      description:
        'Id inválido',
      schema: {
        example: {
          message:
            'Validation failed (numeric string is expected)',
          error:
            'Bad Request',
          statusCode:
            400,
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
          message:
            'Unauthorized',
          statusCode:
            401,
        },
      },
    }),

    // Notificación inexistente o de otro usuario
    ApiResponse({
      status: 404,
      description:
        'Notificación no encontrada',
      schema: {
        example: {
          message:
            'Notificación no encontrada',
          error:
            'Not Found',
          statusCode:
            404,
        },
      },
    }),
  );
}