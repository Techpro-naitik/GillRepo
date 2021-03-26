import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServiceService } from 'app/service.service';
import { MasterdataService } from 'app/Services/masterdata.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-physicalfeatureupdate',
  templateUrl: './physicalfeatureupdate.component.html',
  styleUrls: ['./physicalfeatureupdate.component.css']
})

export class PhysicalfeatureupdateComponent implements OnInit {

  characteristicsForm: FormGroup;
  updateObject: any;

  constructor(public router: Router, private dialog: MatDialogRef<PhysicalfeatureupdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private service: MasterdataService, private translate: TranslateService) {
    this.characteristicsForm = this.fb.group({
      name: [null],
      title: [null]
    });
    this.updateObject = {};
  }

  ngOnInit() {
    this.characteristicsForm.controls.name.setValue(this.data.name);
    this.characteristicsForm.controls.title.setValue(this.data.title);
  }

  async saveCharacteristics() {
    this.updateObject.name = this.characteristicsForm.controls.name.value;
    this.updateObject.title = this.characteristicsForm.controls.title.value;
    this.updateObject.multiValue = 0;
    this.updateObject.ord = 1;
    let response = await this.service.editCharParentValue(this.data.characteristicId, this.updateObject).toPromise();
    if (response.status == "success") {
      this.dialog.close('saved');
    }
  }

}
