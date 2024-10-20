import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  Manager = 'manager',
  Customer = 'customer',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: Role.Customer })
  role: Role; // 'admin' or 'customer'
}
