import { Expose } from 'class-transformer';

export class BaseDto {
    @Expose()
    id: number;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}
