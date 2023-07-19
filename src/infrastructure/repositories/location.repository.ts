import { InjectRepository } from "@nestjs/typeorm";
import { DriverSearchResultModel } from "src/domain/model/drivers/driver-search-result.model";
import { LocationRepository } from "src/domain/repositories/locationRepository.interface";
import { LocationEntity } from "../entities/location.entity";
import { Repository } from "typeorm";
import { Driver, DriversStatus } from "../entities/driver.entity";
import { PersonEntity } from "../entities/person.entity";
import { AssetsEntity } from "../entities/asset.entity";
import { LocationEntityQueryBuilder } from "src/domain/query-builders/location-query-builder";

export class DatabaseLocationRepository implements LocationRepository {
    constructor(
        @InjectRepository(LocationEntity)
        private readonly locationEntityRepository: Repository<LocationEntity>,
    ) {

    }

    async getDriverLocations(latitude: number, longitude: number, radius: number = 1000): Promise<DriverSearchResultModel[]> {
        
        // Coordenada central
        const centralLatitude = latitude;
        const centralLongitude = longitude;

        // Radio de ubicación (en metros)
        //const radius = 1000;

        // Consulta para encontrar las coordenadas cercanas
        const locations = await this.locationEntityRepository
        .createQueryBuilder('locations')
        .innerJoin(Driver, 'drivers', 'drivers.id = locations.driver_id') // Inner join con OtherEntity
        .innerJoin(PersonEntity, 'persons', 'persons.id = drivers.person_id') // Inner join con OtherEntity
        .innerJoin(AssetsEntity, 'assets', 'assets.id = drivers.asset_id') // Inner join con OtherEntity
        .select('locations.id')
        .addSelect('persons.first_name', 'firstName')
        .addSelect('persons.last_name', 'lastName')
        .addSelect('persons.email', 'email')
        .addSelect('persons.phone_number', 'phoneNumber')
        .addSelect('drivers.id', 'driverId')
        .addSelect('drivers.status', 'status')
        .addSelect('assets.brand', 'brand')
        .addSelect('assets.model', 'model')
        .addSelect('ST_AsText(locations.coordinate)', 'coordinate')
        .where(`ST_Distance_Sphere(locations.coordinate, POINT(:longitude, :latitude)) <= :radius`, {
            latitude: centralLatitude,
            longitude: centralLongitude,
            radius: radius,
        })
        .andWhere(`drivers.status =:status`, {status: 'AVAILABLE'})
        .getRawMany<LocationEntityQueryBuilder>();

        // Imprimir las coordenadas cercanas
        //console.log(locations);
        let lstLocation = [];

        locations.forEach(location => {
            lstLocation.push(this.toLocationModel(location));
        });

        return lstLocation;
    }

    toLocationModel(locationEntity: LocationEntityQueryBuilder): DriverSearchResultModel {
        let driverSearchResultModel = new DriverSearchResultModel();
        driverSearchResultModel.driverId = locationEntity.driverId;
        driverSearchResultModel.coordinate = locationEntity.coordinate;

        const coordinates = locationEntity.coordinate.slice(6, -1);
        const [longitude, latitude] = coordinates.split(' ');

        driverSearchResultModel.latitude = parseFloat(latitude);
        driverSearchResultModel.longitude = parseFloat(longitude);

        driverSearchResultModel.firstName = locationEntity.firstName;
        driverSearchResultModel.lastName = locationEntity.lastName;
        driverSearchResultModel.phoneNumber = locationEntity.phoneNumber;
        driverSearchResultModel.email = locationEntity.email;
        driverSearchResultModel.brand = locationEntity.brand;
        driverSearchResultModel.model = locationEntity.model;
        return driverSearchResultModel;
    }
    
}