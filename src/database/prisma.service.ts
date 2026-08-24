import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';

// Permite que NestJS administre e inyecte esta clase
@Injectable()

// Crea PrismaService heredando las funciones de PrismaClient
export class PrismaService extends PrismaClient

  // Obliga a implementar métodos del ciclo de vida de NestJS
  implements OnModuleInit, OnModuleDestroy {
  // Se ejecuta cuando se crea una instancia de PrismaService
  constructor() {

    // Crea el adaptador que conecta Prisma con PostgreSQL
    const adapter = new PrismaPg({

      // Usa la URL de conexión tomada de las variables de entorno
      connectionString: process.env.DATABASE_URL as string,
    });

    // Ejecuta el constructor de PrismaClient usando el adaptador de PostgreSQL
    super({ adapter });
  }

  // Se ejecuta cuando Nest inicializa este servicio
  async onModuleInit(): Promise<void> {

    // Abre la conexión de Prisma con la base de datos
    await this.$connect();
  }

  // Se ejecuta cuando Nest destruye este servicio
  async onModuleDestroy(): Promise<void> {

    // Cierra la conexión de Prisma con la base de datos
    await this.$disconnect();
  }
}