import { Module } from '@nestjs/common';

import { AuthGuard } from './auth.guard';
import { Auth0JwtValidator } from './auth0.jwt.validator';
import { Auth0UserService } from './auth0.user.service';

// Agrupa todo lo relacionado con autenticación
@Module({

  // Registra el Guard y el validador para que Nest pueda inyectarlos
  providers: [
    AuthGuard,
    Auth0JwtValidator,
    Auth0UserService
  ],

  // Permite que otros módulos utilicen el Guard
  exports: [
    AuthGuard,
    Auth0UserService,
    Auth0JwtValidator
  ],
})

// Crea y exporta el módulo de autenticación
export class AuthModule {}