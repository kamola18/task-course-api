import {
    Injectable,
    NotFoundException,
    ConflictException, 
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  
  import { Course, CourseDocument } from './schemas/course.schema';
  import { Student, StudentDocument } from 'src/students/schemas/student.schema';
  import { CreateCourseDto } from './dto/create-course.dto';
  import { Types } from 'mongoose';
  
  @Injectable()
  export class CoursesService {
    constructor(
      @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
      @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
    ) {}
  
    async create(createCourseDto: CreateCourseDto): Promise<Course> {
      const newCourse = new this.courseModel(createCourseDto);
      return newCourse.save();
    }
  
    async findAll(): Promise<Course[]> {
      return this.courseModel.find();
    }
  
    async registerStudentForCourse(courseId: string, studentId: string) {
        const student = await this.studentModel.findById(studentId);
        if (!student) throw new NotFoundException('Student not found');
      
        const courseObjectId = new Types.ObjectId(courseId); 
      
        const alreadyRegistered = student.registeredCourses.some(
          (id) => id.toString() === courseId,
        );
      
        if (alreadyRegistered) throw new ConflictException('Already registered');
      
        student.registeredCourses.push(courseObjectId); 
        return student.save();
      }

      async getRegisteredCourses(studentId: string) {
        const student = await this.studentModel.findById(studentId).populate('registeredCourses');
        if (!student) throw new NotFoundException('Student not found');
        return student.registeredCourses;
      }
      
  }
  