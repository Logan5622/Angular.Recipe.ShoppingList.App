import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertsComponent } from "../shared/alerts/alerts.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent implements OnDestroy{

    isLoginMode = true;
    isLoading = false;
    errorValue: string = null;
    closeSub : Subscription;
    @ViewChild(PlaceholderDirective) alertHost : PlaceholderDirective; 

    constructor(private authService :AuthService, private router : Router, 
        private componentFactoryResolver: ComponentFactoryResolver){}

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
            this.onShowErrorAlert(errorMessage);
            this.isLoading = false;
        }
        );
        
        form.reset();
    }

    onErrorHandler(){
        this.errorValue = null;
    }

    
    private onShowErrorAlert(message : string){
       const alertComponentFactory = this.componentFactoryResolver
       .resolveComponentFactory(AlertsComponent);
       const hostviewContainerRef = this.alertHost.viewContainerRef;
       hostviewContainerRef.clear();

       const componentRef = hostviewContainerRef.createComponent(alertComponentFactory);
       componentRef.instance.message = message;
       this.closeSub = componentRef.instance.close.subscribe(() => {
        this.closeSub.unsubscribe();
        hostviewContainerRef.clear();
       });

    }

    ngOnDestroy(): void {
        this.closeSub.unsubscribe();
    }
}