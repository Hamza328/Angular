import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChanged =new Subject<Ingredient[]>();
  EditedItemIndex =new Subject<number>();

  private ingredients: Ingredient[]=[
    new Ingredient('apples',2),
    new Ingredient('Tomatoes',5)
  ]

  constructor() { }

  getingredients(){
   return this.ingredients.slice();
  }

  getIngredient(index:number){
    return this.ingredients[index];
  }

  AddIngredient(ing:Ingredient){
    this.ingredients.push(ing);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  AddIngredients(ing:Ingredient[]){
    this.ingredients.push(...ing);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  updateIngredient(index:number, newIng:Ingredient){
    this.ingredients[index]=newIng;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }

}
