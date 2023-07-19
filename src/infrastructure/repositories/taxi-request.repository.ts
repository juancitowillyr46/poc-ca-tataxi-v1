import { TaxiRequestModel } from "src/domain/model/requests/taxi-requests.model";
import { TaxiRequestRepository } from "src/domain/repositories/taxi-request-repository.interface";
import { TaxiRequestEntity } from "../entities/taxi-request.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TaxiRequestStatus } from "src/domain/enums/taxi-request-status.enum";

export class DatabaseTaxiRequestRepository implements TaxiRequestRepository {

    constructor(
        @InjectRepository(TaxiRequestEntity)
        private readonly taxiRequestRepo: Repository<TaxiRequestEntity>,
    ) {}

    async getById(id: number): Promise<TaxiRequestModel> {
        const result = await this.taxiRequestRepo.findOneByOrFail({
            id: id
        });

        return this.toTaxiRequestM(result);
    }

    async updateStatus(taxiRequestId: number, taxiRequestStatus: TaxiRequestStatus): Promise<boolean> {
        
        const result = await this.taxiRequestRepo.update({
            id: taxiRequestId,
        }, {
            status: taxiRequestStatus,
            updatedAt: new Date(),
            updatedBy: 1
        });
        
        return (result.affected > 0);

    }

    async create(request: TaxiRequestModel): Promise<TaxiRequestModel> {
        const taxiEntity = this.toTaxiEntity(request);
        const result = await this.taxiRequestRepo.insert(taxiEntity);
        return this.toTaxiRequestM(result.generatedMaps[0] as TaxiRequestEntity);
    }

    private toTaxiRequestM(taxiRequestEntity: TaxiRequestEntity): TaxiRequestModel {
        const taxiRequest: TaxiRequestModel = new TaxiRequestModel();
        taxiRequest.driverId = taxiRequestEntity.driverId;
        return taxiRequest;
    }

    private toTaxiEntity(taxiRequestModel: TaxiRequestModel): TaxiRequestEntity {
        const taxiRequestEntity = new TaxiRequestEntity();
        taxiRequestEntity.clientId = taxiRequestModel.clientId;
        taxiRequestEntity.driverId = taxiRequestModel.driverId;
        taxiRequestEntity.destinationTime = taxiRequestModel.destinationTime;
        taxiRequestEntity.pickupTime = taxiRequestModel.pickupTime;
        taxiRequestEntity.pickupPointCoordinate = taxiRequestModel.pickupPointCoordinate;
        taxiRequestEntity.destinationCoordinate = taxiRequestModel.destinationCoordinate;
        return taxiRequestEntity;
    }
}