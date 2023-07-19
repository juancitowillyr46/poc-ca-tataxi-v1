import { DriversStatus } from "src/infrastructure/entities/driver.entity";

export class DriverSearchResultModel {
    driverId: number;
    driverName: string;
    coordinate: string;
    latitude: number;
    longitude: number;
    status: DriversStatus;
    firstName: string;
    lastName: string;
    email: string;
    brand:string;
    model:string;
    phoneNumber:string;
}