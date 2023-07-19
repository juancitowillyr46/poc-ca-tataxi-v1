import { DriversStatus } from "src/infrastructure/entities/driver.entity";
import { TaxiRequestModel } from "../model/requests/taxi-requests.model";
import { TaxiRequestStatus } from "../enums/taxi-request-status.enum";

export interface TaxiRequestRepository {
    create(request: TaxiRequestModel): Promise<TaxiRequestModel>;
    updateStatus(taxiRequestId: number, taxiRequestStatus: TaxiRequestStatus): Promise<boolean>;
    getById(id: number): Promise<TaxiRequestModel>;
}