import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

 const routes:Routes=[
   {path:'', redirectTo: '/shopping-list',pathMatch: 'full'},
   {
    path:'recipes',
    loadChildren:() => import('./recipes/recipes.module').then(m => m.RecipesModule)
   }

 ];



@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports:[RouterModule]

})
export class AppRoutingModule { }
