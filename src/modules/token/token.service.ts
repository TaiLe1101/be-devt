import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateToken } from 'src/modules/token/dto/create-token.dto';

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) {}

    generateToken<T>(data: CreateToken<T>): string[] {
        const accessToken = this.jwtService.sign(data.payload || {}, {
            ...data.options,
        });
        const refreshToken = this.jwtService.sign(data.payload || {}, {
            ...data.options,
            expiresIn: '7d',
        });

        return [accessToken, refreshToken];
    }

    verifyToken(token: string): any {
        return this.jwtService.verify(token);
    }
}
