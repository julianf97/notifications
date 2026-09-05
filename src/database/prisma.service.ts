import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';

// Permite que NestJS administre e inyecte esta clase
@Injectable()

// Crea PrismaService heredando las funciones de PrismaClient
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // Recibe ConfigService para leer variables de entorno
  constructor(configService: ConfigService) {

    // Obtiene DATABASE_URL y lanza error si no existe
    const databaseUrl = configService.getOrThrow<string>('DATABASE_URL');

    // Crea el adaptador que conecta Prisma con PostgreSQL
    const adapter = new PrismaPg(
      {
        connectionString: databaseUrl,
      },

      // Indica que Prisma debe trabajar sobre el schema notifications
      {
        schema: 'notifications',
      },
    );

    // Ejecuta el constructor de PrismaClient usando el adaptador
    super({ adapter });
  }

  // Abre la conexión cuando Nest inicia el servicio
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  // Cierra la conexión cuando Nest destruye el servicio
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}