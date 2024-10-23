import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ExtendedRequest } from '../utils/request.interface'; // Import the extended Request interface

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: ExtendedRequest = context.switchToHttp().getRequest(); // Use the extended Request interface
    let token = request.cookies?.jwt;

    // Check for token in headers if not found in cookies
    console.log(token)
    if (!token) {
      token = request.headers['authorization']?.split(' ')[1]; // Extract token from Bearer header
    }

    if (!token) {
      return false;
    }

    try {
      const user = this.jwtService.verify(token,{secret:"SecretKey"});
      request.user = user;
      return true;
    } catch (error) {
        console.log(error)
      return false;
    }
  }
}
