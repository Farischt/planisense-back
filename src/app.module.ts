import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigurationModule } from './config/config.module'
import { DataBaseModule } from './database/database.module'
import { TreeModule } from './tree/tree.module';

@Module({
  imports: [ConfigurationModule, DataBaseModule, TreeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
