// home.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  chartData: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  displayedColumns: string[] = ['label', 'x', 'y']; // Add your column names

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('assets/data.json').subscribe((data: any) => {
      this.chartData = data;
      this.dataSource = new MatTableDataSource(this.chartData.datasets[0].data);
    });
  }

  applyFilter(event: Event, column: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


