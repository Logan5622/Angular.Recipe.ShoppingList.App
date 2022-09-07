import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: ingredient[];
  private ingredientChangeSub : Subscription;
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    
    this.ingredientChangeSub = this.slService.ingredientsChanges.subscribe(
      (ingredients: ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
    this.ingredients = this.slService.getIngredient();
  }

  onEditItem(index : number){
    this.slService.ingredientEditing.next(index);
  }

  ngOnDestroy(): void {
    this.ingredientChangeSub.unsubscribe();
  }

 
}
