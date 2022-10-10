import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BasicHighlightDirective } from "../basic-highlight/basic-highlight.directive";
import { AlertsComponent } from "./alerts/alerts.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";

@NgModule({
    declarations:[
        BasicHighlightDirective,
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertsComponent,
    PlaceholderDirective
    ],
    imports:[
        CommonModule
    ],
    exports:[
        BasicHighlightDirective,
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertsComponent,
    PlaceholderDirective,
    CommonModule
    ]

})
export class SharedModule{

}