import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-keepnav',
  templateUrl: './keepnav.component.html',
  styleUrls: ['./keepnav.component.css']
})
export class KeepnavComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private routerService: RouterService
  ) { }

  ngOnInit() {
  }

  logoutUser() {
    this.authService.logoutUser();
    this.routerService.routeToLogin();
  }

  onCategory() {
    this.routerService.routeToCategoryDashboard();
  }

  onReminder() {
    this.routerService.routeToReminderDashboard();
  }

  onNotes() {
    this.routerService.routeToNoteView();
  }


}
