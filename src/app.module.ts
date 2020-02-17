import { Module } from '@nestjs/common';
import { GeoModule } from './geo/geo.module';

@Module({
  imports: [GeoModule],
})
export class AppModule {}
