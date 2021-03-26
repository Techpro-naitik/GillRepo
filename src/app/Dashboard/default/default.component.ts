import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatTable, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TextsandnewsService } from 'app/Services/textsandnews.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  selection = new SelectionModel<any>(true, []);
  displayCoulmns: string[] = ['id', 'title', 'date', 'shortText', 'pic', 'archive', 'Edited'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  constructor(public translate: TranslateService,
    private toastr: ToastrService, private dialog: MatDialog,
    public router: Router, private service: TextsandnewsService, private load: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getAllTexts();
  }

  async getAllTexts() {
    let response;
    try {
      response = await this.service.getAllTexts().toPromise();
    } catch (error) {
      this.toastr.error('Something went wrong...');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.dataSource = new MatTableDataSource<any>(response.data.texts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    else if (response && response.status == "failure") {
      this.toastr.error('Failed to get data');
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  insertcastingnews() {
    this.router.navigate(['/dashboard/insertdefault']);
  }

  updateText(id) {
    this.router.navigate(['/dashboard/insertdefault', id]);
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        this.deleteText(obj.id);
      }
    });
  }

  async deleteText(id) {
    let response;
    try {
      response = await this.service.deleteTextById(id).toPromise();
    } catch (error) {
      this.toastr.error('Something went wrong...');
    }
    if (response && response.status == "success") {
      this.toastr.success('Deleted successfully');
      this.getAllTexts();
    }
    else if (response && response.status == "failure") {
      this.toastr.error('Failed to delete');
    }
  }

  async refreshpage() {
    await this.getAllTexts();
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
        response = await this.service.deleteAllTexts({ ids: data }).toPromise();
      } catch (error) {
        this.toastr.error('Something went wrong');
      }
      if (response && response.status == "success") {
        this.toastr.success('Deleted Successfully');
        this.getAllTexts();
      }
      else if (response && response.status == "failure") {
        this.toastr.error('Failed to delete');
      }
    }
  }

}