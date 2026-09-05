import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { auth } from 'express-oauth2-jwt-bearer';
import type { Request, Response, RequestHandler  } from 'express';

// RequestHandler: tipo de función que maneja requests.

// Permite que NestJS administre e inyecte esta clase
@Injectable()

// Se encarga exclusivamente de validar tokens de Auth0
export class Auth0JwtValidator {

  // Guarda el middleware encargado de validar el JWT
  private readonly checkJwt: RequestHandler;

  // Recibe ConfigService para leer las variables de entorno
  constructor(private readonly configService: ConfigService) {

    // Obtiene la url de nuestra api
    const audience = this.configService.getOrThrow<string>('AUTH0_AUDIENCE');

    // Obtiene el dominio de nuestro tenant de Auth0
    const domain = this.configService.getOrThrow<string>('AUTH0_DOMAIN');

    // Configura cómo deben validarse los tokens
    this.checkJwt = auth({
      // Verifica que el token pertenezca a nuestra API
      audience,
      
      // Verifica que el token haya sido emitido por nuestro Auth0
      issuerBaseURL: `https://${domain}`,
    });
  }

  // lo que va dentro de <> es el tipo de dato con el que la promesa se va a resolver.

  // Valida el token recibido en una request
  async validate(request: Request, response: Response): Promise<void> {

    console.log(
      // Indica que comenzó la validación del JWT
      '🟩 BACK 5 - Auth0JwtValidator comenzó a validar el token',
    );

    // Convierte la validación de Auth0 en una Promise
    return new Promise<void>((resolve, reject) => {

      // Ejecuta la validación del JWT
      this.checkJwt(request, response, (error) => {

        // Bloquea la request si el token es inválido
        if (error) {
          console.log(
          // Muestra que el token fue rechazado
            '🔴 BACK 6 - Token inválido',
          );
          reject(new UnauthorizedException());
          return;
        }

        console.log(
          // Confirma que el token fue validado correctamente
          '🟩 BACK 6 - Token validado correctamente',
        );

        // Finaliza correctamente si el token es válido
        resolve();
      });
    });
  }
}