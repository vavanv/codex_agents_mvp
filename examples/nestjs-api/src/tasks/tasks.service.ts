import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { Task } from './task';

@Injectable()
export class TasksService {
  private readonly tasks = new Map<string, Task>();

  create(input: CreateTaskDto): Task {
    const task: Task = { id: randomUUID(), title: input.title };
    if (input.description !== undefined) task.description = input.description;
    this.tasks.set(task.id, task);
    return { ...task };
  }

  findAll(): Task[] {
    return Array.from(this.tasks.values(), (task) => ({ ...task }));
  }

  count(): number {
    return this.tasks.size;
  }

  findOne(id: string): Task {
    const task = this.tasks.get(id);
    if (!task) throw new NotFoundException('Task not found');
    return { ...task };
  }

  update(id: string, input: UpdateTaskDto): Task {
    const task = this.findOne(id);
    if (input.title !== undefined) task.title = input.title;
    if (input.description !== undefined) task.description = input.description;
    this.tasks.set(id, task);
    return { ...task };
  }

  remove(id: string): void {
    this.findOne(id);
    this.tasks.delete(id);
  }
}
