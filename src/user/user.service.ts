import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor ( @InjectModel('User') private readonly userModel: Model<User>) {}

    async getUsers(): Promise<User[]> {
        const users = await this.userModel.find()
        return users
    }

    async getUser(userId: string): Promise <User> {
        const user = await this.userModel.findById(userId)
        return user
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        const user = new this.userModel(createUserDTO)
        return await user.save()
    }

    async updateUser(userId: string, createUser: CreateUserDTO): Promise<User> {
        const user = await this.userModel.findByIdAndUpdate(userId, createUser, {new: true});
        return user;
    }

    async deleteUser(userId: string): Promise<User> {
        const deletedUser = await this.userModel.findByIdAndDelete(userId)
        return deletedUser
    }
}