import {
  BadRequestException, Body, Controller, Delete, Get,
  HttpCode, HttpStatus, Param, Patch, Post,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { Task } from './task';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasks: TasksService) {}

  @Post()
  create(@Body() input: CreateTaskDto): Task {
    return this.tasks.create(input);
  }

  @Get()
  findAll(): Task[] {
    return this.tasks.findAll();
  }

  @Get('count')
  count(): { count: number } {
    return { count: this.tasks.count() };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Task {
    return this.tasks.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() input: UpdateTaskDto): Task {
    if (input.title === undefined && input.description === undefined) {
      throw new BadRequestException('At least one task field must be provided');
    }
    return this.tasks.update(id, input);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    this.tasks.remove(id);
  }
}
