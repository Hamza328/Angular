import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './Auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isloginMode = true;
  isLoading = false;
  error: string|null = null;
  constructor(private authservice: AuthService,
              private router:Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isloginMode = !this.isloginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return true;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isloginMode) {
      authObs = this.authservice.login(email, password);
    } else {
      authObs = this.authservice.signup(email, password);
    }

    authObs.subscribe(
      (responseData) => {
        this.router.navigate(['/recipes']);
        this.isLoading = false;
      },
      (errormesage) => {
        this.error = errormesage;
        this.isLoading = false;
      }
    );
    form.reset();
    return false;
  }
  onHandleError(){
    this.error =null;
  }
}
