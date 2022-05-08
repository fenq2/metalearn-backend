import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByCond({
      email,
      password,
    });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  generateJwtToken(data: { id: string; email: string }) {
    const payload = { sub: data.id, email: data.email };
    return this.jwtService.sign(payload);
  }

  async register(dto: CreateUserDto) {
    const candidate = await this.usersService.findByCond({ email: dto.email });

    if (candidate) {
      throw new ForbiddenException('Такой email уже существует!');
    }
    const { id, email, fullName } = await this.usersService.create(dto);
    const payload = { email, id };

    return {
      id,
      email,
      fullName,
      token: this.generateJwtToken(payload),
    };
  }

  async login(user: LoginUserDto) {
    const { id, fullName, email } = user;
    const payload = { email: user.email, sub: user.id };
    return {
      id,
      fullName,
      email,
      token: this.jwtService.sign(payload),
    };
  }
}
