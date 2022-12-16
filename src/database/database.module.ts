import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import type { PostgresConfiguration } from '../config'

const TypeOrm = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const postgresConfig = configService.get<PostgresConfiguration>('DB')
    return {
      type: 'postgres',
      host: postgresConfig?.POSTGRES_HOSTNAME || 'localhost',
      port: postgresConfig?.POSTGRES_PORT || 5432,
      username: postgresConfig?.POSTGRES_USER || 'postgres',
      password: postgresConfig?.POSTGRES_PASSWORD || 'postgres',
      database: postgresConfig?.POSTGRES_DB || 'postgres',
      autoLoadEntities: true,
      entities: [__dirname + '/../**/entities/**.entity{.js,.ts}'],
      migrations: [__dirname + '/migrations/*{.js,.ts}'],
      synchronize: false, // NEVER SET IT TO TRUE
      logging: process.env.ENV === 'dev' || false,
    } as any
  },
})

@Module({
  imports: [TypeOrm],
})
export class DataBaseModule {}
