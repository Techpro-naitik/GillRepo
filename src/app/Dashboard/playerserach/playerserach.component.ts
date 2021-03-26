import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'app/service.service';
import { GetAllAgencyModel } from 'app/Models/AgencyModel/AgencyModel';
import { PropsValues } from 'app/Models/MasterDataModel/model';
import { ToastrService } from 'ngx-toastr';
import { SearchRequest, SearchResults } from 'app/Models/ArtistSearchModel/ArtistSearch';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent, MatDialog } from '@angular/material';
import { MasterdataService } from 'app/Services/masterdata.service';
import { ExcelService } from 'app/Services/excel.service';
import { EmailtemplateComponent } from '../emailtemplate/emailtemplate.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuditionService } from 'app/Services/audition.service';
import { FilterDataComponent } from '../dialog/filter-data/filter-data.component';
import { TranslateService } from '@ngx-translate/core';

interface IPageParams {
  title: string;
  isSelected: boolean;
}

@Component({
  selector: 'app-playerserach',
  templateUrl: './playerserach.component.html',
  styleUrls: ['./playerserach.component.css']
})
export class PlayerserachComponent implements OnInit {

  @ViewChild('dummy', { static: true }) test: ElementRef;
  @ViewChild('fruitInput', { static: false }) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  searchplayer: FormGroup;
  submitted: boolean;
  isShown: boolean = false;
  show: boolean = false;
  buttonName: any = 'Show';

  characteristicsData: any[];
  propsData: PropsValues[];
  allAgency: GetAllAgencyModel[];

  searchRequestObject: SearchRequest;
  subscriptionsData: any[];

  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  autoNames = new FormControl();
  filteredNames = [];
  names: any[] = [];
  artistSearchResults: SearchResults[];
  picturesAtMost: number;
  isMale: boolean = false;
  isFemale: boolean = false;
  isAllSelected: boolean;
  maxArtistsToShow: number;
  artistSearchShow: number[];
  artistSearchShowPage: number;
  searchOperation: string;

  pageForm: FormGroup;
  createLinkParams: IPageParams[];
  showLinkPage: boolean;

  resultsViewOption: number;

  selectedAudition: number;

  query: any = {
    pageSize: 400,
    pageNumber: 1
  };
  pageSizeOptions = [10, 20, 100, 200, 400];
  pageNumber: number[];

  auditionsList: Array<object>;
  legendData: Array<object>;

