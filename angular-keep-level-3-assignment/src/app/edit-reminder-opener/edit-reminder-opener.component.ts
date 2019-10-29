import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';
import { EditReminderViewComponent } from '../edit-reminder-view/edit-reminder-view.component';

@Component({
  selector: 'app-edit-reminder-opener',
  templateUrl: './edit-reminder-opener.component.html',
  styleUrls: ['./edit-reminder-opener.component.css']
})
export class EditReminderOpenerComponent implements OnInit {

  reminderId: number;

  constructor(private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private routerService: RouterService) {

    this.activatedRoute.params.subscribe(params => {
      this.reminderId = params['reminderId'];
      console.log("params is ===========>" + JSON.stringify(params['reminderId']));
    }


    );

    this.dialog.open(EditReminderViewComponent, {
      data: {
        reminderId: this.reminderId


      }
    })
      .afterClosed().subscribe(result => {
        this.routerService.routeBack();
      });
  }




  ngOnInit() {
  }

}
