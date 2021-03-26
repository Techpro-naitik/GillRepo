import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from 'app/service.service';
import { MasterdataService } from 'app/Services/masterdata.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-updatecharvalues',
  templateUrl: './updatecharvalues.component.html',
  styleUrls: ['./updatecharvalues.component.css']
})
export class UpdatecharvaluesComponent implements OnInit {

  charValuesForm: FormGroup;

  constructor(private toastr: ToastrService,
    private dialog: MatDialog,
    private dialogref: MatDialogRef<UpdatecharvaluesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private service: MasterdataService,
    private load: NgxSpinnerService, private translate: TranslateService) {
    this.charValuesForm = this.fb.group({
      name: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.charValuesForm.controls.name.setValue(this.data.value);
  }

  async updateValue() {
    let response;
    try {
      response = await this.service.editCharValue(this.data.id, {
        value: this.charValuesForm.controls.name.value
      }).toPromise();
    } catch (error) {
      this.toastr.error('Somethimg went wrong');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.dialogref.close('saved');
      this.toastr.success('Saved successfully');
    }
    else if (response && response.status === "failure") {
      this.toastr.error('Failed to update');
    }
  }

}