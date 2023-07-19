import { DriverM } from "src/domain/model/drivers/driver";
import { DriverRepository } from "src/domain/repositories/driverRepository.interface";
import { Driver, DriversStatus } from "../entities/driver.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

export class MySQLDriverRepository implements DriverRepository {

    constructor(
        @InjectRepository(Driver)
        private readonly driverEntityRepository: Repository<Driver>,
      ) {}

    async updateStatus(driverId: number, driversStatus: DriversStatus): Promise<Boolean> {
        const result = await this.driverEntityRepository.update({
            id: driverId,
        }, {
            status: driversStatus
        });
        return (result.affected > 0);
    }

    async createDriver(driver: DriverM): Promise<DriverM> {
        const driverEntity = this.toDriverEntity(driver);
        const result = await this.driverEntityRepository.insert(driverEntity);
        return this.toDriver(result.generatedMaps[0] as Driver);
    }
    
    private toDriver(driverEntity: Driver): DriverM {
        const driver: DriverM = new DriverM();
        driver.userId = driverEntity.userId;
        driver.assetId = driverEntity.assetId;
        driver.deviceId = driverEntity.deviceId;
        driver.status = driverEntity.status;
        return driver;
    }

    private toDriverEntity(driver: DriverM): Driver {
        const driverEntity = new Driver();
        driverEntity.userId = driver.userId;
        driverEntity.assetId = driver.assetId;
        driverEntity.deviceId = driver.deviceId;
        driverEntity.status = driver.status;
        return driverEntity;
    }

}