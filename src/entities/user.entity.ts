import { BaseEntity } from '../base/base.entity';
import { Column, Entity } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
    @Expose()
    @Column()
    username: string;

    @Expose()
    @Column({ default: null })
    email: string;

    @Column()
    password: string;

    @Expose()
    @Column({ default: null })
    avatar: string;
}
