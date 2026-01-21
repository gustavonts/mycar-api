import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { User } from 'src/user/entities/user.entity';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService {
  private readonly logger = new Logger(CarService.name)

  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>
  ) {}

  async findOne(carData: Partial<Car>) {
    const car = await this.carRepository.findOne({
      where: { id: carData.id },
      relations: ['user']
    })

    return car
  }

  async findOneOrFail(carData: Partial<Car>) {
    const car = await this.findOne(carData)
    if (!car) {
      throw new NotFoundException('Anúncio não encontrado')
    }

    return car
  }

  async findOneOwned(carData: Partial<Car>, user: User) {
    const car = await this.carRepository.findOne({
      where: {
        id: carData.id,
        user: { id: user.id },
      },
      relations: ['user'],
    });

    if (!car) {
      throw new NotFoundException('Anúncio não encontrado');
    }

    return car;
  }

  async findOneOwnedOrFail(carData: Partial<Car>, user: User) {
    const car = await this.findOneOwned(carData, user)
    if (!car) {
      throw new NotFoundException('Anúncio não encontrado')
    }

    return car
  }

  async findAllOwned(user: User) {
    const cars = await this.carRepository.find({
      where: {
        user: {id: user.id}
      },
      order: {
        createdAt: 'DESC'
      },
      relations: ['user']
    })

    return cars
  }

  async findAllAdmin() {

    const cars = await this.carRepository.find({
      order: {
        createdAt: 'DESC'
      },
      relations: ['user']
    })

    return cars
  }

  async findAll(carData: Partial<Car>) {
    const { images, ...filters } = carData

    const cars = await this.carRepository.find({
      where: filters,
      order: {
        createdAt: 'DESC'
      },
      relations: ['user']
    })

    return cars
  }

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

    await this.carRepository.save(car).catch((err: unknown) => {
      if(err instanceof Error) {
        this.logger.error('Erro ao criar Anúncio', err.stack)
      }
      throw new BadRequestException('Erro ao criar o anúncio')
    })

    const created = await this.carRepository.findOne({
      where: { id: car.id },
      relations: ['user'],
    });

    return created
  }

  async update(carData: Partial<Car>, dto: UpdateCarDto, user: User) {
    if(Object.length === 0) {
      throw new BadRequestException('Dados não enviados')
    }

    const car = await this.findOneOwnedOrFail(carData, user)

    car.fipeCode = dto.fipeCode ?? car.fipeCode
    car.brand = dto.brand ?? car.brand
    car.model = dto.model ?? car.model
    car.version = dto.version ?? car.version
    car.year = dto.year ?? car.year
    car.plate = dto.plate ?? car.plate
    car.fuel = dto.fuel ?? car.fuel
    car.price = dto.price ?? car.price
    car.mileage = dto.mileage ?? car.mileage
    car.color = dto.color ?? car.color
    car.description = dto.description ?? car.description
    car.images = dto.images ?? car.images
    car.active = dto.active ?? car.active

    return this.carRepository.save(car)
  }

  async remove(carData: Partial<Car>, user: User) {
    const car = await this.carRepository.findOne({
      where: { id: carData.id },
      relations: ['user']
    });

    if (!car) {
      throw new NotFoundException('Carro não encontrado para este usuário');
    }

    await this.carRepository.remove(car);
    return car;
  }
}
