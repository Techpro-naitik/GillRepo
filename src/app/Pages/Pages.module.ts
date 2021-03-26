import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule,
			MatSlideToggleModule,
			MatButtonModule,
			MatListModule,
			MatGridListModule,
			MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { PagesRoutes } from './Pages.routing';
import { BlogComponent } from './Blog/Blog.component';
import { GalleryComponent } from './Gallery/Gallery.component';
import { Pricing1Component } from './Pricing1/Pricing1.component';
import { Pricing2Component } from './Pricing2/Pricing2.component';
import { BlankComponent } from './Blank/Blank.component';
import { WidgetsComponentsModule } from '../WidgetsComponents/WidgetsComponents.module';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(PagesRoutes),
		WidgetsComponentsModule,
		FlexLayoutModule,
		MatCardModule,
		MatListModule,
		MatSlideToggleModule,
		MatButtonModule,
		MatGridListModule,
		MatIconModule,
		TranslateModule
	],

	declarations: [BlogComponent, GalleryComponent, Pricing1Component, Pricing2Component, BlankComponent]
})

export class PagesModule { }
