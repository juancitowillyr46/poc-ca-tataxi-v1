import { DriversStatus } from "src/infrastructure/entities/driver.entity";

export interface LocationEntityQueryBuilder {
    driverId: number;
    driverName: string;
    coordinate: string;
    status: DriversStatus;
    firstName: string;
    lastName: string;
    email: string;
    brand:string;
    model:string;
    phoneNumber: string;
}