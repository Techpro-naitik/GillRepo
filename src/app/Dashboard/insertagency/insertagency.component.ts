import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgencyService } from 'app/Services/agency.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-insertagency',
  templateUrl: './insertagency.component.html',
  styleUrls: ['./insertagency.component.css']
})
export class InsertagencyComponent implements OnInit {

  _agencyForm: FormGroup;
  ranksData: Array<object>;

  constructor(public _router: Router, private _toast: ToastrService, private _fb: FormBuilder,
    private agencyService: AgencyService, private dialog: MatDialogRef<InsertagencyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private load: NgxSpinnerService, private translate: TranslateService) {
    this._agencyForm = this._fb.group({
      name: [null, Validators.required],
      agencyRankId: [null, Validators.required]
    });
  }

  async ngOnInit() {
    setTimeout(() => {
      this.getAgencyRanks();
      if (this.data) {
        this.getAgencyData(this.data);
        // this._agencyForm.controls.rank.setValue(this.data.id);
      }
    });
  }

  async getAgencyRanks() {
    let response;
    try {
      response = await this.agencyService.getAllAgencyRanks().toPromise();
    } catch (error) {
      this._toast.error('Error while fetching agency ranks');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.ranksData = response.data;
      // this._agencyForm.controls.agencyRankId.setValue(response.data[0].id);
    }
    else if (response && response.status == "failure") {
      this._toast.error('Failed to get agency ranks');
    }
  }

  async getAgencyData(id) {
    let response;
    try {
      response = await this.agencyService.getAgencyById(id).toPromise();
    } catch (error) {
      this._toast.error('Error fetching agency details');
      this.load.hide();
    }
    if (response && response.status == "success") {
      // this._agencyForm.controls.name.setValue(response.data.name);
      this._agencyForm.patchValue(response.data);
    }
    else if (response && response.status == "failure") {
      this._toast.error('Failed to get agency data');
    }
  }

  async createAgency() {
    if (this._agencyForm.valid) {
      let response;
      try {
        response = await this.agencyService.addAgency(this._agencyForm.value).toPromise();
      } catch (error) {
        this._toast.error('Something went wrong');
        this.load.hide();
      }
      if (response && response.status == "success") {
        this._toast.success(response.message);
        this.dialog.close('yes');
      }
      else if (response && response.status == "failure") {
        this._toast.error('Failed to create agency');
      }
    }
  }

  async editAgency() {
    if (this._agencyForm.valid) {
      let response;
      try {
        response = await this.agencyService.editAgency(this.data, {
          id: this.data,
          name: this._agencyForm.controls.name.value,
          agencyRankId: this._agencyForm.controls.agencyRankId.value
        }).toPromise();
      } catch (error) {
        this._toast.error('Something went wrong');
        this.load.hide();
      }
      if (response && response.status == "success") {
        this._toast.success(response.message);
        this.dialog.close('yes');
      }
      else if (response && response.status == "failure") {
        this._toast.error('Failed to edit agency');
      }
    }
  }

  backtolist() {
    this._router.navigate(['/dashboard/agency']);
  }
}
