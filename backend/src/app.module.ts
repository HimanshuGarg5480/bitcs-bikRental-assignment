import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './module/user/user.entity';
import { UserModule } from './module/user/user.module';
import { BikeModule } from './module/bike/bike.module';
import { Rental } from './module/rental/rental.entity';
import { Bike } from './module/bike/bike.entity';
import { RentalModule } from './module/rental/rental.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User,Bike,Rental],
      synchronize: true,
    }),
    UserModule,
    BikeModule,
    RentalModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
