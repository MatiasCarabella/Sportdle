import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "./guards/guards";
import { Request } from "express";

@Controller('auth')
export class AuthController {
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