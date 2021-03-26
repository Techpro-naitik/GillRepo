import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule,
         MatMenuModule,
         MatIconModule,
         MatCardModule,
         MatDialogModule,
         MatDatepickerModule,
         MatSnackBarModule,
         MatNativeDateModule,
         MatTableModule,
         MatCheckboxModule,
         MatProgressBarModule,
         MatDividerModule,
         MatInputModule,
         MatSelectModule,
         MatFormFieldModule,
         MatListModule,
         MatProgressSpinnerModule
         } from '@angular/material';
import { WidgetsComponentsModule } from '../WidgetsComponents/WidgetsComponents.module'
import { NgxEchartsModule } from 'ngx-echarts';
import { TranslateModule} from '@ngx-translate/core';

import { WidgetsRoutes } from './Widgets.routing';
import { UserComponent } from './User/User.component';
import { ChartsComponent } from './Charts/Charts.component';

@NgModule({
   imports: [
      CommonModule,
      RouterModule.forChild(WidgetsRoutes),
      WidgetsComponentsModule,
      FlexLayoutModule,
      MatButtonModule,
      MatIconModule,
      MatMenuModule,
      MatCardModule,
      MatDialogModule,
      MatDatepickerModule,
      MatSnackBarModule,
      MatNativeDateModule,
      MatTableModule,
      MatCheckboxModule,
      MatProgressBarModule,
      MatInputModule,
      MatSelectModule,
      MatFormFieldModule,
      NgxEchartsModule,
      MatListModule,
      TranslateModule,
      MatProgressSpinnerModule
   ],
   declarations: [
      UserComponent, 
      ChartsComponent
   ]
})
export class WidgetsModule { }
