import { Component, OnInit } from '@angular/core';
import { AuditionService } from 'app/Services/audition.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { IAuditionResponse } from 'app/Models/AuditionBudgetModel/model';
import { CasterApiModel, AudtionTypeApiModel, AudtionTopicApiModel } from 'app/Models/CasterModel/model';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

interface IAudition {
  "ptitle": string,
  "pauditionDate": string,
  "pauditionCreationDate": string,
  "plocation": string,
  "pclosingDate": string,
  "inOut": number,
  "direction": number,
  "pauditionTypeId": number,
  "ptopic": string,
  "ptopicId": 0,
  "pbudgetType": number,
  "pbudget": number,
  "prehearsalStart": string,
  "prehearsalEnd": string,
  "pworkStart": string,
  "pworkEnd": string,
  "pdescription": string,
  "pimage": string,
  "pcolor": string,
  "pallowApplicationToManyParts": number,
  "pallowApplicationToUnfitParts": number,
  "pmaxAllowedPictures": number,
  "psentToCasterDate": string,
  "pcasterId": number,
  "pviewedByCaster": number,
  "pcasterReplied": number,
  "preventApplications": number,
  "preventCasterEdit": number,
  "pautoApplication": number,
  "pautoAbilityText": number,
  "invite_msg_title": string,
  "isApproved": number
}
@Component({
  selector: 'app-add-audition',
  templateUrl: './add-audition.component.html',
  styleUrls: ['./add-audition.component.css']
})

export class AddAuditionComponent implements OnInit {
  x = [];
  i = 1;

  genders = [
    { id: 1, name: "Male" },
    { id: 0, name: "Female" },
    { id: 2, name: "Does not matter" }
  ];

  // selectedValue = null;

  // submitted = false;

  isShown: boolean = true;

  masterData: { types: Array<any>, topics: Array<any>, casters: Array<any>, budget: Array<any> };

  auditionForm: FormGroup;

  addAudition: IAudition;

  currentAuditionId: number;

  rolesForm: FormGroup;

  roles: FormArray;

  constructor(private auditionService: AuditionService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private dialog: MatDialog, private router: Router,
    private toast: ToastrService, private load: NgxSpinnerService, private translate: TranslateService) {
    this.addAudition = {
      "ptitle": '', "pauditionDate": '', 'pauditionCreationDate': this.transFormDate(new Date()), "plocation": '', "pclosingDate": '', "inOut": 1, "direction": 0,
      "pauditionTypeId": 0, "ptopic": '', "ptopicId": 0, "pbudgetType": 1, "pbudget": 0, "prehearsalStart": '',
      "prehearsalEnd": '', "pworkStart": '', "pworkEnd": '', "pdescription": '', "pimage": '', "pcolor": '',
      "pallowApplicationToManyParts": 1, "pallowApplicationToUnfitParts": 1, "pmaxAllowedPictures": 5,
      "psentToCasterDate": '', "pcasterId": 0, "pviewedByCaster": 0, "pcasterReplied": 0, "preventApplications": 0,
      "preventCasterEdit": 0, "pautoApplication": 0, "pautoAbilityText": 0, "invite_msg_title": '', isApproved: 1
    };
    while (this.x.push(this.i++) < 120) {
    }
    this.intiForm();
    this.currentAuditionId = this.route.snapshot.paramMap.get('id') ? parseInt(this.route.snapshot.paramMap.get('id')) : null;
    this.rolesForm = this.formBuilder.group({
      roles: this.formBuilder.array([this.createItem()])
    });
  }

  intiForm() {
    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    this.auditionForm = this.formBuilder.group({
      ptitle: ['', Validators.compose([Validators.required])],
      pauditionDate: [new Date().toISOString()],
      plocation: [''],
      pclosingDate: [now.toISOString().slice(0, 16)],
      inOut: [1],
      pauditionTypeId: [],
      ptopicId: [],
      prehearsalStart: [],
      pworkStart: [new Date().toISOString()],
      pdescription: [''],
      pcasterId: [],
      pautoApplication: [1],
      pautoAbilityText: [0],
      invite_msg_title: ['', Validators.compose([Validators.required])]
    });
  }

  async ngOnInit() {
    this.masterData = { types: [], topics: [], casters: [], budget: [] };
    await this.getAuditionTypes();
    await this.getAuditionTopics();
    await this.getCasters();
    this.getBudgetTypes();
    if (this.currentAuditionId) {
      // this.isShown = true;
      this.auditionService.getAuditionById(this.currentAuditionId).subscribe(response => {
        if (response && response.status == "success") {
          this.auditionForm.patchValue(response.data);
          this.auditionForm.controls.pcasterId.setValue(response.data.pcasterId);
          this.addAudition.pauditionCreationDate = response.data.pauditionCreationDate;
        }
        else if (response && response.status == "failure") {
          this.toast.error('Failed to get audition details');
        }
      },
        err => {
          // console.log(err);
          this.load.hide();
        });
      this.getRolesData(this.currentAuditionId);
    }
  }

