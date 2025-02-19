import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { UserDto } from 'src/modules/auth/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async register(data: RegisterDto): Promise<UserDto> {
        console.log(data);
        const savedData = await this.userRepository.save(data);
        return plainToInstance(UserDto, savedData, {
            excludeExtraneousValues: true,
        });
    }
}
