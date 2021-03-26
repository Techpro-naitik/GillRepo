import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule,
			MatIconModule,
			MatCardModule,
			MatInputModule,
			MatTableModule,
			MatButtonModule,
			MatCheckboxModule,
			MatGridListModule,
			MatProgressSpinnerModule,
			MatSelectModule} from '@angular/material';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { NgAisModule } from 'angular-instantsearch';
import { TranslateModule } from '@ngx-translate/core';

import { WidgetsComponentsModule } from '../WidgetsComponents/WidgetsComponents.module';
import { EcommerceRoutes } from './Ecommerce.routing';
import { ShopComponent } from './Shop/Shop.component';
import { CartComponent } from './Cart/Cart.component';
import { CheckoutComponent } from './Checkout/Checkout.component';
import { CardsComponent } from './Cards/Cards.component';

@NgModule({
	imports: [
		CommonModule,
		NgAisModule.forRoot(),
		RouterModule.forChild(EcommerceRoutes),
		FlexLayoutModule,
		MatFormFieldModule,
		MatIconModule,
		MatCardModule,
		MatInputModule,
		MatTableModule,
		MatButtonModule,
		MatCheckboxModule,
		MatGridListModule,
		ReactiveFormsModule,
		FormsModule,
		WidgetsComponentsModule,
		MatSelectModule,
		TextMaskModule,
		TranslateModule,
		MatProgressSpinnerModule
	],
	
	declarations: [ShopComponent, CartComponent, CheckoutComponent, CardsComponent]
})

export class EcommerceModule { }
