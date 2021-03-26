import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'app/Services/message.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { RecipientsComponent } from '../recipients/recipients.component';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { FilesComponent } from '../files/files.component';
import { IMessageResponse, IMessageData } from 'app/Models/MessageSystem Model/message';
import { NgxSpinnerService } from 'ngx-spinner';
import { SmsService } from 'app/Services/sms.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-addartistmsg',
  templateUrl: './addartistmsg.component.html',
  styleUrls: ['./addartistmsg.component.css']
})
export class AddartistmsgComponent implements OnInit {

  @ViewChild('msgForm', { static: false }) msgForm: NgForm;
  @ViewChild('filesDiv', { static: false }) filesDiv: ElementRef;
  ids: any[];
  artists: any[];
  addMessageForm: FormGroup;
  returnedFiles: any[];
  currentMessageId: number;

  messageObject: IMessageData;
  allMessageTypes: Array<object>;

  constructor(private route: ActivatedRoute, private service: MessageService, private toast: ToastrService,
    private smsService: SmsService, private dialog: MatDialog, private fb: FormBuilder,
    private router: Router, private load: NgxSpinnerService, private translate: TranslateService) {
    this.route.queryParamMap.subscribe((routeParams) => {
      this.ids = routeParams.getAll('selectedArtists');
    });
    route.paramMap.subscribe(param => {
      this.currentMessageId = param.get('id') ? parseInt(param.get('id')) : null;
    });
    this.intiMsgForm();
  }

  intiMsgForm() {
    this.addMessageForm = this.fb.group({
      readOnce: [0],
      addToEmailQueue: [1],
      title: [1],
      secondTitle: [''],
      body: [''],
      disabled: [0],
      hidden: [0]
    });
  }

  ngOnInit() {
    this.getAllMessagetTypes();
    this.ids = this.ids.map(e => parseInt(e));
    if (this.ids && this.ids.length > 0) {
      this.getDataByIds(this.ids);
    }
    if (this.currentMessageId) {
      this.getMessageData();
    }
    this.messageObject = {
      artistIds: 0, creationDate: '', readDate: '', title: '', artistId: 0, body: '',
      direction: 0, hidden: 0, addToEmailQueue: 0, readOnce: 0, disabled: 0, msgType: 0, type: 0
    };
  }

  // async updateReadDate() {
  //   let response;
  //   try {
  //     response = await this.service.updateReaddate(this.currentMessageId).toPromise();
  //   } catch (error) {
  //     this.toast.error('Something went wrong updating read date');
  //     this.load.hide();
  //   }
  //   else if (response && response.status == "failure") {
  //     this.toast.error('Failed to update role details');
  //   }
  // }

  async getMessageData() {
    let response: IMessageResponse;
    try {
      response = await this.service.getMessagById(this.currentMessageId).toPromise();
    } catch (error) {
      this.toast.error('Something went wrong while fetching message details');
      this.load.hide();
    }
    if (response && response.status == "success") {
      response.data = response.data[0];
      this.addMessageForm.patchValue(response.data);
      this.addMessageForm.controls.secondTitle.setValue(response.data.title.slice(response.data.title.indexOf('|') + 1, response.data.title.length).trim());
      this.addMessageForm.controls.disabled.setValue(response.data.disabled);
      this.addMessageForm.controls.hidden.setValue(response.data.hidden);
      this.addMessageForm.controls.title.setValue(response.data.msgType)
      this.messageObject = response.data;
    }
    else if (response.status == "failure") {
      this.router.navigate(['/dashboard/artistmsg']);
    }
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
    else if (response && response.status == "failure") {
      this.toast.error('Failed to get message types');
    }
  }

  async getDataByIds(ids: number[]) {
    this.artists = [];
    try {
      let response = await this.smsService.getDetailsByIds({ artistIds: ids }).toPromise();
      if (response && response.status == "success") {
        this.artists = response.data;
        this.artists.forEach(e => e.isSelected = true);
      }
      else if (response && response.status == "failure") {
        this.toast.error('Failed to get data for artists');
      }
    } catch (error) {
      this.toast.error('Something went wrong');
      this.load.hide();
    }
  }

