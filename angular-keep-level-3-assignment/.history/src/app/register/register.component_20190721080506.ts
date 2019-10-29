import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;

  firstName = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
  lastName = new FormControl('', Validators.compose([Validators.required, Validators.minLength(1)]));
  userRole = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
  password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)]));
  Confirmpassword = new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)]));
  userId = new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)]));

  constructor(private routerService: RouterService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userRole: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]],
      userId: ['', [Validators.required]]
    });
  }


  onLogin() {
    this.routerService.routeToLogin();
  };

  onSubmit() {

    if (this.password === this.Confirmpassword){
      console.log("inside matched password  "+this.password+ "===="+this.Confirmpassword);
 

    this.authService.register({
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      userMobile: this.userRole.value,
      userRole: this.userRole.value,
      userId: this.userId.value,
      userPassword: this.password.value
    })

      .subscribe(
        res => {
          console.log("user registration status object is " + JSON.stringify(res));



          console.log("inside register success ");
          this.errorMessage = "Sucessfully registered";
          this.routerService.routeToLogin();


        },
        err => {

          console.log("inside register error" + JSON.stringify(err));
          this.errorMessage = err.error;

        });

      }

        else{
          console.log("inside unmatched password"+this.password.value+ "===="+this.Confirmpassword.value);
          this.errorMessage = "password and confirm password must be same";

        }
  }

}
