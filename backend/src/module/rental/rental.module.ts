
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './rental.entity';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { User } from '../user/user.entity';
import { Bike } from '../bike/bike.entity';
import { JwtAuthGuard } from 'src/guards/jwtAuth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([Rental,User,Bike]),JwtModule],
    controllers: [RentalController],
    providers: [RentalService,JwtAuthGuard],
})
export class RentalModule {}