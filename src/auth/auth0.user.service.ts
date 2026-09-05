import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Auth0UserInfo } from './types/auth0-user-info.type';

// Permite que NestJS administre e inyecte esta clase
@Injectable()

// Se encarga de obtener informacion del usuario desde Auth0
export class Auth0UserService {

  // Recibe ConfigService para leer las variables de entorno de Auth0

  // private significa que esta propiedad solo puede usarse dentro de la clase

  // readonly significa que una vez asignada en el constructor, no podés reemplazarla por otra cosa
  constructor(private readonly configService: ConfigService) {}

  // Obtiene los datos del usuario autenticado desde Auth0
  async getUserInfo(token: string): Promise<Auth0UserInfo> {

    // Obtiene el dominio de Auth0 desde las variables de entorno
    const domain =this.configService.getOrThrow<string>('AUTH0_DOMAIN');

    console.log(
      // Indica que el backend va a consultar /userinfo
      '🟩 BACK 13 - Consultando Auth0 /userinfo',
    );

    // Consulta el endpoint /userinfo de Auth0
    const response = await fetch(
      `https://${domain}/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log(
      // Muestra el status que respondió Auth0
      '🟩 BACK 14 - Status recibido desde Auth0:',
      response.status,
    );

    // Verifica que Auth0 haya respondido correctamente
    if (!response.ok) {
      console.log(
        // Indica que Auth0 rechazó la petición
        '🔴 BACK 15 - Auth0 rechazó /userinfo',
      );
      throw new UnauthorizedException(
        'No se pudo obtener la información del usuario',
      );
    }

    // Convierte la respuesta de Auth0 al tipo esperado
    const userInfo = await response.json() as Auth0UserInfo;

    console.log(
      // Muestra el email obtenido desde Auth0
      '🟩 BACK 15 - UserInfo recibido:',
      userInfo.email,
    );

    // Devuelve la información del usuario al controller
    return userInfo;
  }
}