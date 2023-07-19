import { DriversStatus } from "src/infrastructure/entities/driver.entity";

export class DriverM {
    id: number;
    userId: number;
    assetId: number;
    deviceId: number;
    licenseNumber: string;
    status: DriversStatus;
}