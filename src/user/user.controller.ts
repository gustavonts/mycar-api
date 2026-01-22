import { Get, Controller, Post, Body, UseGuards, Req, Patch, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-request';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async findOne(@Req() req: AuthenticatedRequest) {
        const user = await this.userService.findOneByIdOrFail({id: req.user.id})
        return new UserResponseDto(user)
    }

    @Get(':email')
        async findOnePublic(@Param('email') id: string) {
        const car = await this.userService.findOneByEmailOrFail({id})
        if (!car) {
            throw new Error('Erro ao buscar o anúncio.');
        }
        return new UserResponseDto(car);
    }

    @UseGuards(JwtAuthGuard)
    @Get('all/users')
    async findAllAdmin(@Req() req: AuthenticatedRequest) {
        const users = await this.userService.findAllAdmin()
        if (!users) {
              throw new Error('Erro ao buscar o usuários.');
            }
        return users.map(car => new UserResponseDto(car))
    }
            

    @Post()
    async create(@Body() dto: CreateUserDto) {
        const user = await this.userService.create(dto)
        return new UserResponseDto(user)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('me')
    async update(@Req() req: AuthenticatedRequest, @Body() dto: UpdateUserDto) {
        const user = await this.userService.update(req.user.id, dto)
        return new UserResponseDto(user)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('me/password')
    async updatePassword(@Req() req: AuthenticatedRequest, @Body() dto: UpdatePasswordDto) {
        const user = await this.userService.updatePassword(req.user.id, dto)
        return new UserResponseDto(user)
    }

    // @UseGuards(JwtAuthGuard)
    // @Delete('me')
    // async remove(@Req() req: AuthenticatedRequest) {
    //     const user = await this.userService.remove(req.user.id)
    //     return new UserResponseDto(user)
    // }
}
