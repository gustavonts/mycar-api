import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CarService } from './car.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-request';
import { CreateCarDto } from './dto/create-car.dto';
import { CarResponseDto } from './dto/car-response.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @UseGuards(JwtAuthGuard)
  @Post('me')
  async create(@Req() req: AuthenticatedRequest, @Body() dto: CreateCarDto) {
    const car = await this.carService.create(dto, req.user)
    return new CarResponseDto(car)
  }

}
