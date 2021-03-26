import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { VerticalLayoutComponent } from 'app/Layouts/VerticalLayout/VerticalLayout.component';

@Component({
   selector: 'anglo-language-drop-down',
   templateUrl: './LanguageDropDown.component.html',
   styleUrls: ['./LanguageDropDown.component.scss']
})

export class LanguageDropDownComponent implements OnInit {

   currentLang = 'en';
   selectImage = '/assets/img/en.png';

   langArray: any[] = [
      {
         img: "/assets/img/en.png",
         name: "English",
         value: "en",
         rtl: false
      },
      {
         img: "/assets/img/he.png",
         name: "Hebrew",
         value: "he",
         rtl: true
      },
      // {  
      //    img:"/assets/img/france.png",
      //    name:"French",
      //    value:"fr"
      // },    
      // {  
      //    img:"/assets/img/ru.png",
      //    name:"Russian",
      //    value:"ru"
      // },
      // {  
      //    img:"/assets/img/ar.png",
      //    name:"Arabic",
      //    value:"ar"
      // },
      // {  
      //    img:"/assets/img/china.png",
      //    name:"Chinese",
      //    value:"zh"
      // },
      // {  
      //    img:"/assets/img/german.png",
      //    name:"German",
      //    value:"de"
      // },
      // {  
      //    img:"/assets/img/spanish.jpg",
      //    name:"Spanish",
      //    value:"es"
      // },
      // {  
      //    img:"/assets/img/japan.jpeg",
      //    name:"Japanese",
      //    value:"ja"
      // },
      // {  
      //    img:"/assets/img/korean.jpg",
      //    name:"Korean",
      //    value:"ko"
      // },
      // {  
      //    img:"/assets/img/italian.png",
      //    name:"Italian",
      //    value:"it"
      // },
      // {  
      //    img:"/assets/img/hungary.png",
      //    name:"Hungarian",
      //    value:"hu"
      // },

   ];

   constructor(public translate: TranslateService, private layout: VerticalLayoutComponent) {
      const lang = localStorage.getItem('currentLanguage');
      if (lang) {
         translate.use(lang);
         for (let data of this.langArray) {
            if (data.value == lang) {
               this.selectImage = data.img;
               layout.changeRTL(data.rtl);
               break;
            }
         }
      }
   }

   ngOnInit() {
   }

   getLang(lang) {
      for (let data of this.langArray) {
         if (data.value == lang) {
            this.selectImage = data.img;
            this.layout.changeRTL(data.rtl);
            break;
         }
      }
      this.translate.use(lang);
      localStorage.setItem('currentLanguage', lang);
   }
}
