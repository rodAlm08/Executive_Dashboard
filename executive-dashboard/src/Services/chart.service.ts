import { Injectable } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { ChartType } from 'chart.js';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

Chart.register(...registerables);

interface CanvasWithChart extends HTMLCanvasElement {
  'data-chart'?: Chart;
}

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor(private http: HttpClient) {}

  fetchData(): Observable<any> {
    return this.http.get('assets/data.json');
  }

  generateChart(chartType: string, labels: string[], data: number[], canvasId: string): void {
    const canvas: CanvasWithChart = document.getElementById(canvasId) as CanvasWithChart;

    if (!canvas) {
        console.error(`Canvas element with ID '${canvasId}' not found.`);
        return;
    }

    // Check if the canvas already has a chart instance
    if (canvas['data-chart']) {
        canvas['data-chart'].destroy(); // Destroy the existing chart instance
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        console.error('Canvas context not available.');
        return;
    }

    const newChart = new Chart(ctx, {
        type: chartType as ChartType,
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: this.getRandomColors(data.length),
                borderColor: this.getRandomColors(data.length),
                borderWidth: 1
            }]
        }
    });

    // Store the new chart instance in the canvas element for future reference
    canvas['data-chart'] = newChart;
}

  private getRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.7)`;
      colors.push(color);
    }
    return colors;
  }

  //   single(
  //     graphTitle: string,
  //     key: string,
  //     labels: any,
  //     data: any,
  //     context: string,
  //     charttype: any
  //   ) {
  //     var chart = new Chart(context, {
  //       type: charttype,
  //       data: {
  //         labels: labels,
  //         datasets: [
  //           {
  //             backgroundColor: [
  //               'rgb(255,99,60)',
  //               'rgb(54,162,235)',
  //               'rgb(255,99,132)',
  //               'rgb(255,205,86)',
  //             ],
  //             data: data,
  //           },
  //         ],
  //       },
  //       options: {},
  //     });
  //   }

  //   double(
  //     graphTitle: string,
  //     primaryDatasetkey: string,
  //     secondaryDatasetkey: string,
  //     labels: any,
  //     primaryDataset: any,
  //     secondaryDataset: any,
  //     context: string,
  //     charttype: any
  //   ) {
  //     var chart = new Chart(context, {
  //       type: charttype,
  //       data: {
  //         labels: labels,
  //         datasets: [
  //           {
  //             labels: primaryDatasetkey,
  //             backgroundColor: ['rgb(31,97,141)'],
  //             data: primaryDataset,
  //           },
  //           {
  //             labels: secondaryDatasetkey,
  //             backgroundColor: ['rgb(255,99,60)'],
  //             data: secondaryDataset
  //           }],
  //       },
  //       options: {
  //         plugins:{
  //           title:{
  //             display:true,
  //             text:graphTitle
  //           },
  //         },
  //         responsive:true,
  //         scales:{
  //           x:{
  //             stacked:true,
  //           },
  //           y:{
  //             stacked:true
  //           }
  //         }
  //       },
  //     });
  //   }

  //   scatter(
  //     graphTitle: string,
  //     labels: any,
  //     data: any[],
  //     context: string
  // ) {
  //     var chart = new Chart(context, {
  //         type: 'scatter',
  //         data: {
  //             labels: labels,
  //             datasets: [{
  //                 label: graphTitle,
  //                 data: data,
  //                 backgroundColor: 'rgba(255, 99, 132, 1)', // Color of the scatter points
  //                 borderColor: 'rgba(255, 99, 132, 1)', // Color of the scatter point borders
  //                 borderWidth: 1, // Border width of the scatter points
  //                 pointRadius: 5, // Radius of the scatter points
  //             }]
  //         },
  //         options: {
  //             plugins: {
  //                 title: {
  //                     display: true,
  //                     text: graphTitle
  //                 }
  //             },
  //             scales: {
  //                 x: {
  //                     type: 'linear', // 'linear' for numeric values, 'time' for time series data
  //                     position: 'bottom'
  //                 },
  //                 y: {
  //                     type: 'linear',
  //                     position: 'left'
  //                 }
  //             }
  //         }
  //     });
  // }
}
