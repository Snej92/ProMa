import {Directive, ElementRef, HostListener, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appProjectElevation]'
})
export class HoverElevationDirective implements OnChanges{

  @Input()defaultElevation = 2;
  @Input()raisedElevation = 8;

  constructor(private element:ElementRef,
              private renderer:Renderer2) {
    this.setElevation(this.defaultElevation);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setElevation(this.defaultElevation);
  }

  @HostListener('mouseenter')
  onMouseEnter(){
    this.setElevation(this.raisedElevation);
  }

  @HostListener('mouseleave')
  onMouseLeave(){
    this.setElevation(this.defaultElevation);
  }

  setElevation(amount: number) {
    // remove all elevation classes
    const classesToRemove = Array.from((<HTMLElement>this.element.nativeElement).classList).filter(c => c.startsWith('mat-elevation-z'));
    classesToRemove.forEach((c) => {
      this.renderer.removeClass(this.element.nativeElement, c);
    });

    // add the given elevation class
    const newClass = `mat-elevation-z${amount}`;
    this.renderer.addClass(this.element.nativeElement, newClass);
  }
}
