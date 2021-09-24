import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,

  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { AuthService } from './Auth.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authservice:AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {

   return this.authservice.user.pipe(take(1),
    exhaustMap(user=>{
      // if(user.token==null){
      //   console.log('if-------')
      //   return next.handle(request);

      // }else{}

      const reqmodified= request.clone({params:
        new HttpParams().set('auth',user.token!)
      })
      return next.handle(reqmodified);
    }))


  }
}
