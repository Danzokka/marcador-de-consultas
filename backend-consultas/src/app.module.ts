import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
import { DoctorModule } from './doctor/doctor.module';
import { ScheduleModule } from './schedule/schedule.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UserModule, ReviewModule, DoctorModule, ScheduleModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
