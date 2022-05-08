import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  id?: string;

  @Length(3, undefined, { message: 'Имя должно быть не менее 3 символов!' })
  @IsNotEmpty()
  fullName: string;

  @IsEmail(undefined, { message: 'Неверная почта!' })
  @IsNotEmpty()
  email: string;

  @Length(6, 32, { message: 'Пароль должен быть не менее 6 символов!' })
  @IsNotEmpty()
  password: string;
}
