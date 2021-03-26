import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CastingService } from 'app/Services/casting.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-insertfaq',
  templateUrl: './insertfaq.component.html',
  styleUrls: ['./insertfaq.component.css']
})
export class InsertfaqComponent implements OnInit {
  @ViewChild('qaForm', { static: true }) qaForm: NgForm
  faqForm: FormGroup;
  Faqid: number;

  constructor(public router: Router, private service: CastingService, private fb: FormBuilder,
    private route: ActivatedRoute, private load: NgxSpinnerService,
    private toast: ToastrService, private translate: TranslateService) {
    this.initForm()
  }

  initForm() {
    this.faqForm = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
      disabled: [0, Validators.required],
      ord: [0, Validators.required]
    });
  }

  ngOnInit() {
    this.Faqid = JSON.parse(this.route.snapshot.paramMap.get('id'));
    if (typeof this.Faqid === 'number') {
      this.loadData(this.Faqid);
    }
  }


  async loadData(id) {
    let response;
    try {
      response = await this.service.getFaqById(id).toPromise();
    } catch (error) {
      this.load.hide();
      this.toast.error('Error fetching details');
    }
    if (response && response.status == "success") {
      this.faqForm.patchValue(response.data);
    }
    else if (response && response.status == "failure") {
      this.toast.error('No record found for this id');
      this.Faqid = null;
    }
  }

  async addFaq() {
    if (this.faqForm.valid) {
      let response;
      try {
        response = await this.service.addFaq(this.faqForm.value).toPromise();
        if (response && response.status == "success") {
          this.toast.success('Added successfully');
          this.qaForm.resetForm();
          this.initForm();
        }
        else if (response && response.status == "failure") {
          this.toast.error('Failed to add faq');
        }
      } catch (error) {
        this.toast.error('Error adding casting');
        this.load.hide();
      }
    } else {
      this.toast.show('Please add required details');
    }
  }

  async editfaq() {
    if (this.faqForm.valid) {
      let response;
      try {
        response = await this.service.updatefaq(this.Faqid, this.faqForm.value).toPromise();
      } catch (error) {
        this.toast.error('Error adding casting');
        this.load.hide();
      }
      if (response && response.status == "success") {
        this.toast.success('Added successfully');
        this.loadData(this.Faqid);
      }
      else if (response && response.status == "failure") {
        this.toast.error('Failed to edit faq');
      }
    } else {
      this.toast.show('Please add required details');
    }
  }

  newscasting() {
    this.router.navigate(['/dashboard/faq'])
  }

}