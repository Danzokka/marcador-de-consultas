import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/CreateScheduleDto';

@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Post()
  createSchedule(@Body() createScheduleDto: CreateScheduleDto) {
    try {
      return this.scheduleService.createSchedule(createScheduleDto);
    } catch (e) {
      return e;
    }
  }

  @Get()
  getAllSchedules() {
    try {
      return this.scheduleService.getAll();
    } catch (e) {
      return e;
    }
  }

  @Get(':id')
  getSchedule(@Param('id') id: string) {
    try {
      return this.scheduleService.getSchedule(parseInt(id));
    } catch (e) {
      return e;
    }
  }

  @Put(':id')
  updateSchedule(
    @Body() createScheduleDto: CreateScheduleDto,
    @Param('id') id: string,
  ) {
    try {
      return this.scheduleService.updateSchedule(
        parseInt(id),
        createScheduleDto,
      );
    } catch (e) {
      return e;
    }
  }

  @Delete(':id')
  deleteSchedule(@Param('id') id: string) {
    try {
      return this.scheduleService.deleteSchedule(parseInt(id));
    } catch (e) {
      return e;
    }
  }

  @Get('/doctor/:id')
  getDoctorSchedules(@Param('id') doctorId: string) {
    try {
      return this.scheduleService.getDoctorSchedules(parseInt(doctorId));
    } catch (e) {
      return e;
    }
  }

  @Get('/user/:id')
  getUserSchedules(@Param('id') userId: string) {
    try {
      return this.scheduleService.getUserSchedules(parseInt(userId));
    } catch (e) {
      return e;
    }
  }

  @Post('/book')
  bookSchedule(@Body() body: { userId: number; scheduleId: number }) {
    try {
      return this.scheduleService.bookSchedule(body.userId, body.scheduleId);
    } catch (e) {
      return e;
    }
  }

  @Post('/cancel')
  cancelSchedule(@Body() body: { userId: number; scheduleId: number }) {
    try {
      return this.scheduleService.cancelSchedule(body.userId, body.scheduleId);
    } catch (e) {
      return e;
    }
  }
}
