import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MasterdataService } from 'app/Services/masterdata.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-subscriptionadd',
  templateUrl: './subscriptionadd.component.html',
  styleUrls: ['./subscriptionadd.component.css']
})
export class SubscriptionaddComponent implements OnInit {

  subscriptionForm: FormGroup;

  constructor(private fb: FormBuilder, private service: MasterdataService, private toast: ToastrService,
    private dialog: MatDialogRef<SubscriptionaddComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private load: NgxSpinnerService) {
    this.subscriptionForm = this.fb.group({
      typeName: [null, Validators.required],
      typeColor: [null, Validators.required]
    });
  }

  ngOnInit() {
    if (this.data) {
      this.subscriptionForm.patchValue(this.data);
    }
  }

  async createSubscription() {
    if (this.subscriptionForm.valid) {
      let response;
      try {
        response = await this.service.addSubscription({
          typeName: this.subscriptionForm.controls.typeName.value,
          typeColor: this.subscriptionForm.controls.typeColor.value
        }).toPromise();

      } catch (error) {
        this.toast.error('Error');
        this.load.hide();
      }
      if (response && response.status == "success") {
        this.toast.success('Added successfully');
        this.dialog.close('yes');
      }
      else if (response && response.status === "failure") {
        this.toast.error('Failed to add subscription');
      }
    }
  }

  async editSubscription() {
    if (this.subscriptionForm.valid) {
      let response;
      try {
        response = await this.service.editSubscription({
          id: this.data.id,
          typeName: this.subscriptionForm.controls.typeName.value,
          typeColor: this.subscriptionForm.controls.typeColor.value
        }).toPromise();
      } catch (error) {
        this.toast.error('Error while editing subscription');
        this.load.hide();
      }
      if (response && response.status == "success") {
        this.toast.success('Edited successfully');
        this.dialog.close('yes');
      }
      else if (response && response.status === "failure") {
        this.toast.error('Failed to edit subscription');
      }
    }
  }

}
