import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { CategoryService } from '../category.service';
import { ReminderService } from '../reminder.service';
import { category } from '../category';
import { Reminder } from '../Reminder';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent {
  note:Note;
  noteList:Note[];
  errMessage: String;
  categories: Array<category>;
  reminders:Array<Reminder>;

  constructor(private noteservice:NotesService,private categoryService : CategoryService,private reminderService : ReminderService) {
    this.note = new Note();
    this.noteList=[];

    this.categoryService.fetchCategoriesFromServer();
    this.reminderService.fetchRemindersFromServer();

  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(
      res => {
        this.categories = res;
        console.log( 'categories are ', this.categories);
      },err => {

      }

    )

    this.reminderService.getReminders().subscribe(
      res => {
        this.reminders = res;
        console.log( 'reminders are ', this.reminders);
      },err => {

      }

    )

  }

  addNote()
  {
    console.log("Inside Add Note Method in note taker"+this.note.noteTitle);
    if (this.note.noteTitle && this.note.noteContent && this.note.category && this.note.reminder){
    this.noteList.push(this.note);
    this.noteservice.addNote(this.note).subscribe(
      data=>{},
      err=> {
        console.log("error message is"+err);
        this.errMessage = 'Http failure response for http://localhost:8082/api/v1/note: 404 Not Found'
      }
      
    )

   // console.log(this.noteList);
    this.note= new Note();
  }else{
      this.errMessage = 'please fill all fields, all fields are mandatory fields';
}
}
}
