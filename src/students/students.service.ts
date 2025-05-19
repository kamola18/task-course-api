import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterStudentDto } from './dto/register-student.dto';
import { Student, StudentDocument } from './schemas/student.schema';
import * as bcrypt from 'bcrypt';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<StudentDocument>,
  ) {}

  async register(dto: RegisterStudentDto): Promise<Student> {
    const existing = await this.studentModel.findOne({ email: dto.email });
    if (existing) throw new ConflictException('Student already exists');

    const hashed = await bcrypt.hash(dto.password, 10);
    const newStudent = new this.studentModel({
      ...dto,
      password: hashed,
    });
    return newStudent.save();
  }

  async create(createStudentDto: CreateStudentDto) {
    const existing = await this.studentModel.findOne({ email: createStudentDto.email });
    if (existing) throw new ConflictException('Email already in use');
  
    const hashed = await bcrypt.hash(createStudentDto.password, 10);
    const student = new this.studentModel({
      ...createStudentDto,
      password: hashed,
    });
  
    return student.save();
  }
  
}
