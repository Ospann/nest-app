import { Controller, Get, Post, Body } from '@nestjs/common';
import { HoursDto } from './hours.dto';
import { HoursService } from './hours.service';

@Controller('hours')
export class HoursController {
  constructor(private readonly googleSheetsService: HoursService) {}
  @Get('/meta')
  async getMeta() {
    const spreadsheetId = '1OuRxnYkdwF9Ck5_KWP7AsVkWlCxXxfR4HjdMT3DpzJY';
    const range = 'metadata!A2:B36';

    const data = await this.googleSheetsService.getData(spreadsheetId, range);
    const formattedData = this.googleSheetsService.transformData(data);
    return formattedData;
  }

  @Get('/rating')
  async getRating() {
    const spreadsheetId = '1OuRxnYkdwF9Ck5_KWP7AsVkWlCxXxfR4HjdMT3DpzJY';
    const range = ' Employees hours report KZ/UW!A3:H';

    const data = await this.googleSheetsService.getData(spreadsheetId, range);
    const formattedData = this.googleSheetsService.formatRating(data);
    return formattedData;
  }

  @Post('/')
  async sendData(@Body() dto: any) {
    const spreadsheetId = '1OuRxnYkdwF9Ck5_KWP7AsVkWlCxXxfR4HjdMT3DpzJY';
    const range = 'ВАШ_ДИАПАЗОН_НА_ЛИСТЕ';

    const dataToAppend = [
      ['John', 'Doe', 'johndoe@example.com'],
      ['Jane', 'Smith', 'janesmith@example.com'],
    ];

    const response = await this.googleSheetsService.sendData(
      spreadsheetId,
      range,
      dataToAppend,
    );

    return response;
  }
}
