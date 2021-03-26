import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule,
		 	MatIconModule,	
		 	MatButtonModule,
		 	MatCardModule,
		 	MatMenuModule,
		 	MatFormFieldModule,
		 	MatInputModule
		 } from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule} from '@angular/forms';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { ChatRoutes } from './Chat.routing';
import { ChatComponent } from './Chat/Chat.component';
import { ChatAreaComponent } from './ChatArea/ChatArea.component';
import { ChatSideBarComponent } from './ChatSideBar/ChatSideBar.component';

@NgModule({
   imports: [
		CommonModule,
		RouterModule.forChild(ChatRoutes),
		MatSidenavModule,
		MatIconModule,
		PerfectScrollbarModule,	
		MatButtonModule,
		MatCardModule,
		MatMenuModule,
		MatFormFieldModule,
		MatInputModule,
		FlexLayoutModule,
		FormsModule,
		DeviceDetectorModule.forRoot()
   ],
  declarations: [ChatComponent, ChatSideBarComponent, ChatAreaComponent]
})

export class ChatModule { }
