import { Car } from '../entities/car.entity';

export class CarResponseDto {
  readonly id: string;
  readonly fipeCode: string;
  readonly brand: string;
  readonly model: string;
  readonly version?: string;
  readonly year: number;
  readonly plate?: string;
  readonly fuel: string;
  readonly price: number;
  readonly mileage: number;
  readonly color?: string;
  readonly description?: string;
  readonly images?: string[];
  readonly active: boolean;
  readonly user?: {
    id: string
    name: string
    email: string
  };
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(car: Car) {
    this.id = car.id;
    this.fipeCode = car.fipeCode;
    this.brand = car.brand;
    this.model = car.model;
    this.version = car.version;
    this.year = car.year;
    this.plate = car.plate;
    this.fuel = car.fuel;
    this.price = car.price;
    this.mileage = car.mileage;
    this.color = car.color;
    this.description = car.description;
    this.images = car.images;
    this.active = car.active;
    if (car.user) {
      this.user = {
        id: car.user.id,
        name: car.user.name,
        email: car.user.email
      }
    } else {
      this.user = undefined;
    }
    this.createdAt = car.createdAt;
    this.updatedAt = car.updatedAt;
  }
}
