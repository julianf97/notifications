import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { NotificationLog } from './notification-log.entity';

@Entity({ name: 'notifications', schema: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'user_id', type: 'int' })
  user_id!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'varchar', length: 50 })
  channel!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  created_at!: Date | null;

  @ManyToOne(() => User, (user) => user.notifications, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToMany(() => NotificationLog, (log) => log.notification)
  logs!: NotificationLog[];
}
