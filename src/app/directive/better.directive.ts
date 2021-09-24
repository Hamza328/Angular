import {
   Directive,
   ElementRef,
   HostBinding,
   HostListener,
   Input,
   OnInit,
   Renderer2
  } from '@angular/core';

@Directive({
  selector: '[appBetter]'
})
export class BetterDirective implements OnInit {

  @Input() defaultcolor:string ='transparent';
  @Input('appBetter') highlightColor:string='blue';

  @HostBinding('style.backgroundColor') backgroundColor: string ='transparent';
  constructor(private elref: ElementRef,private rendere:Renderer2) { }

  ngOnInit(){
    // this.rendere.setStyle(this.elref.nativeElement,'background-color','blue');
    this.backgroundColor=this.defaultcolor;
  }

  @HostListener('mouseenter') mouseover(eventData: Event){
    // this.rendere.setStyle(this.elref.nativeElement, 'background-color','green');
    this.backgroundColor=this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event){
    // this.rendere.setStyle(this.elref.nativeElement, 'background-color','transparent');
    this.backgroundColor=this.defaultcolor;

  }

}
