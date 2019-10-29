import { Component, OnInit } from '@angular/core';
import { ReminderService } from '../reminder.service';
import { Reminder } from '../Reminder';

@Component({
  selector: 'app-reminder-view',
  templateUrl: './reminder-view.component.html',
  styleUrls: ['./reminder-view.component.css']
})
export class ReminderViewComponent implements OnInit {
  reminders: Array<Reminder>;

  constructor(private reminderService : ReminderService) { 
    this.reminders=[];
  }

  ngOnInit() {
    this.reminderService.getReminders().subscribe(
      data => this.reminders = data,
      err=>console.log(err)
    )
  }

}
