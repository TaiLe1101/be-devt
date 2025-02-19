import { Body, Controller, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UserService } from 'src/modules/user/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    async create(@Body() reqBody: CreateUserDto) {
        const data = plainToInstance(User, reqBody);
        return await this.userService.create(data);
    }
}
