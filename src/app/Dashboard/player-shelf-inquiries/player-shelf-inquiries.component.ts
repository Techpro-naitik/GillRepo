import { Component, OnInit, ViewChild } from '@angular/core';
import {
	MatTableDataSource,
	MatPaginator,
	MatSort,
	MatDialog,
	MatTable
} from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ServiceService } from 'app/service.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

export interface UsersData {
	name: string;
	id: number;
}

@Component({
	selector: 'app-player-shelf-inquiries',
	templateUrl: './player-shelf-inquiries.component.html',
	styleUrls: ['./player-shelf-inquiries.component.css']
})

export class PlayerShelfInquiriesComponent implements OnInit {

	displayCoulmns: string[] = ['id', 'firstName', 'lastName', 'phone', 'email', 'gender', 'descrp', 'birthDay', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	dataSource: MatTableDataSource<any>

	@ViewChild(MatTable, { static: true }) table: MatTable<any>;

	constructor(public translate: TranslateService,
		private toastr: ToastrService, private load: NgxSpinnerService,
		public service: ServiceService, public router: Router, public dialog: MatDialog
	) { }

	get_Artist() {
		this.service.artist().subscribe(res => {
			if (res.status === "success" && res.data) {
				this.dataSource = new MatTableDataSource(res.data);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			}
			else if (res && res.status === "failure") {
				this.toastr.error('Failed to get data');
			}
		}, err => {
			this.load.hide();
			this.toastr.error('Error getting artist details');
		});
	}

	ngOnInit() {
		this.get_Artist();
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	openDialog(action, obj) {
		obj.action = action;
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '250px',
			data: obj
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result != undefined && result == 'yes') {
				this.deleteArtist(obj.id);
			}
		});
	}

	deleteArtist(id) {
		try {
			this.service.deleteArtist(id).subscribe(
				(res) => {
					if (res.status == "success") {
						this.toastr.success("Successfully Deleted");
						this.get_Artist();
					}
					else if (res.status === "failure") {
						this.toastr.error('Failed to delete');
					}
				}
			);
		} catch (error) {
			this.toastr.error('Something went wrong');
			this.load.hide();
		}
	}

	detailpage(id) {
		this.router.navigate(["../dashboard/playerupdate", { 'artistId': id }]);
	}

	handleProfile(id) {
		this.service.artistHandle(id).subscribe(response => {
			if (response.status === "success") {
				this.toastr.success('Status changed successfully');
				this.get_Artist();
			}
			else if (response && response.status === "failure") {
				this.toastr.error('Failed to perform operation');
			}
		},
			err => {
				this.toastr.error('Something went wrong while changing status');
			});
	}

}