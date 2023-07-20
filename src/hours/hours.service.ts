import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { HoursData } from './hours.types';
import { TransformedData } from './hours.types';

@Injectable()
export class HoursService {
  private readonly sheetsAPI;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      keyFile: './src/config/google.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    this.sheetsAPI = google.sheets({ version: 'v4', auth });
  }

  //GET DATA
  async getData(spreadsheetId: string, range: string) {
    try {
      const response = await this.sheetsAPI.spreadsheets.values.get({
        spreadsheetId,
        range,
      });

      return response.data.values;
    } catch (error) {
      console.error('Error fetching data from Google Sheets:', error.message);
      return null;
    }
  }

  //SEND DATA
  async sendData(spreadsheetId: string, range: string, values: any[][]) {
    try {
      const response = await this.sheetsAPI.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        resource: {
          values,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error sending data to Google Sheets:', error.message);
      return null;
    }
  }

  transformData(data: any[]): TransformedData[] {
    const groupedData = {};

    data.forEach(([name, project]) => {
      if (!groupedData[name]) {
        groupedData[name] = {
          name: name,
          projects: [],
        };
      }

      groupedData[name].projects.push(project);
    });

    return Object.values(groupedData);
  }

  private extractWeeks(headers: string[]): number[] {
    return headers.slice(1, headers.length - 1).map((header) => {
      const week = parseInt(header.replace(',', '').trim());
      return isNaN(week) ? 0 : week;
    });
  }

  formatRating(data: any[]): HoursData[] {
    const headers = data[0];
    const weeks = this.extractWeeks(headers);

    const result: HoursData[] = [];
    for (let i = 1; i < data.length - 1; i++) {
      const row = data[i];
      const email = row[0].split('@')[0];

      const hours: { [week: number]: string } = {};
      for (let j = 1; j < weeks.length + 1; j++) {
        hours[j] = row[j];
      }

      result.push({ email, hours });
    }

    return result;
  }
}
