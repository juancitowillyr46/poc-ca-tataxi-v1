import { TaxiRequestStatus } from "src/domain/enums/taxi-request-status.enum";
import { Coordinate } from "src/domain/types/coordinate.type";
import { TaxiRequestEntity } from "src/infrastructure/entities/taxi-request.entity";

export class TaxiRequestModel {
    clientId: number;
    driverId: number;
    pickupPointCoordinate: string;
    pickupTime: Date;
    destinationCoordinate: string;
    destinationTime: Date;
    status: TaxiRequestStatus;
}