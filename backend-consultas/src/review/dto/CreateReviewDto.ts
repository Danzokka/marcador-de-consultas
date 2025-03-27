import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
