import { Component, OnInit, Inject } from '@angular/core';
import { category } from '../category';
import { CategoryService } from '../category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-category-view',
  templateUrl: './edit-category-view.component.html',
  styleUrls: ['./edit-category-view.component.css']
})
export class EditCategoryViewComponent implements OnInit {

  category: category;
  errMessage: string;

  constructor(private categoryService:CategoryService,
    private matDialogRef: MatDialogRef<EditCategoryViewComponent>, 
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.category = this.categoryService.getCategoryById(this.data.catid);
    console.log("Inside ngOnit of category view component file ",this.category);
  }

  onSave() {
    this.categoryService.editCategory(this.category).subscribe((editedNote) => {
      this.matDialogRef.close();
      //console.log("editedNote ",editedNote);
    },
    err => {
      this.matDialogRef.close();
      if (err.status === 404) {
        this.errMessage = err.error;
      }
      else {
        this.errMessage = err.error;
      }
    })
  }

  onDelete() {
    this.categoryService.deleteCategory(this.category).subscribe((deletedcategory) => {
      this.matDialogRef.close();
    },
    err => {
      this.matDialogRef.close();
      if (err.status === 404) {
        this.errMessage = err.error;
      }
      else {
        this.errMessage = err.error;
      }
    })
  }

}
