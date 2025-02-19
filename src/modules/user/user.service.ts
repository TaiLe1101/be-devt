import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/entities/user.entity';
import { UserDto } from 'src/modules/auth/dto/user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(data: User): Promise<UserDto> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
        const saved = await this.userRepository.save(data);
        return plainToInstance(UserDto, saved);
    }
}
