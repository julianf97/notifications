import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';

import { AuthGuard } from '../../auth/auth.guard';

import type { AuthenticatedRequest } from '../../auth/types/authenticated-request.type';

import { UsersService } from '../users/users.service';

import { NotificationsService } from './notifications.service';

import { CreateNotificationDto } from './dto/create.notification.dto';

import { UpdateNotificationDto } from './dto/update-notification.dto';

import {
  ApiCreateNotification,
  ApiDeleteNotification,
  ApiGetNotificationById,
  ApiGetNotifications,
  ApiUpdateNotification,
} from './swagger/notifications.swagger';

// Agrupa los endpoints de notificaciones en Swagger
@ApiTags('notifications')

// Indica que todos los endpoints requieren Bearer Token
@ApiBearerAuth()

// Define la ruta base /notifications
@Controller('notifications')

// Protege todos los endpoints de notifications
@UseGuards(AuthGuard)

// Crea el controlador de notificaciones
export class NotificationsController {

  // Recibe los servicios necesarios para trabajar con notificaciones
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly usersService: UsersService,
  ) {}

  // Obtiene el usuario local a partir del usuario autenticado de Auth0
  private async getAuthenticatedUser(
    request: AuthenticatedRequest,
  ) {

    // Busca el usuario local usando el sub del token
    return this.usersService.findByAuth0Id(
      request.auth.payload.sub,
    );
  }

  // Documenta el endpoint POST /notifications
  @ApiCreateNotification()

  // Atiende la petición POST /notifications
  @Post()

  // Crea una notificación para el usuario autenticado
  async createNotification(
    @Req() request: AuthenticatedRequest,

    // Recibe el body validado por el ValidationPipe global
    @Body()
    body: CreateNotificationDto,
  ) {

    // Obtiene el usuario autenticado
    const user =
      await this.getAuthenticatedUser(
        request,
      );

    // Crea la notificación usando el id local del usuario
    return this.notificationsService.createNotification(
      user.id,
      body,
    );
  }

  // Documenta el endpoint GET /notifications
  @ApiGetNotifications()

  // Atiende la petición GET /notifications
  @Get()

  // Obtiene las notificaciones del usuario autenticado
  async getNotifications(
    @Req() request: AuthenticatedRequest,
  ) {

    // Obtiene el usuario autenticado
    const user =
      await this.getAuthenticatedUser(
        request,
      );

    // Devuelve solamente las notificaciones del usuario autenticado
    return this.notificationsService.getNotificationsByUser(
      user.id,
    );
  }

  // Documenta el endpoint GET /notifications/:id
  @ApiGetNotificationById()

  // Atiende la petición GET /notifications/:id
  @Get(':id')

  // Obtiene una notificación específica del usuario autenticado
  async getNotificationById(
    @Req() request: AuthenticatedRequest,

    // Obtiene el id de la URL y lo convierte a number
    @Param('id', ParseIntPipe)
    notificationId: number,
  ) {

    // Obtiene el usuario autenticado
    const user =
      await this.getAuthenticatedUser(
        request,
      );

    // Busca la notificación y valida que pertenezca al usuario
    return this.notificationsService.getNotificationById(
      user.id,
      notificationId,
    );
  }

  // Documenta el endpoint PATCH /notifications/:id
  @ApiUpdateNotification()

  // Atiende la petición PATCH /notifications/:id
  @Patch(':id')

  // Modifica una notificación específica del usuario autenticado
  async updateNotification(
    @Req() request: AuthenticatedRequest,

    // Obtiene el id de la URL y lo convierte a number
    @Param('id', ParseIntPipe)
    notificationId: number,

    // Recibe los campos que se quieren modificar
    @Body()
    body: UpdateNotificationDto,
  ) {

    // Obtiene el usuario autenticado
    const user =
      await this.getAuthenticatedUser(
        request,
      );

    // Modifica solamente una notificación que pertenezca al usuario
    return this.notificationsService.updateNotification(
      user.id,
      notificationId,
      body,
    );
  }

  // Documenta el endpoint DELETE /notifications/:id
  @ApiDeleteNotification()

  // Atiende la petición DELETE /notifications/:id
  @Delete(':id')

  // Elimina una notificación específica del usuario autenticado
  async deleteNotification(
    @Req() request: AuthenticatedRequest,

    // Obtiene el id de la URL y lo convierte a number
    @Param('id', ParseIntPipe)
    notificationId: number,
  ) {

    // Obtiene el usuario autenticado
    const user =
      await this.getAuthenticatedUser(
        request,
      );

    // Elimina solamente una notificación que pertenezca al usuario
    return this.notificationsService.deleteNotification(
      user.id,
      notificationId,
    );
  }
}