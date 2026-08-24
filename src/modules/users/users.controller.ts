import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

// Define el controlador para las rutas de usuarios


@Controller('users')

export class UserController {
    
    // Recibe UsersService para usar la lógica de usuarios
        
    constructor(
        private readonly userService: UsersService
    ) {}

    // Atiende peticiones POST a /users

    @Post()

    // Recibe los daatos enviados en el body

    create(@Body() createUserDto: CreateUserDto) {

        return this.userService.create(createUserDto);

    }


}

