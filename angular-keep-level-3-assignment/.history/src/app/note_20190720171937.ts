import { category } from "./category";
import { Reminder } from "./Reminder";

export class Note {
  // id: Number;
  // title: string;
  // text: string;
  // state: string;

  // constructor() {
  //   this.title = '';
  //   this.text = '';
  //   this.state = 'not-started';
  // }

  noteId: Number;
  noteTitle: string;
  noteContent: string;
  noteStatus: string;
  noteCreatedBy : string;
  category : category;
  reminder : Reminder;

  constructor() {
    this.noteTitle = '';
    this.noteContent = '';
    this.noteStatus = 'not-started';
    this.noteCreatedBy = '';
    this.category = null;
    this.reminder = null;
  }
}
