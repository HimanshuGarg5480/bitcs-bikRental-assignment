import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dtos/createRental.dto';
import { JwtAuthGuard } from 'src/guards/jwtAuth.guard';

@Controller('rentals')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  async createRental(@Body() createRentalDto: CreateRentalDto) {
    return this.rentalService.createRental(createRentalDto);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  async getRentalsForUser(@Param('userId') userId: number) {
    return this.rentalService.getRentalsByUserId(userId);
  }

  @Get(':rentalId')
  @UseGuards(JwtAuthGuard)
  async getRentalById(@Param('rentalId') rentalId: number) {
    return this.rentalService.getRentalById(rentalId);
  }

  @Patch(':rentalId/return')
  @UseGuards(JwtAuthGuard)
  async returnBike(
    @Param('rentalId') rentalId: number,
    @Body('returnTime') returnTime: Date,
  ) {
    return this.rentalService.returnBike(rentalId, returnTime);
  }

  // Delete a rental (Admin use case)
  @Delete(':rentalId')
  @UseGuards(JwtAuthGuard)
  async deleteRental(@Param('rentalId') rentalId: number) {
    return this.rentalService.deleteRental(rentalId);
  }


}
