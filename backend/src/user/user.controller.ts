import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dtos/LoginUser.dto';
import { JoiValidationPipe } from 'src/pipes/joiValidation.pipe';
import { CreateUserSchema } from './validations/createuser.validate';
import { LoginUserSchema } from './validations/loginuser.validate';

@Controller('user')
export class UserController {
  // Create a new user
  constructor(
    private userService: UserService,
  ) {}

  @Post('signup')
  @UsePipes(new JoiValidationPipe(CreateUserSchema))
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const newUser = await this.userService.createUser(createUserDto, res);

      return res.status(201).json({
        message: 'User created successfully',
        user: newUser,
      });
    } catch (error) {
        console.log(error)
      return res.status(500).json({
        message: 'Error creating user',
        error: error.message,
      });
    }
  }

  // Login a user
  @Post('login')
  @UsePipes(new JoiValidationPipe(LoginUserSchema))
  async loginUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    try {
      const user = await this.userService.loginUser(loginUserDto, res);
      if (!user) {
        return res.status(401).json({
          message: 'Invalid credentials',
        });
      }

      return res.status(200).json({
        message: 'Login successful',
        user: user,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error logging in',
        error: error.message,
      });
    }
  }

  // Logout a user
  @Post('logout')
  async logoutUser(@Res() res: Response) {
    await this.userService.logoutUser(res);
  }
}
