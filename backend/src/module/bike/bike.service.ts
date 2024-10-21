import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bike } from './bike.entity';

@Injectable()
export class BikeService {
  constructor(
    @InjectRepository(Bike)
    private bikeRepository: Repository<Bike>,
  ) {}

  // Define service methods here
  // Fetch all bikes or filter by availability
  async getBikes(available?: boolean): Promise<Bike[]> {
    if (available === undefined) {
      return this.bikeRepository.find();
    }
    return this.bikeRepository.find({ where: { available } });
  }

  async getBikeById(id: number): Promise<Bike> {
    const bike = await this.bikeRepository.findOne({ where: { id } });
    if (!bike) {
      throw new NotFoundException(`Bike with ID ${id} not found`);
    }
    return bike;
  }

  async createBike(
    model: string,
    pricePerHour: number,
    location: string,
  ): Promise<Bike> {
    const newBike = this.bikeRepository.create({
      model,
      pricePerHour,
      location,
      available: true,
    });
    return this.bikeRepository.save(newBike);
  }

  async updateBike(
    id: number,
    model?: string,
    pricePerHour?: number,
    location?: string,
  ): Promise<Bike> {
    const bike = await this.getBikeById(id);
    if (model) {
      bike.model = model;
    }
    if (pricePerHour) {
      bike.pricePerHour = pricePerHour;
    }
    if (location) {
      bike.location = location;
    }
    return this.bikeRepository.save(bike);
  }
  // Update the availability status of a bike
  async updateBikeAvailability(id: number, available: boolean): Promise<Bike> {
    const bike = await this.getBikeById(id);
    bike.available = available;
    return this.bikeRepository.save(bike);
  }

  // Delete a bike
  async deleteBike(id: number): Promise<void> {
    const result = await this.bikeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Bike with ID ${id} not found`);
    }
  }
}
