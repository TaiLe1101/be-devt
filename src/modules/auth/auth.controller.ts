import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() reqBody: RegisterDto) {
        return this.authService.register(reqBody);
    }
}
