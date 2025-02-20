import { BaseEntity } from '../base/entity.base';
import { Column, Entity, Unique } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
    @Expose()
    @Column()
    @Unique(['username'])
    username: string;

    @Expose()
    @Column({ default: null })
    email: string;

    @Expose()
    @Column()
    password: string;

    @Expose()
    @Column({ default: null })
    avatar: string;

    @Column({ default: null })
    refreshToken: string;
}
