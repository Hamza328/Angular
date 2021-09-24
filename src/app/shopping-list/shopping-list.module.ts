import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";


import { BetterDirective } from "../directive/better.directive";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";


@NgModule({
  declarations:[
    ShoppingListComponent,
    BetterDirective,
    ShoppingEditComponent
  ],
  imports:[
    FormsModule,
    RouterModule.forChild([
      {path: 'shopping-list',component: ShoppingListComponent}
    ]),
    SharedModule
  ]
})
export class ShoppingListModule{

}
