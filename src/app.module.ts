import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { User } from './entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '123456',
            database: 'devt',
            entities: [User],
            synchronize: true,
        }),
        UserModule,
        AuthModule,
    ],
})
export class AppModule {}
