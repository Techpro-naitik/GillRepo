import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuditionService } from 'app/Services/audition.service';
import { InsertauditiontypeComponent } from '../insertauditiontype/insertauditiontype.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-auditiontype',
  templateUrl: './auditiontype.component.html',
  styleUrls: ['./auditiontype.component.css']
})
export class AuditiontypeComponent implements OnInit {
  deletevalue: any;
  selected_Value = '';

  masterData: [];

  displayCoulmns: string[] = ['typeName', 'Edited'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource<any>(this.masterData);

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public translate: TranslateService,
    private toastr: ToastrService, private load: NgxSpinnerService,
    public router: Router, private auditionService: AuditionService, public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAuditionTypes();
  }

  getAuditionTypes() {
    this.auditionService.getAuditionTypes().subscribe(res => {
      if (res && res.status == "success") {
        this.dataSource = new MatTableDataSource<any>(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      else if (res && res.status == "failure") {
        this.toastr.error('Failed to get audition types');
      }
    },
      err => {
        console.log(err);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  backtolist() {
    this.router.navigate(['/dashboard/insertauditiontype'])
  }

  updateprops(obj) {
    const dialogRef = this.dialog.open(InsertauditiontypeComponent, {
      width: '400px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res == 'saved') {
        this.getAuditionTypes();
      }
    });
  }

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
        this.deleteType(obj.id);
      }
    });
  }

  async deleteType(id) {
    let response;
    try {
      response = await this.auditionService.deleteAuditiontype(id).toPromise();
    } catch (error) {
      this.toastr.error('Something went wrong');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.toastr.success('Deleted successfully');
      this.getAuditionTypes();
    }
    else if (response && response.status == "failure") {
      this.toastr.error('Failed to delete type');
    }
  }

}