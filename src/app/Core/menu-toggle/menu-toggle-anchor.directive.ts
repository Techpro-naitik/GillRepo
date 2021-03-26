import { Directive, HostListener, Inject, NgZone } from '@angular/core';

import { MenuToggleLinkDirective } from './menu-toggle-link.directive';

@Directive({
  selector: '[menuToggle]'
})
export class MenuToggleAnchorDirective {

  protected navlink: MenuToggleLinkDirective;

  constructor(@Inject(MenuToggleLinkDirective) navlink: MenuToggleLinkDirective,
    public ngZone: NgZone
  ) {
    this.navlink = navlink;
  }

  @HostListener('click', ['$event'])
  onClick(e: any) {
    this.navlink.toggle();
    setTimeout(() => {
      let myIndex = 0;
      let immutableObject = Object.assign([], this.navlink['nav']['navlinks']);
      for (let i = 0; i < immutableObject.length; i++) {
        if (immutableObject[i]['_open'] === true) {
          myIndex = i;
          break;
        }
      }
      if (myIndex >= 0) {
        localStorage.setItem('indexOfsideMenu', JSON.stringify(myIndex));
      }
    }, 800);
  }

}