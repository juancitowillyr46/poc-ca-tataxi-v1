import { TaxiRequestStatus } from "src/domain/enums/taxi-request-status.enum";
import { ILogger } from "src/domain/logger/logger.interface";
import { TaxiRequestModel } from "src/domain/model/requests/taxi-requests.model";
import { TaxiRequestRepository } from "src/domain/repositories/taxi-request-repository.interface";
import { ExceptionsService } from "src/infrastructure/exceptions/exceptions.service";

export class postUpdateStatusTaxiRequestUseCase {

    constructor(
        private readonly logger: ILogger,
        private readonly taxiRequestRepo: TaxiRequestRepository,
        private readonly exceptionService: ExceptionsService
    ) {}

    async execute(taxiRequestId: number, taxiRequestStatus: TaxiRequestStatus): Promise<boolean>  {
        
        const result = await this.taxiRequestRepo.updateStatus(taxiRequestId, taxiRequestStatus);
        return result;

    }

}