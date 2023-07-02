import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './database/prisma/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/user/user.module';
import { PaymentModule } from './modules/payment/payment.module';
import { PaymentService } from './modules/payment/payment.service';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UsersModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, PaymentService],
})
export class AppModule {}
