import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  
})
export class RecipeListComponent implements OnInit, OnChanges, OnDestroy {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] ;
  subcription : Subscription;
  constructor(private recipeService : RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(){
    this.recipes = this.recipeService.getRecipe();
    console.log("recipe list component");
    this.subcription = this.recipeService.recipeChanged.subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
    );
    console.log("recipe list component" + this.recipes);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.recipeService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
  );
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe()
  }
  // OnselectedRecipe(recipe : Recipe)
  // {
  //   this.recipeWasSelected.emit(recipe);
  // }

  onCreate()
  {
    this.router.navigate(['new'],{relativeTo: this.route})
  }


}
