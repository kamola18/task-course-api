import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Param, Req } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';


@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @Role('admin')
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Post(':courseId/register')
  @Role('student')
  registerForCourse(@Param('courseId') courseId: string, @Req() req) {
  return this.coursesService.registerStudentForCourse(courseId, req.user.userId);
}

@Get('/students/:id/courses')
@UseGuards(JwtAuthGuard)
async getStudentCourses(@Param('id') id: string, @Req() req) {
const student = req.user;

if (student.role !== 'student') {
throw new ForbiddenException('Only students can view their courses');
}

if (student.userId !== id) {
throw new ForbiddenException('You can only view your own courses');
}

return this.coursesService.getRegisteredCourses(id);
}

}
