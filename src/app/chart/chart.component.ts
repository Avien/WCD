import {Component, OnDestroy, OnInit} from '@angular/core';
import { ChartDataService } from './chart-data.service';
import { ChartModel, DataPoint } from './chart-model';
import {MatSelectChange, MatSliderChange, MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Direction} from "@angular/cdk/bidi";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {

    chart: ChartModel;
    min: number;
    max = 0;
    threshold: number;
    thresholdLine: DataPoint;
    stockPriceData: ChartModel;
    chartView: number[];
    activeEntries: DataPoint[];

    private destroy$: Subject<void> = new Subject();

    constructor(private chartDataService: ChartDataService,
                private snackBar: MatSnackBar) {}

    ngOnInit() {
        this.chartView = [window.innerWidth * 0.9 - 300, window.innerHeight * 0.7];
        this.chartDataService.getStockPriceData()
          .pipe(
            takeUntil(this.destroy$)
          )
          .subscribe(model => {
              this.stockPriceData = model;
              this.chart = model;
              this.chart.series.forEach(dataPoint => {
                  if (!this.min || dataPoint.value < this.min) {
                      this.min = dataPoint.value;
                  }
                  if (dataPoint.value > this.max) {
                      this.max = dataPoint.value;
                  }
              });

              //this.activeEntries = [this.chart.series[5], this.chart.series[6],this.chart.series[7],this.chart.series[8],this.chart.series[9]];
          },
          error => {
              console.log(error);
              this.openSnackBar(error);
          });
    }

    onChange(event: MatSliderChange) {
      this.thresholdLine = { name: 'Threshold', value: event.value };
    }

    changeNumberDataPoints(event: MatSelectChange) {
      console.log(event.value);
      const newChart = new ChartModel();
      newChart.name = this.chart.name;
      newChart.series = this.stockPriceData.series.slice(0, event.value);
      this.activeEntries = [...newChart.series.slice(0,10)];
      this.chart = newChart;

    }

    private openSnackBar(error) {
        this.snackBar.open(error.message, 'Error', {
          announcementMessage: 'Error',
          verticalPosition: 'top'
        });
    }

    ngOnDestroy() {
      this.destroy$.next();
      this.destroy$.complete();
    }
}
