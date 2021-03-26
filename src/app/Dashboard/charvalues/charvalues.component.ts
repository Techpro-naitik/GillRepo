import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatTable, MatSort, MatPaginator, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UpdatecharvaluesComponent } from '../updatecharvalues/updatecharvalues.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ServiceService } from 'app/service.service';
import { MasterdataService } from 'app/Services/masterdata.service';
import { SelectionModel } from '@angular/cdk/collections';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-charvalues',
  templateUrl: './charvalues.component.html',
  styleUrls: ['./charvalues.component.css']
})
export class CharvaluesComponent implements OnInit {
  selection = new SelectionModel<any>(true, []);

  displayCoulmns: string[] = ['id', 'Values', 'Edited'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  charvalues: FormGroup;

  constructor(public translate: TranslateService,
    private toastr: ToastrService, private load: NgxSpinnerService,
    public router: Router, private dialog: MatDialog, private service: MasterdataService,
    private dialogref: MatDialogRef<CharvaluesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder
  ) {
    // console.log(this.data);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data.options);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refreshpage() {
    this.router.navigate(['/dashboard/physicalfeature'])
  }

  updatevalues(element) {
    const dialogref = this.dialog.open(UpdatecharvaluesComponent, {
      data: element
    });
    dialogref.afterClosed().subscribe(res => {
      if (res == 'saved') {
        this.dialogref.close('saved');
      }
    });
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        this.deleteCharValues(obj.id);
      }
    });
  }

  async deleteCharValues(id) {
    let response;
    try {
      response = await this.service.deleteCharValues(id).toPromise();
    } catch (error) {
      this.toastr.error('Something went wrong ');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.toastr.success('Deleted successfully');
      this.dialogref.close('saved');
    }
    else if (response && response.status == "failure") {
      this.toastr.error('Failed to delete');
    }
  }
  
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

  deleteAllSelected() {
    let data = this.selection.selected.map(e => e.id);
    this.selection.clear();
    // console.log(data);
  }

}