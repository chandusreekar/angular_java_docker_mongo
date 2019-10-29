import { Component, OnInit, Inject } from '@angular/core';
import { ReminderService } from '../reminder.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Reminder } from '../Reminder';

@Component({
  selector: 'app-edit-reminder-view',
  templateUrl: './edit-reminder-view.component.html',
  styleUrls: ['./edit-reminder-view.component.css']
})
export class EditReminderViewComponent implements OnInit {

  reminder: Reminder;
  
  errMessage: string;

  constructor(private reminderService: ReminderService,
    private dialogRef: MatDialogRef<EditReminderViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    console.log(this.data.noteId);
    this.reminder = this.reminderService.getReminderById(this.data.reminderId);
  }

  editReminder() {
    this.reminderService.editReminder(this.reminder).subscribe(editreminder => {
      this.dialogRef.close();
    },
    err => {
      if (err.status === 404) {
        this.errMessage = err.message;
      } else {
        this.errMessage = err.message;
        console.log("error msg is ===>"+err);
      }
    });
  }

  deleteReminder() {
    this.reminderService.deleteReminder(this.reminder).subscribe((deletedReminder) => {
      this.dialogRef.close();
    },
    err => {
      this.dialogRef.close();
      if (err.status === 404) {
        this.errMessage = err.error;
      }
      else {
        this.errMessage = err.error;
      }
    })
  }

}
