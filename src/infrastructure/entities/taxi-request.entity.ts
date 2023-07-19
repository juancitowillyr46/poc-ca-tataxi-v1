import { TaxiRequestStatus } from "src/domain/enums/taxi-request-status.enum";
import { AuditableEntity } from "./auditable.entity";
import { Column, Entity } from "typeorm";


@Entity({ name: 'taxi_requests' })
export class TaxiRequestEntity extends AuditableEntity {

    @Column('int', {name: 'client_id', nullable: false})
    clientId: number;

    @Column('int', {name: 'driver_id', nullable: false})
    driverId: number;

    @Column({ name: 'pickup_point_coordinate', type: 'point', spatialFeatureType: 'Point', nullable: false })
    pickupPointCoordinate: string;

    @Column('datetime', {name: 'pickup_time', nullable: false})
    pickupTime: Date;

    @Column({ name: 'destination_coordinate', type: 'point', spatialFeatureType: 'Point', nullable: false })
    destinationCoordinate: string;

    @Column('datetime', {name: 'destination_time'})
    destinationTime: Date;

    @Column('enum', {name: 'status', default: TaxiRequestStatus.CPENDING, enum: TaxiRequestStatus})
    status: TaxiRequestStatus;
}