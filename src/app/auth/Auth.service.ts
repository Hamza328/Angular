import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, ReplaySubject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  assignNull =new User(null,null,null,null);
  user = new BehaviorSubject<User>(this.assignNull);

  constructor(private http: HttpClient,
              private router:Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.FirebaseApiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {

    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.FirebaseApiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          console.log(resData);
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  Autologin(){
   const userData:{
     email:string,
     id:string,
     _token:string,
     tokenExpirationDate:Date
   }  = JSON.parse(localStorage.getItem('userData')!);

   if(!userData){
     return;
   }

   const loadedUser =new User(
     userData.email,
     userData.id,
     userData._token,
     new Date(userData.tokenExpirationDate));

     if(loadedUser.token){
        this.user.next(loadedUser);
     }

  }

  logout(){
    this.user.next(this.assignNull);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
  }

  private handleAuthentication(
    email: string,
    userid: string,
    token: string,
    expireIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expireIn * 1000);
    const user = new User(email, userid, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user))
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error Occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This Email Is already Exist!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This Email does not Exist!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This Password Is not correct!';
        break;
    }
    return throwError(errorMessage);
  }
}
