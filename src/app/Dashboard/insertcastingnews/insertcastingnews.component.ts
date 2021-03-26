import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CastingService } from 'app/Services/casting.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-insertcastingnews',
  templateUrl: './insertcastingnews.component.html',
  styleUrls: ['./insertcastingnews.component.css']
})
export class InsertcastingnewsComponent implements OnInit {
  @ViewChild('castForm', { static: true }) castForm: NgForm
  castingForm: FormGroup;
  castingNewsId: number;

  constructor(public router: Router, private service: CastingService, private fb: FormBuilder,
    private route: ActivatedRoute, private toast: ToastrService, private load: NgxSpinnerService,
    private translate: TranslateService) {
    this.initForm();
  }

  initForm() {
    this.castingForm = this.fb.group({
      body: ['', Validators.required],
      disabled: [0, Validators.required],
      ord: [0, Validators.required]
    });
  }

  ngOnInit() {
    this.castingNewsId = JSON.parse(this.route.snapshot.paramMap.get('id'));
    if (typeof this.castingNewsId === 'number') {
      this.loadData(this.castingNewsId);
    }
  }

  async loadData(id) {
    let response;
    try {
      response = await this.service.getCastingById(id).toPromise();
    } catch (error) {
      this.load.hide();
      this.toast.error('Error fetching details');
    }
    if (response && response.status == "success") {
      this.castingForm.patchValue(response.data);
    }
    else if (response && response.status == "failure") {
      this.toast.error('No record found for this id');
      this.castingNewsId = null;
    }
  }

  newscasting() {
    this.router.navigate(['/dashboard/castingnews'])
  }

  async addCasting() {
    if (this.castingForm.valid) {
      let response;
      try {
        response = await this.service.addCasting(this.castingForm.value).toPromise();
      } catch (error) {
        this.toast.error('Error adding casting');
        this.load.hide();
      }
      if (response && response.status == "success") {
        this.toast.success('Added successfully');
        this.castForm.resetForm();
        this.initForm();
      }
      else if (response && response.status == "failure") {
        this.toast.error('Failed to add casting');
      }
    } else {
      this.toast.show('Please add required details');
    }
  }

  async editCasting() {
    if (this.castingForm.valid) {
      let response;
      try {
        response = await this.service.editCastingById(this.castingNewsId, this.castingForm.value).toPromise();
      } catch (error) {
        this.toast.error('Error adding casting');
        this.load.hide();
      }
      if (response && response.status == "success") {
        this.toast.success('Added successfully');
        this.loadData(this.castingNewsId);
      }
      else if (response && response.status == "failure") {
        this.toast.error('Failed to edit casting');
      }
    } else {
      this.toast.show('Please add required details');
    }
  }

}