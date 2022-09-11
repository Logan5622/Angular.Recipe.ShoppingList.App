import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn:'root'})
export class DataStorageService{
    constructor(private http: HttpClient, private recipeService : RecipeService, private authService : AuthService){

    }

    saveReipes(){
        const recipes = this.recipeService.getRecipe();
        this.http.put('https://demoapp-recipebook-angular-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',recipes)
        .subscribe(
            reponse => {
                console.log(reponse);
            }
        )
    }

    fetchRecipes(){

        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => 
                {
                     return this.http.get<Recipe[]>(
                        'https://demoapp-recipebook-angular-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
                     , {
                        params: new HttpParams().set('auth', user.token)
                        });
                     
                }),
                map(
                    recipes => {
                        return recipes.map(recipe => {
                            return {...recipe,ingredients : recipe.ingredients ? recipe.ingredients : []
                            };
                        });
                    }
                ), tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
                
            
        );
      
        // .pipe()
        
        // .subscribe(recipes =>{
            
        // })

    }

}