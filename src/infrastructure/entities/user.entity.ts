import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { AuditableEntity } from './auditable.entity';
import { Profile } from './profile.entity';
import { Roles } from 'src/domain/enums/roles.enum';

export enum Status {
  AVAILABLE  = 'AVAILABLE',
  NOT_AVAILABLE  = 'NOT_AVAILABLE'
}

@Entity({ name: 'users' })
export class User  extends AuditableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column('varchar', { length: 50 } )
  username: string;

  @Column('varchar', { length: 250 })
  password: string;

  // Login
  @Column({ name: 'last_login', nullable: true })
  lastLogin?: Date;

  @Column('boolean', {name: 'confirmed_email', default: false})
  confirmedEmail: boolean;

  @Column('boolean', {name: 'change_password', default: false})
  changePassword: boolean;

  @Column('varchar', { name:'hash_refresh_token', nullable: true, length: 250 })
  hashRefreshToken: string;

  // Roles
  @Column({enum: Roles, default: Roles.CUSTOMER, name: 'role'})
  role: number;

  @Column({enum: Status, default: Status.AVAILABLE, name: 'status'})
  status: Status;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  // @JoinColumn()
  // @Column('int', {name: 'profile_id'})
  profile: Profile;
}
