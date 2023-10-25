import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/Services/chart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  labelList: string[] = ['Car', 'Fruit', 'Chair', 'Table'];
  data: number[] = [5, 2, 10, 3];
  sdata: number[] = [1, 2, 3, 5];
  chartName = 'Data Charts';

  constructor(private chart: ChartService) {}

  ngOnInit(): void {
    this.chart.single(
      this.chartName,
      'key',
      this.labelList,
      this.data,
      'line-chart',
      'line'
    );

    this.chart.single(
      this.chartName,
      'key',
      this.labelList,
      this.data,
      'doughnut-chart',
      'doughnut'
    );


    this.chart.double(
      this.chartName,
      'key 1',
      'key 2',
      this.labelList,
      this.data,
      this.sdata,
      'bar-chart',
      'bar'
    );

    this.chart.scatter(
      this.chartName, // graphTitle: string
      this.labelList, // array of labels for the X-axis
      this.data.map((value, index) => ({ x: value, y: this.sdata[index] })), // combining data and sdata for scatter points
      'scatter-chart' // context: string
  );
  
  
  
  }
}
