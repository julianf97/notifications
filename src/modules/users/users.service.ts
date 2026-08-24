import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";

// Permite que NestJS administre e inyecte esta clase
@Injectable()

export class UsersService {

    // Recibe PrismaService para poder consultar la base de datos
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    // Intenta crear un usuario nuevo en la base de datos
    async create(createUserDto: CreateUserDto) {

        // Guarda el usuario usando Prisma
        return this.prisma.users.create({
            data: {
                auth0_id: createUserDto.auth0Id,
                email: createUserDto.email
            }
        });
    }
}