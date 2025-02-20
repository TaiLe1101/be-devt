import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/modules/token/token.service';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { UserService } from 'src/modules/user/user.service';
import { User } from '../../entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
    ) {}

    async verifyUser(reqBody: User): Promise<UserDto | null> {
        const user = await this.userService.findByUsername(reqBody.username);
        if (!user) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(
            reqBody.password,
            user.password,
        );

        if (!isPasswordValid) {
            return null;
        }

        return UserDto.from(user);
    }

    async login(
        reqBody: User,
    ): Promise<{ accessToken: string; refreshToken: string } | null> {
        const user = await this.verifyUser(reqBody);

        if (!user) {
            return null;
        }

        const [accessToken, refreshToken] = this.tokenService.generateToken({
            payload: { sub: user.id },
        });

        await this.userService.updateRefreshToken(user.id, refreshToken);

        return { accessToken, refreshToken };
    }
}
