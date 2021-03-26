import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'app/Services/message.service';
import { ToastrService } from 'ngx-toastr';
import { SmsService } from 'app/Services/sms.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sendsms',
  templateUrl: './sendsms.component.html',
  styleUrls: ['./sendsms.component.css']
})
export class SendsmsComponent implements OnInit {

  ids: any[];
  artistNumbers: string;
  messageArtist: string;
  templateArray: string[];
  template: string;
  smsListCase: number;
  users: Object;

  constructor(private route: ActivatedRoute, private service: SmsService, private toast: ToastrService,
    private translate: TranslateService) {
    this.ids = route.snapshot.queryParamMap.getAll('selectedArtists') ? route.snapshot.queryParamMap.getAll('selectedArtists') : null;
    this.messageArtist = '';
    if (this.route.snapshot.queryParamMap.get('list')) {
      this.getCaseNumber(this.route.snapshot.queryParamMap.get('list'));
      this.getCaseDetails();
    }
  }

  getCaseNumber(key) {
    switch (key) {
      case 'actors-without-pic':
        this.smsListCase = 1;
        break;
      case 'actors-with-no-resume':
        this.smsListCase = 2;
        break;
      case 'non-actors':
        this.smsListCase = 3;
        break;
      case 'non-respresented-actors':
        this.smsListCase = 4;
        break;
      case 'not-member-of-shaham':
        this.smsListCase = 5;
        break;
      default:
        break;
    };
    // console.log(this.smsListCase);
  }

  async getCaseDetails() {
    let response: {
      status: string, message: string, data: Array<{
        "firstName": string,
        "lastName": string,
        "email": string,
        "phone": number
      }>
    };
    try {
      response = await this.service.getCaseDetails(this.smsListCase).toPromise();
    } catch (error) {
      this.toast.error('Something went wrong while fetching details');
    }
    if (response && response.status === "success") {
      this.artistNumbers = response.data.map(e => e.phone).toString();
      // console.log(this.artistNumbers);
    }
    else if (response.status === "failure") {
      this.toast.error(response.message);
    }
  }

  ngOnInit() {
    this.templateArray = [
      "Hey now the site is waiting for you,you can login within the next few hours to submit your request to the cast",
      "Hi reminder about audition,email or website details",
      "Hi we are trying to send your profile to customer and yet it is not possible to contact us :)",
      "Hi there is a new workshop from Shelash, details on the site",
      "A new audition summons was received, details on the three-site link",
      "At your request, details of a new workshop in Shas"
    ];
    this.ids = this.ids.map(e => parseInt(e));
    if (this.ids && this.ids.length > 0) {
      this.getDataByIds(this.ids);
    }
  }

  async getDataByIds(ids: number[]) {
    try {
      let response = await this.service.getDetailsByIds({ artistIds: ids }).toPromise();
      if (response.status == "success") {
        let data = response.data.map(e => e.phone);
        this.artistNumbers = data.toString();
      }
      else if (response && response.status === "failure") {
        this.toast.error('Failed to get data');
      }
    } catch (error) {
      this.toast.error('Something went wrong');
    }
  }

  getCharacterCount(): number {
    return 400 - this.messageArtist.length;
  }

  changeTemplate(template: string) {
    this.messageArtist = template;
    this.template = '';
  }

  async sendSMS() {
    if (this.artistNumbers != "" && this.messageArtist != "") {
      let response;
      try {
        response = await this.service.sendSMS(this.messageArtist, this.artistNumbers).toPromise()
      } catch (error) {
        this.toast.error('Something went wrong while sending SMS');
      }
      if (response && response.status == "success") {
        this.toast.success('SMS sent successfully');
      }
      else if (response && response.status == "failure") {
        this.toast.error('Message not sent');
      }
    }
    else {
      this.toast.error('Please provide numbers and message to send SMS');
    }
  }
}