  async getCasters() {
    let response: CasterApiModel;
    try {
      response = await this.auditionService.getCasters().toPromise();
    } catch (error) {
      this.toast.error('Something went wrong while fetching caster details');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.masterData.casters = response.data;
      this.auditionForm.controls.pcasterId.setValue(response.data[0].id);
    }
    else if (response && response.status == "failure") {
      this.toast.error('Failed to get caster details');
    }
  }

  async getAuditionTypes() {
    let response: AudtionTypeApiModel;
    try {
      response = await this.auditionService.getAuditionTypes().toPromise();
    } catch (error) {
      this.toast.error('Something went wrong while fetching audition types details');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.masterData.types = response.data;
      this.auditionForm.controls.pauditionTypeId.setValue(response.data[0].id);
    }
    else if (response && response.status == "failure") {
      this.toast.error('Failed to get audition type details');
    }
  }

  async getAuditionTopics() {
    let response: AudtionTopicApiModel;
    try {
      response = await this.auditionService.getAuditionTopic().toPromise();
    } catch (error) {
      this.toast.error('Something went wrong while fetching audition topic details');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.masterData.topics = response.data;
      this.auditionForm.controls.ptopicId.setValue(response.data[0].id);
    }
    else if (response && response.status == "failure") {
      this.toast.error('Failed to get audition topic details');
    }
  }

  async getBudgetTypes() {
    let response: { status: string, message: string, data: Array<object> };
    try {
      response = await this.auditionService.getAuditionBudget().toPromise();
    } catch (error) {
      this.toast.error('Something went wrong while fetching budget details');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.masterData.budget = response.data;
    }
    else if (response && response.status == "failure") {
      this.toast.error('Failed to get budget details');
    }
  }

  submitDetails() {
    if (this.auditionForm.valid) {
      if (this.currentAuditionId) this.updateAudition();
      else this.createAudition();
    }
    else this.toast.error('Please provide all mandatory details');
  }

  async createAudition() {
    // console.log('create');
    if (this.rolesForm.get('roles').status === "VALID") {
      this.prepareRequestObject();
      let response: IAuditionResponse;
      try {
        response = await this.auditionService.addAudition(this.addAudition).toPromise();
      } catch (error) {
        this.toast.error('Something went wrong while adding an audition');
        this.load.hide();
      }
      if (response && response.status == "success") {
        this.toast.success('Audition added successfully');
        this.onSubmit(response.data);
        // this.router.navigate(['/dashboard/addaudition/', response.data]);
      }
      else if (response && response.status == "failure") {
        this.toast.error('Failed to add audition details');
      }
    }
    else {
      this.toast.error('Please provide appropriate roles data for the audition');
    }
  }

  async updateAudition() {
    // console.log('update');
    this.prepareRequestObject();
    let response: IAuditionResponse;
    try {
      response = await this.auditionService.updateAudition(this.addAudition, this.currentAuditionId).toPromise();
    } catch (error) {
      this.toast.error('Something went wrong while editing audition');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.toast.success('Audition Edited Successfully');
    }
    else if (response && response.status == "failure") {
      this.toast.error('Failed to update audition details');
    }
  }

  prepareRequestObject() {
    this.addAudition.ptitle = this.auditionForm.controls.ptitle.value.trim().replace(/\s\s+/g, ' ');
    this.addAudition.pauditionDate = this.transFormDate(this.auditionForm.controls.pauditionDate.value);
    this.addAudition.plocation = this.auditionForm.controls.plocation.value.trim().replace(/\s\s+/g, ' ');
    this.addAudition.pclosingDate = this.auditionForm.controls.pclosingDate.value;
    this.addAudition.inOut = this.auditionForm.controls.inOut.value;
    this.addAudition.pauditionTypeId = this.auditionForm.controls.pauditionTypeId.value;
    this.addAudition.ptopicId = this.auditionForm.controls.ptopicId.value;
    this.addAudition.prehearsalStart = this.transFormDate(this.auditionForm.controls.prehearsalStart.value);
    this.addAudition.pworkStart = this.transFormDate(this.auditionForm.controls.pworkStart.value);
    this.addAudition.pdescription = this.auditionForm.controls.pdescription.value.trim().replace(/\s\s+/g, ' ');
    this.addAudition.pcasterId = this.auditionForm.controls.pcasterId.value;
    this.addAudition.pautoApplication = this.auditionForm.controls.pautoApplication.value;
    this.addAudition.pautoAbilityText = this.auditionForm.controls.pautoAbilityText.value;
    this.addAudition.invite_msg_title = this.auditionForm.controls.invite_msg_title.value.trim().replace(/\s\s+/g, ' ');
    this.prepareOtherData();
  }

