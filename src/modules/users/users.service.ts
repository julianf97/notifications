import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async syncUser(auth0Id: string, email: string): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { auth0_id: auth0Id },
    });

    if (existingUser) {
      return existingUser;
    }

    const user = this.usersRepository.create({ auth0_id: auth0Id, email });
    return this.usersRepository.save(user);
  }

  async findByAuth0Id(auth0Id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { auth0_id: auth0Id },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }
}
