// backend/src/module/bike/bike.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bike } from './bike.entity';
import { BikeService } from './bike.service';
import { BikeController } from './bike.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../../guards/jwtAuth.guard';

@Module({
    imports: [TypeOrmModule.forFeature([Bike]), JwtModule],
    controllers: [BikeController],
    providers: [BikeService, JwtAuthGuard],
})
export class BikeModule {}
