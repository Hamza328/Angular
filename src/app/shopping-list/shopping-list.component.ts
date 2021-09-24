import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {Ingredient} from '../shared/ingredient.model'
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  inChangeSub!: Subscription;
  ingredients!: Ingredient[];
  constructor(private slService:ShoppingListService) { }

  ngOnInit(){


    this.ingredients = this.slService.getingredients();
    this.inChangeSub=this.slService.ingredientChanged.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients= ingredients;
      }
    )
  }

  onEditItem(index:number){
   this.slService.EditedItemIndex.next(index);
  }

  ngOnDestroy(){
    this.inChangeSub.unsubscribe();
  }

}
