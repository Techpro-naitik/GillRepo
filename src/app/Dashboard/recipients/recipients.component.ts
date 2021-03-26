import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'app/service.service';
import { MasterdataService } from 'app/Services/masterdata.service';
import { ToastrService } from 'ngx-toastr';
import { SearchRequestRecipients } from 'app/Models/ArtistSearchModel/ArtistSearch';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.css']
})

export class RecipientsComponent implements OnInit {

  agencies: any[];
  characteristicsData: any[];
  // pageNumber: number;
  allArtists: any[];
  searchRequest: SearchRequestRecipients;
  isMale: boolean = false;
  isFemale: boolean = false;
  pageSizeOptions: number[];
  pageNumber: number;
  pageSize: number;
  isAllSelected: string = "Select All";

  constructor(private dialog: MatDialogRef<RecipientsComponent>, private load: NgxSpinnerService,
    private service: ServiceService, private masterService: MasterdataService, private toast: ToastrService) {
    this.searchRequest = new SearchRequestRecipients();
    this.searchRequest.agencyIds = [];
    this.pageNumber = 1;
    this.pageSize = 20;
  }

  ngOnInit() {
    setTimeout(() => {
      this.getAgencies();
      this.getAllCharacteristicsData();
      this.searchRecipients();
    });
  }

  async getAgencies() {
    let response;
    try {
      response = await this.service.allAgency().toPromise();
    } catch (error) {
      this.toast.error('Error while fetching agencies list');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.agencies = [];
      this.agencies = response.data;
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to get agencies');
    }
    // this.service.agenciesList.subscribe(data => {
    //   console.log(data);
    //   this.agencies = [];
    //   this.agencies = data;
    // })
  }

  async getAllCharacteristicsData() {
    this.characteristicsData = [];
    let response;
    try {
      response = await this.masterService.getAllCharacteristicsData().toPromise();
    } catch (error) {
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.characteristicsData = response.data;
      this.characteristicsData.forEach(e => {
        e.toggle = false;
        e.options.forEach(element => {
          element.isSelected = false;
        });
      });
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to get chars data');
    }
  }

  changeAgency(value) {
    // console.log(value);
    this.searchRequest.agencyIds = value;
  }

  toggleStatus(value) {
    let data = this.allArtists.filter(e => e.id === value);
    data[0].isSelected = !data[0].isSelected;
  }

  toggleCharChips(value, id) {
    for (let i = 0; i < this.characteristicsData.length; i++) {
      if (this.characteristicsData[i].characteristicId == id) {
        this.characteristicsData[i].toggle = !value;
        break;
      }
    }
  }

  selectAll() {
    if (this.isAllSelected === "Select All") {
      this.isAllSelected = "Deselect All";
      this.allArtists.forEach(e => e.isSelected = true);
    }
    else {
      this.isAllSelected = "Select All";
      this.allArtists.forEach(e => e.isSelected = false);
    }
  }

  checkSelectedValue(parentIndex, childIndex, value) {
    this.characteristicsData[parentIndex]['options'][childIndex]['isSelected'] = !value;
  }

  closeDialog() {
    let ids = this.allArtists ? this.allArtists.filter(e => e.isSelected === true).map(e => {
      return {
        artistId: e.id,
        artistIds: null,
        firstName: e.firstName,
        lastName: e.lastName,
        phone: null
      }
    }) : null;
    // console.log(ids);
    if (ids.length > 0) {
      this.dialog.close(ids && ids.length > 0 ? ids : null);
    }
    else {
      this.toast.error('No Recipients Selected');
    }
  }

  memEndDate(date) {
    this.searchRequest.membershipEndDateOperator = 0;
    this.searchRequest.membershipEndDate = new Date(date);
    this.searchRequest.membershipEndDate_day = this.searchRequest.membershipEndDate.getDate();
    this.searchRequest.membershipEndDate_month = this.searchRequest.membershipEndDate.getMonth() + 1;
    this.searchRequest.membershipEndDate_year = this.searchRequest.membershipEndDate.getFullYear();
  }

  getSearchRequestObject() {
    this.searchRequest.gender = "";
    this.getCheckedCharValues();
    if (this.isFemale && this.isMale) {
      this.searchRequest.gender += "1, 0";
    }
    else if (this.isMale) {
      this.searchRequest.gender += "1";
    }
    else if (this.isFemale) {
      this.searchRequest.gender += "";
    }
  }

  getCheckedCharValues() {
    this.searchRequest.charIds = [];
    let object: { id: number, values: number[] } = { id: 0, values: [] };
    this.characteristicsData.forEach(e => {
      if (e.toggle) {
        e.options.forEach(o => {
          if (o.isSelected) {
            object.id = e.characteristicId;
            object.values.push(o.id);
          }
        });
      }
      if (object.id != 0) {
        this.searchRequest.charIds.push(object);
        object = { id: 0, values: [] };
      }
    });
  }

  isEmpty(): boolean {
    let a = 0;
    Object.keys(this.searchRequest).forEach(e => {
      if (this.searchRequest[e] != null && this.searchRequest[e] != "" && e != "pageSize" && e != "pageNumber" && e != "checkWithoutFilter") {
        a++;
      }
    });
    if (a > 0) {
      return false;
    }
    else {
      return true;
    }
  }

  async searchRecipients() {
    this.getSearchRequestObject();
    if (this.isEmpty()) {
      this.searchRequest.checkWithoutFilter = 1;
    } else {
      this.searchRequest.checkWithoutFilter = 0;
    }

    this.searchRequest['pageNumber'] = this.pageNumber - 1;
    this.searchRequest['pageSize'] = this.pageSize;
    // console.log(this.searchRequest);
    let response;
    try {
      response = await this.service.searchRecipients(this.searchRequest).toPromise();
    } catch (error) {
      this.toast.error('Something went wrong');
      this.load.hide();
    }
    if (response && response['status'] == "success") {
      this.allArtists = response['data']['artist'];
      this.allArtists.forEach(e => e.isSelected = false);
      this.pageSizeOptions = [];
      let count = Math.ceil(response['data']['totalCount'] / this.pageSize);
      for (let i = 1; i <= count; i++) {
        this.pageSizeOptions.push(i);
      }
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to search');
    }
  }

  onFriendChange(value) {
    this.searchRequest.isFriend = value;
  }

  check() {
    // console.log(this.allArtists);
    // this.getSearchRequestObject();
    // console.log(this.searchRequest);
  }
}