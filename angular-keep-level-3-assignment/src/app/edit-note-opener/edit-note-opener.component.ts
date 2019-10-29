import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RouterService } from '../services/router.service';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent {

  noteId:number;
 
  constructor(private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private routerService: RouterService) {

      this.activatedRoute.params.subscribe(params =>
        {
          this.noteId=params['noteId'];
          console.log("params is ===========>"+JSON.stringify(params['noteId']));
        }
        
        
  );

    this.dialog.open(EditNoteViewComponent, {
      data: {
        noteId: this.noteId


      }
    })
      .afterClosed().subscribe(result => {
        this.routerService.routeBack();
      });
  }

}
