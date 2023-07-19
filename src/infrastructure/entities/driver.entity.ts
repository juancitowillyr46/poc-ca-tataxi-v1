import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { AuditableEntity } from "./auditable.entity";
import { Status } from "./user.entity";

export enum DriversStatus {
    AVAILABLE  = 'AVAILABLE',
    NOT_AVAILABLE  = 'NOT_AVAILABLE'
}

@Entity({ name: 'drivers' })
export class Driver  extends AuditableEntity {

  @Column('int', {name: 'user_id'})
  userId: number;

  @Column('varchar', { name: 'license_number', length: 25 } )
  licenseNumber: string;

  @Column('int', { name: 'asset_id' } )
  assetId: number;

  @Column('int', { name: 'device_id' } )
  deviceId: number;

  @Column({enum: DriversStatus, default: DriversStatus.AVAILABLE, name: 'status'})
  status: DriversStatus;

}