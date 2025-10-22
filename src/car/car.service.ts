import { Injectable } from '@nestjs/common';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>
  ) {}

  async create(dto: CreateCarDto, user: User) {
    const car = this. carRepository.create({
      fipeCode: dto.fipeCode,
      brand: dto.brand,
      model: dto.model,
      version: dto.version,
      year: dto.year,
      plate: dto.plate,
      fuel: dto.fuel,
      price: dto.price,
      mileage: dto.mileage,
      color: dto.color,
      description: dto.description,
      images: dto.images,
      active: dto.active,
      user
    })

    const created = await this.carRepository.save(car)

    return created
  }
}
