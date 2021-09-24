import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') slForm!:NgForm;
  editMode=false;
  editedItemIndex!:number;
  editedItem!:Ingredient
  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.slService.EditedItemIndex.subscribe(
      (index:number)=>{
        this.editMode=true;
        this.editedItemIndex=index;
         this.editedItem=this.slService.getIngredient(index);
         this.slForm.setValue({
           name:this.editedItem.name,
           amount: this.editedItem.amount
         })
      }
    )
  }

  onSubmit(form: NgForm) {
    let value= form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, ingredient);
    }
    else{
      this.slService.AddIngredient(ingredient);
    }
    this.onClear();
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

}
