import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { CreateNotificationDto } from '../dto/create.notification.dto';
import { UpdateNotificationDto } from '../dto/update-notification.dto';
import { CreateNotificationResponseDto } from '../dto/create-notification-response.dto';
import { DeleteNotificationResponseDto } from '../dto/delete-notification-response.dto';

const notificationExample = {
  id: 1,
  user_id: 4,
  title: 'Email de prueba',
  content: 'Contenido de prueba por Email',
  channel: 'email',
  created_at: '2026-09-17T18:30:00.000Z',
};

const unauthorizedExample = {
  message: 'Unauthorized',
  statusCode: 401,
};

const userNotFoundExample = {
  message: 'Usuario no encontrado',
  error: 'Not Found',
  statusCode: 404,
};

const notificationNotFoundExample = {
  message: 'Notificación no encontrada',
  error: 'Not Found',
  statusCode: 404,
};

const invalidIdExample = {
  message: 'Validation failed (numeric string is expected)',
  error: 'Bad Request',
  statusCode: 400,
};

function notificationModels() {
  return ApiExtraModels(
    CreateNotificationDto,
    UpdateNotificationDto,
    CreateNotificationResponseDto,
    DeleteNotificationResponseDto,
  );
}

export function ApiCreateNotification() {
  return applyDecorators(
    notificationModels(),
    ApiOperation({
      summary: 'Crear una notificación',
      description:
        'Crea una notificación para el usuario autenticado, la envía mediante el canal seleccionado y registra el resultado.',
    }),
    ApiBody({
      required: true,
      schema: { $ref: getSchemaPath(CreateNotificationDto) },
      examples: {
        email: {
          summary: 'Notificación por Email',
          value: {
            title: 'Email de prueba',
            content: 'Contenido de prueba por Email',
            channel: 'email',
            recipient: 'usuario-prueba@test.com',
          },
        },
        sms: {
          summary: 'Notificación por SMS',
          value: {
            title: 'SMS de prueba',
            content: 'Contenido de prueba por SMS',
            channel: 'sms',
            recipient: '+543364024379',
          },
        },
        push: {
          summary: 'Notificación Push',
          value: {
            title: 'Push de prueba',
            content: 'Contenido de prueba Push',
            channel: 'push',
            recipient: 'device-token-123456',
          },
        },
      },
    }),
    ApiCreatedResponse({
      description: 'Notificación creada correctamente',
      schema: {
        allOf: [{ $ref: getSchemaPath(CreateNotificationResponseDto) }],
        example: notificationExample,
      },
    }),
    ApiBadRequestResponse({
      description: 'Body, canal o destinatario inválido',
      content: {
        'application/json': {
          examples: {
            missingRecipient: {
              summary: 'Falta recipient',
              value: {
                message: [
                  'recipient should not be empty',
                  'recipient must be a string',
                ],
                error: 'Bad Request',
                statusCode: 400,
              },
            },
            unsupportedChannel: {
              summary: 'Canal no soportado',
              value: {
                message: 'Canal de notificación no soportado: whatsapp',
                error: 'Bad Request',
                statusCode: 400,
              },
            },
          },
        },
      },
    }),
    ApiUnauthorizedResponse({ example: unauthorizedExample }),
    ApiNotFoundResponse({
      description: 'Usuario no sincronizado',
      example: userNotFoundExample,
    }),
  );
}

export function ApiGetNotifications() {
  return applyDecorators(
    notificationModels(),
    ApiOperation({
      summary: 'Obtener todas las notificaciones',
      description:
        'Devuelve únicamente las notificaciones del usuario autenticado, ordenadas desde la más reciente.',
    }),
    ApiOkResponse({
      description: 'Notificaciones obtenidas correctamente',
      schema: {
        type: 'array',
        items: { $ref: getSchemaPath(CreateNotificationResponseDto) },
        example: [
          notificationExample,
          {
            id: 2,
            user_id: 4,
            title: 'SMS de prueba',
            content: 'Contenido de prueba por SMS',
            channel: 'sms',
            created_at: '2026-09-17T18:35:00.000Z',
          },
        ],
      },
    }),
    ApiUnauthorizedResponse({ example: unauthorizedExample }),
    ApiNotFoundResponse({
      description: 'Usuario no sincronizado',
      example: userNotFoundExample,
    }),
  );
}

export function ApiGetNotificationById() {
  return applyDecorators(
    notificationModels(),
    ApiOperation({
      summary: 'Obtener una notificación por id',
      description:
        'Devuelve una notificación solamente si pertenece al usuario autenticado.',
    }),
    ApiParam({
      name: 'id',
      type: Number,
      example: 1,
      description: 'Id de la notificación',
    }),
    ApiOkResponse({
      description: 'Notificación obtenida correctamente',
      schema: {
        allOf: [{ $ref: getSchemaPath(CreateNotificationResponseDto) }],
        example: notificationExample,
      },
    }),
    ApiBadRequestResponse({ example: invalidIdExample }),
    ApiUnauthorizedResponse({ example: unauthorizedExample }),
    ApiNotFoundResponse({ example: notificationNotFoundExample }),
  );
}

export function ApiUpdateNotification() {
  return applyDecorators(
    notificationModels(),
    ApiOperation({
      summary: 'Modificar una notificación',
      description:
        'Modifica solamente los campos enviados de una notificación perteneciente al usuario autenticado.',
    }),
    ApiParam({
      name: 'id',
      type: Number,
      example: 1,
      description: 'Id de la notificación',
    }),
    ApiBody({
      required: true,
      schema: { $ref: getSchemaPath(UpdateNotificationDto) },
      examples: {
        complete: {
          summary: 'Modificar todos los campos permitidos',
          value: {
            title: 'Título actualizado',
            content: 'Contenido actualizado',
            channel: 'email',
          },
        },
        titleOnly: {
          summary: 'Modificar solamente el título',
          value: { title: 'Nuevo título' },
        },
        contentOnly: {
          summary: 'Modificar solamente el contenido',
          value: { content: 'Nuevo contenido' },
        },
        channelOnly: {
          summary: 'Modificar solamente el canal',
          value: { channel: 'push' },
        },
      },
    }),
    ApiOkResponse({
      description: 'Notificación modificada correctamente',
      schema: {
        allOf: [{ $ref: getSchemaPath(CreateNotificationResponseDto) }],
        example: {
          ...notificationExample,
          title: 'Título actualizado',
          content: 'Contenido actualizado',
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'Id o body inválido',
      example: invalidIdExample,
    }),
    ApiUnauthorizedResponse({ example: unauthorizedExample }),
    ApiNotFoundResponse({ example: notificationNotFoundExample }),
  );
}

export function ApiDeleteNotification() {
  return applyDecorators(
    notificationModels(),
    ApiOperation({
      summary: 'Eliminar una notificación',
      description:
        'Elimina una notificación y sus logs solamente si pertenece al usuario autenticado.',
    }),
    ApiParam({
      name: 'id',
      type: Number,
      example: 1,
      description: 'Id de la notificación',
    }),
    ApiOkResponse({
      description: 'Notificación eliminada correctamente',
      schema: {
        allOf: [{ $ref: getSchemaPath(DeleteNotificationResponseDto) }],
        example: {
          message: 'Notificación eliminada correctamente',
          id: 1,
        },
      },
    }),
    ApiBadRequestResponse({ example: invalidIdExample }),
    ApiUnauthorizedResponse({ example: unauthorizedExample }),
    ApiNotFoundResponse({ example: notificationNotFoundExample }),
  );
}
