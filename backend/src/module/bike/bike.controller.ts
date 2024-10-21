import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BikeService } from './bike.service';
import { Bike } from './bike.entity';
import { JwtAuthGuard } from 'src/guards/jwtAuth.guard';
import { RoleAuthGuard } from 'src/guards/roleAuth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../user/user.entity';

@Controller('bikes')
export class BikeController {
  constructor(private readonly bikeService: BikeService) {}

  // Get all bikes, optionally filter by availability
  @Get()
  async getBikes(@Query('available') available: string): Promise<Bike[]> {
    const isAvailable =
      available === 'true' ? true : available === 'false' ? false : undefined;
    return this.bikeService.getBikes(isAvailable);
  }

  // Get a specific bike by ID
  @Get(':id')
  async getBikeById(@Param('id') id: number): Promise<Bike> {
    return this.bikeService.getBikeById(id);
  }

  // Add a new bike

  @Post()
  @Roles(Role.Manager)
  @UseGuards(JwtAuthGuard,RoleAuthGuard)
  async createBike(
    @Body('model') model: string,
    @Body('pricePerHour') pricePerHour: number,
    @Body('location') location: string,
  ): Promise<Bike> {
    console.log("hello")
    return this.bikeService.createBike(model, pricePerHour, location);
  }

  // Update a bike's details
  @Patch(':id')
  @Roles(Role.Manager)
  @UseGuards(JwtAuthGuard,RoleAuthGuard)
  async updateBike(
    @Param('id') id: number,
    @Body('model') model?: string,
    @Body('pricePerHour') pricePerHour?: number,
    @Body('location') location?: string,
  ): Promise<Bike> {
    return this.bikeService.updateBike(id, model, pricePerHour, location);
  }

  // Update bike availability status
  @Patch(':id/availability')
  @UseGuards(JwtAuthGuard)
  async updateBikeAvailability(
    @Param('id') id: number,
    @Body('available') available: boolean,
  ): Promise<Bike> {
    return this.bikeService.updateBikeAvailability(id, available);
  }

  // Delete a bike
  @Delete(':id')
  @Roles(Role.Manager)
  @UseGuards(JwtAuthGuard,RoleAuthGuard)
  async deleteBike(@Param('id') id: number): Promise<void> {
    return this.bikeService.deleteBike(id);
  }
}
