import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'app/Services/message.service';
import { ToastrService } from 'ngx-toastr';
import { SearchMessages } from 'app/Models/DashboardModel/model';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material';
import { ViewportScroller } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

interface IMessage {
  id: number;
  artistId: number;
  creationDate: string;
  readDate: string;
  emailDate: string;
  direction: number;
  hidden: number;
  disabled: number;
  readOnce: number;
  addToEMailQueue: number;
  title: string;
  body: string;
  type: number;
  parentId: string;
  childId: string;
  artists: string;
}
interface IResponseData {
  artist: IMessage[];
  totalCount: number;
}

interface IResponse {
  status: string;
  message: string;
  data: IResponseData,
}

@Component({
  selector: 'app-artistmsg',
  templateUrl: './artistmsg.component.html',
  styleUrls: ['./artistmsg.component.css']
})
export class ArtistmsgComponent implements OnInit {
  myForm: FormGroup;
  isShown: boolean;
  isShown1: boolean;

  allMessagesList: Array<object>;

  searchMessage: SearchMessages;

  allMessageTypes: Array<object>;

  showHidePreview: boolean = false;

  messageData: { data: object, index: number };

  defSelect: number;

  innerWidth: number;

  currentOpenedId: number;

  // @ViewChild('previewDiv', { static: true }) targetEl: ElementRef;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.innerWidth = window.innerWidth;
  }

  query: any = {
    pageNumber: 1,
    pageSize: 20
  }

  pageNumbers: number[];

  constructor(private fb: FormBuilder, private service: MessageService, private toast: ToastrService,
    private load: NgxSpinnerService, private scroll: ViewportScroller, private translate: TranslateService) {
    this.searchMessage = new SearchMessages();
    this.searchMessage.texttype = 1;
    this.searchMessage.text = null;
    this.messageData = { data: {}, index: null };
    this.defSelect = 1;
    this.innerWidth = window.innerWidth;
  }

  async ngOnInit() {
    this.resetFilters();
    // this.fetchAllMessages((this.query.pageNumber - 1) * this.query.pageSize, this.query.pageSize);
    this.getAllMessagetTypes();
    this.searchForMessage()
  }

  resetFilters() {
    this.myForm = this.fb.group({
      dat: [null],
      before: [null],
      after: [null],
      messageType: [null],
      read: [null],
      direction: [null],
      disabled: [null],
      readOnce: [null],
      email: [null]
    });
    this.searchMessage.text = null;
  }

  async fetchAllMessages(pn: number, ps: number) {
    let response: IResponse;
    try {
      response = await this.service.getAllMessages(pn, ps).toPromise();
    } catch (error) {
      this.toast.error('Error fetching details');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.allMessagesList = response.data.artist;
      // for (let i = 0; i < 19; i++) {
      //   this.allMessagesList.push(response.data.artist[0]);
      // }
      this.allMessagesList.forEach(e => e['openPreview'] = false);
      const count2 = Math.ceil(response.data.totalCount / this.query.pageSize);
      this.pageNumbers = [];
      for (let i = 0; i < count2; i++) {
        this.pageNumbers.push(i + 1);
      }
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to fetch messages');
    }
  }

  refreshList() {
    // this.fetchAllMessages((this.query.pageNumber - 1) * this.query.pageSize, this.query.pageSize);
    this.searchForMessage();
  }

  fetchRecords() {
    // this.fetchAllMessages((this.query.pageNumber - 1) * this.query.pageSize, this.query.pageSize);
    this.searchForMessage();
  }

  async getAllMessagetTypes() {
    let response: { status: string, message: string, data: any[] };
    try {
      response = await this.service.getMessageTypes().toPromise();
    } catch (error) {
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.allMessageTypes = response.data;
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to get message types');
    }
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }

  toggleShow1() {
    this.isShown1 = !this.isShown1;
  }

  checkForDisplay(): boolean {
    if (this.showHidePreview && this.messageData.data && innerWidth > 700) {
      return true;
    }
    else {
      return false;
    }
  }

  prepareObject() {
    this.searchMessage.text = this.searchMessage.text === "" ? null : this.searchMessage.text;
    this.searchMessage.direction = this.myForm.controls.direction.value != null ? parseInt(this.myForm.controls.direction.value) : null;
    this.searchMessage.startDate = this.myForm.controls.after.value != null ? new Date(this.myForm.controls.after.value).toLocaleString() : null;
    this.searchMessage.endDate = this.myForm.controls.before.value != null ? new Date(this.myForm.controls.before.value).toLocaleString() : null;
    this.searchMessage.msgType = this.myForm.controls.messageType.value != null ? parseInt(this.myForm.controls.messageType.value) : null;
    this.searchMessage.disabled = this.myForm.controls.disabled.value != null ? parseInt(this.myForm.controls.disabled.value) : null;
    this.searchMessage.read = this.myForm.controls.read.value != null ? parseInt(this.myForm.controls.read.value) : null;
    this.searchMessage.readOnce = this.myForm.controls.readOnce.value != null ? parseInt(this.myForm.controls.readOnce.value) : null;
    this.searchMessage.byEmail = this.myForm.controls.email.value != null ? parseInt(this.myForm.controls.email.value) : null;
  }

  async searchForMessage() {
    this.prepareObject();
    this.messageData = { data: null, index: null };
    let response: { status: string, message: string, data: any };
    try {
      this.searchMessage['pageNumber'] = (this.query.pageNumber - 1) * this.query.pageSize;
      this.searchMessage['pageSize'] = this.query.pageSize;
      response = await this.service.searchForMessages(this.searchMessage).toPromise();
    } catch (error) {
      this.load.hide();
    }
    if (response && response.status === "success") {
      this.allMessagesList = response.data.artist;
      if (this.allMessagesList && this.allMessagesList.length > 0) {
        this.allMessagesList.forEach(e => e['openPreview'] = false);
        const count2 = Math.ceil(response.data.totalCount / this.query.pageSize);
        this.pageNumbers = [];
        for (let i = 0; i < count2; i++) {
          this.pageNumbers.push(i + 1);
        }
      }
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to search');
    }
  }

  async openPreview(message: object, i: number, element) {
    if (this.messageData.index === null) {
      this.showHidePreview = !message['openPreview'];
      message['openPreview'] = !message['openPreview'];
      this.messageData.index = i;
      this.messageData.data = message;
    }
    else if (this.messageData && i === this.messageData.index) {
      this.showHidePreview = !message['openPreview'];
      message['openPreview'] = !message['openPreview'];
    }
    else {
      this.messageData.index = i;
      if (!this.showHidePreview) {
        this.showHidePreview = !message['openPreview'];
        message['openPreview'] = !message['openPreview'];
      }
      this.messageData.data = message;
    }
    if (message['openPreview']) {
      this.scrollToElement(element);
    }
    // this.targetEl.nativeElement.scrollIntoView();
    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0;
    // window.scrollTo(0,0);
  }

  scrollToElement($element): void {
    // console.log($element);
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  openPreviewForMobile(message, i) {
    if (message['openPreview']) {
      message['openPreview'] = !message['openPreview'];
    }
    else {
      this.allMessagesList.forEach(e => e['openPreview'] = false);
      message['openPreview'] = !message['openPreview'];
    }
  }

}