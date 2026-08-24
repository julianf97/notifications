import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UsersService } from "./users.service";
import { PrismaModule } from "../../database/prisma.module";

// Define el modulo de usuarios
@Module({
    
    // Importa Prisma para poder usar PrismaService

    imports: [PrismaModule],

    // Registar el controlador de usuarios

    controllers: [UserController],

    // Registra el servicio de usuarios

    providers: [UsersService],

})

export class UserModule {}