import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { ApiErrorException } from 'src/exceptions/api-error.exception';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { Repository } from 'typeorm';

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

    async findById(id: number): Promise<User | null> {
        return await this.userRepository.findOneBy({ id });
    }

    async update(id: number, data: User): Promise<UserDto> {
        const user = await this.findById(id);
        if (!user) {
            throw new ApiErrorException();
        }

        try {
            const updated = await this.userRepository.save({
                ...user,
                ...data,
            });
            return UserDto.from(updated);
        } catch {
            throw new ApiErrorException();
        }
    }

    async delete(id: number): Promise<void> {
        const user = await this.findById(id);
        if (!user) {
            throw new ApiErrorException();
        }

        try {
            await this.userRepository.remove(user);
        } catch {
            throw new ApiErrorException();
        }
    }

    async updateRefreshToken(id: number, refreshToken: string): Promise<void> {
        const user = await this.findById(id);
        if (!user) {
            throw new ApiErrorException();
        }

        try {
            await this.userRepository.save({
                ...user,
                refreshToken,
            });
        } catch {
            throw new ApiErrorException();
        }
    }
}
