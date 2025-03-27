import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { users, doctors, reviews, schedules } from './data';

@Injectable()
export class AppService {

  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createAllForTesting() {
    await this.prisma.user.createMany({
      data: users,
    });

    await this.prisma.doctor.createMany({
      data: doctors,
    });

    await this.prisma.review.createMany({
      data: reviews,
    });

    await this.prisma.schedule.createMany({
      data: schedules,
    });

    return 'Created all for testing';
  }
    
}
