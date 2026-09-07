import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./database/prisma.module";
import { UsersModule } from "./modules/users/users.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";

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
    UsersModule,

    // Registra todo lo relacionado con notificaciones
    NotificationsModule
  ],
})

// Crea y exporta el módulo principal
export class AppModule {}