import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;
  recipeForm : FormGroup;
  constructor(private route: ActivatedRoute, private recipeService : RecipeService, private router : Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.formInit();
        console.log(this.editMode);
      }
    );

    
  }

  onSubmit(){
    const recipevalue = new Recipe(this.recipeForm.value['name'],
    this.recipeForm.value['description'],
    this.recipeForm.value['imagepath'],
    this.recipeForm.value['ingredients']) ;
    if(this.editMode){
      console.log(" if onsubmit ");
      this.recipeService.updateRecipe(this.id,recipevalue);
      console.log("if onsubmit end");
      
    }
    else{
      console.log("else onsubmit end");
      this.recipeService.addRecipe(recipevalue);
      console.log("else onsubmit end");
      
    }
    console.log("onsubmit end");
    //this.onCancel();
  }

  onCancel(){
    this.router.navigate(['/recipes'], {relativeTo:this.route});
  }

  onAddIngredient(){
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,[Validators.required, Validators.pattern(/[1-9]+[0-9]*$/)])
      })
    );
  }

  onDeleteIngredient(index : number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  get controls(){
    //return (<FormArray>this.recipeForm.get('ingredients')).controls;
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  private formInit(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription= '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode)
    {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){
          for (let ingredient of recipe.ingredients)
          {
            recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [Validators.required,
                      Validators.pattern(/[1-9]+[0-9]*$/)])
            })
            );
          }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagepath' : new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients

    });

  }
}
