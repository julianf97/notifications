import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./database/prisma.module";
import { UserModule } from "./modules/users/users.module";

// Define el módulo principal de la aplicación
@Module({
  // Importa los módulos que usa la aplicación
  imports: [

    // Carga las variables desde el archivo .env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',

    }),
    // Registra Prisma en la aplicación
    PrismaModule,

    // Registra todo lo relacionado con usuarios
    UserModule
  ],
})

// Crea y exporta el módulo principal
export class AppModule {}