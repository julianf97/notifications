import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import type { users } from '../../../generated/prisma/client';

// Permite que NestJS administre e inyecte esta clase
@Injectable()

// Contiene la lógica relacionada con usuarios
export class UsersService {

  // Recibe PrismaService para consultar la base de datos
  constructor(private readonly prisma: PrismaService) {}

  // Crea el usuario si no existe o devuelve el existente
  async syncUser(auth0Id: string,email: string): Promise<users> {

    console.log(
      // Indica que el usuario llegó al servicio
      '🟩 BACK 16 - UsersService recibió al usuario',
      {
        auth0Id,
        email,
      },
    );

    // Busca por auth0_id y crea el usuario si todavía no existe
    const user = await this.prisma.users.upsert({
      // Define cómo encontrar al usuario
      where: { auth0_id: auth0Id },

      // No modifica nada si el usuario ya existe
      update: {},

      // Define los datos del usuario nuevo
      create: { auth0_id: auth0Id, email: email }
    });

    console.log(
      // Confirma que Prisma terminó la operación
      '🟩 BACK 17 - Usuario sincronizado en PostgreSQL',
      {
        id: user.id,
        auth0Id: user.auth0_id,
        email: user.email,
      },
    );

    // Devuelve el usuario al controller
    return user;
  }
}