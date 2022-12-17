import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { PrismaModule } from '../database/prisma.module'
import { TreeService } from './services/tree.service'
import { TreeController } from './controllers/tree.controller'

@Module({
  imports: [HttpModule, PrismaModule],
  controllers: [TreeController],
  providers: [TreeService],
})
export class TreeModule {}
