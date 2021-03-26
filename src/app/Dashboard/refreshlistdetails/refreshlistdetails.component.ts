import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'app/service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-refreshlistdetails',
  templateUrl: './refreshlistdetails.component.html',
  styleUrls: ['./refreshlistdetails.component.css']
})
export class RefreshlistdetailsComponent implements OnInit {

  data: any;
  created: any
  title: any;

  constructor(public router: Router, private activatedRoute: ActivatedRoute,
    private service: ServiceService, private toast: ToastrService, private load: NgxSpinnerService) {
  }

  async loadData(id) {
    this.data = null;
    let response;
    try {
      response = await this.service.getNotificationDataById(id).toPromise();
    } catch (error) {
      this.toast.error('Error while fetching notification data');
      this.load.hide();
    }
    if (response && response['status'] == "success") {
      if (response.data.notifications.length > 0) {
        this.data = response['data']['notifications'][0];
        if (this.data.viewed == null) {
          this.markNotificationView(id);
        }
      }
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to get data');
    }
  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadData(JSON.parse(id));
  }

  backbutton() {
    this.router.navigate(["../dashboard/refreshlist"]);
  }

  async deleteNotification(id) {
    let response;
    try {
      response = await this.service.deleteNotificationById(id).toPromise();
    } catch (error) {
      this.toast.error("Something went wrong...");
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.toast.success("Deleted successfully");
      this.loadData(this.data.dataId);
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to delete');
    }
  }

  async markNotificationView(id) {
    let response;
    try {
      response = await this.service.markAsViewed(id).toPromise();
    } catch (error) {
      this.toast.error("Something went wrong...");
    }
    if (response && response.status == "success") {
      this.toast.success("Deleted successfully");
      this.loadData(this.data.dataId);
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to mark');
    }
  }

  async markCompletedUncompleted(val) {
    let data: any = [];
    data.push(this.data.dataId);
    let response;
    try {
      response = await this.service.markAsCompletedOrUncompleted(data, val).toPromise();
    } catch (error) {
      this.toast.error("Something went wrong");
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.toast.success("Succesfull");
      this.loadData(this.data.dataId);
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to mark');
    }
  }

  async markAsReadUnread(val) {
    let data: any = [];
    data.push(this.data.dataId);
    let response;
    try {
      response = await this.service.setReadUnread(data, val).toPromise();
    } catch (error) {
      this.toast.error("Something went wrong");
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.toast.success(response.message);
      this.loadData(this.data.dataId);
    }
    else if (response && response.status === "failure") {
      this.toast.error('Failed to mark');
    }
  }
}
