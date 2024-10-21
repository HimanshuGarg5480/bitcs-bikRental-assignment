import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @Column({ default: true })
  available: boolean;

  @Column({ type: 'decimal' })
  pricePerHour: number;

  @Column()
  location: string;
}