  async openRecipinetsPage() {
    const dialogRef = this.dialog.open(RecipientsComponent, {
      disableClose: true,
      width: '800px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.length > 0) {
        if (this.ids.length > 0) {
          this.artists = [...this.artists, ...result];
        }
        else {
          this.artists = [];
          this.artists = result;
          this.artists.forEach(e => e.isSelected = true);
        }
      }
    });
  }

  toggleVal(value) {
    let data = this.artists.find(e => e.artistId === value);
    data.isSelected = !data.isSelected;
  }

  checkVal() {
    // console.log(this.artists);
  }

  async sendMessage() {
    let title = this.allMessageTypes.find(e => e['id'] === this.addMessageForm.controls.title.value);
    this.messageObject.artistIds = this.artists ? this.artists.filter(e => e.isSelected === true).map(e => e.artistId) : null;
    this.messageObject.title = `${title['typeName']} | ${this.addMessageForm.controls.secondTitle.value.trim().replace(/\s\s+/g, ' ')}`;
    this.messageObject.body = `${this.addMessageForm.controls.body.value}${this.returnedFiles && this.returnedFiles.length > 0 ? document.getElementById('filesDiv').innerHTML : ''}`;
    this.messageObject.addToEmailQueue = this.addMessageForm.controls.addToEmailQueue.value;
    this.messageObject.readOnce = this.addMessageForm.controls.readOnce.value;
    this.messageObject.msgType = this.addMessageForm.controls.title.value;
    this.messageObject.direction = 0;
    if (this.currentMessageId) {
      this.messageObject.disabled = this.addMessageForm.controls.disabled.value;
      this.messageObject.hidden = this.addMessageForm.controls.hidden.value;
      this.updateMessage(this.messageObject);
    }
    else {
      if (this.artists && this.artists.filter(e => e.isSelected === true).length > 0) {
        this.messageObject.disabled = 0;
        this.messageObject.hidden = 0;
        this.createMessage(this.messageObject);
      }
      else {
        this.toast.error('No Artist Selected');
      }
    }
  }

  async createMessage(data) {
    let response: { status: string, message: string };
    try {
      response = await this.service.addMessage(data).toPromise();
    } catch (error) {
      this.toast.error('Something went wrong');
      this.load.hide();
    }
    if (response && response.status === "success") {
      this.toast.success('Message sent successfully');
      // this.msgForm.resetForm();
      // this.intiMsgForm();
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to create a message');
    }
  }

  async updateMessage(data) {
    let response: IMessageResponse;
    try {
      response = await this.service.updateMessagebyId(this.currentMessageId, data).toPromise();
    } catch (error) {
      this.toast.error('Something went wrong');
      this.load.hide();
    }
    if (response && response.status === "success") {
      this.toast.success('Message edited successfully');
      this.getMessageData();
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to update a message');
    }
  }

  async openToAddFile() {
    const dialogRef = this.dialog.open(FilesComponent, {
      disableClose: true,
      width: '800px',
      data: (this.returnedFiles && this.returnedFiles.length > 0) ? this.returnedFiles : null
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.length !== 0) {
        this.returnedFiles = result;
      } else if (result === null) {
        this.returnedFiles = [];
      }
    });
  }

  async deleteMessage() {
    let response: IMessageResponse;
    try {
      response = await this.service.deleteMessagebyId(this.currentMessageId).toPromise();
    } catch (error) {
      this.toast.error('Error while deleting message');
      this.load.hide();
    }
    if (response.status === "success") {
      this.toast.success('Deleted successfully');
      this.router.navigate(['/dashboard/artistmsg']);
    } else if (response && response.status === "failure") {
      this.toast.error('Failed to delete a message');
    }
  }

  resetFields() {
    this.msgForm.resetForm();
    this.intiMsgForm();
    this.artists = [];
    this.returnedFiles = [];
  }
}