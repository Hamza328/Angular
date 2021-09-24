import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

  @Input() set appUnless(value :boolean){
     if(!value){
      this.vcref.createEmbeddedView(this.tRef);
     }
     else{
      this.vcref.clear();
     }
  }

  constructor(private tRef: TemplateRef<any>,private vcref: ViewContainerRef) { }

}
