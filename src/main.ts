import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { AllExceptionsFilter } from './app/filters/exception.filter'
import { LoggingInterceptor } from './app/interceptors/logging.interceptor'
import { PrismaService } from './database/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)))
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)
  await app.listen(3000)
}

bootstrap()
