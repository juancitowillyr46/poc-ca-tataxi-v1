import { DriversStatus } from 'src/infrastructure/entities/driver.entity';
import { DriverM } from '../model/drivers/driver';

export interface DriverRepository {
  createDriver(driver: DriverM): Promise<DriverM>;
  updateStatus(driverId: number, status: DriversStatus): Promise<Boolean>;
}
