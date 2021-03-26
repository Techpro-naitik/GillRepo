import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CasterViewService } from 'app/Services/caster-view.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-viewartistforroles',
  templateUrl: './viewartistforroles.component.html',
  styleUrls: ['./viewartistforroles.component.css']
})
export class ViewartistforrolesComponent implements OnInit {

  artistsArray: Array<object> = [];

  pageNumbers: number[];

  pageNumber: number = 1;

  auditionId: number

  casterViewPage: number;

  otherArtists: any[];

  changeArtist: FormGroup;

  constructor(private route: ActivatedRoute, private service: CasterViewService, private dialog: MatDialog,
    private toast: ToastrService, private translate: TranslateService, private fb: FormBuilder) {
    this.initForm();
  }

  initForm() {
    this.changeArtist = this.fb.group({
      ApplicationPartId: ['', Validators.required],
      ord: [null, Validators.required],
      title: [null, Validators.required],
      description: [""]
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.casterViewPage = parseInt(params.get('casterViewPageId'));
      this.auditionId = parseInt(params.get('auditionId'));
      this.getOtherArtists();
      this.getArtists();
    });
  }

  setComments(value: string) {
    if (value) {
      this.artistsArray.forEach(e => e['title'] = value.trim());
    }
  }

  getOtherArtists() {
    this.service.getArtistForOtherRoles(this.auditionId, this.casterViewPage, this.pageNumber - 1, 20).subscribe(response => {
      if (response.status === "success") {
        this.otherArtists = response.data.artists.filter(e => e.alreadyInPage === 0);
      }
      else if (response && response.status === "failure") {
        this.toast.error('Failed to get artists');
      }
    });
  }

  getArtists() {
    this.service.getArtistForRoles(this.auditionId, this.casterViewPage, this.pageNumber - 1, 20).subscribe(response => {
      if (response.status === "success") {
        this.artistsArray = response.data.artists.filter(e => e.alreadyInPage === 1).map(t1 => ({ ...t1, ...response.data['artistsPics'].find(t2 => t2.artistId === t1.artistId) }));
        this.artistsArray.forEach(e => e['isSelected'] = false);
        this.pageNumbers = [];
        const count = Math.ceil(response.data.totalcount / 20);
        for (let i = 1; i <= count; i++) {
          this.pageNumbers.push(i);
        }
      }
      else if (response && response.status === "failure") {
        this.toast.error('Failed to get artists');
      }
    });
  }

  toogleSelect(value) {
    value.isSelected = !value.isSelected;
  }

  saveChanges() {
    let ids: any[] = this.artistsArray.filter(e => e['isSelected'] === true).map(e => e);
    if (ids.length > 0) {
      this.openDialog('Delete', ids.map(e => e.casterViewPagePartAppId));
    }
    else if (this.changeArtist.valid) {
      this.changeArtistRole();
    }
    else {
      this.updatePagesDetails();
    }
  }

  async changeArtistRole() {
    const obj = this.changeArtist.value;
    obj.casterViewPageId = this.casterViewPage;
    // console.log(obj);
    this.service.changeRoleForArtist(obj).subscribe(response => {
      if (response.status === "success") {
        this.toast.success('Role changed succesfully');
        this.getOtherArtists();
        this.getArtists();
      }
    },
      err => {
        this.toast.error('Something went wrong while changing role for an artist');
      });
  }

  updatePagesDetails() {
    this.service.updateArtists(this.artistsArray).subscribe(response => {
      if (response.status === "success") {
        this.toast.success('Updated successfully');
      }
      else if (response && response.status === "failure") {
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
        this.deleteArtists(ids);
      }
    });
  }

  deleteArtists(data) {
    // console.log(data);
    this.service.deleteArtists({ ids: data }).subscribe(response => {
      if (response.status === "success") {
        this.toast.success('Deleted successfully');
        this.getOtherArtists();
        this.getArtists();
      }
      else if (response && response.status === "failure") {
        this.toast.error('Failed to delete');
      }
    },
      err => {
        this.toast.error('Something went wrong while deleting data');
      });
  }

}