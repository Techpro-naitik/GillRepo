import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SearchResults } from 'app/Models/ArtistSearchModel/ArtistSearch';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-emailtemplate',
  templateUrl: './emailtemplate.component.html',
  styleUrls: ['./emailtemplate.component.css']
})
export class EmailtemplateComponent implements OnInit {

  searchResults: SearchResults[];
  displayData: any[];
  email: string;
  emailValid: boolean;
  emailBody: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<EmailtemplateComponent>,
  private translate: TranslateService) {
    this.searchResults = [];
  }

  ngOnInit() {
    this.data.data.forEach(element => {
      element.ageCount = this.calculateAge(element.age);
      if (this.data.picsCount > 0) {
        let data = [];
        for (let i = 0; i < this.data.picsCount; i++) {
          data.push(element.artistImages[i]);
        }
        element.imagesToDisplay = data.map(e => {
          if (e !== undefined) {
            return e.fileName
          }
        }).filter(e => e != undefined);
        // console.log(element.imagesToDisplay);
      }
    });
    this.searchResults = this.data.data;
    this.displayData = this.data.displayData;
    this.email = this.data.email;
    this.emailBody = this.data.emailBody;
    this.emailValid = this.data.emailValid;
  }

  calculateAge(age): number {
    let timeDiff = Math.abs(Date.now() - new Date(age).getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  }

  canShow(id): boolean {
    if (this.displayData[id].isSelected === true) return true;
    else return false;
  }

  check12() {
    let emailArray: any[] = [];
    for (let index = 0; index < this.searchResults.length; index++) {
      emailArray.push({ id: this.searchResults[index].email, html: document.getElementById((index + 1).toString()) });
    }
    // console.log(emailArray);
  }

  closeDialog() {
    this.dialog.close({ status: 'close', data: null });
  }

  makeFile() {
    var html = '';
    html += document.getElementById('header').innerHTML;
    html += document.getElementById('middle').innerHTML;
    html += document.getElementById('footer').innerHTML;
    this.dialog.close({ status: 'generate', data: html });
  }
}