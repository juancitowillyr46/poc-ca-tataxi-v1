import { ApiProperty } from "@nestjs/swagger";

export class TaxiRequestPresenter {
    @ApiProperty()
    isDone: boolean;

    constructor(signUpSuccess: boolean) {
        this.isDone = signUpSuccess;
    }
}