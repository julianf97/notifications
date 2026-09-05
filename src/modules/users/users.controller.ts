import {
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { Auth0UserService } from '../../auth/auth0.user.service';
import { UsersService } from './users.service';
import type { AuthenticatedRequest } from '../../auth/types/authenticated-request.type';

// Define la ruta base /users
@Controller('users')

// Protege todos los endpoints de usuarios
@UseGuards(AuthGuard)

// Crea el controlador de usuarios
export class UsersController {

// Inyecta las dependencias en el constructor. Le dice a las propiedades que tienen que
// usar las instancias de UsersService y Auth0UserService que NestJS les proporciona
  constructor(
    private readonly usersService: UsersService,
    private readonly auth0UserService: Auth0UserService,
  ) {}

  // Atiende POST /users/sync
  @Post('sync')

  // Recibe la request autenticada
  async syncUser(@Req() request: AuthenticatedRequest) {

    console.log(
      // Indica que la request llegó al controller
      '🟩 BACK 7 - Entramos a POST /users/sync',
    );

    // Obtiene el identificador único del usuario desde el token
    const auth0Id = request.auth.payload.sub;

    console.log(
      // Muestra el identificador del usuario obtenido del JWT
      '🟩 BACK 8 - auth0Id obtenido del token:',
      auth0Id,
    );

    // Obtiene el header Authorization
    const authorization = request.headers.authorization;

    // Verifica que exista el token
    if (!authorization) {
      throw new UnauthorizedException();
    }

    // Extrae solamente el access token
    const token = authorization.replace('Bearer ', '');

    console.log(
      // Muestra una pequeña parte del token
      '🟩 BACK 9 - Token extraído:',
      `${token.slice(0, 15)}...`,
    );

    console.log(
      // Indica que vamos a pedir los datos del usuario a Auth0
      '🟩 BACK 10 - Solicitando userInfo a Auth0',
    );

    // Obtiene la información del usuario desde Auth0
    const userInfo = await this.auth0UserService.getUserInfo(token);

    console.log(
      // Muestra el email obtenido desde Auth0
      '🟩 BACK 11 - Email obtenido desde Auth0:',
      userInfo.email,
    );

    console.log(
      // Indica que vamos a sincronizar el usuario con PostgreSQL
      '🟩 BACK 12 - Enviando usuario a UsersService',
    );

    // Sincroniza el usuario con PostgreSQL
    return this.usersService.syncUser(
      auth0Id,
      userInfo.email,
    );
  }
}