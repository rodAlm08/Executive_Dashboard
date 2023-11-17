import { Component } from '@angular/core';
import { ChartService } from 'src/Services/chart.service';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {
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
    this.chartData$.subscribe((data) => {
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
    if (this.chartData.labels && this.chartData.datasets) {
      const labels: string[] = this.chartData.labels;
      const datasets: any[] = this.chartData.datasets;
      console.log('Labels:', labels);
      console.log('Datasets:', datasets);
      this.chartService.generateChart(
        this.selectedChartType,
        labels,
        datasets,
        this.canvasId
      );
    }
  }
}
