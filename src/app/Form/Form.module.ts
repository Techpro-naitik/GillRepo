import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ArchwizardModule } from 'angular-archwizard';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule,
         MatCheckboxModule,
         MatSelectModule,
         MatDividerModule,
         MatRadioModule,
         MatIconModule,
         MatButtonModule,
         MatProgressBarModule,
         MatCardModule,
         MatFormFieldModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { FormsRoutes } from './Form.routing';

import { WidgetsComponentsModule } from '../WidgetsComponents/WidgetsComponents.module';
import { FormValidationComponent } from './FormValidation/FormValidation.component';
import { FormWizardComponent } from './FormWizard/FormWizard.component';
import { FormElementsComponent } from './FormElements/FormElements.component';
import { UploadComponent } from './Upload/Upload.component';

@NgModule({
  	imports: [
	   CommonModule,
      MatCardModule,
      MatIconModule,
      MatButtonModule,
      MatCheckboxModule,
      MatDividerModule,
      MatInputModule,
      MatRadioModule,
      MatSelectModule,
      MatFormFieldModule,
      MatProgressBarModule,
      FlexLayoutModule,
	   RouterModule.forChild(FormsRoutes),
	   ReactiveFormsModule,
	   FormsModule,
	   ArchwizardModule,
	   HttpClientModule,
      FileUploadModule,
      WidgetsComponentsModule,
      TranslateModule
  	],
  	declarations: [
  		FormValidationComponent,					
  		FormWizardComponent,
      FormElementsComponent,
      UploadComponent
  	]
})

export class FormModule { }
