import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable, MatSort, MatPaginator } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';
import { InsertcastingnewsComponent } from '../insertcastingnews/insertcastingnews.component';
import { CastingService } from 'app/Services/casting.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-castingnews',
  templateUrl: './castingnews.component.html',
  styleUrls: ['./castingnews.component.css']
})
export class CastingnewsComponent implements OnInit {

  selection = new SelectionModel<any>(true, []);

  displayCoulmns: string[] = ['id', 'body', 'disabled', 'ord', 'Edit'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public translate: TranslateService,
    private toastr: ToastrService, private load: NgxSpinnerService,
    public router: Router, public dialog: MatDialog,
    private service: CastingService
  ) { }

  async ngOnInit() {
    await this.getAllCastings();
  }

  async getAllCastings() {
    let response;
    try {
      response = await this.service.getAllCastings(0, 20).toPromise();
    } catch (error) {
      this.toastr.error('Something went wrong....');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.dataSource = new MatTableDataSource(response.data.castingNews);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    else if (response && response.status == "failure") {
      this.toastr.error('Failed to get castings');
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateCasting(id) {
    this.router.navigate(['/dashboard/insertcastingnews', id]);
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        this.deleteCasting(obj.id);
      }
    });
  }

  async deleteCasting(id) {
    let response;
    try {
      response = await this.service.deleteCastingById(id).toPromise();
    } catch (error) {
      this.toastr.error('Something went wrong...');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.toastr.success('Deleted successfully');
      this.getAllCastings();
    }
    else if (response && response.status == "failure") {
      this.toastr.error('Failed to delete');
    }
  }

  insertcastingnews() {
    this.router.navigate(['/dashboard/insertcastingnews']);
  }

  async refreshpage() {
    await this.getAllCastings();
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

  async deleteAllSelected() {
    let data = this.selection.selected.map(e => e.id);
    this.selection.clear();
    if (data.length > 0) {
      let response;
      try {
        response = await this.service.deleteAllCastingNews({ ids: data }).toPromise();
      } catch (error) {
        this.toastr.error('Something went wrong');
      }
      if (response && response.status == "success") {
        this.toastr.success('Deleted Successfully');
        this.getAllCastings();
      }
      else if (response && response.status == "failure") {
        this.toastr.error('Failed to delete');
      }
    }
  }
}