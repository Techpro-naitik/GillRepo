import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UpdatepropsComponent } from '../updateprops/updateprops.component';
import { MasterdataService } from 'app/Services/masterdata.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-props',
  templateUrl: './props.component.html',
  styleUrls: ['./props.component.css']
})
export class PropsComponent implements OnInit {

  selection = new SelectionModel<any>(true, []);
  displayCoulmns: string[] = ['id', 'prop5Name', 'CategoryName', 'order', 'text1', 'text2', 'text3', 'text4', 'text5', 'Edited'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public translate: TranslateService,
    private toastr: ToastrService, private service: MasterdataService,
    public router: Router, public dialog: MatDialog, private load: NgxSpinnerService
  ) { }

  async ngOnInit() {
    await this.getAllPropsData();
  }

  async getAllPropsData() {
    let response;
    try {
      response = await this.service.getAllPropsData().toPromise();
    } catch (error) {
      this.toastr.error('Error fetching prop5 data');
      this.load.hide();
    }
    if (response && response.status == "success" && response.data) {
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    else if (response && response.status === "failure") {
      this.toastr.error('Failed to get props data');
    }
  }

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  backtolist() {
    this.router.navigate(['/dashboard/insertprops'])
  }

  updateprops(obj) {
    const dialogRef = this.dialog.open(UpdatepropsComponent, {
      width: '400px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response != undefined && response == 'yes') {
        this.getAllPropsData();
      }
    });
  }

  addProps() {
    const dialogRef = this.dialog.open(UpdatepropsComponent, {
      width: '400px',
      data: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response != undefined && response == 'yes') {
        this.getAllPropsData();
      }
    });
  }

  openDialog(action, obj) {
    obj.action = action;
    obj.name = obj.prop5Name;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result == 'yes') {
        this.deleteProp5(obj.id);
      }
    });
  }

  async deleteProp5(id) {
    let response;
    try {
      response = await this.service.deleteProp5Parent(id).toPromise();
    } catch (error) {
      this.toastr.error('Something went wrong');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.toastr.success('Deleted successfully');
      this.getAllPropsData();
    }
    else if (response && response.status === "failure") {
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
        response = await this.service.deleteAllProps({ ids: data }).toPromise();
      } catch (error) {
        this.toastr.error('Something went wrong');
        this.load.hide();
      }
      if (response && response.status == "success") {
        this.toastr.success('Deleted successfully');
        this.getAllPropsData();
      }
      else if (response && response.status === "failure") {
        this.toastr.error('Failed to delete');
      }
    }
    else {
      this.toastr.show('No row(s) selected');
    }
  }

}