import { Controller, Get, Post, Put, Delete, Res, Body, HttpStatus } from '@nestjs/common';

import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) {}

  @Post('/create')
  async createUser(@Res() response, @Body() createUserDTO: UserDTO) {
    console.log(createUserDTO)
    try {
      const user = await this.userService.createUser(createUserDTO)
      return response.status(HttpStatus.OK).json({
        result: 'User created successfully.',
        user: user
      })
    } catch (error) {
      console.log(error)
      switch (error.code) {
        case 11000:
          return response.status(HttpStatus.CONFLICT).json({
            result: 'Error',
            error: error.message
          })
        default:
          return response.status(HttpStatus.BAD_REQUEST).json({
            result: 'Error',
            error: error.message
          })
      }
    }

  }
}