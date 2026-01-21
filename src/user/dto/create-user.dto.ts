import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength,  } from "class-validator"

export class CreateUserDto {
    @IsString({message: 'Nome precisa ser uma String'})
    @IsNotEmpty({message: 'Nome não pode estar vazio'})
    name: string

    @IsEmail({}, {message: 'E-mail inválido'})
    email: string

    @IsOptional()
    @IsBoolean({ message: 'O campo ativo deve ser verdadeiro ou falso.' })
    active?: boolean;

    @IsString({message: 'Senha precisa ser uma String'})
    @IsNotEmpty({message: 'Senha não pode estar vazia'})
    @MinLength(6, {message: 'Senha deve ter um mínimo de 6 caracteres'})
    password: string
}
