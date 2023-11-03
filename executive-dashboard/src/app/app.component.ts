import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/Services/chart.service';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  selectedChartType: string = '';
  canvasId: string = 'chartCanvas';
  chartData$: Observable<any> = this.chartService.fetchData();
  chartData: any = {}; // Initialize an empty object


  constructor(
    private chartService: ChartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.selectedChartType = 'bar'; // Set a default chart type
    this.chartData$ = this.chartService.fetchData();
    this.chartData$.subscribe(data => {
      this.chartData = data;
      this.renderChart();
      this.cdr.detectChanges(); // Manually trigger change detection
    });
  }

  onChartTypeChange(): void {
    console.log('Selected chart type:', this.selectedChartType);
    this.fetchDataAndRenderChart(this.selectedChartType);
  }

  private fetchDataAndRenderChart(chartType: string): void {
    this.chartService.fetchData().subscribe(
      (data) => {
        this.chartData = data;
        this.selectedChartType = chartType;
        this.renderChart();
        this.cdr.detectChanges(); // Manually trigger change detection
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  private renderChart(): void {
    const labels: string[] = this.chartData.labels;
    const data: number[] = this.chartData.data;
    this.chartService.generateChart(this.selectedChartType, labels, data, this.canvasId);
  }
}

  //   this.chart.single(
  //     this.chartName,
  //     'key',
  //     this.labelList,
  //     this.data,
  //     'doughnut-chart',
  //     'doughnut'
  //   );


  //   this.chart.double(
  //     this.chartName,
  //     'key 1',
  //     'key 2',
  //     this.labelList,
  //     this.data,
  //     this.sdata,
  //     'bar-chart',
  //     'bar'
  //   );

  //   this.chart.scatter(
  //     this.chartName, // graphTitle: string
  //     this.labelList, // array of labels for the X-axis
  //     this.data.map((value, index) => ({ x: value, y: this.sdata[index] })), // combining data and sdata for scatter points
  //     'scatter-chart' // context: string
  // );
  
  
  
  // }
