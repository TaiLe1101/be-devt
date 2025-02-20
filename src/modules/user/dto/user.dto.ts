import { Expose } from 'class-transformer';
import { BaseDto } from 'src/base/dto.base';

export class UserDto extends BaseDto {
    @Expose()
    username: string;

    @Expose()
    email: string;
}
