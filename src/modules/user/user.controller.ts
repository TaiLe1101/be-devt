import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UserService } from 'src/modules/user/user.service';
import { ApiResponse } from 'src/utils/api.response';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async index() {
        const users = await this.userService.index();
        return new ApiResponse(
            HttpStatus.OK,
            'Users retrieved successfully',
            users,
        );
    }

    @Post('create')
    async create(@Body() reqBody: CreateUserDto) {
        const data = User.from(reqBody);

        const saved = await this.userService.create(data);
        return new ApiResponse(
            HttpStatus.CREATED,
            'User created successfully',
            saved,
        );
    }
}
