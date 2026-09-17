import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const useSsl = configService.get<string>('DATABASE_SSL') === 'true';

        return {
          type: 'postgres' as const,
          url: configService.getOrThrow<string>('DATABASE_URL'),
          schema: 'notifications',
          autoLoadEntities: true,
          synchronize:
            configService.get<string>('DATABASE_SYNCHRONIZE') === 'true',
          ssl: useSsl ? { rejectUnauthorized: false } : false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
