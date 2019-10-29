import { Component, OnInit } from '@angular/core';
import { Reminder } from '../Reminder';
import { ReminderService } from '../reminder.service';

@Component({
  selector: 'app-reminder-taker',
  templateUrl: './reminder-taker.component.html',
  styleUrls: ['./reminder-taker.component.css']
})
export class ReminderTakerComponent implements OnInit {

  reminder:Reminder;
  reminderList:Reminder[];
  errMessage: String;

  constructor(private reminderService : ReminderService) { 
    this.reminder = new Reminder();
    this.reminderList=[];
  }

  ngOnInit() {
  }

  addReminder()
  {
    console.log("Inside Add reminder Method in reminder taker"+this.reminder.reminderId);
    if (this.reminder.reminderName && this.reminder.reminderDescription && this.reminder.reminderId){
    this.reminderList.push(this.reminder);
    this.reminderService.addReminder(this.reminder).subscribe(
      data=>{},
      err=> {
        console.log("error message is"+err);
        this.errMessage = 'Http failure response for http://localhost:8081/api/v1/note: 404 Not Found'
      }
      
    )

   // console.log(this.noteList);
    this.reminder= new Reminder();
  }else{
      this.errMessage = 'Title and Text and reminder id both are required fields';
}
}

}
