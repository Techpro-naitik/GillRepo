import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MasterdataService } from 'app/Services/masterdata.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-updateprops',
  templateUrl: './updateprops.component.html',
  styleUrls: ['./updateprops.component.css']
})
export class UpdatepropsComponent implements OnInit {

  updateProp5value: FormGroup;

  constructor(public router: Router, @Inject(MAT_DIALOG_DATA) public data: any,
    private _toast: ToastrService, private dialog: MatDialogRef<UpdatepropsComponent>,
    private fb: FormBuilder, private service: MasterdataService, private load: NgxSpinnerService,
    private translate: TranslateService
  ) {
    this.updateProp5value = this.fb.group({
      name: [null, Validators.required],
      catName: [null, Validators.required],
      val1: [null, Validators.required],
      val2: [null, Validators.required],
      val3: [null, Validators.required],
      val4: [null, Validators.required],
      val5: [null, Validators.required],
    });
  }

  ngOnInit() {
    // console.log(this.data);
    if (this.data) {
      this.updateProp5value.controls.name.setValue(this.data.prop5Name ? this.data.prop5Name : '');
      this.updateProp5value.controls.catName.setValue(this.data.catName ? this.data.catName : '');
      this.updateProp5value.controls.val1.setValue(this.data.options[0] ? this.data.options[0].value : '');
      this.updateProp5value.controls.val2.setValue(this.data.options[1] ? this.data.options[1].value : '');
      this.updateProp5value.controls.val3.setValue(this.data.options[2] ? this.data.options[2].value : '');
      this.updateProp5value.controls.val4.setValue(this.data.options[3] ? this.data.options[3].value : '');
      this.updateProp5value.controls.val5.setValue(this.data.options[4] ? this.data.options[4].value : '');
    }

  }

  backtolist() {
    this.router.navigate(['/dashboard/props'])
  }

  async addPropsValue() {
    if (this.updateProp5value.valid) {
      let data = {
        "prop5Name": this.updateProp5value.controls.name.value,
        "catName": this.updateProp5value.controls.catName.value,
        "catOrder": 0,
        "prop5Values": [
          {
            "val1Text": this.updateProp5value.controls.val1.value,
            "val2Text": this.updateProp5value.controls.val2.value,
            "val3Text": this.updateProp5value.controls.val3.value,
            "val4Text": this.updateProp5value.controls.val4.value,
            "val5Text": this.updateProp5value.controls.val5.value
          }
        ]
      };
      let response;
      try {
        response = await this.service.addProp5value(data).toPromise();
      } catch (error) {
        this._toast.error('Error while adding prop5');
        this.load.hide();
      }
      if (response && response.status == "success") {
        this._toast.success("Added successfully");
        this.dialog.close('yes');
      }
      else if (response && response.status === "failure") {
        this._toast.error('Failed to add prop5');
      }
    }
  }

  async editPropsValue() {
    let data = {
      "prop5Name": this.updateProp5value.controls.name.value,
      "catName": this.updateProp5value.controls.name.value,
      "catOrder": 0,
      "prop5Values": [
        {
          "val1Text": this.updateProp5value.controls.val1.value,
          "val2Text": this.updateProp5value.controls.val2.value,
          "val3Text": this.updateProp5value.controls.val3.value,
          "val4Text": this.updateProp5value.controls.val4.value,
          "val5Text": this.updateProp5value.controls.val5.value
        }
      ]
    };
    let response;
    try {
      response = await this.service.editProp5value(data, this.data.id).toPromise();
    } catch (error) {
      this._toast.error('Something went wrong');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this._toast.success("Edited successfully");
      this.dialog.close('yes');
    }
    else if (response && response.status === "failure") {
      this._toast.error('Failed to edit prop5');
    }
  }
}
