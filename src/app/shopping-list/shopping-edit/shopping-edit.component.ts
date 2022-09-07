import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm : NgForm;
  subcription : Subscription;
  editMode = false;
  editItemIndex : number;
  editedIngredient : ingredient;
  // @ViewChild('inputName') inputNameRef : ElementRef;
  // @ViewChild('inputAmount') inputAmountRef : ElementRef;

//  @Output() ingredientValueAdded = new EventEmitter<{name: string, amount: number}>();
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subcription = this.slService.ingredientEditing.subscribe(
      (index: number) =>{
        this.editMode = true;
        this.editItemIndex = index;
        this.editedIngredient = this.slService.getIngredientbyId(index);
        this.slForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        });
      }
    );
  }

  AddorEditItem(form: NgForm)
  {
    // const inputName = this.inputNameRef.nativeElement.value;
    // const inputAmount = this.inputAmountRef.nativeElement.value;

    // console.log(inputName);
    // console.log(inputAmount);

    const ingredientValue = new ingredient(form.value.name,form.value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editItemIndex,ingredientValue);
    }
    else{
      this.slService.addedIngredient(ingredientValue);
    }
    this.editMode =false;
    this.slForm.reset();
    // this.ingredientValueAdded.emit(ingredientValue);
    console.log("after emit", ingredientValue );
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
   this.subcription.unsubscribe(); 
  }
}
