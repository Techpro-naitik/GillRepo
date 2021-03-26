import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { TextsandnewsService } from 'app/Services/textsandnews.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-insertsitenews',
  templateUrl: './insertsitenews.component.html',
  styleUrls: ['./insertsitenews.component.css']
})
export class InsertsitenewsComponent implements OnInit {

  newsId: any;
  newsForm: FormGroup;
  image: any;
  imageDisplay: string | ArrayBuffer = '';
  @ViewChild('siteForm', { static: true }) siteForm: NgForm;

  constructor(public routerParams: ActivatedRoute, private router: Router,
    private service: TextsandnewsService, private fb: FormBuilder, private translate: TranslateService,
    private toast: ToastrService, private load: NgxSpinnerService) {
    this.initForm();
  }

  initForm() {
    this.newsForm = this.fb.group({
      title: ['', Validators.required],
      date: [new Date(), Validators.required],
      shortt: ['', Validators.required],
      longt: ['', Validators.required],
      archive: [0, Validators.required],
      pic: ['']
    });
  }

  ngOnInit() {
    this.newsId = JSON.parse(this.routerParams.snapshot.paramMap.get('id'));
    if (this.newsId) {
      this.loadNewsData(this.newsId);
    }
  }

  async loadNewsData(id) {
    let response;
    try {
      response = await this.service.getNewsById(id).toPromise();
    } catch (error) {
      this.toast.error('Something went wrong');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.newsForm.patchValue(response.data);
      this.imageDisplay = response.data.pic ? `http://shalashapi.azurewebsites.net/Uploads/${response.data.pic}` : '';
    }
    else if (response && response.status == "failure") {
      this.toast.error('Failed to load news data');
    }
  }

  onFileSelect(event, file) {
    this.image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () =>
      this.imageDisplay = reader.result;
    file.value = '';
  }

  saveNewsData() {
    if (this.newsId) {
      //edit
      this.editNewsData();
    }
    else {
      //add
      this.addNewsData();
    }
  }

  async editNewsData() {
    let obj = {
      title: this.newsForm.controls.title.value,
      date: this.newsForm.controls.date.value,
      shortText: this.newsForm.controls.shortt.value,
      longText: this.newsForm.controls.longt.value,
      archive: this.newsForm.controls.archive.value,
      pic: this.newsForm.controls.pic.value
    };
    if (this.image && !this.imageDisplay.toString().includes('.jpg')) {
      let response; let fd = new FormData();
      fd.append('files', this.image);
      try {
        response = await this.service.uploadTextImage(fd).toPromise();
      } catch (error) {
        this.toast.error('Error uploading image');
        this.load.hide();
      }
      if (response) {
        obj.pic = response[0];
      }
    }
    let response2;
    try {
      response2 = await this.service.editNewsById(this.newsId, obj).toPromise();
    } catch (error) {
      this.toast.error('Error adding details');
      this.load.hide();
    }
    if (response2 && response2.status == "success") {
      this.toast.success('Edited successfully');
      this.loadNewsData(this.newsId);
      this.image = null;
    }
    else if (response2 && response2.status == "failure") {
      this.toast.error('Failed to edit news data');
    }
  }

  async addNewsData() {
    let obj = {
      title: this.newsForm.controls.title.value,
      date: this.newsForm.controls.date.value,
      shortText: this.newsForm.controls.shortt.value,
      longText: this.newsForm.controls.longt.value,
      archive: this.newsForm.controls.archive.value,
      pic: null
    };
    if (this.image) {
      let response;
      let fd = new FormData();
      fd.append('files', this.image);
      try {
        response = await this.service.uploadTextImage(fd).toPromise();
      } catch (error) {
        this.toast.error('Error uploading image');
        this.load.hide();
      }
      if (response) {
        obj.pic = response[0];
      }
    }
    let response2;
    try {
      response2 = await this.service.addNews(obj).toPromise();
    } catch (error) {
      this.toast.error('Error adding details');
      this.load.hide();
    }
    if (response2 && response2.status == "success") {
      this.toast.success('Added successfully');
      this.siteForm.resetForm();
      this.initForm();
      this.image = null;
      this.imageDisplay = '';
    }
    else if (response2 && response2.status == "failure") {
      this.toast.error('Failed to add news data');
    }
  }

  newscasting() {
    this.router.navigate(['/dashboard/sitenews'])
  }

}