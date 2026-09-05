import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Auth0JwtValidator } from './auth0.jwt.validator';
import type { Request, Response } from 'express';

// Permite que NestJS administre e inyecte esta clase
@Injectable()

// Un Guard en NestJS es una clase que se ejecuta antes de entrar al endpoint y decide si la request puede continuar.

// CanActivate es la interfaz nativa de NestJS para crear Guards.

// canActivate es el método definido por la interfaz CanActivate que NestJS ejecuta antes del endpoint.

// ExecutionContext contiene información sobre la ejecución actual, como la request y el handler.

// Decide si una request puede acceder a un endpoint protegido

export class AuthGuard implements CanActivate {

  // Recibe el servicio encargado de validar tokens
  constructor(private readonly auth0JwtValidator: Auth0JwtValidator) {}

  // Se ejecuta antes de entrar al endpoint protegido
  async canActivate(context: ExecutionContext): Promise<boolean> {

    console.log(
      // Indica que una request protegida llegó al Guard
      '🟩 BACK 1 - Request entrando al AuthGuard',
    );

    // Obtiene la request HTTP actual
    const request = context.switchToHttp().getRequest<Request>();

    // Obtiene la response HTTP actual
    const response = context.switchToHttp().getResponse<Response>();

    // Obtiene el header Authorization
    const authorization = request.headers.authorzation;

    console.log(
      // Muestra si el frontend envió un token
      '🟩 BACK 2 - Authorization recibido:',
      authorization
        ? `${authorization.slice(0, 22)}...`
        : 'NO HAY TOKEN',
    );

    console.log(
      // Indica que el token será enviado al validador
      '🟩 BACK 3 - Enviando token al Auth0JwtValidator',
    );

    // Valida el token enviado en la request
    await this.auth0JwtValidator.validate(request, response);

    console.log(
      // Confirma que el token fue válido
      '🟩 BACK 4 - Token válido',
    );

    // Permite continuar porque el token fue válido
    return true;
  }
}