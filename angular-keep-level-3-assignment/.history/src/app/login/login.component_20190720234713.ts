import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
//import {HttpResponse} from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  public bearerToken: any;
  public submitMessage: string;
  constructor(private authService: AuthenticationService,
    private routerService: RouterService) {
    }
  loginSubmit() {
    const user: any = { userId: this.username.value, userPassword: this.password.value };
    if (this.username.hasError('required') || this.password.hasError('required')) {
      this.submitMessage = 'Username and Password required';
    } else {
      this.authService.authenticateUser(user).subscribe(
        res => {
         console.log(res);
          this.bearerToken = res;
          // this.bearerToken = res.body["token"]

           console.log("token is =========>"+this.bearerToken);
            this.authService.setBearerToken(this.bearerToken);
            this.authService.setUserId(this.username.value);
            this.routerService.routeToDashboard();
          },
          err => {
            console.log("indide error");
            if (err.status === 404) {
              console.log("inside 404");
              this.submitMessage = err.message;
            } else {
              // this.submitMessage = err.error.message;
              this.submitMessage = "user is not register";
              console.log(err.message);
            }
            
        });
      }
  }

  onRegister(){
    this.routerService.routeToRegister();
  }
}
