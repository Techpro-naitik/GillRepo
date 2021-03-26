import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServiceService } from 'app/service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-refreshlist',
  templateUrl: './refreshlist.component.html',
  styleUrls: ['./refreshlist.component.css']
})
export class RefreshlistComponent implements OnInit {

  testForm: FormGroup;
  notificationData: any[];
  checkAll: boolean;
  // private readonly PAGE_SIZE = 10;
  query: any = {
    pageSize: 25,
    pageNumber: 1
  };
  pageSizeOptions = [10, 25, 50, 100];
  pageNumber: number[];

  constructor(public router: Router, private fb: FormBuilder, private service: ServiceService,
    private toast: ToastrService, private load: NgxSpinnerService, private translate: TranslateService) {
    this.testForm = this.fb.group({
      stype1: [1],
      stype2: [1],
      stype3: [null]
    });
    this.checkAll = false;
  }

  ngOnInit() {
    this.getAllNotificationsForAdmin(this.query.pageNumber, this.query.pageSize, 1);
  }

  listdetails(val) {
    this.router.navigate(["../dashboard/refreshlistdetails", { id: val }]);
  }

  async getAllNotificationsForAdmin(pageNumber, pageSize, val) {
    this.notificationData = [];
    this.pageNumber = [];
    let response;
    try {
      response = await this.service.getAllNotifications(pageNumber - 1, pageSize, val).toPromise();
    } catch (error) {
      this.toast.error('Error fetching notifications');
      this.load.hide();
    }
    if (response && response.status == "success") {
      if (response.data.notifications.length > 0) {
        response.data.notifications.forEach(element => {
          element['isSelected'] = false;
          this.notificationData.push(element);
        });
      }
      let count = Math.ceil(response.data.totalCount / this.query.pageSize);
      for (let i = 1; i <= count; i++) {
        this.pageNumber.push(i);
      }
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to get data');
    }
  }

  playerEdit(id) {
    this.router.navigate(["../dashboard/playerupdate", { 'artistId': id }]);
  }

  filterChange(val) {
    this.checkAll = false;
    this.getAllNotificationsForAdmin(this.query.pageNumber, this.query.pageSize, val);
  }

  performAction(value) {
    value = parseInt(value);
    let tempData = [];
    tempData = this.notificationData.filter(e => {
      if (e.isSelected) {
        return e.dataId;
      }
    }).map(x => x.dataId);

    if (tempData.length > 0) {
      switch (value) {

        case 0:
          this.toast.error('No action selected');
          break;
        case 1:
          // console.log('delete');
          this.deleteMultipleNotifications(tempData);
          break;

        case 2:
          // console.log('mark as read');
          this.markMultipleAsReadUnread(tempData, 1);
          break;

        case 3:
          // console.log('mark as unread');
          this.markMultipleAsReadUnread(tempData, 0);
          break;

        default:
          break;
      }
    }
    else {
      this.toast.error('No row(s) selected');
      value = 0;
    }
    this.checkAll = false;
  }

  checkChange(value) {
    value.isSelected = !value.isSelected;
  }

  checkAllFunc(val) {
    this.notificationData.forEach(element => {
      element.isSelected = val.checked;
    });
  }

  getUpdate(value, checkSizeChange?) {
    if (checkSizeChange) {
      this.query.pageNumber = 1;
    }
    this.getAllNotificationsForAdmin(this.query.pageNumber, this.query.pageSize, value);
    // console.log(this.query);
  }

  // onPageChange(page) {
  //   this.query.page = page;
  //   console.log(this.query);
  //   // this.getAllNotificationsForAdmin();
  // }

  async deleteMultipleNotifications(data) {
    let response;
    try {
      response = await this.service.deleteMultipleNotifications(data).toPromise();
    } catch (error) {
      this.load.hide();
      this.toast.error('Error while deleting notifications');
    }
    if (response && response.status == "success") {
      this.toast.success(response.message);
      this.getAllNotificationsForAdmin(this.query.pageNumber, this.query.pageSize, this.testForm.controls.stype1.value);
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to delete');
    }
  }

  async markMultipleAsReadUnread(data, val) {
    let response;
    try {
      response = await this.service.setReadUnread(data, val).toPromise();
    } catch (error) {
      this.toast.error("Something went wrong");
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.toast.success(response.message);
      this.getAllNotificationsForAdmin(this.query.pageNumber, this.query.pageSize, this.testForm.controls.stype1.value);
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to perform operation');
    }
  }
}