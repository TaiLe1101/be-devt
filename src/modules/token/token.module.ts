import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TokenService } from './token.service';

@Module({
    providers: [TokenService],
    exports: [TokenService],
    imports: [
        PassportModule,
        JwtModule.register({
            secret: '4ae40c6ad0ddd609992795221c5ba2f633ea730ce14b53d48bb8c4d5c515fe30',
            signOptions: { expiresIn: '1h' },
        }),
    ],
})
export class TokenModule {}
