import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "./guards/guards";
import { Request } from "express";

import { UserDTO } from "src/user/dto/user.dto";
import { UserInterface } from "src/user/interfaces/user.interface";

import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {

    constructor ( @InjectModel('User') private readonly userModel: Model<UserInterface>) {}
    
    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleLogin() {
        return { msg: "Google Authentication " }
    }

    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    handleRedirect() {
        return { msg: "Google Redirect" }
    }

    @Post('web/login')
    async webLogin(@Res() response, @Body() user: UserDTO) {
    console.log(user)
    try {
        const foundUser = await this.userModel.findOne({ email: user.email });
        if(foundUser) {
        const match = await bcrypt.compare(user.password, foundUser.password);
        if(match) {
            return response.status(HttpStatus.OK).json({
            result: "Login success."
            })
        }
        return response.status(HttpStatus.UNAUTHORIZED).json({
            result: "Invalid password."
        })
        }
        return response.status(HttpStatus.UNAUTHORIZED).json({
        result: "Invalid email."
        })
    } catch (error) {
        console.log(error)
        return response.status(HttpStatus.BAD_REQUEST).json({
        result: 'Error',
        error: error.message
        })
    }
    }

    @Get('status') 
    user (@Req() request: Request) {
        console.log(request.user);
        if (request.user) {
            return { msg: 'Authenticated' };
        } else {
            return { msg: 'Not Authenticated' };
        }
    }
}