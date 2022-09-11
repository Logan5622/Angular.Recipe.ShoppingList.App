import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent{

    isLoginMode = true;
    isLoading = false;
    errorValue: string = null;

    constructor(private authService :AuthService, private router : Router ){}

    onSwitchMode(){
        this.isLoginMode= !this.isLoginMode;
    }
    
    onSubmit(form : NgForm){
        console.log(form.value)

        if(!form.valid){
            return ;
        }

        const email = form.value.email;
        const password = form.value.password;
        let authObservable : Observable<AuthResponseData>;

        if(this.isLoginMode){
            this.isLoading = true;
            authObservable = this.authService.login(email, password);
        }
        else{
            this.isLoading = true;
           authObservable = this.authService.signgUp(email, password);
            
        }

        authObservable.subscribe(
            responseData => {
                console.log(responseData);
                this.isLoading = false;
                this.router.navigate(['/recipes'])
        },
        errorMessage => { 
            console.log(errorMessage); 
            this.errorValue = errorMessage;
            this.isLoading = false;
        }
        );
        
        form.reset();
    }
}