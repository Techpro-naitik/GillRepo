import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable, MatSort, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ServiceService } from 'app/service.service';
import { InsertagencyComponent } from '../insertagency/insertagency.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AgencyService } from 'app/Services/agency.service';
import { SelectionModel } from '@angular/cdk/collections';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  selection = new SelectionModel<any>(true, []);
  displayCoulmns: string[] = ['id', 'name', 'Values'];
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  // pageSize: number;

  constructor(public translate: TranslateService,
    private toastr: ToastrService,
    public router: Router,
    private service: ServiceService, public dialog: MatDialog,
    private agencyService: AgencyService, private load: NgxSpinnerService
  ) {
    // this.pageSize = 25;
  }

  ngOnInit() {
    this.getAllAgencies();
  }

  getAllAgencies() {
    this.service.allAgency().subscribe(
      (res) => {
        if (res && res.data) {
          this.dataSource = new MatTableDataSource(res.data);
          this.dataSource.sort = this.sort;
        }
        else if (res && res.status === "failure") {
          this.toastr.error('Failed to get agencies');
        }
      },
      err => {
        this.load.hide();
        this.toastr.error('Error while fetching details');
      }
    );
    // this.service.agenciesList.subscribe(data => {
    //   console.log(data);
    //   this.dataSource = new MatTableDataSource(data);
    //   this.dataSource.sort = this.sort;
    // })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updatevalues(id) {
    const dialogRef = this.dialog.open(InsertagencyComponent, {
      data: id
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res == 'yes') {
        this.getAllAgencies();
      }
    });
  }

  insertAgency() {
    const dialogRef = this.dialog.open(InsertagencyComponent, {
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res == 'yes') {
        this.getAllAgencies();
      }
    });
  }

  refreshList() {
    this.getAllAgencies();
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
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
      response = await this.agencyService.deleteAgency(id).toPromise();
    } catch (error) {
      this.toastr.error('Error while deleting');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.toastr.success(response.message);
      this.getAllAgencies();
    }
    else if (response && response.status === "failure") {
      this.toastr.error('Failed to delete agencies');
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  async deleteAllSelected() {
    let data = this.selection.selected.map(e => e.id);
    this.selection.clear();
    if (data.length > 0) {
      let response;
      try {
        response = await this.service.deleteAllAgency({ ids: data }).toPromise();

      } catch (error) {
        this.toastr.error('Something went wrong');
        this.load.hide();
      }
      if (response.status == "success") {
        this.toastr.success('Deleted successfully');
        this.getAllAgencies();
      }
      else if (response && response.status === "failure") {
        this.toastr.error('Failed to delete agencies');
      }
    }
    else {
      this.toastr.show('No row(s) selected');
    }
  }

}