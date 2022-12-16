import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from './index'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
})
export class ConfigurationModule {}
