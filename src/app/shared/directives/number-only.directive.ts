import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {

  constructor(private elm: ElementRef) { }
  @HostListener("input", ['$event'])
  onInputChange($event: any) {
    const intialValue = this.elm.nativeElement.value;
    if (intialValue === 0) {
      this.elm.nativeElement.value = "";
    }
    else {
      this.elm.nativeElement.value = intialValue.replace(/[^0-9]*/g);
      if (intialValue !== this.elm.nativeElement.value) {
        event?.stopPropagation();
      }
    }
  }

}
