import { ApiProperty } from "@nestjs/swagger";
import { TaxiRequestModel } from "src/domain/model/requests/taxi-requests.model";

export class TaxiRequestGetPresenter {
    @ApiProperty()
    taxiRequest: TaxiRequestModel;

    constructor(taxiRequest: TaxiRequestModel) {
        this.taxiRequest = taxiRequest;
    }
}