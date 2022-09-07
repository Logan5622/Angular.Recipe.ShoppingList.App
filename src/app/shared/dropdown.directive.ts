import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive(
    {
        selector:'[appdropdown]'
    }
)
export class DropdownDirective{

    @HostBinding('class.open') isOpen = false;
    // @HostListener('click') toggleopen()
    // {
    //     this.isOpen = !this.isOpen;
    // }

    @HostListener('document:click',['$event']) toggleopen1(event : Event)
    {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }

    constructor(private elRef: ElementRef)
    {
        
    }

}