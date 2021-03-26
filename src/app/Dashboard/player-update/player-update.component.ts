import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'app/service.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { SubscriptionComponent } from '../dialog/subscription/subscription.component';
import { GetAllAgencyModel } from 'app/Models/AgencyModel/AgencyModel';
import { PropsValues, CharParentData } from 'app/Models/MasterDataModel/model';


import { MasterdataService } from 'app/Services/masterdata.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';


export interface UsersData {
	name: string;
	id: number;
}

interface ImageDataInt {
	id: number;
	order: number;
	imgsrc: string | ArrayBuffer;
	hasImage: boolean;
	approved: number;
	main: number;
	image: string;
	imageFile: Object;
	fileName: string;
	markAsDelete: number;
}

interface VideoDataInt {
	id: number;
	artistId: number;
	embedType: number;
	order: number;
	approved: number;
	embed: Object;
}

@Component({
	selector: 'app-player-update',
	templateUrl: './player-update.component.html',
	styleUrls: ['./player-update.component.css']
})

export class PlayerUpdateComponent implements OnInit {
	dynamicDropDownArrayForVideo = [];
	dynamicDropDownArray = [];
	selected_Value = '';
	subscriptionData: any;
	myForm: FormGroup;
	EditText: FormGroup;
	EditPhysically: FormGroup;
	propsForm: FormGroup;
	activeTab: number = 0
	countLeft: number
	tabIndex = {
		"Edit player details": 0,
		"Edit physically": 1,
		"Edit additional capabilities": 2,
		"Edit photos": 3,
		"Edit Media": 4,
		"Edit texts": 5
	};

	characteristicsData: CharParentData[];
	propsData: PropsValues[] = [];

	// private readonly RELOAD_TOP_SCROLL_POSITION = 100;
	public editorValue: string = 'Hello CKEditor';
	artistId: any;
	allAgency: GetAllAgencyModel[];

