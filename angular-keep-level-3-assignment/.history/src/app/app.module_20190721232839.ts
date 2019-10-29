import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { HeaderComponent } from './header/header.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { Routes, RouterModule } from '@angular/router';
import { ListViewComponent } from './list-view/list-view.component';
import { MatSelectModule } from '@angular/material/select';
import { AuthenticationService } from './services/authentication.service';
import { NotesService } from './services/notes.service';
import { RouterService } from './services/router.service';
import { RegisterComponent } from './register/register.component';
import { KeepnavComponent } from './keepnav/keepnav.component';
import { CategorydashboardComponent } from './categorydashboard/categorydashboard.component';
import { CategoryTakerComponent } from './category-taker/category-taker.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { EditCategoryOpenerComponent } from './edit-category-opener/edit-category-opener.component';
import { EditCategoryViewComponent } from './edit-category-view/edit-category-view.component';
import { CategoryComponent } from './category/category.component';
import { CategoryService } from './category.service';
import { ReminderdashboardComponent } from './reminderdashboard/reminderdashboard.component';
import { ReminderComponent } from './reminder/reminder.component';
import { ReminderTakerComponent } from './reminder-taker/reminder-taker.component';
import { EditReminderViewComponent } from './edit-reminder-view/edit-reminder-view.component';
import { EditReminderOpenerComponent } from './edit-reminder-opener/edit-reminder-opener.component';
import { ReminderViewComponent } from './reminder-view/reminder-view.component';
import { ReminderService } from './reminder.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material';

const appRoutes: Routes = [

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
   // canActivate: [CanActivateRouteGuard],
    children: [
      {
        path: '',
        redirectTo: 'view/noteview',
        pathMatch: 'full'
      },
      {
        path: 'view/noteview',
        component: NoteViewComponent
      },
      {
        path: 'view/listview',
        component: ListViewComponent
      },
      {
        path: 'note/:noteId/edit',
        component: EditNoteOpenerComponent,
        outlet: 'noteEditOutlet'
      }
    ]
  },
  {
    path: 'category', 
    component: CategorydashboardComponent,
   // canActivate: [CanActivateRouteGuard],
    children: [
      {
        path: 'view/categoryview',
        component: CategoryViewComponent
      },
      {
        path: 'category/:categoryid/edit',
        component: EditCategoryOpenerComponent,
        outlet: 'catEditOutlet'
      },
      {
        path: '',
        redirectTo: 'view/categoryview',
        pathMatch: 'full'
      },
    ]
  },

  {
    path: 'reminder',
    component: ReminderdashboardComponent,
    //canActivate: [CanActivateRouteGuard],
    children: [
      {
        path: '',
        redirectTo: 'view/reminderview',
        pathMatch: 'full'
      },
      {
        path: 'view/reminderview',
        component: ReminderViewComponent
      },

      {
        path: 'reminder/:reminderId/edit',
        component: EditReminderOpenerComponent,
        outlet: 'reminderEditOutlet'
      }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }

];

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    LoginComponent,
    DashboardComponent,
    NoteTakerComponent,
    NoteViewComponent,
    EditNoteOpenerComponent,
    EditNoteViewComponent,
    HeaderComponent,
    ListViewComponent,
    RegisterComponent,
    KeepnavComponent,
    CategorydashboardComponent,
    CategoryTakerComponent,
    CategoryViewComponent,
    EditCategoryOpenerComponent,
    EditCategoryViewComponent,
    CategoryComponent,
    ReminderdashboardComponent,
    ReminderComponent,
    ReminderTakerComponent,
    EditReminderViewComponent,
    EditReminderOpenerComponent,
    ReminderViewComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    FormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatRadioModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    CanActivateRouteGuard,
    AuthenticationService,
    NotesService,
    RouterService,
    CategoryService,
    ReminderService
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditNoteViewComponent, EditCategoryViewComponent,EditReminderViewComponent]
})

export class AppModule { }
