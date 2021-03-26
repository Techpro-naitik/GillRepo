import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { MasterdataService } from 'app/Services/masterdata.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SubscriptionaddComponent } from '../subscriptionadd/subscriptionadd.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-typeofmanuy',
  templateUrl: './typeofmanuy.component.html',
  styleUrls: ['./typeofmanuy.component.css']
})
export class TypeofmanuyComponent implements OnInit {

  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayCoulmns: string[] = ['typeName', 'color', 'actions'];
  dataSource: MatTableDataSource<any>;

  constructor(private service: MasterdataService, private toast: ToastrService, public dialog: MatDialog,
    private load: NgxSpinnerService, private translate: TranslateService) {
  }

  async ngOnInit() {
    await this.getAllSubscriptions();
  }

  async getAllSubscriptions() {
    let response;
    try {
      response = await this.service.getAllSubscriptions().toPromise();
    } catch (error) {
      this.toast.error('Error fetching details');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.sort = this.sort;
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to get subscriptions');
    }
  }

  // open confirmation dialog

  openDialog(action, obj) {
    obj.action = action;
    obj.name = obj.typeName;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result == 'yes') {
        this.deleteSubscription(obj.id);
      }
    });
  }

  async deleteSubscription(id) {
    let response;
    try {
      response = await this.service.deleteSubscription(id).toPromise();
    } catch (error) {
      this.toast.error('Error');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.toast.success('Deleted successfully');
      this.getAllSubscriptions();
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to delete');
    }
  }

  addSubscription() {
    const dialogRef = this.dialog.open(SubscriptionaddComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        this.getAllSubscriptions();
      }
    });
  }

  async editSubscription(obj) {
    const dialogRef = this.dialog.open(SubscriptionaddComponent, {
      width: '250px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result == 'yes') {
        this.getAllSubscriptions();
      }
    });
  }

}