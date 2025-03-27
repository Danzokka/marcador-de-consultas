import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateDoctorDto } from './dto/CreateDoctorDto';
import { Doctor } from '@prisma/client';

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  async createDoctor(data: CreateDoctorDto): Promise<Doctor> {
    try {
      const existingDoctor = await this.prisma.doctor.findUnique({
        where: {
          email: data.email,
        },
      });

      if (existingDoctor) {
        throw new BadRequestException('Doctor already exists');
      }

      return await this.prisma.doctor.create({
        data: {
          ...data,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAll(): Promise<Doctor[]> {
    try {
      return await this.prisma.doctor.findMany();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getDoctor(id: number): Promise<Doctor> {
    try {
      const doctor = await this.prisma.doctor.findUnique({
        where: {
          id,
        },
      });

      if (!doctor) {
        throw new BadRequestException('Doctor not found');
      }

      return doctor;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateDoctor(id: number, data: CreateDoctorDto): Promise<Doctor> {
    try {
      const doctor = await this.prisma.doctor.findUnique({
        where: {
          id,
        },
      });

      if (!doctor) {
        throw new BadRequestException('Doctor not found');
      }

      return await this.prisma.doctor.update({
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

  async deleteDoctor(id: number): Promise<Doctor> {
    try {
      const doctor = await this.prisma.doctor.findUnique({
        where: {
          id,
        },
      });

      if (!doctor) {
        throw new BadRequestException('Doctor not found');
      }

      return await this.prisma.doctor.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
