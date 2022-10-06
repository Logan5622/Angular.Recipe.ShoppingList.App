import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector:'app-alerts',
    templateUrl:'./alerts.component.html',
    styleUrls:['./alerts.component.css']
})
export class AlertsComponent{
    @Input() message: string;
    @Output() close = new EventEmitter<void>();

    onClose(){
        this.close.emit();
    }
}