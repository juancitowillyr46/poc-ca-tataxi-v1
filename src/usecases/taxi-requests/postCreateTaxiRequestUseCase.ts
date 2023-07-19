import { ILogger } from "src/domain/logger/logger.interface";
import { TaxiRequestModel } from "src/domain/model/requests/taxi-requests.model";
import { TaxiRequestRepository } from "src/domain/repositories/taxi-request-repository.interface";
import { TaxiRequestDto } from "src/infrastructure/controllers/taxi-requests/taxi-request.dto";
import { DriversStatus } from "src/infrastructure/entities/driver.entity";
import { ExceptionsService } from "src/infrastructure/exceptions/exceptions.service";
import { MySQLDriverRepository } from "src/infrastructure/repositories/driver.repository";

export class postCreateTaxiRequestUseCase {

    constructor(
        private readonly logger: ILogger,
        private readonly taxiRequestRepo: TaxiRequestRepository,
        private readonly driverRepo: MySQLDriverRepository,
        private readonly exceptionService: ExceptionsService
    ) {}

    async execute(taxiRequestDto: TaxiRequestDto): Promise<TaxiRequestModel>  {
        
        let taxiRequestModel = new TaxiRequestModel();
        taxiRequestModel.clientId = taxiRequestDto.clientId;
        taxiRequestModel.driverId = taxiRequestDto.driverId;
        taxiRequestModel.destinationTime = taxiRequestDto.destinationTime;
        taxiRequestModel.pickupTime = taxiRequestDto.pickupTime;
        taxiRequestModel.pickupPointCoordinate = 'POINT('+  taxiRequestDto.pickupPointCoordinate.latitude +' '+ taxiRequestDto.pickupPointCoordinate.longitude +')';
        taxiRequestModel.destinationCoordinate = 'POINT('+  taxiRequestDto.destinationCoordinate.latitude +' '+ taxiRequestDto.destinationCoordinate.longitude +')';

        const resultCreate = await this.taxiRequestRepo.create(taxiRequestModel);
        const resultUpdateStatus = await this.driverRepo.updateStatus(taxiRequestModel.driverId, DriversStatus.NOT_AVAILABLE);
        
        return resultCreate;
    }
}