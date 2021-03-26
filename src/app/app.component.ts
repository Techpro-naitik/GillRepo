import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
   selector: 'app-root',
   template: `<router-outlet></router-outlet>
     <ngx-spinner bdColor="rgba(51,51,51,0.7)" size="large" color= "#fff" type="ball-clip-rotate" [fullScreen] = "true"
     ></ngx-spinner>`
})
export class AppComponent {
   constructor(translate: TranslateService) {
      // translate.addLangs(['en', 'fr', 'he', 'ru', 'ar', 'zh', 'de', 'es', 'ja', 'ko', 'it', 'hu']);
      translate.addLangs(['en', 'he']);
      translate.setDefaultLang('en');
      // const browserLang: string = translate.getBrowserLang();
      // console.log(browserLang);
      // translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
   }
}
