import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { GuardGuard } from "../auth/guard.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeResolver } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";


const routes:Routes =[
  {path:'', component: RecipesComponent,canActivate:[GuardGuard],

  children:[
    {path: '', component: RecipeStartComponent},
    {path: 'new', component:RecipeEditComponent},
    {
      path: ':id',
      component:RecipeDetailComponent,
      resolve:{RecipeResolver}
    },
    {
      path: ':id/edit',
      component:RecipeEditComponent,
      resolve:{RecipeResolver}
    }

  ]
 },
];

@NgModule({
  declarations:[],
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class RecipeRoutingModule{

}
