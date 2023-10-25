import { Injectable } from '@angular/core';
import { Chart , registerables} from 'chart.js';

Chart.register(...registerables)

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor() {}

  single(
    graphTitle: string,
    key: string,
    labels: any,
    data: any,
    context: string,
    charttype: any
  ) {
    var chart = new Chart(context, {
      type: charttype,
      data: {
        labels: labels,
        datasets: [
          {
            backgroundColor: [
              'rgb(255,99,60)',
              'rgb(54,162,235)',
              'rgb(255,99,132)',
              'rgb(255,205,86)',
            ],
            data: data,
          },
        ],
      },
      options: {},
    });
  }

  double(
    graphTitle: string,
    primaryDatasetkey: string,
    secondaryDatasetkey: string,
    labels: any,
    primaryDataset: any,
    secondaryDataset: any,
    context: string,
    charttype: any
  ) {
    var chart = new Chart(context, {
      type: charttype,
      data: {
        labels: labels,
        datasets: [
          {
            labels: primaryDatasetkey,
            backgroundColor: ['rgb(31,97,141)'],
            data: primaryDataset,
          },
          {
            labels: secondaryDatasetkey,
            backgroundColor: ['rgb(255,99,60)'],
            data: secondaryDataset
          }],
      },
      options: {
        plugins:{
          title:{
            display:true,
            text:graphTitle
          },
        },
        responsive:true,
        scales:{
          x:{
            stacked:true,
          },
          y:{
            stacked:true
          }
        }
      },
    });
  }

  scatter(
    graphTitle: string,
    labels: any,
    data: any[],
    context: string
) {
    var chart = new Chart(context, {
        type: 'scatter',
        data: {
            labels: labels,
            datasets: [{
                label: graphTitle,
                data: data,
                backgroundColor: 'rgba(255, 99, 132, 1)', // Color of the scatter points
                borderColor: 'rgba(255, 99, 132, 1)', // Color of the scatter point borders
                borderWidth: 1, // Border width of the scatter points
                pointRadius: 5, // Radius of the scatter points
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: graphTitle
                }
            },
            scales: {
                x: {
                    type: 'linear', // 'linear' for numeric values, 'time' for time series data
                    position: 'bottom'
                },
                y: {
                    type: 'linear',
                    position: 'left'
                }
            }
        }
    });
}

}
