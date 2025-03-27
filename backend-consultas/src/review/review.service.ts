import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReviewDto } from './dto/CreateReviewDto';
import { Review } from '@prisma/client';

@Injectable()
export class ReviewService {
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

  async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    try {
      Promise.all([
        await this.checkIfUserExists(createReviewDto.userId),
        await this.checkIfDoctorExists(createReviewDto.doctorId),
      ]);

      const existingReview = await this.prisma.review.findFirst({
        where: {
          userId: createReviewDto.userId,
          doctorId: createReviewDto.doctorId,
        },
      });

      if (existingReview) {
        throw new BadRequestException('Review already exists');
      }

      return this.prisma.review.create({
        data: {
          ...createReviewDto,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAll(): Promise<Review[]> {
    try {
      return this.prisma.review.findMany(
        {
          include: {
            User: {
              select: {
                name: true,
              },
            },
          },
        },
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getDoctorReviews(doctorId: number): Promise<Review[]> {
    try {
      await this.checkIfDoctorExists(doctorId);

      return this.prisma.review.findMany({
        where: {
          doctorId,
        },
        include: {
          User: {
            select: {
              name: true,
            },
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUserReviews(userId: number): Promise<Review[]> {
    try {
      await this.checkIfUserExists(userId);

      return this.prisma.review.findMany({
        where: {
          userId,
        },
        include: {
          User: {
            select: {
              name: true,
            },
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateReview(id: number, data: CreateReviewDto): Promise<Review> {
    try {
      Promise.all([
        await this.checkIfUserExists(data.userId),
        await this.checkIfDoctorExists(data.doctorId),
      ]);

      const review = await this.prisma.review.findUnique({
        where: {
          id,
        },
      });

      if (!review) {
        throw new BadRequestException('Review not found');
      }

      return this.prisma.review.update({
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

  async deleteReview(id: number): Promise<Review> {
    try {
      const review = await this.prisma.review.findUnique({
        where: {
          id,
        },
      });

      if (!review) {
        throw new BadRequestException('Review not found');
      }

      return this.prisma.review.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
