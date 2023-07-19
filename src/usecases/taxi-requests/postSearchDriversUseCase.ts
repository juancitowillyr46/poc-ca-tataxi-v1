import { ILogger } from "src/domain/logger/logger.interface";
import { DriverSearchResultModel } from "src/domain/model/drivers/driver-search-result.model";
import { LocationRepository } from "src/domain/repositories/locationRepository.interface";
import { DriverSearchDto } from "src/infrastructure/controllers/taxi-requests/driver-seach/driver-search.dto";

import { ExceptionsService } from "src/infrastructure/exceptions/exceptions.service";

export class postSearchDriversUseCase {

    constructor(
        private readonly logger: ILogger,
        private readonly locationRepository: LocationRepository,
        private readonly exceptionService: ExceptionsService
    ) {}

    async execute(driverSearchDto: DriverSearchDto): Promise<DriverSearchResultModel[]>  {

        const drivers = await this.locationRepository.getDriverLocations(driverSearchDto.latitud, driverSearchDto.longitud, driverSearchDto.radio);

        return drivers;
    }
}