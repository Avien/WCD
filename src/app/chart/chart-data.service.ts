import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, timeout} from 'rxjs/internal/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { ChartModel } from './chart-model';
import { DatePipe } from '@angular/common';

@Injectable()
export class ChartDataService {
    datePipe: DatePipe = new DatePipe('en-us');
    constructor(private httpClient: HttpClient) {}

    getStockPriceData(): Observable<ChartModel> {
        return this.httpClient
            .get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo')
            .pipe(
                timeout(15000),
                map(response => {
                    const model: ChartModel = {
                        name: 'MSFT',
                        series: []
                    };
                    for (const date in response['Time Series (5min)']) {
                        if (date) {
                            const dateTime = new Date(date.replace(/-/g, '/'));
                            model.series.push({
                                name: this.datePipe.transform(dateTime, 'shortTime'),
                                value: response['Time Series (5min)'][date]['4. close']
                            });
                        }
                    }
                    return model;
                }),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        console.error(error);
        return observableThrowError(error || 'Server error');
    }
}
