import { Component, OnInit } from '@angular/core';
import { connectMenu } from 'instantsearch.js/es/connectors';
import { TranslateService } from '@ngx-translate/core';

import { CoreService } from '../../Services/GlobalService/Core.service';

@Component({
	selector: 'anglo-shop',
	templateUrl: './Shop.component.html',
	styleUrls: ['./Shop.component.scss']
})
export class ShopComponent implements OnInit {

	constructor( private coreService	: CoreService,
					 public translate   : TranslateService) { }

	ngOnInit() {
	}

	/**
	  * transformHits return the product rating star.
	  */
	public transformHits(hits) {
      	hits.forEach(hit => {
	        hit.stars = [];
	        for (let i = 1; i <= 5; i) {
	           hit.stars.push(i <= hit.rating);
	           i += 1;
	         }
     	});
    	return hits;
   }

   /**
     * addToCart is used to add the product into cart.
     */
   addToCart(event){
   	event.quantity = 1;
   	this.coreService.addToCart(event);
   }
}
