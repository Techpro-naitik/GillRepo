import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule,
			MatInputModule,
			MatCheckboxModule,
			MatIconModule, 
			MatButtonModule,
		   MatCardModule,
		   MatDividerModule,
		   MatSidenavModule,
		   MatListModule, 
		   MatLineModule,
		   MatTooltipModule,
		   MatMenuModule} from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TranslateModule } from '@ngx-translate/core';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { InboxRoutes } from './Inbox.routing';
import { EmailsService } from '../Services/Emails.service';
import { InboxComponent } from './Inbox/Inbox.component';
import { EmailListingComponent } from './EmailListing/EmailListing.component';
import { EmailDetailComponent } from './EmailDetail/EmailDetail.component';
import { SidebarComponent } from './Sidebar/Sidebar.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(InboxRoutes),
		FlexLayoutModule,
		MatCheckboxModule,
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		MatDividerModule,
		MatSidenavModule,
		MatListModule,
		MatLineModule,
		MatTooltipModule,
		MatFormFieldModule,
		MatInputModule,
		PerfectScrollbarModule,
		MatMenuModule,
		TranslateModule,
		DeviceDetectorModule.forRoot()
	],
	declarations: [InboxComponent, SidebarComponent,EmailListingComponent, EmailDetailComponent],
	providers:[
		EmailsService
	]
})

export class InboxModule { }
