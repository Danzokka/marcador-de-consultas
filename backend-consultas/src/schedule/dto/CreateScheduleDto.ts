import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateScheduleDto {
  @IsNumber()
  @IsNotEmpty()
  doctorId: number;

  userId?: number;

  @IsString()
  @IsNotEmpty()
  day: string;

  @IsString()
  @IsNotEmpty()
  hour: string;
}