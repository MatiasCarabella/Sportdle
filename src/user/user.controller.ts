import { Controller, Get, Post, Put, Delete, Res, Body, HttpStatus } from '@nestjs/common';

import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

  constructor(private userService: UserService) {}

  @Post('/create')
  async createUser(@Res() response, @Body() user: UserDTO) {
    console.log(user)
    try {
      const newUser = await this.userService.createUser(user)
      return response.status(HttpStatus.OK).json({
        result: 'User created successfully.',
        user: newUser
      })
    } catch (error) {
      console.log(error)
      switch(error.code) {
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

  @Get()
  async getAll(@Res() response) {
    try {
      const users = await this.userService.getUsers()
      return response.status(HttpStatus.OK).json({
        result: 'User retrieved successfully.',
        users: users
      })
    } catch (error) {
      console.log(error)
      switch(error.code) {
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