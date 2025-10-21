import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';
import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateCarDto extends PartialType(
  PickType(CreateCarDto, [
    'fipeCode',
    'brand',
    'model',
    'version',
    'year',
    'plate',
    'fuel',
    'price',
    'mileage',
    'color',
    'description',
    'images',
  ]),
) {
  @IsOptional()
  @IsBoolean({ message: 'O campo ativo deve ser verdadeiro ou falso.' })
  active?: boolean;
}
