import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../../auth/auth.guard';

import { PrismaService } from '../../database/prisma.service';

import { NotificationsService } from './notifications.service';

import { CreateNotificationDto } from './dto/create/create.notification.dto';

import type { AuthenticatedRequest } from '../../auth/types/authenticated-request.type';

// Define la ruta base /notifications
@Controller('notifications')

// Protege todos los endpoints de notifications
@UseGuards(AuthGuard)

// Crea el controlador de notificaciones
export class NotificationsController {

  // Recibe los servicios necesarios para trabajar con notificaciones
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly prisma: PrismaService,
  ) {}

  // Atiende la petición POST /notifications
  @Post()

  // Crea una notificación para el usuario autenticado
  async createNotification(
    @Req() request: AuthenticatedRequest,

    // Recibe el body validado por el ValidationPipe global
    @Body()
    body: CreateNotificationDto,
  ) {

    // Obtiene el id de Auth0 desde el token
    const auth0Id =
      request.auth.payload.sub;

    // Busca el usuario local relacionado con Auth0
    const user =
      await this.prisma.users.findUniqueOrThrow({
        where: {
          auth0_id: auth0Id,
        },
      });

    // Crea la notificación usando el id local del usuario
    return this.notificationsService.createNotification(
      user.id,
      body,
    );
  }

  // Atiende la petición GET /notifications
  @Get()

  // Obtiene las notificaciones del usuario autenticado
  async getNotifications(
    @Req() request: AuthenticatedRequest,
  ) {

    // Obtiene el id de Auth0 desde el token
    const auth0Id =
      request.auth.payload.sub;

    // Busca el usuario local relacionado con Auth0
    const user =
      await this.prisma.users.findUniqueOrThrow({
        where: {
          auth0_id: auth0Id,
        },
      });

    // Devuelve solamente las notificaciones del usuario autenticado
    return this.notificationsService.getNotificationsByUser(
      user.id,
    );
  }

  // Atiende la petición GET /notifications/:id
  @Get(':id')

  // Obtiene una notificación específica del usuario autenticado
  async getNotificationById(
    @Req() request: AuthenticatedRequest,

    // Obtiene el id de la URL y lo convierte a number
    @Param('id', ParseIntPipe)
    notificationId: number,
  ) {

    // Obtiene el id de Auth0 desde el token
    const auth0Id =
      request.auth.payload.sub;

    // Busca el usuario local relacionado con Auth0
    const user =
      await this.prisma.users.findUniqueOrThrow({
        where: {
          auth0_id: auth0Id,
        },
      });

    // Busca la notificación y valida que pertenezca al usuario
    return this.notificationsService.getNotificationById(
      user.id,
      notificationId,
    );
  }
}