import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTab } from '@angular/material/tabs';
import { AuditionService } from 'app/Services/audition.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

interface tabs {
  title: string;
  icon: string;
  data: any[];
  role: string;
}

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})

export class InvitationComponent implements OnInit {

  @ViewChild('matTabRef', { static: true }) matTabRef: MatTab;
  tabsArray: tabs[];
  auditionId: number;

  constructor(private auditionService: AuditionService, private toast: ToastrService, private load: NgxSpinnerService,
    private route: ActivatedRoute, private dialog: MatDialog, private translate: TranslateService) {
    this.tabsArray = [
      {
        title: 'Not registered',
        icon: 'people',
        data: [],
        role: 'tab'
      },
      {
        title: 'Registered',
        icon: 'subscriptions',
        data: [],
        role: 'tab'
      }
    ];
    this.auditionId = +this.route.snapshot.paramMap.get('id');
    if (this.auditionId) {
      this.getSubscriptionData(this.auditionId);
    }
  }

  getSubscriptionData(id: number) {
    this.auditionService.getSubscriptionData(id).subscribe(res => {
      if (res.status === "success") {
        this.tabsArray[0].data = res.data['invitedArtists'].map(t1 => ({ ...t1, ...res.data['invitedArtistsPics'].find(t2 => t2.artistId === t1.artistId) }));
        this.tabsArray[0].data.forEach(e => e['isSelected'] = false);
        this.tabsArray[1].data.forEach(e => e['isSelected'] = false);
        this.tabsArray[1].data = res.data['subscribedArtists'].map(t1 => ({ ...t1, ...res.data['subscribedArtistsPics'].find(t2 => t2.artistId === t1.artistId) }));
        if (this.tabsArray.length > 2) {
          this.tabsArray.splice(2, this.tabsArray.length - 2);
        }
        res.data['roles'].forEach(e => {
          this.tabsArray.push(
            {
              title: e.roleTitle,
              icon: 'list',
              data: this.tabsArray[1].data.filter(f => f.roleId === e.roleId),
              role: 'role'
            });
        }); //end of roles loop
      }
      else if (res.status === "failure") {
        this.toast.error('Failed to get subscription data');
      }
    });
  }

  getDataForDynamicRoles(index): Array<object> {
    return this.tabsArray[index].data;
  }

  changeSelected(value) {
    value.isSelected = !value.isSelected;
  }

  openConfirmation(action) {
    let obj = { action: action, name: '' };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        this.deleteArtistsSubscription();
      }
    });
  }

  deleteArtistsSubscription() {
    const ids = this.tabsArray[0].data.filter(e => e.isSelected === true).map(e => e.invitationId);
    if (ids.length > 0) {
      this.auditionService.deleteSusbcription({ ids: ids }).subscribe(response => {
        if (response && response.status === "success") {
          this.toast.success('Unsubscribed successfully');
          this.getSubscriptionData(this.auditionId);
        }
        else if (response.status === "failure") {
          this.toast.error('Failed to delete');
        }
      },
        err => {
          this.toast.error('Something went wrong while unsubscribing artists');
          this.load.hide();
        });
    }
  }

  pauseResumeSubscriptions(nextFlag, currentFlag) {
    let ids = this.tabsArray[1].data.filter(e => e.isSelected === true && e.disabled === currentFlag).map(e => e.applicationId);
    if (ids.length > 0) {
      this.auditionService.resumePauseSubscription({ applicationsIds: ids, temp: nextFlag }).subscribe(response => {
        if (response && response.status === "success") {
          this.toast.success('Subscription changed successfully');
          this.getSubscriptionData(this.auditionId);
        }
        else if (response.status === "failure") {
          this.toast.error('Failed to do operation');
        }
      }, err => {
        this.load.hide();
        this.toast.error('Something went wrong while changing subscription status');
      });
    }
    else {
      this.toast.error('No records selected / Subscription status already same');
    }
  }

  ngOnInit() {
  }

}