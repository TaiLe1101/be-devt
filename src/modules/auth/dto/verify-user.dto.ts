import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
