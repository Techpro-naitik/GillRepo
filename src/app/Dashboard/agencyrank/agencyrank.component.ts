import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AgencyService } from 'app/Services/agency.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AddagencyrankComponent } from '../dialog/addagencyrank/addagencyrank.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-agencyrank',
  templateUrl: './agencyrank.component.html',
  styleUrls: ['./agencyrank.component.css']
})
export class AgencyrankComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayCoulmns: string[] = ['rank', 'color', 'action'];
  constructor(private service: AgencyService, private toast: ToastrService, private load: NgxSpinnerService,
    private dialog: MatDialog, private translate: TranslateService) { }

  ngOnInit() {
    this.getAgencyRanks();
  }

  async getAgencyRanks() {
    let response;
    try {
      response = await this.service.getAllAgencyRanks().toPromise();
    } catch (error) {
      this.toast.error('Error while fetching agency ranks');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.dataSource = new MatTableDataSource(response.data);
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to get agency ranks');
    }
  }

  openCreateDialog(data?) {
    const dialogRef = this.dialog.open(AddagencyrankComponent, {
      data: data ? data : null
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res && res.type === "add") {
        this.createAgencyRank(res.data);
      }
      else if (res && res.type === "edit") {
        this.updateAgencyRank(res.data);
      }
    });
  }

  async createAgencyRank(data) {
    let response;
    try {
      response = await this.service.createAgencyRank(data).toPromise();
    } catch (error) {
      this.load.hide();
      this.toast.error('Something went wrong while adding agency rank');
    }
    if (response && response.status == "success") {
      this.toast.success('Agency rank added successfully');
      this.getAgencyRanks();
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to create agency rank');
    }
  }

  async updateAgencyRank(data) {
    let response;
    try {
      response = await this.service.editAgencyRank(data.id, data).toPromise();
    } catch (error) {
      this.load.hide();
      this.toast.error('Something went wrong while adding agency rank');
    }
    if (response && response.status == "success") {
      this.toast.success('Agency rank added successfully');
      this.getAgencyRanks();
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to update agency rank');
    }
  }

  openConfirmation(action, obj) {
    obj.action = action;
    obj.name = obj.rank;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        this.deleteAgency(obj.id);
      }
    });
  }

  async deleteAgency(id) {
    let response;
    try {
      response = await this.service.deleteAgencyRank(id).toPromise();
    } catch (error) {
      this.toast.error('Error while deleting');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.toast.success(response.message);
      this.getAgencyRanks();
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to delete agency rank');
    }
  }
}