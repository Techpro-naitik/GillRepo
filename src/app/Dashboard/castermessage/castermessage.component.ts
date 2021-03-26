import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatTableDataSource, MatSort, MatTable, MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuditionService } from 'app/Services/audition.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-castermessage',
  templateUrl: './castermessage.component.html',
  styleUrls: ['./castermessage.component.css']
})
export class CastermessageComponent implements OnInit {

  displayCoulmns: string[] = ['select', 'id', 'pauditionCreationDate', 'pTitle', 'inviteMsgTitle', 'typeName', 'firstname', 'action'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  query: {
    pageSize: number,
    pageNumber: number
  } = { pageSize: 25, pageNumber: 1 };
  flags = { agency: true, phone: true };

  pageNumbers: number[];

  length = 0;
  count = 1;

  constructor(public translate: TranslateService, private service: AuditionService,
    private toastr: ToastrService, public router: Router, private load: NgxSpinnerService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllAuditions('');
  }

  async getAllAuditions(term?) {
    let response: { status: string, messasge: string, data: { audition: Array<object>, totalCount: number } };
    try {
      term = term ? term : "";
      response = await this.service.getAllAuditions(this.query.pageNumber - 1, this.query.pageSize, term, 0).toPromise();
    } catch (error) {
      this.toastr.error('Something went wrong while fetching details');
      this.load.hide();
    }
    if (response && response.status == "success") {
      response.data.audition.forEach(e => e['isSelected'] = false);
      this.dataSource = new MatTableDataSource(response.data['audition']);
      this.dataSource.sort = this.sort;
      this.pageNumbers = [];
      this.length = response.data.totalCount;
      let count = Math.ceil(response.data['totalCount'] / this.query.pageSize);
      this.count = count;
      for (let index = 1; index <= count; index++) {
        this.pageNumbers.push(index);
      }
    }
    else if (response && response.status == "failure") {
      this.toastr.error('Failed to get auditions');
    }
  }

  openConfirmationSingle(action, id) {
    let obj = { action: action, name: id };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        this.deleteSingle(id);
      }
    });
  }

  deleteSingle(id) {
    this.service.deleteSingleAudition(id).subscribe(response => {
      if (response && response.status === "success") {
        this.toastr.success('Audition Deleted Successfully');
        this.getAllAuditions();
      }
      else if (response && response.status == "failure") {
        this.toastr.error('Failed to delete');
      }
    },
      () => {
        this.toastr.error('Something went wrong while deleting records');
        this.load.hide();
      });
  }

  openConfirmation(action) {
    let obj = { action: action, name: '' };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        let data = this.selection.selected.map(e => e.id);
        if (data.length > 0) {
          this.auditonDeleteAll(data);
          this.selection.clear();
        }
        else {
          this.toastr.error('No records selected');
        }
      }
    });
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

  auditonDeleteAll(data) {
    this.service.deleteAllAuditions({ ids: data }).subscribe(response => {
      if (response && response.status === "success") {
        this.toastr.success('Auditions Deleted Successfully');
        this.getAllAuditions();
      }
      else if (response && response.status == "failure") {
        this.toastr.error('Failed to delete');
      }
    },
      () => {
        this.toastr.error('Something went wrong while deleting records');
        this.load.hide();
      });
  }

  searchAudition(value: string) {
    this.getAllAuditions(value.trim());
  }

  onPaginateChange($event) {
    // console.log($event);
    if ($event.pageSize != this.query.pageSize) {
      this.query.pageSize = $event.pageSize;
      this.getAllAuditions('');
    }
    if ($event.pageIndex > $event.previousPageIndex) {
      this.query.pageNumber = $event.pageIndex + 1;
      this.getAllAuditions('');
    }
    if ($event.pageIndex < $event.previousPageIndex) {
      this.query.pageNumber = $event.previousPageIndex;
      this.getAllAuditions('');
    }
  }

  markAsApproved(id) {
    this.service.approveAudition(id).subscribe(response => {
      if (response.status === "success") {
        this.toastr.success('Audition approved successfully');
        this.getAllAuditions();
      }
      else if (response && response.status == "failure") {
        this.toastr.error('Failed to mark approved');
      }
    },
      () => {
        this.toastr.error('Something went wrong while approving audition');
      }
    );
  }
}