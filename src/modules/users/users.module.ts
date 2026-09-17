import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { AuthModule } from '../../auth/auth.module';

// Define el modulo de usuarios
@Module({
  // Registra el repositorio TypeORM de usuarios

  imports: [TypeOrmModule.forFeature([User]), AuthModule],

  // Registar el controlador de usuarios

  controllers: [UsersController],

  // Registra el servicio de usuarios

  providers: [UsersService],

  exports: [UsersService],
})
export class UsersModule {}
