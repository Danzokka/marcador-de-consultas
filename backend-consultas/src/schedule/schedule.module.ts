import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, PrismaService]
})
export class ScheduleModule {}
