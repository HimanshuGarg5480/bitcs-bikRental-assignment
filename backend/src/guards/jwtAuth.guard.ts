import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

// Extend the Request interface
declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request: Request = context.switchToHttp().getRequest();
        const token = request.cookies['jwt'];

        if (!token) {
            return false;
        }

        try {
            const user = this.jwtService.verify(token);
            request.user = user; 
            return true;
        } catch (error) {
            return false;
        }
    }
}
