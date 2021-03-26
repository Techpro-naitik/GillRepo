import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServiceService } from 'app/service.service';
import { CharData, CharParentData } from 'app/Models/MasterDataModel/model';
import { PhysicalfeatureupdateComponent } from '../physicalfeatureupdate/physicalfeatureupdate.component';
import { CharvaluesComponent } from '../charvalues/charvalues.component';
import { InsertphysicalfeatureComponent } from '../insertphysicalfeature/insertphysicalfeature.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MasterdataService } from 'app/Services/masterdata.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-physicalfeature',
  templateUrl: './physicalfeature.component.html',
  styleUrls: ['./physicalfeature.component.css']
})
export class PhysicalfeatureComponent implements OnInit {

  displayCoulmns: string[] = ['name', 'Edited', 'Values'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  characteristicsData: CharParentData[];
  constructor(public translate: TranslateService,
    private toastr: ToastrService, public dialog: MatDialog,
    public router: Router, private service: MasterdataService, private load: NgxSpinnerService
  ) { }

  async ngOnInit() {
    await this.getAllCharacteristicsData();
  }

  async getAllCharacteristicsData() {
    this.characteristicsData = [];
    let response;
    try {
      response = await this.service.getAllCharacteristicsData().toPromise();
    } catch (error) {
      this.toastr.error('Error fetching details');
      this.load.hide();
    }
    if (response && response.status == "success" && response.data) {
      this.characteristicsData = response.data;
      this.dataSource = new MatTableDataSource<any>(this.characteristicsData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    else if (response && response.status === "failure") {
      this.toastr.error('Failed to get data');
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  insertcastingnews() {
    this.router.navigate(['/dashboard/insertfaq'])
  }

  updatefeature(element) {
    const dialogref = this.dialog.open(PhysicalfeatureupdateComponent, {
      data: element
    });
    dialogref.afterClosed().subscribe(res => {
      if (res == "saved") {
        this.getAllCharacteristicsData();
      }
    });
  }

  updatevalues(element) {
    const dialogref = this.dialog.open(CharvaluesComponent, {
      data: element
    });
    dialogref.afterClosed().subscribe(res => {
      if (res == 'saved') {
        this.getAllCharacteristicsData();
      }
    })
  }

  addphysicalfeature() {
    this.router.navigate(['/dashboard/insertphysicalfeature']);
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        this.deleteCharParent(obj.characteristicId);
      }
    });
  }

  async deleteCharParent(id) {
    let response;
    try {
      response = await this.service.deleteCharParent(id).toPromise();
    } catch (error) {
      this.toastr.error('Something went wrong');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.toastr.success('Deleted successfully');
      this.getAllCharacteristicsData();
    }
    else if (response && response.status === "failure") {
      this.toastr.error('Failed to delete');
    }
  }
}