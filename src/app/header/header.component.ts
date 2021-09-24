import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/Auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: '../header/header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy{

  isAuthenticated =false;
  subscription!:Subscription;

 constructor(private dataService:DataStorageService,
             private authService:AuthService){}

 ngOnInit(){
   this.subscription=this.authService.user.subscribe(
     user=>{
       if(user.token != null){
      this.isAuthenticated =!!user;
       }
       else{
         this.isAuthenticated=false;
       }
     }
   )
 }

 onSaveData(){
   this.dataService.storeRecipe();

 }
 onFetchData(){
   this.dataService.Fetchrecipes().subscribe();
 }

 Onlogout(){
   this.authService.logout();
 }

 ngOnDestroy(){
   this.subscription.unsubscribe();
 }

}
