import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import {
   MatInputModule,
   MatTooltipModule,
   MatButtonModule,
   MatMenuModule,
   MatIconModule,
   MatCardModule,
   MatTabsModule,
   MatFormFieldModule,
   MatProgressSpinnerModule,
   MatSelectModule,
   MatDatepickerModule,
   MatCheckboxModule,
   MatTableModule,
   MatPaginatorModule,
   MatSortModule,
   MatGridListModule,
   MatDialogModule,
   MatRadioModule,
   MatChipsModule,
   MatAutocompleteModule,
   MatListModule,
   MatExpansionModule,
   MAT_DATE_LOCALE
} from '@angular/material';

import { AmazingTimePickerModule } from 'amazing-time-picker';

import { DashboardRoutes } from './Dashboard.routing';
import { ECommerceComponent } from './E-Commerce/E-Commerce.component';
import { WebAnalyticsComponent } from './WebAnalytics/WebAnalytics.component';

import { WidgetsComponentsModule } from '../WidgetsComponents/WidgetsComponents.module';
import { PlayerserachComponent } from './playerserach/playerserach.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PlayerShelfInquiriesComponent } from './player-shelf-inquiries/player-shelf-inquiries.component';
import { PlayerUpdateComponent } from './player-update/player-update.component';
// import { CKEditorModule } from 'ngx-ckeditor';
import { RefreshlistComponent } from './refreshlist/refreshlist.component';
import { RefreshlistdetailsComponent } from './refreshlistdetails/refreshlistdetails.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SubscriptionComponent } from './dialog/subscription/subscription.component';
import { AuditionsComponent } from './auditions/auditions.component';
import { AddAuditionComponent } from './add-audition/add-audition.component';
import { CastermessageComponent } from './castermessage/castermessage.component';
import { NewbandComponent } from './newband/newband.component';
import { CastingnewsComponent } from './castingnews/castingnews.component';
import { InsertcastingnewsComponent } from './insertcastingnews/insertcastingnews.component';
import { FaqComponent } from './faq/faq.component';
import { InsertfaqComponent } from './insertfaq/insertfaq.component';
import { DefaultComponent } from './default/default.component';
import { InsertdefaultComponent } from './insertdefault/insertdefault.component';
import { SitenewsComponent } from './sitenews/sitenews.component';
import { InsertsitenewsComponent } from './insertsitenews/insertsitenews.component';
import { CasterComponent } from './caster/caster.component';
import { PhysicalfeatureComponent } from './physicalfeature/physicalfeature.component';
import { PhysicalfeatureupdateComponent } from './physicalfeatureupdate/physicalfeatureupdate.component';
import { CharvaluesComponent } from './charvalues/charvalues.component';
import { UpdatecharvaluesComponent } from './updatecharvalues/updatecharvalues.component';
import { PropsComponent } from './props/props.component';
import { InsertpropsComponent } from './insertprops/insertprops.component';
import { UpdatepropsComponent } from './updateprops/updateprops.component';
import { AuditiontypeComponent } from './auditiontype/auditiontype.component';
import { InsertauditiontypeComponent } from './insertauditiontype/insertauditiontype.component';
import { TypeofmanuyComponent } from './typeofmanuy/typeofmanuy.component';
import { AgencyComponent } from './agency/agency.component';
import { InsertagencyComponent } from './insertagency/insertagency.component';
import { SendsmsComponent } from './sendsms/sendsms.component';
import { LogninotificationComponent } from './logninotification/logninotification.component';
import { AuditiontopicComponent } from './auditiontopic/auditiontopic.component';
import { InsertauditiontopicComponent } from './insertauditiontopic/insertauditiontopic.component';
import { InsertphysicalfeatureComponent } from './insertphysicalfeature/insertphysicalfeature.component';
import { AddvaluephysicalfeatureComponent } from './addvaluephysicalfeature/addvaluephysicalfeature.component';
import { ArtistmsgComponent } from './artistmsg/artistmsg.component';
import { VgCoreModule } from 'videogular2/compiled/core';
// import { VideoplayersComponent } from './videoplayers/videoplayers.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { SubscriptionaddComponent } from './subscriptionadd/subscriptionadd.component';
import { AddartistmsgComponent } from './addartistmsg/addartistmsg.component';
import { CasterviewComponent } from './casterview/casterview.component';
import { InvitationComponent } from './invitation/invitation.component';
import { RequestinvitationComponent } from './requestinvitation/requestinvitation.component';
import { EmailtemplateComponent } from './emailtemplate/emailtemplate.component';
import { RecipientsComponent } from './recipients/recipients.component';
import { FilesComponent } from './files/files.component';
import { PreviewComponent } from './dialog/preview/preview.component';
import { AgencyrankComponent } from './agencyrank/agencyrank.component';
import { AddagencyrankComponent } from './dialog/addagencyrank/addagencyrank.component';
import { SearchresultscolumnviewComponent } from './searchresultscolumnview/searchresultscolumnview.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { FilterDataComponent } from './dialog/filter-data/filter-data.component';
import { ViewartistforrolesComponent } from './viewartistforroles/viewartistforroles.component';
import { CasterviewbaseComponent } from './casterviewbase/casterviewbase.component';
import { ArtistspreviewforcasterComponent } from './artistspreviewforcaster/artistspreviewforcaster.component';
import { createTranslateLoader } from 'app/app.module';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
   // Change this to your upload POST address:
   url: 'https://httpbin.org/post',
   maxFilesize: 50,
};

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild(DashboardRoutes),
      FlexLayoutModule,
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule,
      TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient]
			}
		}),
      MatChipsModule,
      MatListModule,
      MatFormFieldModule,
      MatTooltipModule,
      MatSelectModule,
      MatDatepickerModule,
      MatInputModule,
      MatCheckboxModule,
      DropzoneModule,
      MatButtonModule,
      MatMenuModule,
      MatIconModule,
      WidgetsComponentsModule,
      MatCardModule,
      MatTabsModule,
      MatProgressSpinnerModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      CKEditorModule,
      MatDialogModule,
      MatTabsModule,
      MatGridListModule,
      MatRadioModule,
      DragDropModule,
      AmazingTimePickerModule,
      MatAutocompleteModule,
      VgCoreModule,
      MatExpansionModule
   ],
   entryComponents: [
      SubscriptionComponent,
      ConfirmationDialogComponent,
      SubscriptionaddComponent,
      EmailtemplateComponent,
      RecipientsComponent,
      FilesComponent,
      PreviewComponent,
      AddagencyrankComponent,
      FilterDataComponent
   ],
   declarations: [
      ECommerceComponent, WebAnalyticsComponent,
      PlayerserachComponent, PlayerShelfInquiriesComponent,
      PlayerUpdateComponent, RefreshlistComponent,
      RefreshlistdetailsComponent, ConfirmationDialogComponent,
      SubscriptionComponent, AuditionsComponent,
      AddAuditionComponent, CastermessageComponent,
      NewbandComponent, CastingnewsComponent,
      InsertcastingnewsComponent, FaqComponent,
      InsertfaqComponent, DefaultComponent,
      InsertdefaultComponent, SitenewsComponent,
      InsertsitenewsComponent, CasterComponent,
      PhysicalfeatureComponent, PhysicalfeatureupdateComponent,
      CharvaluesComponent, UpdatecharvaluesComponent,
      PropsComponent, InsertpropsComponent,
      UpdatepropsComponent, AuditiontypeComponent,
      InsertauditiontypeComponent, TypeofmanuyComponent,
      AgencyComponent, InsertagencyComponent,
      SendsmsComponent, LogninotificationComponent,
      AuditiontopicComponent, InsertauditiontopicComponent,
      InsertphysicalfeatureComponent, AddvaluephysicalfeatureComponent,
      ArtistmsgComponent,
      // VideoplayersComponent,
      SearchresultsComponent,
      SubscriptionaddComponent, AddartistmsgComponent, CasterviewComponent,
      InvitationComponent, RequestinvitationComponent, EmailtemplateComponent,
      RecipientsComponent, FilesComponent, PreviewComponent, AgencyrankComponent, AddagencyrankComponent, SearchresultscolumnviewComponent,
      FilterDataComponent,
      ViewartistforrolesComponent,
      CasterviewbaseComponent,
      ArtistspreviewforcasterComponent
   ],
   providers: [
      {
         provide: DROPZONE_CONFIG,
         useValue: DEFAULT_DROPZONE_CONFIG
      },
      { provide: MAT_DATE_LOCALE, useValue: 'en-Gb' }
   ],
})

export class DashboardModule { }
