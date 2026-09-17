import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Notification } from './notification.entity';

@Entity({ name: 'notifications_logs', schema: 'notifications' })
export class NotificationLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'notification_id', type: 'int' })
  notification_id!: number;

  @Column({ type: 'varchar', length: 50 })
  status!: string;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  error_message!: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  created_at!: Date | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  recipient!: string | null;

  @ManyToOne(() => Notification, (notification) => notification.logs, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'notification_id' })
  notification!: Notification;
}
