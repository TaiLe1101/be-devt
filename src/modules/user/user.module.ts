import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from '../../entities/user.entity';
import { UserService } from './user.service';
import { JwtStrategyPassport } from 'src/passports/jwt-strategy.passport';

@Module({
    controllers: [UserController],
    providers: [UserService, JwtStrategyPassport],
    imports: [TypeOrmModule.forFeature([User])],
    exports: [UserService],
})
export class UserModule {}
