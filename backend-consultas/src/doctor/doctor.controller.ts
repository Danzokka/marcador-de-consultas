import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/CreateDoctorDto';

@Controller('doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}

  @Post()
  createDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    try {
      return this.doctorService.createDoctor(createDoctorDto);
    } catch (e) {
      return e;
    }
  }

  @Get()
  getAllDoctors() {
    try {
      return this.doctorService.getAll();
    } catch (e) {
      return e;
    }
  }

  @Get(':id')
  getDoctor(@Param('id') id: string) {
    try {
      return this.doctorService.getDoctor(parseInt(id));
    } catch (e) {
      return e;
    }
  }

  @Put(':id')
  updateDoctor(
    @Body() createDoctorDto: CreateDoctorDto,
    @Param('id') id: string,
  ) {
    try {
      return this.doctorService.updateDoctor(parseInt(id), createDoctorDto);
    } catch (e) {
      return e;
    }
  }

  @Delete(':id')
  deleteDoctor(@Param('id') id: string) {
    try {
      return this.doctorService.deleteDoctor(parseInt(id));
    } catch (e) {
      return e;
    }
  }
}
