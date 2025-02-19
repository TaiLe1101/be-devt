import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UserModule } from 'src/modules/user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), UserModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
