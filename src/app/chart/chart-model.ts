export interface DataPoint {
  name: string;
  value: number;
}

export class ChartModel {
  name: string;
  series: DataPoint[];
}
