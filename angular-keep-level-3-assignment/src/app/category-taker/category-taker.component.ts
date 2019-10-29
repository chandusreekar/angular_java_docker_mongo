import { Component, OnInit } from '@angular/core';
import { category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-taker',
  templateUrl: './category-taker.component.html',
  styleUrls: ['./category-taker.component.css']
})
export class CategoryTakerComponent implements OnInit {

  category:category;
  errMessage:string;

  constructor(private categoryService:CategoryService) {
    this.category = new category;
   }

  ngOnInit() {
  }

  addCategory() {
    //this.noteList.push(this.note);
    //console.log(this.note);

    if (this.category.id !== '' && this.category.categoryName !== '' 
      && this.category.categoryDescription !== '' ){
      this.categoryService.addCategory(this.category).subscribe(
        data => { console.log("inside data of addcatgeory ",data)},
        err => {
          console.log("inside error of addcategory ",err);
          this.errMessage = err.error;
          ;
        }
      )
      this.category = new category();
    }
    else {
      this.errMessage = "All form fields are mandatory";
    }
  }

}
