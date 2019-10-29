import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent {

  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;

  constructor(private notesService: NotesService) {
  }

  ngOnInit() {
    this.notesService.getNotes().subscribe(notes => {
      this.notStartedNotes = notes.filter(note => ('not-started' === note.noteStatus));
      this.startedNotes = notes.filter(note => ('started' === note.noteStatus));
      this.completedNotes = notes.filter(note => ('completed' === note.noteStatus));
    }, (err) => {});
  }
}
