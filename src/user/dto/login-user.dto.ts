import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  id?: string;

  @IsNotEmpty()
  fullName?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password?: string;
}
