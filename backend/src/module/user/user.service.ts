import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserParm, LoginUserParm } from 'src/utils/types';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(userData: CreateUserParm, res: Response): Promise<any> {
    const existingUser = await this.userRepository.findOne({
      where: { email: userData.email },
    });
    if (existingUser) {
      throw new Error('Email already in use'); // Handle email already in use
    }

    // Validate password length
    if (userData.password && userData.password.length < 6) {
      throw new Error('Password must be at least 6 characters long'); // Handle password length validation
    }

    userData.password = await bcrypt.hash(userData.password, 10);
    const newUser = this.userRepository.create(userData);
    return await this.userRepository
      .save(newUser)
      .then(() => {
        const token = this.jwtService.sign({
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        });
        res.cookie('jwt', token, { httpOnly: true });
        return {...newUser,token};
      })
      .catch((error) => {
        throw new Error('Error creating user: ' + error.message); // Handle errors during user creation
      });
  }

  async loginUser(
    userData: LoginUserParm,
    res: Response,
  ): Promise<any> {
    const { email, password } = userData;
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = this.jwtService.sign({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
      res.cookie('jwt', token, { httpOnly: true });
      return {...user,token};
    }
    return null;
  }

  async logoutUser(res: Response): Promise<any> {
    try {
      res.clearCookie('jwt');
      return res.status(200).json({
        message: 'Logout successful',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error logging out',
        error: error.message,
      });
    }
  }
}
