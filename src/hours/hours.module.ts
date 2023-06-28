import { Module } from '@nestjs/common';
import { HoursController } from './hours.controller';

@Module({
  controllers: [HoursController],
})
export class HoursModule {}
