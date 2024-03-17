import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { UserInterface } from './interfaces/user.interface';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor ( @InjectModel('User') private readonly userModel: Model<UserInterface>) {}

    async getUsers(): Promise<UserInterface[]> {
        const users = await this.userModel.find()
        return users
    }

    async getUser(userId: string): Promise <UserInterface> {
        const user = await this.userModel.findById(userId)
        return user
    }

    async createUser(user: UserDTO): Promise<UserInterface> {
        const newUser = new this.userModel(user)
        return await newUser.save()
    }

    async updateUser(userId: string, user: UserDTO): Promise<UserInterface> {
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, user, {new: true})
        return updatedUser
    }

    async deleteUser(userId: string): Promise<UserInterface> {
        const deletedUser = await this.userModel.findByIdAndDelete(userId)
        return deletedUser
    }
}