  constructor(private fb: FormBuilder, public router: Router, private service: ServiceService,
    private masterService: MasterdataService, private toast: ToastrService, private auditionService: AuditionService,
    private excelService: ExcelService, private modal: MatDialog, private load: NgxSpinnerService,
    private translate: TranslateService) {
    this.searchRequestObject = new SearchRequest();
    this.initSearchForm();
    this.searchRequestObject.autonames = [];
    this.searchRequestObject.fartistIds = [];
    this.picturesAtMost = 3;
    this.maxArtistsToShow = 10;
    this.artistSearchShowPage = 1;
    this.searchOperation = "0";
    this.pageForm = this.fb.group({
      email: ['abc1@gmail.com', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
      subject: ['test sub'],
      prelimText: [`zzz`, Validators.required]
    });
    this.createLinkParams = [
      { title: 'Body', isSelected: true }, { title: 'Eyes', isSelected: true },
      { title: 'Hair', isSelected: true }, { title: 'Hair Type', isSelected: true },
      { title: 'Skin tone', isSelected: true }, { title: 'Agency', isSelected: true },
      { title: 'Age', isSelected: true }, { title: 'Height', isSelected: true },
      { title: 'Last name', isSelected: true }, { title: 'Remarks', isSelected: true },
      { title: 'Showor', isSelected: true }, { title: 'Phone', isSelected: true },
      { title: 'Send', isSelected: true }, { title: 'Mirroring to players', isSelected: true },
      { title: 'Show comments to players', isSelected: true }, { title: 'Send email', isSelected: true }
    ];
    this.resultsViewOption = 1;
    this.searchRequestObject.isFriend = this.searchplayer.controls.subscription.value;
  }

  onChanges(): void {
    this.autoNames.valueChanges.subscribe(val => {
      this.searchArtistByterm(val);
    });
  }

  async searchArtistByterm(term: string) {
    if (term != null && term != undefined && typeof term === 'string') {
      let response;
      try {
        response = await this.service.artistSearchByTerm(term).toPromise();
      } catch (error) {
        this.load.hide();
        this.toast.error('Error while searching artist');
      }
      if (response && response.status == "success") {
        this.filteredNames = response.data;
      }
      else if (response && response.status === "failure") {
        this.toast.error('Failed to search');
      }
    }
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim()) {
        this.names.push(value.trim());
      }
      if (input) {
        input.value = '';
      }
      this.autoNames.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.names.indexOf(fruit);
    if (index >= 0) {
      this.names.splice(index, 1);
      this.searchRequestObject.autonames.splice(index, 1);
      this.searchRequestObject.fartistIds.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const obj = event.option.value;
    const index = this.names.findIndex(e => e.id === obj.id);
    if (index == -1) {
      this.names.push(obj);
      this.searchRequestObject.autonames.push(obj.label);
      this.searchRequestObject.fartistIds.push(obj.id);
    }
    this.fruitInput.nativeElement.value = '';
    this.autoNames.setValue(null);
  }

  initSearchForm() {
    this.searchplayer = this.fb.group({
      stype: [''],
      tookajob: [null],
      Descrp: [''],
      gender: [''],
      agency: [''],
      FirstName: [''],
      lastname: [''],
      subscription: ['2'],
      memEndOp: [0],
      BirthDay: [''],
      test: [null],
      subByDate: [null]
    });
  }

  async ngOnInit() {
    this.onChanges();
    this.getAllSubscriptions();
    this.getAllAgencies();
    this.getAllCharacteristicsData();
    this.getAllPropsData();
    this.getAllAuditions();
  }

  refreshData() {
    this.names = [];
    this.filteredNames = [];
    this.isMale = false;
    this.isFemale = false;
    this.searchRequestObject.ageStart = null;
    this.searchRequestObject.ageEnd = null;
    this.searchRequestObject.heightStart = null;
    this.searchRequestObject.heightEnd = null;
    this.initSearchForm();
    this.getAllSubscriptions();
    this.getAllAgencies();
    this.getAllCharacteristicsData();
    this.getAllPropsData();
    this.getAllAuditions();
    this.artistSearchResults = [];
    this.searchRequestObject = new SearchRequest();
    this.searchRequestObject.autonames = [];
    this.searchRequestObject.fartistIds = [];
  }

  getAllAgencies() {
    this.service.allAgency().subscribe(
      (res) => {
        if (res && res.status === "success") {
          this.allAgency = res.data;
          if (this.allAgency.length > 0) {
            const key = 'agencyRank';
            const arrayUniqueByKey = [...new Map(this.allAgency.map(item =>
              [item[key], item])).values()];
            this.legendData = arrayUniqueByKey.sort((a, b) => { return parseInt(a.agencyRank) - parseInt(b.agencyRank) })
          }
        }
        else if (res && res.status === "failure") {
          this.toast.error('Failed to delete');
        }
      }
    ),
      () => {
        this.load.hide();
        this.toast.error('Error while fetching agency details');
      };
  }


  selectAgencies(id) {
    const data = this.allAgency.filter(e => e.agencyRankId === id).map(e => e.id);
    if (this.searchplayer.controls.agency.value.includes(data[0])) {
      let dataAgency: number[] = this.searchplayer.controls.agency.value;
      data.forEach(e => {
        dataAgency.splice(dataAgency.indexOf(e), 1);
      });
      this.searchplayer.controls.agency.setValue(dataAgency);
    } else {
      this.searchplayer.controls.agency.setValue([...this.searchplayer.controls.agency.value, ...data]);
    }
  }

  onMemOpChange(val) {
    this.searchRequestObject.membershipEndDateOperator = val;
  }

  async getAllSubscriptions() {
    this.subscriptionsData = [];
    let response;
    try {
      response = await this.masterService.getAllSubscriptions().toPromise();
    } catch (error) {
      this.toast.error('Error while fetching subscription details');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.subscriptionsData = response.data;
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to get subscriptions');
    }
  }

  async getAllCharacteristicsData() {
    this.characteristicsData = [];
    let response;
    try {
      response = await this.masterService.getAllCharacteristicsData().toPromise();
    } catch (error) {
      this.load.hide();
      this.toast.error('Error fetching characteristics details');
    }
    if (response && response.status == "success") {
      if (response.data) {
        this.characteristicsData = response.data;
        this.characteristicsData.forEach(e => {
          e.toggle = false;
          e.options.forEach(element => {
            element.isSelected = false;
          });
        });
      }
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to get characteristics data');
    }
  }

  toggleCharChips(value, id) {
    for (let i = 0; i < this.characteristicsData.length; i++) {
      if (this.characteristicsData[i].characteristicId == id) {
        this.characteristicsData[i].toggle = !value
        break;
      }
    }
  }

  checkSelectedValue(parentIndex, childIndex, value) {
    this.characteristicsData[parentIndex]['options'][childIndex]['isSelected'] = !value;
  }

  async getAllPropsData() {
    let response;
    try {
      response = await this.masterService.getAllPropsData().toPromise();
    } catch (error) {
      this.load.hide();
      this.toast.error('Error while fetching prop5 data');
    }
    if (response && response.status == "success" && response.data) {
      this.propsData = response.data;
      this.propsData.forEach(e => {
        e['toggle'] = false;
        e.options.forEach(f => {
          f['isSelected'] = false;
        });
      });
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to get props data');
    }
  }

  togglePropChips(value, id) {
    for (let i = 0; i < this.propsData.length; i++) {
      if (this.propsData[i].id == id) {
        this.propsData[i]['toggle'] = !value
        break;
      }
    }
  }

  checkSelectedPropValue(parentIndex, childIndex, value) {
    this.propsData[parentIndex]['options'][childIndex]['isSelected'] = !value;
  }

  getCheckedCharValues() {
    this.searchRequestObject.charIds = [];
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
        this.searchRequestObject.charIds.push(object);
        object = { id: 0, values: [] };
      }
    });
  }

  getCheckedPropValues() {
    this.searchRequestObject.prop5Ids = [];
    let object: { id: number, values: number[] } = { id: 0, values: [] };
    this.propsData.forEach(e => {
      e.options.forEach(o => {
        if (o['isSelected']) {
          object.id = e.id;
          object.values.push(o.id);
        }
      });
      if (object.id != 0) {
        this.searchRequestObject.prop5Ids.push(object);
        object = { id: 0, values: [] };
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.searchplayer.invalid) {
      return;
    }
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }

  toggle() {
    this.show = !this.show;
    if (this.show)
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

  playerupdate(value) {
    this.router.navigate(['/dashboard/playerupdate', { 'value': value }])
  }

  prepareObject() {
    this.searchRequestObject.agencyId = this.searchplayer.controls.agency.value.length > 0 ? this.searchplayer.controls.agency.value : null;
    this.searchRequestObject.gender = "";
    this.getCheckedCharValues();
    if (this.isFemale && this.isMale) {
      this.searchRequestObject.gender += "1, 0";
    }
    else if (this.isMale) {
      this.searchRequestObject.gender += "1";
    }
    else if (this.isFemale) {
      this.searchRequestObject.gender += "0";
    }
  }

  onFriendChange(value) {
    this.searchRequestObject.isFriend = value;
  }

  membershipStartDateFucn(date) {
    this.searchRequestObject.membershipStartDate = new Date(date);
  }

  memEndDate() {
    // this.searchRequestObject.membershipEndDateOperator = 0;
    this.searchRequestObject.membershipEndDate = this.searchplayer.controls.subByDate.value;
    this.searchRequestObject.membershipEndDate_day = this.searchRequestObject.membershipEndDate.getDate();
    this.searchRequestObject.membershipEndDate_month = this.searchRequestObject.membershipEndDate.getMonth() + 1;
    this.searchRequestObject.membershipEndDate_year = this.searchRequestObject.membershipEndDate.getFullYear();
  }

  isEmpty(): boolean {
    let a = 0;
    Object.keys(this.searchRequestObject).forEach(e => {
      if (this.searchRequestObject[e] != null && this.searchRequestObject[e] != "" && e != "checkWithoutFilter") {
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

  async searchArtists() {
    if (this.searchOperation == "0") {
      this.prepareObject();
      let isEmpty = this.isEmpty();
      if (isEmpty) {
        this.searchRequestObject.checkWithoutFilter = 1;
      }
      else {
        this.searchRequestObject.checkWithoutFilter = 0;
      }
      let response;
      try {
        response = await this.service.searchArtists(this.searchRequestObject, this.query.pageNumber - 1, this.query.pageSize).toPromise();
      } catch (error) {
        this.toast.error('Something went wrong....');
        this.load.hide();
      }
      if (response && response.status == "success") {
        this.artistSearchResults = [];
        this.artistSearchShow = [];
        this.artistSearchShowPage = 1;
        this.pageNumber = [];
        let count = Math.ceil(response.data.artist.length / response.data.totalCount);
        for (let i = 1; i <= count; i++) {
          this.pageNumber.push(i);
        }
        this.artistSearchResults = response.data.artist;
      }
      else if (response && response.status === "failure") {
        this.toast.error('Failed to search artists');
      }
    }
    else {
      this.performSearchOperation(this.searchOperation);
    }
  }

  selectAllArtists() {
    this.isAllSelected = !this.isAllSelected;
    this.artistSearchResults.forEach(e => e.isSelected = this.isAllSelected);
  }

  performSearchOperation(operation: string) {
    switch (operation) {
      case "1":
        console.log('1');
        this.sendAuditionInviteToArtists();
        break;
      case "2":
        this.toSendMessage();
        break;
      case "3":
        this.toSendSMS();
        break;
      case "4":
        this.generateExcelForSelectedArtists();
        break;
      case "5":
        // this.createAPageToSend();
        break;
      default:
        break;
    }
  }

  async sendAuditionInviteToArtists() {
    let ids = [];
    ids = this.artistSearchResults
      .filter(e => e.isSelected === true)
      .map(e => e.id);
    if (ids.length > 0) {
      let response: { status: string, message: string, data: any };
      try {
        response = await this.auditionService.sendAuditionInvite(ids, this.selectedAudition).toPromise();
      } catch (error) {
        this.load.hide();
        console.log('Something went wrong while sending audition invite');
      }
      if (response && response.status === "success") {
        this.toast.success('Audition Invite sent successfully');
      }
      else if (response && response.status === "failure" && response.message === "exists") {
        this.toast.error('Invitation already sent to all selected artists for this audition');
      }
    }
  }

  generateExcelForSelectedArtists() {
    let ids = [];
    this.artistSearchResults
      .forEach(e => {
        if (e.isSelected === true) {
          ids.push({ name: e.name, email: e.email, phone: e.mobile });
        }
      });
    if (ids.length > 0) {
      this.excelService.exportAsExcelFile(ids, 'selectedartists');
    }
    else {
      this.toast.show('No Record Selected');
    }
  }

  toSendSMS() {
    let ids = [];
    ids = this.artistSearchResults
      .filter(e => e.isSelected === true)
      .map(e => e.id);
    if (ids.length > 0) {
      this.router.navigate(['/dashboard/sendsms'], { queryParams: { 'selectedArtists': ids } });
    }
    else {
      this.toast.show('No Record Selected');
    }
  }

  toSendMessage() {
    let ids = [];
    ids = this.artistSearchResults
      .filter(e => e.isSelected === true)
      .map(e => e.id);
    if (ids.length > 0) {
      this.router.navigate(['/dashboard/addmessage'], { queryParams: { 'selectedArtists': ids } });
    }
    else {
      this.toast.show('No Record Selected');
    }
  }

  async openTemplate() {
    let ids = [];
    ids = this.artistSearchResults
      .filter(e => e.isSelected === true)
      .map(e => e);
    if (!this.pageForm.valid || ids.length === 0 || !this.createLinkParams[15].isSelected) {
      if (!this.pageForm.valid)
        this.toast.error('Please enter valid email');
      else if (ids.length === 0)
        this.toast.error('No artist selected');
      else if (!this.createLinkParams[15].isSelected)
        this.toast.error(`Please check 'Send Email'`);
    }
    else {
      const dialog = this.modal.open(EmailtemplateComponent, {
        data: {
          data: ids, picsCount: this.picturesAtMost, displayData: this.createLinkParams, email: this.pageForm.controls.email.value,
          emailBody: this.pageForm.controls.prelimText.value
        },
        disableClose: true
      });
      dialog.afterClosed().subscribe(response => {
        if (response && response.status !== "close") {
          this.generateFile(response.data);
        }
      });
    }
  }

  generateFile(data) {
    console.log(data);
    if (data != null) {
      this.service.generateHTMLPage(data).subscribe(response => {
        if (response.status === "success") {
          this.toast.success('File Created successfully');
          window.open(`http://shalashapi.azurewebsites.net/HtmlFiles/${response.data}`, '_blank');
        }
        else if (response && response.status === "failure") {
          this.toast.error('Failed to generate file');
        }
      },
        err => {
          this.toast.error('Something went wrong while creating a file');
        });
    }
  }

  async getAllAuditions() {
    let response: { status: string, messasge: string, data: { audition: Array<object>, totalCount: number } };
    try {
      response = await this.auditionService.getAllAuditions(0, 0, '', 1).toPromise();
    } catch (error) {
      this.toast.error('Something went wrong while fetching details');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.auditionsList = response.data.audition;
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to get auditions');
    }
  }

  openComponent() {
    const dialogRef = this.modal.open(FilterDataComponent, {
      data: this.propsData,
      width: '700px'
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }

  trackByArtistId(index: number, artist: any): number {
    return artist.id;
  }

}