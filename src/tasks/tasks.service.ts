import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    const task = new this.taskModel({
      ...createTaskDto,
      createdBy: new Types.ObjectId(userId),
    });
    return task.save();
  }

  async findAll(userId: string) {
    return this.taskModel.find({ createdBy: userId });
  }

  async findOne(id: string, userId: string) {
    const task = await this.taskModel.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    if (task.createdBy.toString() !== userId) throw new ForbiddenException('Access denied');
    return task;
  }

  async update(id: string, updateDto: UpdateTaskDto, userId: string) {
    const task = await this.taskModel.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    if (task.createdBy.toString() !== userId) throw new ForbiddenException('Access denied');

    Object.assign(task, updateDto);
    return task.save();
  }

  async remove(id: string, userId: string) {
    const task = await this.taskModel.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    if (task.createdBy.toString() !== userId) throw new ForbiddenException('Access denied');
    return task.deleteOne();
  }
}
