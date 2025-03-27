import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateScheduleDto } from './dto/CreateScheduleDto';
import { Schedule } from '@prisma/client';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async checkIfUserExists(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async checkIfDoctorExists(doctorId: number) {
    try {
      const doctor = await this.prisma.doctor.findUnique({
        where: {
          id: doctorId,
        },
      });

      if (!doctor) {
        throw new BadRequestException('Doctor not found');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createSchedule(
    createScheduleDto: CreateScheduleDto,
  ): Promise<Schedule> {
    try {
      if (createScheduleDto.userId) {
        Promise.all([
          this.checkIfUserExists(createScheduleDto.userId),
          this.checkIfDoctorExists(createScheduleDto.doctorId),
        ]);
      } else {
        await this.checkIfDoctorExists(createScheduleDto.doctorId);
      }

      const existingSchedule = await this.prisma.schedule.findFirst({
        where: {
          doctorId: createScheduleDto.doctorId,
          day: createScheduleDto.day,
          hour: createScheduleDto.hour,
        },
      });

      if (existingSchedule) {
        throw new BadRequestException('Schedule already exists');
      }

      return this.prisma.schedule.create({
        data: createScheduleDto,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAll(): Promise<Schedule[]> {
    try {
      return await this.prisma.schedule.findMany();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getSchedule(id: number): Promise<Schedule> {
    try {
      const schedule = await this.prisma.schedule.findUnique({
        where: {
          id,
        },
      });

      if (!schedule) {
        throw new BadRequestException('Schedule not found');
      }

      return schedule;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getDoctorSchedules(doctorId: number): Promise<Schedule[]> {
    try {
      await this.checkIfDoctorExists(doctorId);

      return await this.prisma.schedule.findMany({
        where: {
          doctorId,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUserSchedules(userId: number): Promise<Schedule[]> {
    try {
      await this.checkIfUserExists(userId);

      return await this.prisma.schedule.findMany({
        where: {
          userId,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteSchedule(id: number): Promise<Schedule> {
    try {
      const schedule = await this.prisma.schedule.findUnique({
        where: {
          id,
        },
      });

      if (!schedule) {
        throw new BadRequestException('Schedule not found');
      }

      return await this.prisma.schedule.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateSchedule(id: number, data: CreateScheduleDto): Promise<Schedule> {
    try {
      const schedule = await this.prisma.schedule.findUnique({
        where: {
          id,
        },
      });

      if (!schedule) {
        throw new BadRequestException('Schedule not found');
      }

      return await this.prisma.schedule.update({
        where: {
          id,
        },
        data: {
          ...data,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async bookSchedule(userId: number, scheduleId: number) {
    try {
      await this.checkIfUserExists(userId);

      const schedule = await this.prisma.schedule.findUnique({
        where: {
          id: scheduleId,
        },
      });

      if (!schedule) {
        throw new BadRequestException('Schedule not found');
      }

      if (schedule.userId) {
        throw new BadRequestException('Schedule already booked');
      }

      return await this.prisma.schedule.update({
        where: {
          id: scheduleId,
        },
        data: {
          userId,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async cancelSchedule(userId, scheduleId: number) {
    try {
      await this.checkIfUserExists(userId);

      const schedule = await this.prisma.schedule.findUnique({
        where: {
          id: scheduleId,
        },
      });

      if (!schedule) {
        throw new BadRequestException('Schedule not found');
      }

      if (schedule.userId !== userId) {
        throw new BadRequestException('Schedule not booked by user');
      }

      return await this.prisma.schedule.update({
        where: {
          id: scheduleId,
        },
        data: {
          userId: null,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
