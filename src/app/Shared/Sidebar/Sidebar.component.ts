import { Component, OnInit } from '@angular/core';
import { MenuItems } from '../../Core/MenuItems/MenuItems';
import { PerfectScrollbarConfigInterface,PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { AuthService } from '../../Services/Auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'anglo-sidebar',
  templateUrl: './Sidebar.component.html',
  styleUrls: ['./Sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
	
	public config: PerfectScrollbarConfigInterface = {};

	constructor(public menuItems: MenuItems, public translate: TranslateService,
			private authService : AuthService,
			public router :Router) { }

	ngOnInit() {
	}

	logOut()
	{	
		// localStorage.clear();
		this.authService.logOut();
	}
}
