import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { sanitizedString } from '@/lib/utils';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const email = sanitizedString(createUserDto.email);

    try {
      const existingUser = await this.userModel.findOne({ email });

      if (existingUser) {
        throw new Error('A user with the same email already exists');
      }

      const newUser = new this.userModel(createUserDto);
      await newUser.save();

      return newUser;
    } catch (error) {
      const typedError = error as Error;
      throw new Error(`Failed to create user: ${typedError.message}`);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().select('-__v -createdAt -updatedAt');
    } catch (error) {
      const typedError = error as Error;
      throw new Error(`Failed to retrieve users: ${typedError.message}`);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);

      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      const typedError = error as Error;
      throw new Error(`Failed to retrieve user: ${typedError.message}`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, updateUserDto);

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      const typedError = error as Error;
      throw new Error(`Failed to update user: ${typedError.message}`);
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const removed = await this.userModel.findByIdAndDelete(id);

      if (!removed) {
        throw new Error('User not found');
      }

      return removed;
    } catch (error) {
      const typedError = error as Error;
      throw new Error(`Failed to remove user: ${typedError.message}`);
    }
  }
}
