import 'reflect-metadata';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { configureValidation } from '../src/validation';

describe('Task Management HTTP API', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = module.createNestApplication();
    configureValidation(app);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  async function createTask() {
    const response = await request(app.getHttpServer())
      .post('/tasks').send({ title: 'Write tests', description: 'Cover the API' }).expect(201);
    return response.body as { id: string; title: string; description: string };
  }

  it('creates a task with a generated ID and description', async () => {
    const task = await createTask();
    expect(task).toEqual({
      id: expect.any(String), title: 'Write tests', description: 'Cover the API',
    });
    expect(task.id).toMatch(/^[0-9a-f-]{36}$/);
  });

  it('creates a task without a description', async () => {
    const response = await request(app.getHttpServer())
      .post('/tasks').send({ title: 'Ship it' }).expect(201);
    expect(response.body).toEqual({ id: expect.any(String), title: 'Ship it' });
  });

  it('returns an empty list before any tasks exist', async () => {
    await request(app.getHttpServer()).get('/tasks').expect(200, []);
  });

  it('returns a zero count before any tasks exist', async () => {
    await request(app.getHttpServer()).get('/tasks/count').expect(200, { count: 0 });
  });

  it('counts additions while keeping the task ID route available', async () => {
    const first = await createTask();
    await request(app.getHttpServer()).get('/tasks/count').expect(200, { count: 1 });
    await createTask();
    await request(app.getHttpServer()).get('/tasks/count').expect(200, { count: 2 });
    await request(app.getHttpServer()).get(`/tasks/${first.id}`).expect(200, first);
  });

  it('keeps the count unchanged when a task is updated', async () => {
    const task = await createTask();
    await request(app.getHttpServer()).patch(`/tasks/${task.id}`)
      .send({ title: 'Updated task' }).expect(200);
    await request(app.getHttpServer()).get('/tasks/count').expect(200, { count: 1 });
  });

  it('reduces the count after deletion and returns zero after the last deletion', async () => {
    const first = await createTask();
    const second = await createTask();
    await request(app.getHttpServer()).delete(`/tasks/${first.id}`).expect(204);
    await request(app.getHttpServer()).get('/tasks/count').expect(200, { count: 1 });
    await request(app.getHttpServer()).delete(`/tasks/${second.id}`).expect(204);
    await request(app.getHttpServer()).get('/tasks/count').expect(200, { count: 0 });
  });

  it('lists all created tasks with distinct IDs', async () => {
    const first = await createTask();
    const second = await createTask();
    expect(first.id).not.toBe(second.id);
    await request(app.getHttpServer()).get('/tasks').expect(200, [first, second]);
  });

  it('reads a task by its ID', async () => {
    const task = await createTask();
    await request(app.getHttpServer()).get(`/tasks/${task.id}`).expect(200, task);
  });

  it('updates title while preserving an omitted description', async () => {
    const task = await createTask();
    const updated = { ...task, title: 'Review tests' };
    await request(app.getHttpServer()).patch(`/tasks/${task.id}`)
      .send({ title: updated.title }).expect(200, updated);
    await request(app.getHttpServer()).get(`/tasks/${task.id}`).expect(200, updated);
  });

  it('clears description with an empty string while preserving title', async () => {
    const task = await createTask();
    const updated = { ...task, description: '' };
    await request(app.getHttpServer()).patch(`/tasks/${task.id}`)
      .send({ description: '' }).expect(200, updated);
    await request(app.getHttpServer()).get(`/tasks/${task.id}`).expect(200, updated);
  });

  it('deletes a task with an empty 204 response', async () => {
    const task = await createTask();
    const response = await request(app.getHttpServer()).delete(`/tasks/${task.id}`).expect(204);
    expect(response.text).toBe('');
    await request(app.getHttpServer()).get(`/tasks/${task.id}`).expect(404);
    await request(app.getHttpServer()).get('/tasks').expect(200, []);
  });

  it.each([
    ['missing title', {}],
    ['empty title', { title: '' }],
    ['whitespace title', { title: ' \t\n' }],
    ['numeric title', { title: 123 }],
    ['null title', { title: null }],
    ['numeric description', { title: 'Valid', description: 123 }],
    ['null description', { title: 'Valid', description: null }],
    ['unknown field', { title: 'Valid', completed: true }],
    ['overlong title', { title: 'a'.repeat(201) }],
    ['overlong description', { title: 'Valid', description: 'a'.repeat(2001) }],
  ])('rejects creation with %s without storing a task', async (_label, payload) => {
    const response = await request(app.getHttpServer()).post('/tasks').send(payload).expect(400);
    expect(response.body.statusCode).toBe(400);
    await request(app.getHttpServer()).get('/tasks').expect(200, []);
  });

  it.each([
    ['empty patch', {}],
    ['blank title', { title: '  ' }],
    ['numeric title', { title: 123 }],
    ['null title', { title: null }],
    ['null description', { description: null }],
    ['array description', { description: [] }],
    ['unknown field', { completed: true }],
  ])('rejects update with %s without changing the task', async (_label, payload) => {
    const task = await createTask();
    await request(app.getHttpServer()).patch(`/tasks/${task.id}`).send(payload).expect(400);
    await request(app.getHttpServer()).get(`/tasks/${task.id}`).expect(200, task);
  });

  it.each(['get', 'patch', 'delete'] as const)('returns 404 for %s of a missing task', async (method) => {
    const operation = request(app.getHttpServer())[method]('/tasks/missing');
    const response = await (method === 'patch' ? operation.send({ title: 'Valid' }) : operation).expect(404);
    expect(response.body).toMatchObject({ statusCode: 404, message: 'Task not found' });
  });
});
