import { Injectable } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { ChartType } from 'chart.js';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

Chart.register(...registerables);

// This interface extends the HTMLCanvasElement interface to include a Chart object
interface CanvasWithChart extends HTMLCanvasElement {
  // 'data-chart' is an optional property that holds a Chart object
  'data-chart'?: Chart;
}

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor(private http: HttpClient) {}

  fetchData(): Observable<any> {
    return this.http.get('assets/data.json').pipe(
      map((data: any) => {
        const labels = data.labels;
        const datasets = data.datasets;
        return { labels, datasets };
      })
    );
  }

  generateChart(
    chartType: string,
    labels: string[],
    datasets: any[],
    canvasId: string
  ): void {
    const canvas: CanvasWithChart = document.getElementById(
      canvasId
    ) as CanvasWithChart;

    if (!canvas) {
      console.error(`Canvas element with ID '${canvasId}' not found.`);
      return;
    }

    if (canvas['data-chart']) {
      canvas['data-chart'].destroy();
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
        datasets: datasets,
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Biometric Data Analysis in Digital Game Scenario',
            font: {
              size: 50,
            },
          },
        },
      },
    });

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
}
