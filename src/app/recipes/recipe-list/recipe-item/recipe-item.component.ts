import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipeValue: Recipe ;
  @Input() index:number;


  name ='';
  // @Output() recipeSelected = new EventEmitter<void>();
   constructor(private recipeService : RecipeService) {
   
    }

  ngOnInit(): void {
    
  }
  // OnSelect()
  // {
  //   this.recipeService.recipeSelected.emit(this.recipeValue);
  //   // this.recipeSelected.emit();
  // }
}
