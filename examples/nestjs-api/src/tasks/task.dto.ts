import { IsString, Matches, MaxLength, ValidateIf } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @Matches(/\S/, { message: 'title must contain a non-whitespace character' })
  @MaxLength(200)
  title!: string;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(2000)
  description?: string;
}

export class UpdateTaskDto {
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @Matches(/\S/, { message: 'title must contain a non-whitespace character' })
  @MaxLength(200)
  title?: string;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(2000)
  description?: string;
}
