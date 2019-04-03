import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartComponent } from './chart/chart.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatSliderModule,
  MatFormFieldModule,
  MatSelectModule,
  MatProgressSpinnerModule, MatSnackBar, MatSnackBarContainer, MatSnackBarModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartDataService } from './chart/chart-data.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ChartComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    NgxChartsModule,
    MatSliderModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  entryComponents: [
    MatSnackBarContainer
  ],
  providers: [ChartDataService, MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule {}
