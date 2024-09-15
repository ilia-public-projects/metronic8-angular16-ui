import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from "@angular/core";

@Directive({ selector: '[appBackImg]' })
export class BackImgDirective implements OnChanges {
    @Input() appBackImg = ''
    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnChanges() {
        this.setBackImg()
    }

    setBackImg() {
        this.renderer.setStyle(this.el.nativeElement, 'background-image', 'url(' + this.appBackImg + ')')
    }
}