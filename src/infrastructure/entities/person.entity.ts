import { Column, Entity } from "typeorm";
import { AuditableEntity } from "./auditable.entity";

@Entity({ name: 'persons' })
export class PersonEntity extends AuditableEntity {

    @Column('varchar', {name: 'first_name'})
    firstName: string;

    @Column('varchar', {name: 'last_name'})
    lastName: string;

    @Column('varchar', {name: 'phone_number'})
    phoneNumber: string;

    @Column('varchar', {name: 'email'})
    email: string;
}