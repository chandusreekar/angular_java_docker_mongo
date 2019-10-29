import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Reminder } from './Reminder';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class ReminderService {

  private url : String;
  reminders: Reminder[];
  reminderSubject: BehaviorSubject<Array<Reminder>>;

  constructor(private httpClient:HttpClient,private authService : AuthenticationService) {
    this.reminders=[];
    this.reminderSubject = new BehaviorSubject([]);
    this.url = 'http://localhost:8081/api/v1/reminder/';
   }

  fetchRemindersFromServer(){
   
      console.log("inside fetchNotesFromServer");
      const completeUrl  = `${this.url}${localStorage.getItem('userId')}`;
      const headerToPassAuthToken = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8')
      .set('Authorization',`Bearer ${localStorage.getItem('bearerToken')}`).set('responseType','text');
  
      return this.httpClient.get<Reminder[]>(completeUrl,{
        headers: headerToPassAuthToken
      }).subscribe(reminders =>{
        console.log("inside fetchNotesFromServer subscribe "+reminders);
        this.reminders=reminders;
        this.reminderSubject.next(this.reminders);
      },
      (err:any)=>{
        console.log("inside fetchNotesFromServer error "+err);
        this.reminderSubject.error(err);
      })
  
   
  }

  addReminder(reminder: Reminder): Observable<Reminder> {
    console.log("inside addNote============>"+JSON.stringify(reminder));
    let headerToPassAuthToken = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('bearerToken'),
      'Content-Type': 'application/json; charset=utf-8'
    });

    reminder.reminderCreatedBy = localStorage.getItem("userId");

    return this.httpClient.post<Reminder>('http://localhost:8081/api/v1/reminder',reminder,{
      headers:headerToPassAuthToken 
    }).pipe(tap(addedReminder => {
     // this.notes = [];
      console.log("added note is "+JSON.stringify(addedReminder)+ "notes array is "+this.reminders);
        this.reminders.push(addedReminder);
        this.reminderSubject.next(this.reminders);
        console.log(this.reminders);

    }))

  }

  getReminders(): BehaviorSubject<Array<Reminder>> {
    console.log("inside getReminders");
    return this.reminderSubject;

  }

  getReminderById(reminderId): Reminder {
    console.log("inside noteId==========>"+reminderId);
    console.log("inside getNoteById");
    let foundnote=this.reminders.find(reminder => reminder.reminderId==reminderId);
    console.log(foundnote);
    return foundnote;
  }

  editReminder(reminder: Reminder): Observable<Reminder> {
    console.log("inside editNote"+reminder.reminderId);
    return this.httpClient.put<Reminder>(`http://localhost:8081/api/v1/reminder/${reminder.reminderId}`,reminder,{
      headers: new HttpHeaders().set('Authorization',`Bearer ${this.authService.getBearerToken()}`)
    }).pipe(tap(editedReminder =>{

    //  console.log("note id pipe"+note.noteId);
      console.log("note id pipe"+editedReminder.reminderId);
        const reminder = this.reminders.find(reminder => reminder.reminderId == editedReminder.reminderId);

        Object.assign(reminder,editedReminder);
        this.reminderSubject.next(this.reminders);
    }))

  }

  deleteReminder(reminder: Reminder): Observable<Reminder> {
    console.log("inside deletereminder========>"+reminder.reminderId);
    return this.httpClient.delete<Reminder>(`http://localhost:8081/api/v1/reminder/${reminder.reminderId}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).pipe(tap(deletedNote => {
      this.reminders.splice(this.reminders.indexOf(reminder), 1);

      this.reminderSubject.next(this.reminders);
    }))
  }

}
