import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

// Define un modulo de NestJS

// un módulo es una clase que agrupa una parte de la aplicación.

@Module({
    // Registra PrismaService para que Nest pueda crear e inyectar su instancia
    providers: [PrismaService],

    // Permite que otros modulos puedan usar PrismaService
    exports: [PrismaService],
})


// Crea y exporta el módulo de Prisma
export class PrismaModule {}