import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model"

@Injectable({
  providedIn: 'root'
})
export class RecipeService{

  Recipechange =new Subject<Recipe[]>();

  // private recipes: Recipe[]=[new Recipe(
  //   'Test',
  //   'This is a Test ',
  //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpMv22xEzmP9_lwBEC6EHgUPKgi7yl8BK-Ug&usqp=CAU',
  //    [
  //      new Ingredient('meat',2),
  //      new Ingredient('rice',3)
  //    ]
  // ),new Recipe(
  //   'Test 2',
  //   'This is a Test 2 ',
  //   'https://static.toiimg.com/thumb/85893733.cms?width=573&height=382&imgsize=137472',
  //    [
  //      new Ingredient('bun',4),
  //      new Ingredient('meat',8)
  //    ]
  // )]
  private recipes:Recipe[]=[];

  constructor(private slService:ShoppingListService){

  }
  setRecipe(recipe:Recipe[]){
     this.recipes=recipe;
     this.Recipechange.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(id:number){
    return this.recipes[id];
  }

  addIngredientToShoppingList(ing: Ingredient[]){
    this.slService.AddIngredients(ing);
  }

  AddRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.Recipechange.next(this.recipes.slice());
  }
  updateRecipe(index:number, newrecipe:Recipe){
    this.recipes[index]=newrecipe;
    this.Recipechange.next(this.recipes.slice());

  }
  delete(index:number){
    this.recipes.splice(index,1);
    this.Recipechange.next(this.recipes.slice());
  }

}
