import { Expose, plainToInstance } from 'class-transformer';

export class BaseDto {
    @Expose()
    id: number;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    static from<T>(this: new (...args: any[]) => T, plain: any): T {
        return plainToInstance(this, plain, {
            excludeExtraneousValues: true,
        });
    }
}
