import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { CategoryService } from '../category.service';
import { ReminderService } from '../reminder.service';
import { category } from '../category';
import { Reminder } from '../Reminder';
@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;
  categories: Array<category>;
  reminderData:Array<Reminder>;
  
  constructor(private noteService: NotesService,
    private dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,private categoryService : CategoryService,
    private reminderService : ReminderService) {
  }
  ngOnInit() {
    console.log(this.data.noteId);
    this.note = this.noteService.getNoteById(this.data.noteId);
    this.categoryService.getCategories().subscribe(
      res => {
        this.categories = res;
        console.log( 'categories are ', this.categories);
      },err => {

      }

    )

    this.reminderService.getReminders().subscribe(
      res => {
        this.reminderData = res;
        console.log( 'reminders are ', this.reminderData);
      },err => {

      }

    )
  }
  onSave() {
    if(!(this.note.noteTitle && this.note.noteContent && this.note.category && this.note.reminders)){
      this.errMessage = "all fields are mandatory for edit note ";
      return;
    }
    this.noteService.editNote(this.note).subscribe(editNote => {
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

  onDelete() {
    this.noteService.deleteNote(this.note).subscribe((editedNote) => {
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
