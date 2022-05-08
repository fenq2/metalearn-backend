import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  async create(dto: CreateUserDto): Promise<CreateUserDto> {
    return await new this.model(dto).save();
  }

  async findAll(): Promise<User[]> {
    return await this.model.find().exec();
  }

  async findById(id: number): Promise<User> {
    return await this.model.findById(id).exec();
  }

  async findByCond(cond: LoginUserDto): Promise<LoginUserDto> {
    return await this.model.findOne(cond).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
