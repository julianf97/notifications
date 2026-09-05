import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { PrismaModule } from "../../database/prisma.module";
import { AuthModule } from "../../auth/auth.module";

// Define el modulo de usuarios
@Module({
    
    // Importa Prisma para poder usar PrismaService

    imports: [
        PrismaModule,
        AuthModule
    ],

    // Registar el controlador de usuarios

    controllers: [UsersController],

    // Registra el servicio de usuarios

    providers: [UsersService],

})

export class UsersModule {}