import { ApiProperty } from "@nestjs/swagger";
import { DriverSearchResultModel } from "src/domain/model/drivers/driver-search-result.model";

export class DriverSearchPresenter {
    @ApiProperty()
    lst: DriverSearchResultModel[];

    constructor(lst: DriverSearchResultModel[]) {
        this.lst = lst;
    }
}