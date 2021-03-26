import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CasterViewService } from 'app/Services/caster-view.service';
import { MatTab } from '@angular/material/tabs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-casterview',
  templateUrl: './casterview.component.html',
  styleUrls: ['./casterview.component.css']
})
export class CasterviewComponent implements OnInit {

  currentAuditionID: number;
  casterForm: FormGroup;
  casterUpdateForm: FormGroup;
  hasCasterData: boolean = false;
  canCasterSee: boolean = false;
  pageForm: FormGroup;
  casterViewId: number;

  pagesArr: Array<object> = [];
  pageNumbers: number[];
  pageNumber: number = 1;

  @ViewChild('matTabRef', { static: false }) matTabRef: MatTab;

  artists: any[] = [];
  canShowPhone: boolean = false;
  canShowAgency: boolean = false;
  // gam3rboy132@gmail.com
  // androem13@gmail.com
  mainContent: Array<object>;

  dataForEmail: {
    casterEmail: string, copyEmail: string, RoleHtmlContent: any[], ArtistHtmlContent: any[]
  } = { casterEmail: '', copyEmail: '', RoleHtmlContent: [], ArtistHtmlContent: [] };

  artistsList: Array<object> = [];

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private toast: ToastrService,
    private service: CasterViewService, private dialog: MatDialog, private translate: TranslateService) {
    this.currentAuditionID = this.route.snapshot.queryParamMap.get('auditionId') ? parseInt(this.route.snapshot.queryParamMap.get('auditionId')) : null;
    this.casterForm = this.formBuilder.group({
      useForSite: [1],
      useForMail: [1],
      casterCanEdit: [1],
      title: [''],
      description: [''],
      auditionId: typeof this.currentAuditionID === 'number' ? this.currentAuditionID : null
    });
    this.initCasterUpdateForm();
    this.initPageForm();
  }

  initCasterUpdateForm() {
    this.casterUpdateForm = this.formBuilder.group({
      showAgency: [],
      showPhone: [],
      useForSite: [null],
      useForMail: [null],
      casterCanEdit: [null],
      title: [null],
      done: [],
      description: [null],
      viewedOnSiteDate: [],
      sentByMailDate: [],
      auditionId: typeof this.currentAuditionID === 'number' ? this.currentAuditionID : null,
      id: 0
    });
  }

  initPageForm() {
    this.pageForm = this.formBuilder.group({
      pseperateParts: [1],
      ppageSize: [''],
      pArtistTextId: [-1],
      pArtistText: ['']
    })
  }

  ngOnInit() {
    if (this.currentAuditionID) {
      this.getCasterDetails(this.currentAuditionID);
    }
  }

  getCasterDetails(id: number) {
    this.service.getCasterDetails(id).subscribe(response => {
      if (response && response.status === "success" && response.data.length > 0) {
        this.hasCasterData = true;
        this.casterUpdateForm.patchValue(response.data[0]);
        this.casterUpdateForm.controls.id.setValue(response.data[0]['id']);
        this.casterViewId = response.data[0]['id'];
        this.canCasterSee = response.data[0]['done'] === 1 ? true : false;
        this.casterUpdateForm.controls.showPhone.setValue(response.data[0]['showPhone']);
        // this.casterUpdateForm.controls.showPhone.setValue(response.data[0]['showPhone']);
        this.casterUpdateForm.controls.sentByMailDate.setValue(new Date());
        this.canShowPhone = response.data[0]['showPhone'] === 1 ? true : false;
        this.canShowAgency = response.data[0]['showAgency'] === 1 ? true : false;
        if (this.casterViewId) {
          this.getRolesForPages();
          this.previewPermissions();
        }
      }
      else if (response && response.status == "failure") {
        this.toast.error('Failed to get caster details');
      }
    },
      err => {
        this.toast.error('Something went wrong while fetching catserview data');
      });
  }

  submitDetails() {
    this.service.createCasterView(this.casterForm.value).subscribe(response => {
      if (response && response.status == "success") {
        this.toast.success('Details saved successfully');
        this.getCasterDetails(this.currentAuditionID);
      }
      else if (response && response.status == "failure") {
        this.toast.error('Failed to create caster');
      }
    },
      err => {
        this.toast.error('Something went wrong while saving caster details');
      });
  }

  updateCasterDetails() {
    // console.log(this.casterUpdateForm.value);
    this.service.updateCasterView(this.casterUpdateForm.value, this.casterUpdateForm.controls.id.value).subscribe(response => {
      if (response && response.status == "success") {
        this.toast.success('Details saved successfully');
        this.getCasterDetails(this.currentAuditionID);
      }
      else if (response && response.status == "failure") {
        this.toast.error('Failed to update caster details');
      }
    },
      err => {
        this.toast.error('Something went wrong while saving caster details');
      });
  }

  createPagesForRoles() {
    let obj = { auditionId: this.currentAuditionID, casterViewId: this.casterViewId, ...this.pageForm.value };
    this.service.createCasterViewPage(obj).subscribe(response => {
      if (response && response.status === "success") {
        this.getRolesForPages();
      }
      else if (response && response.status == "failure") {
        this.toast.error('Failed to create page');
      }
    },
      err => {
        // console.log(err);
        this.toast.error('Something went wrong while creating pages');
      });
  }

  getRolesForPages() {
    this.service.getRolesForPages(this.casterViewId, this.pageNumber - 1, 20).subscribe(response => {
      if (response.status === "success") {
        this.pagesArr = response.data.casterData;
        this.pagesArr.forEach(e => e['isSelected'] = false);
        this.pageNumbers = [];
        this.loadPreviewDataforArtists();
        const count = Math.ceil(response.data.totalCount / 20);
        for (let i = 1; i <= count; i++) {
          this.pageNumbers.push(i);
        }
      }
      else if (response && response.status == "failure") {
        this.toast.error('Failed to get roles for pages');
      }
    },
      err => {
        this.toast.error('Something went wrong while fetching page role details');
      });
  }

  toggleValue(item) {
    item.isSelected = !item.isSelected;
  }

  saveChanges() {
    let ids: any[] = this.pagesArr.filter(e => e['isSelected'] === true).map(e => e);
    if (ids.length > 0) {
      // console.log('delete');
      this.openDialog('Delete', ids.map(e => e.id));
    }
    else {
      this.updatePagesDetails();
    }
  }

  updatePagesDetails() {
    this.pagesArr.forEach(e => e['casterViewPageId'] = e['id']);
    this.service.updatePages(this.pagesArr).subscribe(response => {
      if (response.status === "success") {
        this.toast.success('Updated successfully');
      }
      else if (response && response.status == "failure") {
        this.toast.error('Failed to update page details');
      }
    },
      err => {
        this.toast.error('Something went wrong while saving data');
      });
  }

  openDialog(action, ids) {
    let obj = { action: action };
    // obj.action = action;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result == 'yes') {
        this.deletePages(ids);
      }
    });
  }

  deletePages(data) {
    // console.log(data);
    this.service.deletePages({ ids: data }).subscribe(response => {
      if (response.status === "success") {
        this.toast.success('Deleted successfully');
        this.getRolesForPages();
      }
      else if (response && response.status == "failure") {
        this.toast.error('Failed to delete');
      }
    },
      err => {
        this.toast.error('Something went wrong while deleting data');
      });
  }

  loadPreviewDataforArtists() {
    this.service.getPreviewData(this.casterViewId).subscribe(response => {
      if (response.status === "success") {
        this.artists = response.data['roleDetails'].map(t1 => ({ ...t1, ...response.data['artistsDetails'].find(t2 => t2.artistId === t1.artistId) }));;
      }
      else if (response && response.status == "failure") {
        this.toast.error('Failed to fetch preview data');
      }
    });
  }

  previewPermissions() {
    this.service.getPreviewPermissions(this.casterViewId, this.currentAuditionID).subscribe(response => {
      // console.log(response);
      this.dataForEmail.casterEmail = response.data[0].casterEmail;
    },
      err => {
        this.toast.error('Something went wrong while fetching preview permission details');
      });
  }

  fetchTabs($event) {
    if ($event.length > 0) {
      this.mainContent = $event;
      for (let i = 0; i < $event.length; i++) {
        for (let j = 0; j < $event[i].data.length; j++) {
          $event[i].data[j].path = `cv_${this.casterViewId}_${i}_${j}`;
          $event[i].data[j].isSelected = false;
        }
      }
      this.dataForEmail.RoleHtmlContent = $event.map(e => ({ title: e.title, html: e.html, isSelected: true }));
      // console.log(this.dataForEmail.RoleHtmlContent);
      let tempData: any[] = [];
      for (let index = 0; index < $event.length; index++) {
        tempData = [...tempData, ...$event[index].data];
      }
      this.artistsList = tempData;
      // console.log(this.dataForEmail);
      // this.generateFiles();
    }

    // const stripped = '    My String With A    Lot Whitespace  '.replace(/\s+/g, ' ');
    // console.log(stripped);
  }

   generateFiles() {
    if (this.mainContent.length > 0) {
      this.service.generateHTMLFiles({ casterViewId: this.casterViewId, mainContent: this.mainContent }).subscribe(response => {
        // console.log(response);
        if (response && response.status == "success") {
          // this.toast.success('Files created successfully');
        }
        else if (response && response.status == "failure") {
          this.toast.error('Failed to create file');
        }
      },
        err => {
          // this.toast.error('Something went wrong while creating files');
        });
    }
  }

  mirrorEmails() {
    this.artists.forEach(e => e.isSelected = !e.isSelected);
    JSON
  }

  toggleStatus(status) {
    status.isSelected = !status.isSelected;
  }

  validateCopyEmails(str): boolean {
    let regX = new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    let b = true;
    str.split(",").forEach(e => {
      if (!regX.test(e.trim())) {
        b = false;
      }
    });
    return b;
  }

  async sendEmailToCastersAndArtists() {
    await this.generateFiles();
    if (this.dataForEmail.casterEmail === "" || !this.validateCopyEmails(this.dataForEmail.casterEmail)) {
      this.toast.error('Caster email is invalid');
    }
    else if (this.dataForEmail.copyEmail != "" && !this.validateCopyEmails(this.dataForEmail.copyEmail)) {
      this.toast.error("copy emails are not valid");
    }
    else {
      let ad = new Date().getTime() + 1 * 60000;
      // console.log(ad);
      let s = this.transFormDate(ad);
      // console.log(s);
      let unixtime = Date.parse(s + "-0000") / 1000;
      // console.log(unixtime);
      const finalCasters = this.dataForEmail.RoleHtmlContent.filter(e => e.isSelected === true);
      const finalArtists = this.artists.filter(e => e.isSelected === true).map(e => ({ ArtistEmail: e.email, Artisthtml: e.html }));
      if (finalCasters.length > 0) {
        // let d = this.transFormDate(new Date().getTime() + 2 * 60000)
        // this.dataForEmail['dt'] = d;
        this.service.sendEmailToCaster({
          casterEmail: this.dataForEmail.casterEmail,
          copyEmail: this.dataForEmail.copyEmail,
          RoleHtmlContent: finalCasters,
          EmailDateTime: unixtime
        }).subscribe(response => {
          if (response.status === "success") {
            this.toast.success('Email queued succesfully');
            if (finalArtists.length > 0) {
              this.sendToArtist(finalArtists, unixtime);
            }
          }
          else if (response.status === "failure") {
            this.toast.error('Email sending failed for casters');
          }
        },
          err => {
            this.toast.error('Something went wrong while sending email to casters');
          });
      }
      else {
        this.toast.error('No page selected for email');
      }
    }
  }

  sendToArtist(data, dt) {
    this.service.sendEmailToArtist({
      artistHtmlContent: data,
      EmailDateTime: dt
    }).subscribe(response => {
      if (response.status === "success" && response.data === "1") {
        this.toast.success('Email queued succesfully');
      }
      else if (response.status === "failure") {
        this.toast.error('Email sending failed for artists');
      }
    },
      err => {
        this.toast.error('Something went wrong while sending email to artists');
      });
  }

  transFormDate(date): any {
    let dp = new DatePipe('en-US');
    date = dp.transform(date, 'dd/MMM/yyyy h:mm:ss a', '+0000');
    return date;
  }

}