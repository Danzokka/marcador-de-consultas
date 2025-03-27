import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Post } from '@nestjs/common';
import { AuthUserDto, CreateUserDto } from './dto/CreateUserDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.createUser(createUserDto);
    } catch (e) {
      return e;
    }
  }

  @Post('/auth')
  auth(@Body() auth: AuthUserDto) {
    try {
      return this.userService.auth(auth);
    } catch (e) {
      return e;
    }
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    try {
      return this.userService.getUser(parseInt(id));
    } catch (e) {
      return e;
    }
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.updateUser(parseInt(id), createUserDto);
    } catch (e) {
      return e;
    }
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    try {
      return this.userService.deleteUser(parseInt(id));
    } catch (e) {
      return e;
    }
  }
}
