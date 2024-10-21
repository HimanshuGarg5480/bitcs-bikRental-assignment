// rental.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Bike } from '../bike/bike.entity';
import { User } from '../user/user.entity';

@Entity()
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.rentals)
  user: User;

  @ManyToOne(() => Bike, (bike) => bike)
  bike: Bike;

  @Column()
  rentalStartTime: Date;

  @Column()
  rentalEndTime: Date;

  @Column({ type: 'decimal' })
  totalCost: number;
}
