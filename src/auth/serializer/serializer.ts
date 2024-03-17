import { Inject, Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { CreateUserDTO } from "src/user/dto/user.dto";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService) {
        super();
    }

    serializeUser(user: CreateUserDTO, done: Function) {
        console.log("Serializing user...");
        console.log(user);
        done(null, user);
    }

    async deserializeUser(payload: any, done: Function) {
        console.log("Deserializing...");
        console.log(payload);
        const user = await this.authService.findUser(payload.email);
        console.log ("User found: ");
        console.log(user);
        return user? done(null, user) : done(null, null);
    }
}