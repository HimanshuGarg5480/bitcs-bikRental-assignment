// backend/src/module/rental/rental.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental } from './rental.entity';
import { Bike } from '../bike/bike.entity';
import { User } from '../user/user.entity';
import { CreateRentalDto } from './dtos/createRental.dto';

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental)
    private rentalRepository: Repository<Rental>,
    @InjectRepository(Bike)
    private bikeRepository: Repository<Bike>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Define service methods here
  async createRental(createRentalDto: CreateRentalDto): Promise<Rental> {
    let { userId, bikeId, rentalStartTime, rentalEndTime } = createRentalDto;

    // Ensure rentalStartTime and rentalEndTime are Date objects
    rentalStartTime = new Date(rentalStartTime);
    rentalEndTime = new Date(rentalEndTime);

    const bike = await this.bikeRepository.findOne({ where: { id: bikeId } });
    if (!bike || !bike.available) {
      throw new NotFoundException(
        `Bike with ID ${bikeId} is not available for rental.`,
      );
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    // Calculate the rental cost based on the duration and bike's hourly rate
    const totalCost = this.calculateCost(
      rentalStartTime,
      rentalEndTime,
      bike.pricePerHour,
    );

    // Create the rental record
    const rental = this.rentalRepository.create({
      user,
      bike,
      rentalStartTime,
      rentalEndTime,
      totalCost,
      active: true, // Set the active field to true
    });

    // Mark the bike as unavailable
    bike.available = false;
    await this.bikeRepository.save(bike);

    return this.rentalRepository.save(rental);
  }

  // Calculate rental cost based on the duration (in hours) and the bike's hourly rate
  calculateCost(startTime: Date, endTime: Date, pricePerHour: number): number {
    const durationInMs = endTime.getTime() - startTime.getTime();
    const durationInHours = durationInMs / (1000 * 60 * 60);
    return durationInHours * pricePerHour;
  }

  // Get all rentals for a specific user
  async getRentalsByUserId(userId: number): Promise<Rental[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    return this.rentalRepository.find({ where: { user }, relations: ['bike'] });
  }

  // Get details of a specific rental by rental ID
  async getRentalById(rentalId: number): Promise<Rental> {
    const rental = await this.rentalRepository.findOne({
      where: { id: rentalId },
      relations: ['bike', 'user'],
    });
    if (!rental) {
      throw new NotFoundException(`Rental with ID ${rentalId} not found.`);
    }
    return rental;
  }

  // Return a bike (end a rental and mark the bike as available)
    async returnBike(rentalId: number, returnTime: Date): Promise<Rental> {
      const rental = await this.getRentalById(rentalId);

      if (rental.rentalEndTime < returnTime) {
        rental.rentalEndTime = returnTime;
      }

      // Mark the bike as available
      rental.bike.available = true;
      await this.bikeRepository.save(rental.bike);

      rental.active = false; // Mark the rental as inactive
      return this.rentalRepository.save(rental);
    }

  // Delete a rental (for admin use)
    async deleteRental(rentalId: number): Promise<void> {
      const result = await this.rentalRepository.delete(rentalId);
      if (result.affected === 0) {
        throw new NotFoundException(`Rental with ID ${rentalId} not found.`);
      }
    }
}
