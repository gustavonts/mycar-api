import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsBoolean, IsOptional } from "class-validator";

export class UpdateUserDto extends PartialType(
   OmitType(CreateUserDto, ['password'])
) {
  @IsOptional()
  @IsBoolean({ message: 'O campo ativo deve ser verdadeiro ou falso.' })
  active?: boolean;
}