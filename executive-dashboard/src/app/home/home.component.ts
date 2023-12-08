import { Component, OnInit, ViewChild } from '@angular/core';

import { DataService } from 'src/Services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getData().subscribe(
      (result) => {
        this.data = result;
        console.log(this.data);
      },
      (error) => {
        console.error('Error loading data:', error);
      }
    );
  }

  
  
}
