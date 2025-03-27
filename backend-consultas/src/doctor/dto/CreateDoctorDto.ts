import { IsNotEmpty, IsString } from "class-validator";

export class CreateDoctorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  crm: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  clinica: string;

  @IsNotEmpty()
  @IsString()
  especialidade: string;

  @IsNotEmpty()
  @IsString()
  sobre: string;
}
