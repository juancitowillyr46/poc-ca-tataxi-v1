import { AssetType } from "src/domain/enums/asset-type.enum";
import { Column, Entity } from "typeorm";
import { AuditableEntity } from "./auditable.entity";

@Entity({ name: 'assets' })
export class AssetsEntity extends AuditableEntity {

    @Column({enum: AssetType, default: AssetType.CAR, name: 'asset_type'})
    assetType:AssetType;

    @Column({name: 'brand'})
    brand:string;

    @Column({name: 'model'})
    model:string;

    @Column({name: 'license_plate'})
    licensePlate:string;
    
}