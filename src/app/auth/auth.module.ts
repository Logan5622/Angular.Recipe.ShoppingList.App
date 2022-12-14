import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations:[ AuthComponent],
    imports:
    [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path:'auth', component: AuthComponent}]),
        ReactiveFormsModule,
        SharedModule
    ],
    exports:[
        AuthComponent,
    RouterModule],
})
export class AuthModule{

}