import { Component, OnInit, Inject } from '@angular/core';
import { MasterdataService } from 'app/Services/masterdata.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  subscriptionData: any[];
  selectedColor: string;
  artistSubscriptionForm: FormGroup;
  constructor(private service: MasterdataService, private fb: FormBuilder,
    private dialog: MatDialogRef<SubscriptionComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: ToastrService, private load: NgxSpinnerService, private translate: TranslateService) {
    this.artistSubscriptionForm = this.fb.group({
      actStatusType: [0],
      actStatusColor: [''],
      actTakeJub: [null],
      insideNotes: ['']
    });
  }

  async ngOnInit() {
    setTimeout(() => {
      this.getAllSubscriptions();
    });
    if (this.data) {
      this.artistSubscriptionForm.patchValue(this.data);
    }
  }

  onSubscriptionSelect(id) {
    let data = this.subscriptionData.find(e => e.id == id);
    // console.log(data);
    this.artistSubscriptionForm.controls.actStatusColor.setValue(data.typeColor);
  }

  async getAllSubscriptions() {
    this.subscriptionData = [];
    let response;
    try {
      response = await this.service.getAllSubscriptions().toPromise();
    } catch (error) {
      this.toast.error('Something went wrong fetching details');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.subscriptionData = response.data;
    }
  }

  saveDetails() {
    let obj = {
      statusType: this.artistSubscriptionForm.controls.actStatusType.value,
      statusColor: this.artistSubscriptionForm.controls.actStatusColor.value,
      notes: this.artistSubscriptionForm.controls.insideNotes.value
    }
    if (this.artistSubscriptionForm.controls.actTakeJub.value) {
      obj['takeJub'] = 1;
    }
    else {
      obj['takeJub'] = 0;
    }
    // console.log(obj);
    this.dialog.close(obj);
  }

}