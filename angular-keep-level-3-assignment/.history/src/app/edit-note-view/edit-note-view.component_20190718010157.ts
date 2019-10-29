import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;
  constructor(private noteService: NotesService,
    private dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
  }
  ngOnInit() {
    console.log(this.data.noteId);
    this.note = this.noteService.getNoteById(this.data.noteId);
  }
  onSave() {
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
