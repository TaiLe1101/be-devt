import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/classes/jwt-payload.class';
import { ApiErrorException } from 'src/exceptions/api-error.exception';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtStrategyPassport extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:
                '4ae40c6ad0ddd609992795221c5ba2f633ea730ce14b53d48bb8c4d5c515fe30',
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.userService.findById(payload.sub);

        if (!user) {
            throw new ApiErrorException(
                'Unauthorized',
                HttpStatus.UNAUTHORIZED,
            );
        }
        return user;
    }
}
