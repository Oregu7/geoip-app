import { Controller, Get, Query, Res, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { GeoService } from './geo.service';

@Controller()
export class GeoController {
  constructor(private readonly geoService: GeoService) {}

  @Get()
  getGeolocation(@Query('ip') ip: string, @Res() res: Response) {
    let response = this.geoService.createGeolocationResponse();
    if (!this.geoService.isValidIPAddress(ip))
      throw new BadRequestException(response);
    const geo = this.geoService.getGeolocation(ip);
    if (!geo)
      throw new NotFoundException(response);
    response = this.geoService.createGeolocationResponse(geo);

    return res.status(HttpStatus.OK).json(response);
  }
}
