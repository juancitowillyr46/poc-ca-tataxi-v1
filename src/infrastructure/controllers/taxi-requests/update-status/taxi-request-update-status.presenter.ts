import { ApiProperty } from "@nestjs/swagger";

export class TaxiRequestUpdateStatusPresenter {
    @ApiProperty()
    isDone: boolean;

    constructor(isDone: boolean) {
        this.isDone = isDone;
    }
}