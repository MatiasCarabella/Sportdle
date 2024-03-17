import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDTO } from "src/user/dto/user.dto";
import { UserInterface } from "src/user/interfaces/user.interface";

@Injectable()
export class AuthService {

    constructor ( @InjectModel('User') private readonly userModel: Model<UserInterface>) {}

    async validateUser(user: UserDTO) {
        console.log('AuthService');
        console.log('Searching for...')
        console.log(user);
        const match = await this.userModel.findOne({email: user.email});
        console.log('Match:');
        console.log(match);
        if (match) {
            return match;
        }
        console.log("User not found, creating...")
        const newUser = this.userModel.create( user );
        console.log("I made a User (づ｡◕‿‿◕｡)づ");
        return (await newUser).save();
    }

    async findUser(email: string) {
        const user = await this.userModel.findOne({email: email});
        return user;
    }
}