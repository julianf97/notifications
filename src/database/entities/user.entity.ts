import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Notification } from './notification.entity';

@Entity({ name: 'users', schema: 'notifications' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'auth0_id', type: 'varchar', length: 255, unique: true })
  auth0_id!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications!: Notification[];
}
