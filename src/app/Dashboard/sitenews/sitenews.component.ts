import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TextsandnewsService } from 'app/Services/textsandnews.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sitenews',
  templateUrl: './sitenews.component.html',
  styleUrls: ['./sitenews.component.css']
})
export class SitenewsComponent implements OnInit {
  selection = new SelectionModel<any>(true, []);
  displayCoulmns: string[] = ['id', 'title', 'date', 'shortText', 'pic', 'archive', 'Edited'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public translate: TranslateService,
    private toastr: ToastrService, private dialog: MatDialog,
    public router: Router, private service: TextsandnewsService, private load: NgxSpinnerService
  ) { }

  async getAllNews() {
    let response;
    try {
      response = await this.service.getAllNews().toPromise();
    } catch (error) {
      this.toastr.error('Something went wrong...');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.dataSource = new MatTableDataSource(response.data.siteNews);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    else if (response && response.status === "failure") {
      this.toastr.error('Failed to get news');
    }
  }

  async ngOnInit() {
    await this.getAllNews();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  insertcastingnews() {
    this.router.navigate(['/dashboard/insertsitenews'])
  }

  updateNews(id) {
    this.router.navigate(['/dashboard/insertsitenews', id]);
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
      response = await this.service.deleteNewsById(id).toPromise();
    } catch (error) {
      this.toastr.error('Something went wrong...');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.toastr.success('Deleted successfully');
      this.getAllNews();
    }
    else if (response && response.status === "failure") {
      this.toastr.error('Failed to delete');
    }
  }

  refreshpage() {
    this.getAllNews();
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
        response = await this.service.deleteAllNews({ ids: data }).toPromise();
      } catch (error) {
        this.toastr.error('Something went wrong');
        this.load.hide();
      }
      if (response && response.status == "success") {
        this.toastr.success('Deleted Successfully');
        this.getAllNews();
      }
      else if (response && response.status === "failure") {
        this.toastr.error('Failed to delete');
      }
    }
  }

}