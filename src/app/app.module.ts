import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from '../database/prisma.module'
import { TreeModule } from '../tree/tree.module'

@Module({
  imports: [PrismaModule, TreeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
