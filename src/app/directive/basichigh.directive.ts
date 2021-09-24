import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appBasichigh]'
})
export class BasichighDirective implements OnInit {

  constructor(private elementref:ElementRef) { }

  ngOnInit(){
    this.elementref.nativeElement.style.backgroundColor='green';
  }

}
