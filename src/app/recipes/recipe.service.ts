import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
  recipeChanged = new Subject<Recipe[]>();
    // private recipes: Recipe[] = [
    //     new Recipe('Briyani','This is Hybredabad Briyani',
    //     'https://media.architecturaldigest.in/wp-content/uploads/2019/10/Mumbai-Best-Biryani-Awadhi-gosht-chap-biryani-at-Ummrao.jpg',
    //     [
    //         new ingredient('chiken', 2),
    //         new ingredient('rice',1)
    //     ]),
    //     new Recipe('!st Briyani','This is Hybredabad Briyani',
    //     'https://media.architecturaldigest.in/wp-content/uploads/2019/10/Mumbai-Best-Biryani-Awadhi-gosht-chap-biryani-at-Ummrao.jpg',
    //     [
    //         new ingredient('rice',1)

    //     ]),
    //     new Recipe('# stBriyani','This is Hybredabad Briyani',
    //     'https://media.architecturaldigest.in/wp-content/uploads/2019/10/Mumbai-Best-Biryani-Awadhi-gosht-chap-biryani-at-Ummrao.jpg',
    //     [
    //         new ingredient('rice',1)
    //     ])
    //   ];

    private recipes: Recipe [] = [];

      constructor(private slService: ShoppingListService) {}

      addRecipe(recipe : Recipe){
        console.log(recipe);
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
        console.log("Add Recipe" );
        
      }

      updateRecipe(index : number, recipe : Recipe){
        console.log(recipe);
        this.recipes[index] = recipe;
        this.recipeChanged.next(this.recipes.slice());
        console.log(this.recipes.slice());
      }

      deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
      }

      getRecipe()
      {
        return this.recipes.slice();
        
      }

      getRecipeById(index : number)
      {
       return this.recipes[index];
      }

      addIngredientsintoShoppingList(ingredients: ingredient[])
      {
        this.slService.addIngredients(ingredients);
      }

      setRecipes(recipes : Recipe []){
       this.recipes =  recipes;
       this.recipeChanged.next(this.recipes.slice());
      }
    
}