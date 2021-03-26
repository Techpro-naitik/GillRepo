import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatTable, MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuditionService } from 'app/Services/audition.service';
import { InsertauditiontopicComponent } from '../insertauditiontopic/insertauditiontopic.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-auditiontopic',
  templateUrl: './auditiontopic.component.html',
  styleUrls: ['./auditiontopic.component.css']
})
export class AuditiontopicComponent implements OnInit {

  masterData: [];
  selection = new SelectionModel<any>(true, []);
  displayCoulmns: string[] = ['id', 'topicName', 'Edited'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource<any>(this.masterData);

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public translate: TranslateService,
    private toastr: ToastrService, public dialog: MatDialog,
    public router: Router, private auditionService: AuditionService, private load: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getAuditionTopics();
  }

  getAuditionTopics() {
    this.auditionService.getAuditionTopic().subscribe(res => {
      if (res.status === "success") {
        this.dataSource = new MatTableDataSource<any>(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      else if (res.status === "failure") {
        this.toastr.error('Failed to fetch audition topics');
      }
    },
      err => {
        console.log(err);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateprops(element) {
    const dialogRef = this.dialog.open(InsertauditiontopicComponent, {
      data: element
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res == 'saved') {
        this.getAuditionTopics();
      }
    });
  }

  openDialog(action, obj) {
    obj.action = action;
    obj.name = obj.topicName;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result == 'yes') {
        this.deleteTopic(obj.id);
      }
    });
  }

  async deleteTopic(id) {
    let response;
    try {
      response = await this.auditionService.deleteAuditionTopic(id).toPromise();
    } catch (error) {
      this.toastr.error('Something went wrong');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.toastr.success('Deleted successfully');
      this.getAuditionTopics();
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
        response = await this.auditionService.deleteAllTopics({ ids: data }).toPromise();
      } catch (error) {
        this.toastr.error('Something went wrong');
        this.load.hide();
      }
      if (response && response.status == "success") {
        this.toastr.success('Deleted successfully');
        this.getAuditionTopics();
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