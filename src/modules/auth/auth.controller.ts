import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Req,
    Res,
    UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { UserService } from 'src/modules/user/user.service';
import { ApiResponse } from 'src/classes/api-response.class';
import { Request, Response } from 'express';
import { TokenService } from 'src/modules/token/token.service';
import { JwtPayload } from 'src/classes/jwt-payload.class';
import { REFRESH_TOKEN_EXPIRY } from 'src/constants';
import { ApiErrorException } from 'src/exceptions/api-error.exception';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
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
    async login(
        @Body() reqBody: LoginDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const data = User.from(reqBody);
        const result = await this.authService.login(data);

        if (!result) {
            throw new ApiErrorException(
                'Invalid username or password',
                HttpStatus.UNAUTHORIZED,
            );
        }

        // Set refresh token in HTTP-only cookie
        res.cookie('refresh_token', result.refreshToken, {
            httpOnly: true,
            secure: true, // for HTTPS
            sameSite: 'strict',
            maxAge: REFRESH_TOKEN_EXPIRY, // 7 days
        });

        return new ApiResponse(HttpStatus.OK, 'Login successful', {
            accessToken: result.accessToken,
        });
    }

    @Post('refresh')
    async refreshToken(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ) {
        const refreshToken = request.cookies['refresh_token'] as string;

        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token not found');
        }

        const decoded = this.tokenService.verifyToken(
            refreshToken,
        ) as JwtPayload;
        const user = await this.userService.findById(decoded.sub);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        if (user?.refreshToken !== refreshToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const [newAccessToken, newRefreshToken] =
            this.tokenService.generateToken({
                payload: { sub: user.id },
            });

        // Set new refresh token in cookie
        response.cookie('refresh_token', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: REFRESH_TOKEN_EXPIRY,
        });

        // Return only new access token in body
        return new ApiResponse(HttpStatus.OK, 'Login successful', {
            accessToken: newAccessToken,
        });
    }
}
