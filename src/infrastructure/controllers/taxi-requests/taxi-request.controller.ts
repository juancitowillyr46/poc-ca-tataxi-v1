import { Body, Controller, Delete, Get, Inject, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { TaxiRequestPresenter } from './taxi-request.presenter';
import { TaxiRequestDto } from './taxi-request.dto';
import { postCreateTaxiRequestUseCase } from 'src/usecases/taxi-requests/postCreateTaxiRequestUseCase';
import { DriverSearchPresenter } from './driver-seach/driver-search.presenter';
import { postSearchDriversUseCase } from 'src/usecases/taxi-requests/postSearchDriversUseCase';
import { DriverSearchDto } from './driver-seach/driver-search.dto';
import { postUpdateStatusTaxiRequestUseCase } from 'src/usecases/taxi-requests/postUpdateStatusTaxiRequestUseCase';
import { TaxiRequestUpdateStatusDto } from './update-status/taxi-request-update-status.dto';
import { TaxiRequestUpdateStatusPresenter } from './update-status/taxi-request-update-status.presenter';
import { getTaxiRequestUseCase } from 'src/usecases/taxi-requests/getTaxiRequestUseCase';
import { TaxiRequestGetPresenter } from './taxi-request-get.presenter';

@Controller('taxi-request')
@ApiTags('Taxi Request')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(TaxiRequestPresenter)
@ApiExtraModels(DriverSearchPresenter)
@ApiExtraModels(TaxiRequestUpdateStatusPresenter)

export class TaxiRequestController {
  constructor(
    @Inject(UsecasesProxyModule.POST_TAXI_REQUEST_CREATE_USECASE_PROXY)
    private readonly postCreateTaxiRequestUseCase: UseCaseProxy<postCreateTaxiRequestUseCase>,
    @Inject(UsecasesProxyModule.POST_SEARCH_DRIVER_USECASE_PROXY)
    private readonly postSearchDriversUseCase: UseCaseProxy<postSearchDriversUseCase>,
    @Inject(UsecasesProxyModule.POST_TAXI_REQUEST_UPDATE_STATUS_PROXY)
    private readonly postUpdateStatusTaxiRequestUseCase: UseCaseProxy<postUpdateStatusTaxiRequestUseCase>,
    @Inject(UsecasesProxyModule.GET_TAXI_REQUEST_USECASE_PROXY)
    private readonly getTaxiRequestUseCase: UseCaseProxy<getTaxiRequestUseCase>,
  ) {}

  @Post('create')
  @ApiResponseType(TaxiRequestPresenter, true)
  async signUp(@Body() taxiRequestDto: TaxiRequestDto) {
    this.postCreateTaxiRequestUseCase.getInstance().execute(taxiRequestDto);
    return new TaxiRequestPresenter(true);
  }

  @Post('search-drivers')
  async search(@Body() driverSearchDto: DriverSearchDto) {
    const searchDrivers = await this.postSearchDriversUseCase.getInstance().execute(driverSearchDto);
    return new DriverSearchPresenter(searchDrivers);
  }

  @Put('update-status') 
  async updateStatus(@Body() taxiRequestUpdateStatusDto: TaxiRequestUpdateStatusDto) {
    const result = await this.postUpdateStatusTaxiRequestUseCase.getInstance().execute(taxiRequestUpdateStatusDto.id, taxiRequestUpdateStatusDto.status);
    return new TaxiRequestUpdateStatusPresenter(result);
  }

  @Get('taxi-request')
  @ApiResponseType(TaxiRequestPresenter, true)
  async getRequest(@Query('id', ParseIntPipe) taxiRequestId: number) {
    const result = await this.getTaxiRequestUseCase.getInstance().execute(taxiRequestId);
    return new TaxiRequestGetPresenter(result);
  }

}
