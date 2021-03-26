import { Component, OnInit, ViewChild, SimpleChange, Input, Output } from '@angular/core';
import { MatTab } from '@angular/material/tabs';
import { HttpClient } from '@angular/common/http';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;

interface tabs {
  title: string;
  icon: string;
  cvpId: number,
  data: any[];
  role: string;
  html: string;
}

@Component({
  selector: 'app-artistspreviewforcaster',
  templateUrl: './artistspreviewforcaster.component.html',
  styleUrls: ['./artistspreviewforcaster.component.css']
})
export class ArtistspreviewforcasterComponent implements OnInit {

  @ViewChild('matTabRef', { static: false }) matTabRef: MatTab;
  tabsArray: tabs[];

  @Input('pages') pages: any[];
  @Input('artists') artists: any[];
  @Input('flags') flags: object;

  @Output('handleTabs') handleTabs = new EventEmitter();

  activeTab: number = 0;

  constructor(private http: HttpClient, private dom: DomSanitizer,
    private translate: TranslateService) { }

  ngOnChanges(change: SimpleChange) {
    if (change['pages']) {
      this.tabsArray = [];
      for (let index = 0; index < change['pages'].currentValue.length; index++) {
        this.tabsArray.push({
          title: change['pages'].currentValue[index].title,
          icon: 'people',
          cvpId: change['pages'].currentValue[index].id,
          data: [],
          role: 'tab',
          html: ''
        });
      }
    }
    if (change['artists']) {
      this.artists = change['artists'].currentValue;
      if (this.tabsArray.length > 0) {
        this.tabsArray.forEach(e => {
          e.data = this.artists.filter(f => f.casterViewPageId == e.cvpId);
          e.html = this.generateHTML(e.data);
        });
        // console.log(this.tabsArray);
        this.emitTabsData();
      }
    }
    if (change['flags']) {
      this.flags = change['flags'].currentValue;
      if (this.tabsArray.length > 0) {
        this.tabsArray.forEach(e => {
          // e.data = this.artists.filter(f => f.partTitle == e.title);
          e.html = this.generateHTML(e.data);
        });
        this.emitTabsData();
      }
    }
    // console.log(this.artists);
  }

  ngOnInit() {
    $(document).on('click', '.t1', function () {
      const id = $(this).attr('data-id');
      // console.log(id);
      if ($(this).prop("checked") == true) {
        // console.log("Checkbox is checked.");
        $(`#txt${id}`).show();
      }
      else {
        console.log('false');
        $(`#txt${id}`).hide();
      }
    });
  }

