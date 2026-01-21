import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CarService } from './car.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-request';
import { CreateCarDto } from './dto/create-car.dto';
import { CarResponseDto } from './dto/car-response.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @UseGuards(JwtAuthGuard)
  @Post('me')
  async create(@Req() req: AuthenticatedRequest, @Body() dto: CreateCarDto) {
    const car = await this.carService.create(dto, req.user)
    if (!car) {
      throw new Error('Erro ao criar o anúncio.');
    }
    return new CarResponseDto(car);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/:id')
  async findOneOwned(@Req() req: AuthenticatedRequest, @Param('id', ParseUUIDPipe) id: string) {
    const car = await this.carService.findOneOwnedOrFail({id}, req.user)
    if (!car) {
      throw new Error('Erro ao buscar o anúncio.');
    }
    return new CarResponseDto(car);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findAllOwned(@Req() req: AuthenticatedRequest) {
    const cars = await this.carService.findAllOwned(req.user)
    if (!cars) {
      throw new Error('Erro ao buscar o anúncios.');
    }
    return cars.map(car => new CarResponseDto(car))
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/:id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Req() req: AuthenticatedRequest, @Body() dto: UpdateCarDto) {
    const car = await this.carService.update({id}, dto, req.user)
    if (!car) {
      throw new Error('Erro ao criar o anúncio.');
    }
    return new CarResponseDto(car);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me/:id')
  async remove(@Param('id', ParseUUIDPipe) id: string, @Req() req: AuthenticatedRequest) {
      const car = await this.carService.remove({id}, req.user)
      return new CarResponseDto(car)
  }

  @Get(':id')
  async findOnePublic(@Param('id', ParseUUIDPipe) id: string) {
    const car = await this.carService.findOneOrFail({id})
    if (!car) {
      throw new Error('Erro ao buscar o anúncio.');
    }
    return new CarResponseDto(car);
  }

  @Get('admin/all')
  async findAllAdmin() {
    const cars = await this.carService.findAllAdmin()
    if (!cars) {
      throw new Error('Erro ao buscar o anúncios.');
    }
    return cars.map(car => new CarResponseDto(car))
  }

  @Get('')
  async findAllPublic() {
    const cars = await this.carService.findAll({active: true})
    if (!cars) {
      throw new Error('Erro ao buscar o anúncios.');
    }
    return cars.map(car => new CarResponseDto(car))
  }
}
