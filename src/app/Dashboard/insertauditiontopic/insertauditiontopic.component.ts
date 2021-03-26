import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';
import { AuditionService } from 'app/Services/audition.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-insertauditiontopic',
  templateUrl: './insertauditiontopic.component.html',
  styleUrls: ['./insertauditiontopic.component.css']
})
export class InsertauditiontopicComponent implements OnInit {

  name: FormControl;
  constructor(public router: Router, @Inject(MAT_DIALOG_DATA) public data: any, private load: NgxSpinnerService,
    private _toast: ToastrService, private dialog: MatDialogRef<InsertauditiontopicComponent>, private service: AuditionService,
    private translate: TranslateService) {
    this.name = new FormControl(null, Validators.required);
  }

  ngOnInit() {
    if (this.data) {
      this.name.setValue(this.data.topicName);
    }
  }

  async addNewAuditionTopic() {
    if (this.name.valid) {
      let response;
      try {
        response = await this.service.addAuditionTopic({
          topicName: this.name.value,
          order: 0
        }).toPromise();
      } catch (error) {
        this._toast.error('Error');
        this.load.hide();
      }
      if (response && response.status == "success") {
        this.dialog.close('saved');
        this._toast.success('Added succesfully');
      }
      else if (response && response.status == "failure") {
        this._toast.error('Failed to add an audition type');
      }
    }
  }

  async EditAuditionTopic() {
    if (this.name.valid) {
      let response;
      try {
        response = await this.service.editAuditionTopic(this.data.id, {
          topicName: this.name.value,
          order: this.data.order
        }).toPromise();
      } catch (error) {
        this._toast.error('Error');
        this.load.hide();
      }
      if (response && response.status == "success") {
        this.dialog.close('saved');
        this._toast.success('Edited succesfully');
      }
      else if (response && response.status == "failure") {
        this._toast.error('Failed to edit an audition type');
      }
    }
  }

}