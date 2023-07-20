export interface HoursData {
  email: string;
  hours: { [week: number]: string };
}

export interface TransformedData {
  name: string;
  projects: string[];
}
