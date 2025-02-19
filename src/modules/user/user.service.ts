import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserDto } from 'src/modules/auth/dto/user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiResponse } from 'src/utils/api.response';
import { ApiErrorException } from 'src/exceptions/api-error.exception';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async index(): Promise<UserDto[]> {
        const users = await this.userRepository.find();
        return users.map((user) => UserDto.from(user));
    }

    async create(data: User): Promise<UserDto> {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword;
            const saved = await this.userRepository.save(data);
            return UserDto.from(saved);
        } catch {
            throw new ApiErrorException();
        }
    }

    async findByUsername(username: string): Promise<User | null> {
        return await this.userRepository.findOneBy({ username });
    }
}
