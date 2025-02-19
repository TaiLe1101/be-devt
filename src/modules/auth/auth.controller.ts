import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { AuthService } from 'src/modules/auth/auth.service';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { VerifyUserDto } from 'src/modules/auth/dto/verify-user.dto';
import { UserService } from 'src/modules/user/user.service';
import { ApiResponse } from 'src/utils/api.response';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Post('register')
    async register(@Body() reqBody: RegisterDto) {
        const data = User.from(reqBody);
        const result = await this.userService.create(data);

        return new ApiResponse(
            HttpStatus.OK,
            'User registered successfully',
            result,
        );
    }

    @Post('login')
    async login(@Body() reqBody: VerifyUserDto) {
        const data = User.from(reqBody);
        const result = await this.authService.verifyUser(data);

        if (!result) {
            return new ApiResponse(
                HttpStatus.UNAUTHORIZED,
                'Invalid username or password',
            );
        }

        return new ApiResponse(HttpStatus.OK, 'Login successful', result);
    }
}
