import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AddvaluephysicalfeatureComponent } from '../addvaluephysicalfeature/addvaluephysicalfeature.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MasterdataService } from 'app/Services/masterdata.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-insertphysicalfeature',
  templateUrl: './insertphysicalfeature.component.html',
  styleUrls: ['./insertphysicalfeature.component.css']
})
export class InsertphysicalfeatureComponent implements OnInit {

  charValueForm: FormGroup;

  constructor(public dialog: MatDialog, public router: Router, private fb: FormBuilder,
    private service: MasterdataService, private toast: ToastrService, private load: NgxSpinnerService,
    private translate: TranslateService) {
    this.charValueForm = this.fb.group({
      name: [null, Validators.required],
      title: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  openDialog() {
    if (this.charValueForm.valid) {
      const dialogRef = this.dialog.open(AddvaluephysicalfeatureComponent, {
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(res => {
        if (res != undefined && res != true) {
          let d = res.map(e => { return e.name });
          this.createPhysicalFeature(d);
        }
      });
    }
    else {
      this.toast.error('Please fill required details');
    }
  }

  async createPhysicalFeature(data) {
    if (this.charValueForm.valid) {
      let response;
      try {
        response = await this.service.addCharacteristicsValues({
          name: this.charValueForm.controls.name.value,
          title: this.charValueForm.controls.title.value,
          multiValue: 0,
          ord: 6,
          charValues: data
        }).toPromise();
      } catch (error) {
        this.toast.error('Error');
        this.load.hide();
      }
      if (response && response.status == "success") {
        this.toast.success('Added');
        this.charValueForm.reset();
      }
      else if (response && response.status == "failure") {
        this.toast.error('Failed to add physical feature');
      }
    }
    else {
      this.toast.error('Please fill required details');
    }
  }
  featurepage() {
    this.router.navigate(['./dashboard/physicalfeature'])
  }
}