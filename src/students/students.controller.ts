import { Body, Controller, Post } from '@nestjs/common';
import { StudentsService } from './students.service';
import { RegisterStudentDto } from './dto/register-student.dto';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('register')
  register(@Body() dto: RegisterStudentDto) {
    return this.studentsService.register(dto);
  }

  @Post('register')
  create(@Body() createStudentDto: CreateStudentDto) {
  return this.studentsService.create(createStudentDto);
}
}
