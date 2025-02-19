import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/modules/auth/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly userService: UserService,
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
}
