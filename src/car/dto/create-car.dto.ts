import {
    IsString,
    IsNumber,
    IsOptional,
    IsBoolean,
    IsArray,
    IsPositive,
    Matches,
    IsNotEmpty,
    IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';

export class CreateCarDto {
    @IsString({ message: 'O código Fipe deve ser uma string.' })
    @IsNotEmpty({ message: 'O código Fipe é obrigatório.' })
    fipeCode: string;

    @IsString({ message: 'A marca deve ser uma string.' })
    @IsNotEmpty({ message: 'A marca é obrigatória.' })
    brand: string;

    @IsString({ message: 'O modelo deve ser uma string.' })
    @IsNotEmpty({ message: 'O modelo é obrigatório.' })
    model: string;

    @IsOptional()
    @IsString({ message: 'A versão deve ser uma string.' })
    version?: string;

    @Type(() => Number)
    @IsNumber({}, { message: 'O ano deve ser um número.' })
    @IsNotEmpty({ message: 'O ano é obrigatório.' })
    year: number;

    @IsOptional()
    @IsString({ message: 'A placa deve ser uma string.' })
    @Matches(/^[A-Z]{3}\d[A-Z0-9]\d{2}$/, {
    message: 'A placa deve estar no formato ABC1D23 ou ABC1234.',
    })
    plate?: string;

    @IsString({ message: 'O combustível deve ser uma string.' })
    @IsNotEmpty({ message: 'O combustível é obrigatório.' })
    fuel: string;

    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O preço deve ser um número válido.' })
    @IsPositive({ message: 'O preço deve ser um valor positivo.' })
    @IsNotEmpty({ message: 'O preço é obrigatório.' })
    price: number;

    @Type(() => Number)
    @IsNumber({}, { message: 'A quilometragem deve ser um número.' })
    @IsPositive({ message: 'A quilometragem deve ser um valor positivo.' })
    @IsNotEmpty({ message: 'A quilometragem é obrigatória.' })
    mileage: number;

    @IsOptional()
    @IsString({ message: 'A cor deve ser uma string.' })
    color?: string;

    @IsOptional()
    @IsString({ message: 'A descrição deve ser uma string.' })
    description?: string;

    @IsOptional()
    @IsUrl({ require_tld: false }, { each: true, message: 'Cada item do images deve ser uma URL válida.' })
    images?: string[];

    @IsOptional()
    @IsBoolean({ message: 'O campo ativo deve ser verdadeiro ou falso.' })
    active?: boolean;
}
