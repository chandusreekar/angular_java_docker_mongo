import { Component, OnInit, Input } from '@angular/core';
import { Reminder } from '../Reminder';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {

  @Input() reminder: Reminder;

  constructor(private routerService : RouterService) { }

  ngOnInit() {
  }

  
  openCategoryEditView(reminderId) {
    console.log(reminderId+'this is reminderId');
    this.routerService.routeToEditReminderView(this.reminder.reminderId);
   }

}
