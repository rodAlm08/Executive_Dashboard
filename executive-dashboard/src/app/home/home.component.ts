import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { DataService } from 'src/Services/data.service';

interface DataRow {
  [key: string]: any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data: any;
  dataSource = new MatTableDataSource<any>([]);
  allColumns: string[] = [
    '_id',
    '_date',
    '_user',
    'vx_trg_accuracy',
    'vx_shot_accuracy',
    'vx_avg_res_time',
    'fm_avg_trk_time',
    'fm_accuracy',
    'bm_sleep',
    'bm_act_steps',
    'bm_HR_var',
    'bm_HR_max',
    'bm_HR_avg',
    'au_avg_res_time',
  ];
  displayedColumns: string[] = this.allColumns.slice();

  constructor(private dataService: DataService, private http: HttpClient) {}

  ngOnInit(): void {
    // this.loadData();
    this.loadTestData();
  }

  // loadData(): void {
  //   this.dataService.getData().subscribe(
  //     (result) => {
  //       this.data = result;
  //       console.log(this.data);
  //     },
  //     (error) => {
  //       console.error('Error loading data:', error);
  //     }
  //   );
  // }

  loadTestData(): void {
   
    this.dataService.getTestData().subscribe(
      (data) => {
        console.log('Data loaded:', data);
        this.dataSource = new MatTableDataSource(data);
      },
      (error) => {
        console.error('Error loading data:', error);
      }
    );
  }

  applyFilter(filterValue: string) {
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  sendDataToController() {
    const dataToSubmit = this.prepareDataForSubmission();

    console.log('Data to submit:', dataToSubmit);

    this.dataService.sendData(dataToSubmit).subscribe(
      (response) => {
        console.log('Data submitted successfully', response);
      },
      (error) => {
        console.error('Error submitting data', error);
      }
    );
  }

  prepareDataForSubmission() {
    if (!this.dataSource || !this.dataSource.data) {
      console.error('Data source is not initialized');
      return []; // or handle the error as appropriate
    }
    const selectedData = this.dataSource.data.map((row: DataRow) => {
      const filteredRow: DataRow = {};

      this.displayedColumns.forEach((column) => {
        filteredRow[column] = row[column];
      });

      return filteredRow;
    });

    return selectedData;
  }
}