	//Photos
	photosArray: ImageDataInt[];
	totalphotos: number;
	videoArray: VideoDataInt[];
	totalvideo: number;
	videoUrl: FormControl = new FormControl(null, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.])[/\\w .-]*/?'));
	videoURlForPlayer: string | SafeHtml = '';

	constructor(private fb: FormBuilder, private translate: TranslateService,
		private toastr: ToastrService, route: ActivatedRoute,
		public service: ServiceService, public router: Router,
		public dialog: MatDialog, private masterService: MasterdataService,
		private sanitizer: DomSanitizer, private load: NgxSpinnerService) {
		route.queryParamMap.subscribe(params => {
			this.activeTab = parseInt(params.get('tab'));
			this.artistId = parseInt(params.get('id'));
		});
		this.videoUrl.markAsPending();
	}

	pageforsearch() {
		this.router.navigate(["../dashboard/playerserach"]);
	}

	async ngOnInit() {
		this.myForm = this.fb.group({
			FirstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
			LastName: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(50)])],
			Gender: ['', Validators.required],
			Height: ['', Validators.required],
			Descrp: [''],
			BirthDay: ['', Validators.required],
			MembershipStartDate: ['', Validators.required],
			MembershipExpiryDate: ['', Validators.required],
			Disable: ['', Validators.required],
			Hidden: ['', Validators.required],
			Email: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],
			Phone: ['', Validators.compose([Validators.required, Validators.max(9999999999), Validators.min(0)])],
			MaxPictures: [''],
			MaxVideos: [''],
			MaxSounds: [''],
			UserName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
			Pswd: ['', Validators.required],
			Publication: ['', Validators.required],
			agency: ['', Validators.required],
			Remarks: [''],
			Friend: "0",
			LogInId: "0",
			Resume: ""
		});
		this.EditText = this.fb.group({
			Drama: ['', Validators.required],
			Comic: ['', Validators.required],
			Musical: ['', Validators.required],
		});
		this.EditPhysically = this.fb.group({});
		this.service.allAgency().subscribe(
			(res) => {
				this.allAgency = res.data
			}
		);
		// this.service.agenciesList.subscribe(data => {
		// 	console.log(data);
		// 	this.allAgency = data;
		// })
		this.loadArtistData();
		this.propsForm = this.fb.group({});
		this.getAllCharacteristicsData();
		this.getAllPropsData();

	}

	// For converting date to differnt format
	transFormDate(date) {
		let dp = new DatePipe('en-US');
		return dp.transform(date, 'dd-MMM-yyyy');;
	}

	async loadArtistData() {
		let response;
		try {
			response = await this.service.artistDetail(this.artistId).toPromise();
		} catch (error) {
			this.load.hide();
			this.toastr.error('Error fetching artist details');
		}
		if (response && response.status == "success") {
			if (response['data'] != null) {
				try {
					this.myForm.controls['FirstName'].setValue(response['data'].firstName);
					this.myForm.controls['Resume'].setValue(response['data'].resume);
					this.myForm.controls['LastName'].setValue(response['data'].lastName);
					this.myForm.controls['Gender'].setValue(response['data'].gender);
					this.myForm.controls['Height'].setValue(response['data'].height);
					this.myForm.controls['Descrp'].setValue(response['data'].firstName);
					this.myForm.controls['BirthDay'].setValue(response['data'].birthDay);
					this.myForm.controls['agency'].setValue(response['data'].agencyId);
					this.myForm.controls['MembershipStartDate'].setValue(response['data'].membershipStartDate);
					this.myForm.controls['MembershipExpiryDate'].setValue(response['data'].membershipExpiryDate);
					this.myForm.controls['Disable'].setValue(response['data'].disable);
					this.myForm.controls['Hidden'].setValue(response['data'].hidden);
					this.myForm.controls['Email'].setValue(response['data'].email);
					this.myForm.controls['Phone'].setValue(response['data'].phone);
					this.myForm.controls['MaxPictures'].setValue(response['data'].maxPictures);
					this.myForm.controls['MaxSounds'].setValue(response['data'].maxSounds);
					this.myForm.controls['MaxVideos'].setValue(response['data'].maxVideos);
					this.myForm.controls['UserName'].setValue(response['data'].userName);
					this.myForm.controls['Pswd'].setValue(response['data'].password);
					this.myForm.controls['Publication'].setValue(response['data'].mailArtistMsgs);
					this.myForm.controls['Remarks'].setValue(response['data'].notes);
					this.EditText.controls.Drama.setValue(response['data'].drama);
					this.EditText.controls.Comic.setValue(response['data'].comic);
					this.EditText.controls.Musical.setValue(response['data'].musical);
					this.totalvideo = response['data']['maxVideos'];
					this.dynamicDropDownArrayForVideo = [];
					if (response.data.artistEmbeds != null) {
						this.videoArray = [];
						for (let i = 0; i < response.data.artistEmbeds.length; i++) {
							this.videoArray.push({
								id: response.data.artistEmbeds[i].id,
								artistId: this.artistId,
								embedType: response.data.artistEmbeds[i].embedType,
								order: response.data.artistEmbeds[i].order,
								approved: response.data.artistEmbeds[i].approved,
								embed: JSON.parse(response.data.artistEmbeds[i].embed)
							});
							this.dynamicDropDownArrayForVideo.push({
								id: i + 1,
								value: i + 1
							});
						}
					}
					this.videoArray.sort((a, b) => { return a.order - b.order });
					this.totalphotos = response['data']['maxPictures'];
					this.dynamicDropDownArray = [];
					this.photosArray = [];
					for (let i = 0; i < this.totalphotos; i++) {
						this.photosArray.push({
							id: 0,
							order: i + 1,
							imgsrc: '',
							hasImage: false,
							approved: 0,
							main: 0,
							image: '',
							imageFile: {},
							fileName: '',
							markAsDelete: 0
						});
						this.dynamicDropDownArray.push({
							id: i + 1,
							value: i + 1
						});
					}
					let remainingCount = this.totalphotos;
					this.photosArray.forEach(parent => {
						response.data.artistPictures.forEach(child => {
							if (child.order == parent.order) {
								parent.id = child.id;
								parent.fileName = child.fileName;
								parent.approved = child.approved;
								parent.main = child.main;
								parent.image = child.fileName;
								remainingCount--;
							}
						});
						this.countLeft = remainingCount;
					});
					setTimeout(() => {
						this.photosArray.sort((a, b) => { return a.order - b.order });
						if (response['data']['prop5Values'] != null) {
							this.propsData.forEach(parent => {
								response['data']['prop5Values'].forEach(child => {
									if (parent['id'] == child['prop5Id']) {
										this.propsForm.controls[parent['prop5Name']].setValue(child['value']);
									}
								});
							});
						}
					}, 200);
					setTimeout(() => {
						if (response['data']['charValuesData'] != null) {
							this.characteristicsData.forEach(parent => {
								response['data']['charValuesData'].forEach(child => {
									if (parent['characteristicId'] == child.characteristicId) {
										this.EditPhysically.controls[parent['name']].setValue(child.id);
									}
								});
							});
						}
					}, 200);
					if (response.data.actStatusType != null) {
						this.subscriptionData = {
							actStatusType: response.data.actStatusType,
							actStatusColor: response.data.actStatusColor,
							actTakeJub: response.data.actTakeJub,
							insideNotes: response.data.insideNotes
						}
					}
					else {
						this.subscriptionData = false;
					}
				} catch (error) {
					this.toastr.error('Something went wrong while displaying data');
				}
			}
		}
		else if (response && response.status === "failure") {
			this.toastr.error('Failed to get data');
		}
	}

	swap(index1: number, index2: number): void {
		let order = this.photosArray[index1].order;
		this.photosArray[index1].order = this.photosArray[index2].order;
		this.photosArray[index2].order = order;
		const element1 = this.photosArray[index1];
		const element2 = this.photosArray[index2];
		this.photosArray[index1] = element2;
		this.photosArray[index2] = element1;
	}

	swap1(index1: number, index2: number): void {
		let order = this.videoArray[index1].order;
		this.videoArray[index1].order = this.videoArray[index2].order;
		this.videoArray[index2].order = order;
		const element1 = this.videoArray[index1];
		const element2 = this.videoArray[index2];
		this.videoArray[index1] = element2;
		this.videoArray[index2] = element1;
	}

	drop(event: CdkDragDrop<string[]>) {
		this.swap(event.previousIndex, event.currentIndex);
	}

	drop1(event: CdkDragDrop<string[]>) {
		this.swap1(event.previousIndex, event.currentIndex);
	}

	openDialog(action) {
		let obj = {
			action: action
		}
		this.selected_Value = this.artistId;
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '250px',
			data: obj
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result.event == 'Delete') {
				this.deleteArtist(this.selected_Value);
			}
		});
	}

	openDialog3() {
		const dialogRef = this.dialog.open(SubscriptionComponent,
			{
				data: this.subscriptionData ? this.subscriptionData : null
			});
		dialogRef.afterClosed().subscribe(result => {
			if (result != undefined) {
				result.artistId = this.artistId;
				this.saveSubscriptionDetails(result);
			}
		});
	}

	async saveSubscriptionDetails(obj) {
		let response;
		try {
			response = await this.service.addArtistSubscription(obj).toPromise();
		} catch (error) {
			this.toastr.error('Something went wrong');
			this.load.hide();
		}
		if (response && response.status == "success") {
			this.toastr.success('Added successfully');
			this.loadArtistData();
		}
		else if (response && response.status === "failure") {
			this.toastr.error('Failed to save data');
		}
	}

	deleteArtist(id) {
		this.toastr.warning("Deleting Artist please wait...");
		this.service.deleteArtist(id).subscribe(
			(response) => {
				if (response.status === "success") {
					this.toastr.success("Deleted sucessfully...");
					this.selected_Value = "";
					this.router.navigate(['dashboard/ActorsMessages']);
				}
				else if (response && response.status === "failure") {
					this.toastr.error('Failed to delete');
				}
			}
		), err => {
			this.load.hide();
		}
	}

	async artistUpdate() {
		if (this.myForm.valid) {
			let response;
			try {
				let s: string = "<html><head>	<title></title></head><body></body></html>";
				response = await this.service.Update(this.artistId, {
					"FirstName": this.myForm.controls.FirstName.value,
					"LastName": this.myForm.controls.LastName.value,
					"Gender": this.myForm.controls.Gender.value,
					"Height": this.myForm.controls.Height.value,
					"Description": this.myForm.controls.Descrp.value,
					"BirthDay": this.transFormDate(this.myForm.controls.BirthDay.value),
					"MembershipStartDate": this.transFormDate(this.myForm.controls.MembershipStartDate.value),
					"MembershipExpiryDate": this.transFormDate(this.myForm.controls.MembershipExpiryDate.value),
					"Disable": this.myForm.controls.Disable.value,
					"agencyId": this.myForm.controls.agency.value,
					"Hidden": this.myForm.controls.Hidden.value,
					"Email": this.myForm.controls.Email.value,
					"Phone": this.myForm.controls.Phone.value,
					"MaxPictures": this.myForm.controls.MaxPictures.value,
					"MaxVideos": this.myForm.controls.MaxVideos.value,
					"MaxSounds": this.myForm.controls.MaxSounds.value,
					"UserName": this.myForm.controls.UserName.value,
					"Password": this.myForm.controls.Pswd.value,
					"Notes": this.myForm.controls.Remarks.value,
					"MailArtistMsgs": this.myForm.controls.Publication.value,
					"Friend": 0,
					"LogInId": 0,
					"Resume": s.localeCompare(this.myForm.controls.Resume.value.replace(/\r?\n|\r/g, '')) === 0 ? '' : this.myForm.controls.Resume.value,
					"actStatusType": this.subscriptionData.actStatusType,
					"actStatusColor": this.subscriptionData.actStatusColor,
					"actTakeJub": this.subscriptionData.actTakeJub,
					"insideNotes": this.subscriptionData.insideNotes
				}).toPromise();
			} catch (error) {
				this.load.hide();
				this.toastr.error('Error while editing artist');
				// console.log(error);
			}
			if (response && response.status == "success") {
				this.toastr.success("Edited successfully");
				this.loadArtistData();
			}
			else if (response && response.status === "failure") {
				this.toastr.error('Failed to update');
			}
		}
		else {
			this.toastr.error("Please fill all the required details");
		}
	}

	Artist_Text_Update() {
		this.EditText.value.artistId = this.artistId;
		this.service.ArtistTextUpdate(this.EditText.value, this.artistId).subscribe(
			(res) => {
				if (res.status == "success") {
					this.toastr.success('Added successfully');
					this.loadArtistData();
				}
				else if (res && res.status === "failure") {
					this.toastr.error('Failed to update');
				}
				() => {
					this.toastr.error('Something went wrong');
				}
			}
		), err => {
			this.load.hide();
		};
	}

	async getAllCharacteristicsData() {
		let response;
		this.characteristicsData = [];
		try {
			response = await this.masterService.getAllCharacteristicsData().toPromise();
		} catch (error) {
			this.load.hide();
		}
		if (response && response.status == "success") {
			this.characteristicsData = response.data;
			this.characteristicsData.forEach(ele => {
				this.EditPhysically.addControl(ele['name'], new FormControl(''));
			});
		}
		else if (response && response.status === "failure") {
			this.toastr.error('Failed to get charactersitics data');
		}
	}

	async getAllPropsData() {
		let response;
		this.propsData = [];
		response = await this.masterService.getAllPropsData().toPromise();
		if (response && response.status == "success" && response.data) {
			this.propsData = response.data;
			this.propsData.forEach(ele => {
				this.propsForm.addControl(ele['prop5Name'], new FormControl(''));
			});
		}
		else if (response && response.status === "failure") {
			this.toastr.error('Failed to get props data');
		}
	}

	async saveCapabilities() {
		let dataSet = [];
		Object.keys(this.propsForm.value).forEach((key) => {
			if (this.propsForm.value[key] != "") {
				let value = this.propsData.find(e => e['prop5Name'] === key);
				let mainOptions = <Array<any>>value['options'];
				let value_OfOptions = mainOptions.find(e => e.id == this.propsForm.value[key]);
				let object = { "Key": value['id'], "Value": value_OfOptions.id };
				dataSet.push(object);
			}
		});
		if (dataSet.length > 0) {
			let response;
			try {
				response = await this.service.artistCapabilitesUpdate(this.artistId, dataSet).toPromise();
			} catch (error) {
				this.toastr.error("Something went wrong...");
				this.load.hide();
			}
			if (response.status == "success") {
				this.toastr.success("Saved successfully");
				this.loadArtistData();
			}
			else if (response && response.status === "failure") {
				this.toastr.error('Failed to save capabilities');
			}
		} else {
			this.toastr.error('Please provide atleast one detail about your capabilities');
		}
	}

	async EditPhy() {
		if (this.EditPhysically.valid) {
			let dataSet = [];
			// Object.keys(this.EditPhysically.value).forEach((key) => {
			// 	if (this.EditPhysically.value[key] != "") {
			// 		let value = this.characteristicsData.find(e => e['name'] === key);
			// 		let mainOptions = <Array<any>>value['options'];
			// 		let value_OfOptions = mainOptions.find(e => e.id == this.EditPhysically.value[key]);
			// 		let object = { "Key": value['characteristicId'], "Value": value_OfOptions.id };
			// 		dataSet.push(object);
			// 	}
			// });
			dataSet = Object.values(this.EditPhysically.value).filter(e => e != "").map(e => e);
			// console.log(dataSet);
			if (dataSet.length > 0) {
				let response;
				try {
					response = await this.service.EditPhysicalInfo({
						charvalues: dataSet
					}, this.artistId).toPromise();
				} catch (error) {
					this.toastr.error("Something went wrong");
					this.load.hide();
				}
				if (response && response.status == "success") {
					this.toastr.success("Saved successfully");
					this.loadArtistData();
				}
				else if (response && response.status === "failure") {
					this.toastr.error('Failed to save data');
				}
			}
		}
		else {
			this.toastr.error('Please provide your all details');
		}
	}

	onFileSelect(event, id) {
		if (event.target.files.length > 0) {
			let reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.onload = () =>
				this.photosArray.find(e => {
					if (e.order === id) {
						e.imgsrc = reader.result;
						e.hasImage = true;
						e.approved = 0;
						e.main = 0;
						e.image = '';
						e.imageFile = event.target.files[0];
					}
				});
		}
	}

	onDeleteImage(id, file) {
		this.photosArray.find(e => {
			if (e.order === id) {
				e.imgsrc = '';
				e.hasImage = false;
				e.approved = 0;
				e.main = 0;
				e.image = ''
				e.imageFile = null
				file.value = ''
			}
		});
	}

	async test12() {
		let tempForUpload: any[] = [];
		let tempPreviouslyUpload: any[] = [];
		this.photosArray.forEach(e => {
			if (e.id == 0 && e.imgsrc != '') {
				tempForUpload.push(e);
			}
			else if (e.id != 0) {
				tempPreviouslyUpload.push(e);
			}
		});
		if (tempForUpload.length > 0) {
			let fd = new FormData();
			tempForUpload.forEach(_item => {
				fd.append("files", _item.imageFile);
			});
			let response;
			try {
				response = await this.service.uploadArtistPhoto(fd).toPromise();
			} catch (error) {
				this.load.hide();
				this.toastr.error('Error while uploading image');
			}
			if (response) {
				for (let i = 0; i < tempForUpload.length; i++) {
					tempForUpload[i].image = response[i];
				}
				tempForUpload.forEach(e => {
					this.photosArray.forEach(f => {
						if (e.order == f.order) {
							f = e;
						}
					});
				});
			}
		}
		if (tempForUpload.length > 0 || tempPreviouslyUpload.length > 0) {
			let response2;
			try {
				response2 = await this.service.saveArtistPhoto({
					artistId: this.artistId,
					artistPictureModels: [...tempPreviouslyUpload, ...tempForUpload]
				}).toPromise();
			} catch (error) {
				this.toastr.error('Error while adding details');
				this.load.hide()
			}
			if (response2 && response2.status == "success") {
				this.toastr.success('Data saved successfully');
				this.loadArtistData();
			}
			else if (response2 && response2.status === "failure") {
				this.toastr.error('Failed to save data');
			}
		}
		else {
			this.toastr.error('No images to upload');
		}
	}

	async saveImage(d) {
		let response2;
		try {
			response2 = await this.service.saveArtistPhoto({
				artistId: this.artistId,
				artistPictureModels: d
			}).toPromise();
		} catch (error) {
			this.load.hide();
		}
		if (response2 && response2.status == "success") {
			this.toastr.success('Image added successfully');
			this.loadArtistData();
		}
		else if (response2 && response2.status === "failure") {
			this.toastr.error('Failed to save image data');
		}
	}

	async editImage(d) {
		let response2;
		try {
			response2 = await this.service.saveArtistPhoto({
				artistId: this.artistId,
				artistPictureModels: d
			}).toPromise();
		} catch (error) {
			this.load.hide();
		}
		if (response2 && response2.status == "success") {
			this.toastr.success('Image added successfully');
			this.loadArtistData();
		}
		else if (response2 && response2.status === "failure") {
			this.toastr.error('Failed to save');
		}
	}

	markAsFirstPic(id) {
		this.photosArray.forEach(e => {
			e.main = 0;
			if (e.order == id) {
				e.main = 1;
			}
		});
	}

	markHappy(id) {
		this.photosArray.find(e => {
			if (e.order == id) {
				if (e.approved == 0) {
					e.approved = 1;
				}
				else {
					e.approved = 0;
				}
			}
		});
	}

	markImageAsDelete(id) {
		this.photosArray.find(e => {
			if (e.order == id && e.image != "") {
				if (e.markAsDelete == 0) {
					e.markAsDelete = 1;
				}
				else {
					e.markAsDelete = 0;
				}
			}
		});
	}

	async uploadVideo(url: string) {
		if (this.videoArray.length != this.totalvideo) {
			if (this.videoUrl.valid && url != undefined) {
				let base: string;
				if (url.includes('youtu')) {
					base = 'https://www.youtube.com/oembed?';
				}
				else if (url.includes('soundcloud')) {
					base = 'https://soundcloud.com/oembed?'
				}
				else
					return false;
				let response;
				try {
					response = await this.service.getYTJSON(base, url).toPromise();
				} catch (error) {
					this.toastr.error("Unable to fetch video details");
					this.load.hide();
				}
				if (response && response.status == "success") {
					this.videoUrl.setValue('');
					let response2;
					try {
						response2 = await this.service.saveArtistEmbeds({
							"artistId": this.artistId,
							"values": [
								{
									"id": 0,
									"embedType": 0,
									"order": this.videoArray.length + 1,
									"approved": 0,
									"embed": response.data
								}
							]
						}).toPromise();
					} catch (error) {
						this.toastr.error('Error while uploading video details');
						this.load.hide();
					}
					if (response2 && response2.status == "success") {
						this.toastr.success('Added successfully');
						this.loadArtistData();
					}
				}
				else if (response && response.status === "failure") {
					this.toastr.error('Failed to find media details');
				}
			}
		}
		else {
			this.toastr.show("Not allowed to enter more");
		}
	}

	async saveEmbedData() {
		if (this.videoArray.length > 0) {
			this.videoArray.forEach(e => {
				e.embed = JSON.stringify(e.embed);
			});
			let response;
			try {
				response = await this.service.editArtistEmbeds({
					artistId: this.artistId,
					values: this.videoArray
				}).toPromise();
			} catch (error) {
				this.load.hide();
			}
			if (response.status == "success") {
				this.toastr.success('Saved ');
				this.loadArtistData();
			}
			else if (response && response.status === "failure") {
				this.toastr.error('Failed to save data');
			}
		}
	}

	playVideo(html: any) {
		this.videoURlForPlayer = this.sanitizer.bypassSecurityTrustHtml(html);
	}

	markVideoHappy(id) {
		this.videoArray.find(e => {
			if (e.order == id) {
				if (e.approved == 0) {
					e.approved = 1;
				}
				else {
					e.approved = 0;
				}
			}
		});
	}

}