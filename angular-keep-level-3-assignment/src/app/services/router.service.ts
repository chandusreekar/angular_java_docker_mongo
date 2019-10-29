import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class RouterService {

  constructor (private router: Router,
    private location: Location) { }

  routeToDashboard() {
    this.router.navigate(['dashboard']);
  }

  routeToLogin() {
    this.router.navigate(['login']);
  }

  routeToRegister(){
    this.router.navigate(['register']);
   }

   routeToCategoryDashboard() {
    this.router.navigate(['category']);
  }
  routeToReminderDashboard() {
   this.router.navigate(['reminder']);
 }

  routeToEditNoteView(noteId) {
    this.router.navigate([
      'dashboard', {
        outlets : {
          noteEditOutlet : ['note', noteId, 'edit']
        }
      }
    ]);

  }

  routeToEditReminderView(reminderId){
    console.log("inside router service reminder");
    this.router.navigate([
      'reminder', {
        outlets : {
          reminderEditOutlet : ['reminder', reminderId, 'edit']
        }
      }
    ]);

  }

  routeBack() {
    this.location.back();
  }

  routeToNoteView() {
    this.router.navigate(['dashboard/view/noteview']);
  }

  routeToListView() {
    this.router.navigate(['dashboard/view/listview']);
  }

  routeToEditCategoryView(categoryid)
  {
    this.router.navigate(['category', {
      outlets: {
       catEditOutlet: ['category', categoryid, 'edit'],
      }
    }])
  }
}
