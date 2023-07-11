import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { AuditableEntity } from "./auditable.entity";

@Entity({ name: 'profiles' })
export class Profile extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'first_name', nullable: true, length: 150 })
    firstName: string;

    @Column({ name: 'last_name', nullable: true, length: 150 })
    lastName: string;

    @Column({ name: 'phone_number', nullable: true, length: 20 })
    phoneNumber: string;

    @Column({ name: 'email', nullable: true, length: 50 })
    email: string;

    @Column({ name: 'photo', nullable: true, type: 'longtext' })
    photo: string;

    @OneToOne(() => User, (user) => user.profile)
    user: User;

    @Column('int', {name: 'user_id'})
    userId: number;
}