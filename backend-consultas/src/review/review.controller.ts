import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/CreateReviewDto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  createReview(@Body() createReviewDto: CreateReviewDto) {
    try {
      return this.reviewService.createReview(createReviewDto);
    } catch (e) {
      return e;
    }
  }

  @Get()
  getAllReviews() {
    try {
      return this.reviewService.getAll();
    } catch (e) {
      return e;
    }
  }

  @Get('/doctor/:id')
  getDoctorReviews(@Param('id') doctorId: string) {
    try {
      return this.reviewService.getDoctorReviews(parseInt(doctorId));
    } catch (e) {
      return e;
    }
  }

  @Get('/user/:id')
  getUserReviews(@Param('id') userId: string) {
    try {
      return this.reviewService.getUserReviews(parseInt(userId));
    } catch (e) {
      return e;
    }
  }

  @Put(':id')
  updateReview(
    @Body() createReviewDto: CreateReviewDto,
    @Param('id') id: string,
  ) {
    try {
      return this.reviewService.updateReview(parseInt(id), createReviewDto);
    } catch (e) {
      return e;
    }
  }

  @Delete(':id')
  deleteReview(@Param('id') id: string) {
    try {
      return this.reviewService.deleteReview(parseInt(id));
    } catch (e) {
      return e;
    }
  }
}
