import { Controller, Get, Post, Body } from '@nestjs/common';
import { HoursDto } from './hours.dto';

@Controller('hours')
export class HoursController {
    hours: any[]
    constructor() {
        this.hours = [
            {
                id: 1,
                text: 'rest'
            },
        ];
    }
    @Get()
    async getAll() {
        return this.hours;
    }

    @Post()
    async create(@Body() dto: HoursDto) {

    }
}
