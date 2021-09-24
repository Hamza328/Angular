import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id!:number;
  editMode=false;
  recipeForm!:FormGroup;
  constructor(private route: ActivatedRoute,
              private router:Router,
              private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
         this.id = +params['id'];
         this.editMode =params['id'] != null;
         this.initForm();
      }
    )
  }

  private initForm(){
    let recipeName="";
    let recipeImagepath="";
    let recipeDescription="";
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe= this.recipeService.getRecipe(this.id)
      recipeName=recipe.name;
      recipeDescription=recipe.description;
      recipeImagepath= recipe.imagePath;
      if(recipe['ingredients']){
        for(let ing of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name':new FormControl(ing.name,Validators.required),
              'amount':new FormControl(ing.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(recipeImagepath,Validators.required),
      'description': new FormControl(recipeDescription,Validators.required),
      'ingredients':recipeIngredients
    })
  }
  onSubmit(){
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value)
    }else{
      this.recipeService.AddRecipe(this.recipeForm.value);
    }
    this.OnCancel();
  }

  get Ing(){
   return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name':new FormControl(null,Validators.required),
      'amount':new FormControl(null,[
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
    }))
  }

  OnCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  OndeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }


}