  prepareOtherData() {
    this.addAudition.prehearsalEnd = this.transFormDate(new Date());
    this.addAudition.pworkEnd = this.transFormDate(new Date());
    this.addAudition.pbudgetType = 1;
    this.addAudition.pbudget = 0;
    this.addAudition.pimage = "a";
    this.addAudition.pcolor = "b";
    this.addAudition.pallowApplicationToManyParts = 1;
    this.addAudition.pallowApplicationToUnfitParts = 1;
    this.addAudition.pmaxAllowedPictures = 5;
    this.addAudition.psentToCasterDate = null;
    this.addAudition.pviewedByCaster = 0;
    this.addAudition.pcasterReplied = 0;
    this.addAudition.direction = 0;
    this.addAudition.preventApplications = 0;
    this.addAudition.preventCasterEdit = 0;
    // this.addAudition.isApproved = 1;
    // console.log(this.addAudition);
  }

  // For converting date to differnt format
  transFormDate(date) {
    if (date) {
      let dp = new DatePipe('en-US');
      date = dp.transform(date, 'dd/MMM/yyyy');
      return date;
    }
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }

  getRolesData(id: number) {
    this.auditionService.getRolesByAuditionId(id).subscribe(response => {
      if (response && response.status == "success" && response.data.length > 0) {
        this.isShown = true;
        this.createRoles(response.data);
      }
      else if (response && response.status == "failure") {
        this.toast.error('Failed to get role details');
      }
    },
      err => {
        // console.log(err);
        this.toast.error('Something went wrong while fetching roles data');
        this.load.hide();
      });
  }

  createItem(data?) {
    if (data) {
      return this.formBuilder.group({
        title: [data.title, Validators.required],
        gender: [data.gender],
        minAge: [data.minAge],
        maxAge: [data.maxAge],
        sum: [data.sum],
        budgetType: [data.budgetType],
        description: [data.description],
        notes: [data.notes],
        auditionId: this.currentAuditionId,
        id: data.id
      });
    }
    else {
      return this.formBuilder.group({
        title: ['', Validators.required],
        gender: [2],
        minAge: [10],
        maxAge: [80],
        sum: [0],
        budgetType: [1],
        description: [''],
        notes: [''],
        auditionId: this.currentAuditionId,
        id: 0
      });
    }
  }

  addItem(data?) {
    this.roles = this.rolesForm.get('roles') as FormArray;
    if (data) {
      this.roles.push(this.createItem(data));
    }
    else {
      this.roles.push(this.createItem());
    }
  }

  onSubmit(forwardId?) {
    if (forwardId) {
      this.rolesForm.value.roles.forEach(element => {
        element['auditionId'] = forwardId;
      });
      this.auditionService.addRolesForAudition(this.rolesForm.value).subscribe(response => {
        if (response && response.status === "success") {
          this.router.navigate(['/dashboard/addaudition/', forwardId]);
        }
        else if (response && response.status == "failure") {
          this.toast.error('Failed to add role details');
        }
      },
        err => {
          this.toast.error('Something went wrong while saving roles');
        });
    }
    else {
      if (this.rolesForm.get('roles').status === "VALID") {
        this.auditionService.addRolesForAudition(this.rolesForm.value).subscribe(response => {
          if (response && response.status === "success") {
            this.toast.success('Data saved');
            this.getRolesData(this.currentAuditionId);
          }
          else if (response && response.status == "failure") {
            this.toast.error('Failed to add role details');
          }
        },
          err => {
            this.toast.error('Something went wrong while saving roles');
          });
      } else {
        this.toast.error('Please provide appropriate roles data for the audition');
      }
    }
  }

  removeRole(index, id) {
    this.roles = this.rolesForm.get('roles') as FormArray;
    if (id === 0) {
      this.roles.removeAt(index);
    }
    else {
      this.openConfirmation('Delete', { id: id })
    }
  }

  createRoles(data: Array<object>) {
    this.roles = this.rolesForm.get('roles') as FormArray;
    this.roles.clear();
    data.forEach(e => {
      this.addItem(e);
    });
  }

  openConfirmation(role, obj) {
    obj.action = role;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        this.deleteRole(obj.id);
      }
    });
  }

  deleteRole(id: number) {
    this.auditionService.deleteRoleById(id).subscribe(response => {
      if (response && response.status === "success") {
        this.toast.success('Role deleted successfully');
        this.getRolesData(this.currentAuditionId);
      }
      else if (response && response.status == "failure") {
        this.toast.error('Failed to delete role details');
      }
    },
      err => {
        this.toast.error('Something went wrong while deleting role');
      });
  }
}