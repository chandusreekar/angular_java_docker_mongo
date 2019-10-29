import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { category } from '../category';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {

  categories: Array<category>;

  constructor(private categoryService:CategoryService) { }

  ngOnInit() {

    this.categoryService.getCategories().subscribe(
      res =>{
          this.categories = res;
      },
      err =>{
          
      })
  }

}