  generateHTML(data): string {
    let finalhtml = `<meta http-equiv="cache-control" content="no-cache" />`;
    for (let i = 0; i < data.length; i++) {
      var html = "";
      html += `<div style="background-color:#f8f8f8;border-top:1px solid #e1e1e1;	border-bottom:1px solid #e1e1e1;padding:5px 0px;margin-bottom:10px;height:205px;">`;
      if (data[i].description && data[i].description != "") {
        html += `<div style="float:right;"><input class="t1" data-id=${i + 1} checked="true" type="checkbox"></div>`;
      }
      else if (data[i].description == "" || data[i].description == null) {
        html += `<div style="float:right;"><input class="t1" data-id=${i + 1} type="checkbox"></div>`;
      }
      html += `<div style="text-align:right;float:right; width: 470px; height: 205px;">`;
      // style="float:right;padding-right:2px;line-height:30px;font-size:16px;margin-bottom:20px;clear:both;"
      if (data[i].artistImagesData && data[i].artistImagesData.length > 0) {
        for (let ind = 0; ind < 3; ind++) {
          html += `<a href="http://142.93.211.14/salash/actors/?details=${btoa(data[i].artistId)}" target="_blank"><img width="148px" height="203px" style="margin-left:1px;width:148px;height:203px;margin-right: 5px;"
                     src="http://shalashapi.azurewebsites.net/Uploads/${data[i].artistImagesData[ind].fileName}"></a>`;
          if (ind + 1 === data[i].artistImagesData.length) break;
        }
      }

      html += `</div><div style="float:right;">
        <div class="artist_specs"
        style="height:80px;margin:10px;color:#000000;line-height:20px;width:509px;padding:0px 10px;font-size:16px;">
        <div style="margin-bottom:5px;font-size:18px;font-weight:bold;text-align:right;">
        ${data[i]['firstName']} ${data[i]['lastName']}`;

      if (this.flags['phone']) {
        html += `<a style="color: blue;" href="tel:${data[i].phone}"> / <u>${data[i].phone}</u></a>`;
      }

      html += `</div><div
            style="float:right;padding:0px 2px;color:#000000;margin-left:10px;margin-bottom:10px;background-color:#adadad;">
            ${this.translate.instant('age')} ${this.calculateAge(data[i].birthDay)} </div>
        <div style="float:right;padding:0px 2px;color:#000000;margin-left:10px;margin-bottom:10px;background-color:#adadad;">
            ${this.translate.instant('Height')} ${data[i]['height']} </div>`;

      if (this.flags['agency']) {
        html += `<div style="float:right;padding:0px 2px;color:#000000;margin-left:10px;margin-bottom:10px;background-color:#adadad;">
            ${this.translate.instant('Agency')} ${data[i]['agencyName']} </div>`
      }

      if (data[i].charData && data[i].charData.length > 0) {
        let body = data[i].charData.find(e => e.name === "body");
        if (body) {
          html += `<div
          style="float:right;padding:0px 2px;color:#000000;margin-left:10px;margin-bottom:10px;background-color:#adadad;">
          ${this.translate.instant('Body type')} ${body.value} </div>`;
        }

        let eyes = data[i].charData.find(e => e.name === "Eyes");
        if (eyes) {
          html += `<div
          style="float:right;padding:0px 2px;color:#000000;margin-left:10px;margin-bottom:10px;background-color:#adadad;">
          Eyes ${eyes.value} </div>`;
        }

        let hair = data[i].charData.find(e => e.name === "Hair");
        if (hair) {
          html += `<div
          style="float:right;padding:0px 2px;color:#000000;margin-left:10px;margin-bottom:10px;background-color:#adadad;">
          Hair ${hair.value}</div>`;
        }

        let hairType = data[i].charData.find(e => e.name === "HairType");
        if (hairType) {
          html += `<div
          style="float:right;padding:0px 2px;color:#000000;margin-left:10px;margin-bottom:10px;background-color:#adadad;">
          HairType ${hairType.value} </div>`;
        }

        let skin = data[i].charData.find(e => e.name === "SkinTone");
        if (skin) {
          html += `<div
              style="float:right;padding:0px 2px;color:#000000;margin-left:10px;margin-bottom:10px;background-color:#adadad;">
              Skin ${skin.value} </div>`;
        }
      }

      html += `</div><div style='clear:both'></div><br>`;
      finalhtml += `${html}<div style="text-align:right;line-height:20px;margin-right:20px;width:509px;">${data[i].description}</div></div></div>`;
      if (data[i].description && data[i].description != "") {
        finalhtml += `<div style="text-align:right;display:block; margin-bottom: 5px;" id="txt${i + 1}"><textarea rows="8" cols="50">${data[i].description}</textarea></div>`;
      }
      else if (data[i].description == null || data[i].description == "") {
        finalhtml += `<div style="text-align:right;display:none;margin-bottom: 5px;" id="txt${i + 1}"><textarea rows="8" cols="50" [(ngModel)]=${data[i].description}>${data[i].description}</textarea></div>`;
      }
      finalhtml = finalhtml.replace(/\s+/g, ' ');
      html += `<div style="text-align:right;line-height:20px;margin-right:20px;width:509px;">${data[i].title}</div></div></div>`;
      data[i].html = html.replace(/\s+/g, ' ');
    }
    return finalhtml;
  }

  calculateAge(age): number {
    let timeDiff = Math.abs(Date.now() - new Date(age).getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  }

  getSafeHtml(html): SafeHtml {
    return this.dom.bypassSecurityTrustHtml(html);
  }

  emitTabsData() {
    this.handleTabs.emit(this.tabsArray);
  }

}