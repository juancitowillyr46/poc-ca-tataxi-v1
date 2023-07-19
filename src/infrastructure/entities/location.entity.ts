import { Column, Entity } from "typeorm";
import { AuditableEntity } from "./auditable.entity";

@Entity({ name: 'locations' })
export class LocationEntity extends AuditableEntity {

    @Column('int', {name: 'driver_id'})
    driverId: number;

    @Column({ name: 'coordinate', type: 'point', spatialFeatureType: 'Point', nullable: false })
    coordinate: string;
}