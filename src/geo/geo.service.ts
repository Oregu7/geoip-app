import { Injectable } from '@nestjs/common';
import { lookup, Lookup } from 'geoip-lite';
import { isV4Format, isV6Format } from 'ip';
import { Geolocation } from './interfaces/geo.interface';

@Injectable()
export class GeoService {
  getGeolocation(ip: string): Lookup {
    return lookup(ip);
  }

  isValidIPAddress(ip: string): boolean {
    return isV4Format(ip) || isV6Format(ip);
  }

  createGeolocationResponse(geo?: Lookup): Geolocation {
    if(geo) {
      const { city, country, ll: [lat, lng] } = geo;
      return { city, country, lat, lng };
    }
    return { city:"", country:"", lat:"", lng:"" };
  }
}