import { Component, OnInit, Input } from '@angular/core';
import { category } from '../category';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  
  @Input()
  category: category;

  constructor(private routerService:RouterService) { }

  ngOnInit() {
  }


  openEditCategoryView(id) {
    this.routerService.routeToEditCategoryView(this.category.id);
  }

}
