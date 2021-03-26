import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuditionService } from 'app/Services/audition.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-newband',
  templateUrl: './newband.component.html',
  styleUrls: ['./newband.component.css']
})
export class NewbandComponent implements OnInit {

  casterForm: FormGroup;
  @ViewChild('castForm', { static: true }) myForm: NgForm;
  casterId: number;

  constructor(public router: Router, private fb: FormBuilder, private activatedRoute: ActivatedRoute,
    private toast: ToastrService, private service: AuditionService, private load: NgxSpinnerService,
    private translate: TranslateService) {
    this.casterForm = this.fb.group(
      {
        firstName: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
        lastName: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
        email1: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],
        email2: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(255), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],
        phone1: [null, Validators.compose([Validators.required, Validators.min(999999), Validators.max(9999999999)])],
        phone2: [null, [Validators.compose([Validators.min(999999), Validators.max(9999999999)])]],
        fax: [null, Validators.compose([Validators.min(9999), Validators.max(9999999999)])],
        address: [null, Validators.compose([Validators.minLength(5), Validators.max(50)])],
        company: [null, Validators.compose([Validators.minLength(5), Validators.max(50)])],
        notes: [null, Validators.compose([Validators.minLength(5), Validators.max(50)])],
        username: [null, Validators.compose([Validators.minLength(3), Validators.max(50)])],
        website: [null],
        password: [null],
        disabled: [0, Validators.required]
      }
    );
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.casterId = params['id'];
      if (this.casterId) {
        this.loadCasterData(this.casterId);
      }
    });
  }

  async loadCasterData(id) {
    let response;
    try {
      response = await this.service.getCasterDataById(id).toPromise();
    } catch (error) {
      this.toast.error('Error fetching details');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.casterForm.patchValue(response.data);
    }
    else if (response.status === "failure") {
      this.toast.error('Failed to load caster data');
    }
  }

  backfun() {
    this.router.navigate(['/dashboard/caster'])
  }

  async addCaster() {
    if (this.casterForm.valid) {
      let response;
      try {
        this.casterForm.controls.disabled.setValue(parseInt(this.casterForm.controls.disabled.value));
        response = await this.service.createCaster(this.casterForm.value).toPromise();
      } catch (error) {
        this.toast.error("Something went wrong...");
        this.load.hide();
      }
      if (response && response.status == "success") {
        this.toast.success("Successfully Add");
        this.myForm.resetForm();
      }
      else if (response.status === "failure") {
        this.toast.error('Failed to add caster');
      }
    } else {
      this.toast.error('Please fill the required details')
    }
  }

  async editCaster() {
    if (this.casterForm.valid) {
      let response;
      this.casterForm.controls.disabled.setValue(parseInt(this.casterForm.controls.disabled.value));
      this.casterForm.value.id = this.casterId;
      try {
        response = await this.service.editCaster(this.casterForm.value).toPromise();
      } catch (error) {
        this.toast.error('Error while editing details');
        this.load.hide();
      }
      if (response && response.status == "success") {
        this.toast.success(response.message);
        this.loadCasterData(this.casterId);
      }
      else if (response.status === "failure") {
        this.toast.error('Failed to edit caster');
      }
    }
    else {
      this.toast.error('Please fill the required details')
    }
  }
}
