import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
   recipeValueReceived : Recipe;
   id: number;
  constructor(private recipeService:  RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) => {
        this.id= +params['id'];
        this.recipeValueReceived = this.recipeService.getRecipeById(this.id);
      }
    );
  }

  OnEdit()
  {
    this.router.navigate(['edit'], {relativeTo:this.route}) ; 
    //this.router.navigate(['../',this.id,'edit'], {relativeTo:this.route}) ; // another complex routing we can handle
  
  }
  addIngredientstoSL()
  {
    this.recipeService.addIngredientsintoShoppingList(this.recipeValueReceived.ingredients);
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/'],{relativeTo:this.route});
  }
}
