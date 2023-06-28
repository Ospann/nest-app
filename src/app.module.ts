import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HoursModule } from './hours/hours.module';

@Module({
  imports: [HoursModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
