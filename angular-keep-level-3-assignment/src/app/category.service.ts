import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { category } from './category';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './services/authentication.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { tap } from 'rxjs/operators';

@Injectable()
export class CategoryService {
  categories: Array<category>;
  categoriesSubject: BehaviorSubject<Array<category>>;

  constructor(private httpClient: HttpClient,private authservice :AuthenticationService ) { 
    this.categories = [];
    this.categoriesSubject = new BehaviorSubject([]);
  }

  fetchCategoriesFromServer() {
    console.log('inside fectchCategoriesFromServer ');
    return this.httpClient.get<category[]>('http://localhost:8083/api/v1/category/' + localStorage.getItem('userId'), {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).subscribe(categories => {
      this.categories = categories;
      console.log('OnLoad Category', this.categories);
      this.categoriesSubject.next(this.categories);
    },
      (err: any) => {
        this.categoriesSubject.error(err);
      })
  }

  addCategory(category: category): Observable<category> {
    const authHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('bearerToken'),
      'Content-Type': 'application/json; charset=utf-8'
    });
    console.log('category object is ', category);
    console.log('local stordage userid ' + localStorage.getItem('userId'));
    category.categoryCreatedBy = localStorage.getItem('userId');
    return this.httpClient.post<category>('http://localhost:8083/api/v1/category', category, {

      headers: authHeader
    }).pipe(tap(addedCategory => {
      console.log("addedNote ", addedCategory);
      this.categories.push(category);
      this.categoriesSubject.next(this.categories);
    }))
  }

  getCategories(): BehaviorSubject<Array<category>> {
    console.log(this.categoriesSubject);
    return this.categoriesSubject;
  }

  getCategoryById(categoryId): category {
    const foundCategory = this.categories.find(cat => cat.id === categoryId);
    return foundCategory;
  }

  editCategory(category: category): Observable<category> {
    return this.httpClient.put<category>(`http://localhost:8083/api/v1/category/${category.id}`,category, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).pipe(tap(editedNote => {
      console.log("editedNote ", editedNote);
      const cat = this.categories.find(note => cat.categoryId == editedNote.id);
      Object.assign(cat, editedNote);
      this.categoriesSubject.next(this.categories);
    }))
  }

  deleteCategory(category: category): Observable<category> {
    return this.httpClient.delete<category>(`http://localhost:8083/api/v1/category/${category.id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).pipe(tap(deletedcategory => {
      console.log('inside pipe of delet category ', this.categories);
      console.log('inside pipe of delet category ', deletedcategory);
      console.log('inside pipe of delet category ', category);
      this.categories.splice(this.categories.indexOf(category), 1);
      this.categoriesSubject.next(this.categories);
    }))
  }

}
