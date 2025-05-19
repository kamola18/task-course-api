import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterStudentDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
