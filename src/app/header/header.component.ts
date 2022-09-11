import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component(
{
    selector: 'app-header',
    templateUrl:'./header.component.html'
})

export class headerComponent implements OnInit, OnDestroy{
    constructor(private dataStorageService:  DataStorageService, private authService : AuthService){}
     UserSub : Subscription;
    isAuthenticated = false;
    
    ngOnInit(){
       this.UserSub = this.authService.user.subscribe(
        userData => {
            this.isAuthenticated = !!userData;
            console.log(!userData)
            console.log(!!userData)
        }
       );
    }


// @Output() selectedFeature = new EventEmitter<string>();
//     collapsed = true;
//     OnClick(feature : string)
//     {
//         this.selectedFeature.emit(feature);
//     }

onSaveData(){
this.dataStorageService.saveReipes();
}

onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
}

onLogout(){
    this.authService.logout();
}
ngOnDestroy(): void {
    this.UserSub.unsubscribe();
}
}