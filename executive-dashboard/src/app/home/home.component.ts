import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['Tables_in_information_schema'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadDataFromServer();
  }

  loadDataFromServer() {
    this.http.get<any[]>('http://localhost:3000/api/data').subscribe(
      (data: any[] | undefined) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator; // If you have pagination
        console.log('Data loaded from server:', data);
      },
      (error: any) => {
        console.error('Error loading data from server:', error);
      }
    );
  }
}
