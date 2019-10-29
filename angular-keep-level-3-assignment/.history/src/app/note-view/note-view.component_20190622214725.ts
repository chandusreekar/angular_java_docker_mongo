import { Component } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';


@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent {

  notes: Array<Note>;


  constructor(private noteService:NotesService) 
  { 
    this.notes=[];

  }

  ngOnInit() 
  {
    this.noteService.getNotes().subscribe(
      data => this.notes = data,
      err=>console.log(err)
    )
  }
}
