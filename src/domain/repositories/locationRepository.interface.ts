import { DriverSearchResultModel } from "../model/drivers/driver-search-result.model";

export interface LocationRepository {
    getDriverLocations(latitude: number, longitude: number, radius: number): Promise<DriverSearchResultModel[]>;
}