import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
    ingredientsChanges = new Subject<ingredient[]>();
    ingredientEditing = new Subject<number>();
    private ingredients: ingredient[] = [
        new ingredient('Apples',5),
        new ingredient('tomato',10)
      ];

      getIngredient()
      {
        return this.ingredients.slice();
      }

      getIngredientbyId(index: number)
      {
        return this.ingredients[index];
      }
      addedIngredient(ingredientValue : ingredient)
      {
        console.log(ingredientValue);
        this.ingredients.push(ingredientValue);
        this.ingredientsChanges.next(this.ingredients.slice());
        
      }

      updateIngredient(index: number, newIngredient : ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanges.next(this.ingredients.slice());
      }

      deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientsChanges.next(this.ingredients.slice());
      }

      addIngredients(ingredients: ingredient[])
      {
        this.ingredients.push(...ingredients);
      }
}