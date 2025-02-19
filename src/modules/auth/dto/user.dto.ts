import { Expose } from 'class-transformer';
import { BaseDto } from 'src/base/base.dto';

export class UserDto extends BaseDto {
    @Expose()
    username: string;

    @Expose()
    email: string;
}
