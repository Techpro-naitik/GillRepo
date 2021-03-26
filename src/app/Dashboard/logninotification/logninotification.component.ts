import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatTable } from '@angular/material';
import { Router } from '@angular/router';
import { SmsService } from 'app/Services/sms.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'app/Services/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-logninotification',
  templateUrl: './logninotification.component.html',
  styleUrls: ['./logninotification.component.css']
})
export class LogninotificationComponent implements OnInit {

  smsListsArray: Array<{ title: string, count: number, color: string, linkText: string }>;

  constructor(public router: Router, private service: SmsService, private toast: ToastrService,
    private excelService: ExcelService, private loader: NgxSpinnerService, private translate: TranslateService) {
    this.smsListsArray = [
      { title: 'Actors without an image', count: 0, color: '#beedbe', linkText: 'actors-without-pic' }, { title: 'Actors without a resume', count: 0, color: '#ffe0e6', linkText: 'actors-with-no-resume' },
      { title: 'Non actors', count: 0, color: '#ffffd2', linkText: 'non-actors' }, { title: 'Non respresented actors', count: 0, color: '#cdebfe', linkText: 'non-respresented-actors' },
      { title: 'Actors that are not member of Shaham', count: 0, color: '#beedbe', linkText: 'not-member-of-shaham' }
    ];
  }

  async ngOnInit() {
    let response: {
      status: string, message: string, data: {
        "noPicCount": number,
        "noAgencyCount": number,
        "noProfCount": number,
        "noResumeCount": number,
        "noShachamCount": number
      }
    };
    try {
      response = await this.service.getAllusersCountList().toPromise();
    } catch (error) {
      this.toast.error('Something went wrong fetching details');
      this.loader.hide();
    }
    if (response && response.status == "success") {
      response.data = response.data[0];
      this.smsListsArray[0].count = response.data.noPicCount;
      this.smsListsArray[1].count = response.data.noResumeCount;
      this.smsListsArray[2].count = response.data.noProfCount;
      this.smsListsArray[3].count = response.data.noAgencyCount;
      this.smsListsArray[4].count = response.data.noShachamCount;
    }
    else if (response.status === "failure") {
      this.toast.error('Failed to get data');
    }
  }

  getExcelForCase(key, name) {
    this.getCaseDetails(key, name);
  }


  async getCaseDetails(key, name) {
    let response: {
      status: string, message: string, data: Array<{
        "firstName": string,
        "lastName": string,
        "email": string,
        "phone": number
      }>
    };
    try {
      response = await this.service.getCaseDetails(key).toPromise();
    } catch (error) {
      this.toast.error('Something went wrong while fetching details');
      this.loader.hide();
    }
    if (response && response.status === "success") {
      if (response.data.length > 0) {
        this.generateExcelForSelectedArtists(response.data, name)
      }
    }
    else if (response.status === "failure") {
      this.toast.error(response.message);
    }
  }

  generateExcelForSelectedArtists(data: Array<object>, name) {
    this.excelService.exportAsExcelFile(data, name);
  }
}
