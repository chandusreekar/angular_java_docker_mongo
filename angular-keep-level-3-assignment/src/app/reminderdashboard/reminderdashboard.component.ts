import { Component, OnInit } from '@angular/core';
import { ReminderService } from '../reminder.service';

@Component({
  selector: 'app-reminderdashboard',
  templateUrl: './reminderdashboard.component.html',
  styleUrls: ['./reminderdashboard.component.css']
})
export class ReminderdashboardComponent implements OnInit {

 

  ngOnInit() {
  }

  constructor(private reminderService:ReminderService) {
    this.reminderService.fetchRemindersFromServer();
    

}
}
