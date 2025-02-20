import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiResponse } from 'src/classes/api-response.class';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UserService } from 'src/modules/user/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
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
