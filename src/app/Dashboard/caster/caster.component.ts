import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AuditionService } from 'app/Services/audition.service';
import { CasterDataModel } from 'app/Models/CasterModel/model';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-caster',
  templateUrl: './caster.component.html',
  styleUrls: ['./caster.component.css']
})
export class CasterComponent implements OnInit {
  deletevalue: any;
  selected_Value = '';

  masterData: CasterDataModel[];
  displayCoulmns: string[] = ['id', 'firstName', 'lastName', 'address', 'email1', 'phone1', 'fax', 'company', 'disabled', 'edit'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  selection = new SelectionModel<CasterDataModel>(true, []);

  constructor(public translate: TranslateService,
    private toastr: ToastrService, public dialog: MatDialog,
    public router: Router, private auditionService: AuditionService, private load: NgxSpinnerService

  ) { }

  ngOnInit() {
    this.getAllCasters();
  }

  getAllCasters() {
    this.auditionService.getCasters().subscribe(res => {
      if (res && res.status === "success") {
        this.masterData = res.data;
        this.dataSource = new MatTableDataSource<any>(this.masterData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else if (res && res.status == "failure") {
        this.toastr.error('Failed to get casters');
      }
    },
      err => {
        this.toastr.error('Something went wrong while fetching casters');
        this.load.hide();
      });
  }

  refreshpage() {
    this.getAllCasters();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  newband() {
    this.router.navigate(['/dashboard/newband'])
  }

  openDialog(action, obj) {
    obj.action = action;
    obj.name = `${obj.firstName} ${obj.lastName}`;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result == 'yes') {
        this.deleteCaster(obj.id);
      }
    });
  }

  async deleteCaster(id) {
    let response;
    try {
      response = await this.auditionService.deleteCaster(id).toPromise();
    } catch (error) {
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.toastr.success('Deleted successfully');
      this.getAllCasters();
    }
    else if (response && response.status == "failure") {
      this.toastr.error('Failed to delete');
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
        response = await this.auditionService.deleteAllCasters({ ids: data }).toPromise();
      } catch (error) {
        this.toastr.error('Something went wrong');
        this.load.hide();
      }
      if (response && response.status == "success") {
        this.toastr.success('Deleted successfully');
        this.getAllCasters();
      }
      else if (response && response.status == "failure") {
        this.toastr.error('Failed to delete');
      }
    }
    else {
      this.toastr.show('No row(s) selected');
    }
  }

}