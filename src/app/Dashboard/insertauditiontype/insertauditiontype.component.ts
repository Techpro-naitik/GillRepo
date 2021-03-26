import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';
import { AuditionService } from 'app/Services/audition.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-insertauditiontype',
  templateUrl: './insertauditiontype.component.html',
  styleUrls: ['./insertauditiontype.component.css']
})
export class InsertauditiontypeComponent implements OnInit {

  name: FormControl;
  categoryOptions : string[] = ['film', 'stage', 'commercial', 'tv', 'other']
  category: FormControl;

  constructor(public router: Router, @Inject(MAT_DIALOG_DATA) public data: any,
    private _toast: ToastrService, private dialog: MatDialogRef<InsertauditiontypeComponent>,
    private service: AuditionService, private load: NgxSpinnerService, private translate: TranslateService) {
    this.name = new FormControl(null, Validators.required);
    this.category = new FormControl('other');
  }

  ngOnInit() {
    if (this.data) {
      this.name.setValue(this.data.typeName);
      this.category.setValue(this.data.auditionCategory);
    }
  }

  async addNewAuditiontype() {
    if (this.name.valid) {
      let response;
      try {
        response = await this.service.addAuditiontype({
          typeName: this.name.value,
          order: 0,
          auditionCategory: this.category.value
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

  async EditAuditionType() {
    if (this.name.valid) {
      let response;
      try {
        response = await this.service.editAuditiontype(this.data.id, {
          typeName: this.name.value,
          order: this.data.order,
          auditionCategory: this.category.value
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