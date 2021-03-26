import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, 
			MatCheckboxModule, 
			MatIconModule, 
			MatButtonToggleModule,  
			MatExpansionModule,
			MatSlideToggleModule,
			MatChipsModule,
			MatDatepickerModule,
			MatFormFieldModule,
			MatInputModule,
			MatNativeDateModule,
			MatListModule,
			MatMenuModule,
			MatProgressSpinnerModule,
			MatProgressBarModule,
			MatGridListModule,
			MatRadioModule,
			MatDialogModule,
			MatSelectModule,
			MatTooltipModule,
			MatSliderModule,
			MatToolbarModule,
			MatSnackBarModule,
			MatTabsModule,
			MatCardModule
			} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SlideshowModule } from 'ng-simple-slideshow';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { SettingDialogComponent } from './Dialog/SettingDialog/SettingDialog.component';
import { Dialog3Component } from './Dialog/Dialog3/Dialog3.component';
import { Dialog2Component } from './Dialog/Dialog2/Dialog2.component';
import { DialogComponent } from './Dialog/Dialog.component';
import { GoogleDialogComponent } from './Dialog/GoogleDialog/GoogleDialog.component';
import { ScrollableComponent } from './Dialog/Scrollable/Scrollable.component';

import { ButtonsComponent } from './Buttons/Buttons.component';
import { CardsComponent } from './Cards/Cards.component';
import { CheckboxComponent } from './Checkbox/Checkbox.component';
import { CarouselComponent } from './Carousel/Carousel.component';
import { ChipsComponent } from './Chips/Chips.component';
import { DatepickerComponent } from './Datepicker/Datepicker.component';
import { GridComponent } from './Grid/Grid.component';
import { InputComponent } from './Input/Input.component';
import { ListComponent } from './List/List.component';
import { MenuComponent } from './Menu/Menu.component';
import { ProgressComponent } from './Progress/Progress.component';
import { RadioComponent } from './Radio/Radio.component';
import { SelectComponent } from './Select/Select.component';
import { SliderComponent } from './Slider/Slider.component';
import { SnackbarComponent } from './Snackbar/Snackbar.component';
import { TabsComponent } from './Tabs/Tabs.component';
import { ToolbarComponent } from './Toolbar/Toolbar.component';
import { TooltipComponent } from './Tooltip/Tooltip.component';
import { TimepickerComponent } from './Timepicker/Timepicker.component';
import { WidgetsComponentsModule } from '../WidgetsComponents/WidgetsComponents.module';

import { UiElementsRoutes } from './UiElements.routing';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(UiElementsRoutes),
		MatButtonModule,
		MatCheckboxModule,
		MatIconModule,
		MatButtonToggleModule,
		MatCardModule,
		MatExpansionModule,
		MatSlideToggleModule,
		MatChipsModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		MatNativeDateModule,
		MatListModule,
		MatMenuModule,
		MatProgressSpinnerModule,
		MatProgressBarModule,
		MatGridListModule,
		MatRadioModule,
		MatDialogModule,
		MatSelectModule,
		MatTooltipModule,
		HttpClientModule,
		MatSliderModule,
		MatToolbarModule,
		MatSnackBarModule,
		MatTabsModule,
		FlexLayoutModule,
		WidgetsComponentsModule,
		SlideshowModule,
		NgxMaterialTimepickerModule,
		TranslateModule

	],
	declarations: [
		ButtonsComponent, 
		CardsComponent, 
		CheckboxComponent, 
		CarouselComponent, 
		ChipsComponent, 
		DatepickerComponent, 
		DialogComponent, 
		GridComponent, 
		InputComponent, 
		ListComponent, 
		MenuComponent, 
		ProgressComponent, 
		RadioComponent, 
		SelectComponent, 
		SliderComponent,
		SnackbarComponent, 
		TabsComponent, 
		ToolbarComponent, 
		TooltipComponent, 
		TimepickerComponent, 
		SettingDialogComponent, 
		Dialog3Component, 
		Dialog2Component, 
		GoogleDialogComponent,
		ScrollableComponent
	],
	entryComponents: [
		SettingDialogComponent,
		Dialog3Component,
		Dialog2Component,
		GoogleDialogComponent,
		ScrollableComponent
	]
})
export class UiElementsModule { }
