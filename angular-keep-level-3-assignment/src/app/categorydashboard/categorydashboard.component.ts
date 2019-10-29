import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-categorydashboard',
  templateUrl: './categorydashboard.component.html',
  styleUrls: ['./categorydashboard.component.css']
})
export class CategorydashboardComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  


  ngOnInit() {
    this.categoryService.fetchCategoriesFromServer();
  }

}
