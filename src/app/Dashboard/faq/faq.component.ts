import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CastingService } from 'app/Services/casting.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  selection = new SelectionModel<any>(true, []);
  displayCoulmns: string[] = ['id', 'question', 'answer', 'disabled', 'ord', 'Edited'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public translate: TranslateService,
    private toastr: ToastrService,
    public router: Router, private load: NgxSpinnerService,
    private service: CastingService, public dialog: MatDialog
  ) { }

  async ngOnInit() {
    await this.getAllAnswer();
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
      response = await this.service.deleteQuestion(id).toPromise();
    } catch (error) {
      this.toastr.error('Something went wrong...');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.toastr.success('Deleted successfully');
      this.getAllAnswer();
    }
    else if (response && response.status == "failure") {
      this.toastr.error('Failed to delete');
    }
  }

  insertfaq() {
    this.router.navigate(['/dashboard/insertfaq']);
  }

  async getAllAnswer() {
    let response;
    try {
      response = await this.service.getFaq(0, 20).toPromise();
    } catch (error) {
      this.toastr.error('Something went wrong....');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.dataSource = new MatTableDataSource(response.data.faqs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    else if (response && response.status == "failure") {
      this.toastr.error('Failed to get data');
    }
  }

  updateFaq(id) {
    this.router.navigate(['/dashboard/insertfaq', id]);
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
        response = await this.service.deleteAllFaq({ ids: data }).toPromise();
      } catch (error) {
        this.toastr.error('Something went wrong');
        this.load.hide();
      }
      if (response && response.status == "success") {
        this.toastr.success('Deleted Successfully');
        this.getAllAnswer();
      }
      else if (response && response.status == "failure") {
        this.toastr.error('Failed to delete');
      }
    }
  }

}