import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable, MatSort, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuditionService } from 'app/Services/audition.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';

window.addEventListener("scroll", function (event) {
  var scroll = this.scrollY;
  console.log(scroll);
  console.log(event);
});

@Component({
  selector: 'app-auditions',
  templateUrl: './auditions.component.html',
  styleUrls: ['./auditions.component.css']
})
export class AuditionsComponent implements OnInit {

  displayCoulmns: string[] = ['select', 'id', 'pauditionCreationDate', 'pTitle', 'inviteMsgTitle', 'typeName', 'firstname', 'pSentToCasterDate', 'pViewedByCaster', 'answered', 'subscriptions', 'sendband'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  query: {
    pageSize: number,
    pageNumber: number
  } = { pageSize: 25, pageNumber: 1 };

  flags = { agency: true, phone: true };

  // pageNumbers: number[];

  length = 0;
  count = 1;

  constructor(private translate: TranslateService, private service: AuditionService,
    private toastr: ToastrService, public router: Router, private load: NgxSpinnerService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllAuditions('');
  }

  async getAllAuditions(term?) {
    let response: { status: string, messasge: string, data: { audition: Array<object>, totalCount: number } };
    try {
      term = term ? term : "";
      response = await this.service.getAllAuditions(this.query.pageNumber - 1, this.query.pageSize, term, 1).toPromise();
    } catch (error) {
      this.toastr.error('Something went wrong while fetching details');
      this.load.hide();
    }
    if (response && response.status == "success") {
      response.data.audition.forEach(e => e['isSelected'] = false);
      this.dataSource = new MatTableDataSource(response.data['audition']);
      this.dataSource.sort = this.sort;
      this.length = response.data.totalCount;
      this.count = Math.ceil(response.data['totalCount'] / this.query.pageSize);
    }
    else if (response && response.status === "failure") {
      this.toastr.error('Failed to fetch auditions');
    }
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
        this.toastr.success('Records Deleted Successfully');
        this.getAllAuditions();
      }
      else if (response && response.status === "failure") {
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
    if ($event.pageSize != this.query.pageSize) {
      this.query.pageSize = $event.pageSize;
      this.query.pageNumber = 1;
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

}