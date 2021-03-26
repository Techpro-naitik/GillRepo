import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TextsandnewsService } from 'app/Services/textsandnews.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-insertdefault',
  templateUrl: './insertdefault.component.html',
  styleUrls: ['./insertdefault.component.css']
})
export class InsertdefaultComponent implements OnInit {
  textId: any;
  textForm: FormGroup;
  image: any;
  imageDisplay: string | ArrayBuffer = '';
  @ViewChild('defaultForm', { static: true }) defaultForm: NgForm;

  constructor(public routerParams: ActivatedRoute, private router: Router,
    private service: TextsandnewsService, private fb: FormBuilder,
    private toast: ToastrService, private load: NgxSpinnerService, private translate: TranslateService) {
    this.initForm();
  }

  initForm() {
    this.textForm = this.fb.group({
      title: ['', Validators.required],
      date: [new Date(), Validators.required],
      shortText: ['', Validators.required],
      longText: ['', Validators.required],
      archive: [0, Validators.required],
      pic: ['']
    });
  }

  ngOnInit() {
    this.textId = JSON.parse(this.routerParams.snapshot.paramMap.get('id'));
    if (this.textId) {
      this.loadTextData(this.textId);
    }
  }

  async loadTextData(id) {
    let response;
    try {
      response = await this.service.getTextById(id).toPromise();
    } catch (error) {
      this.toast.error('Something went wrong');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.textForm.patchValue(response.data);
      this.imageDisplay = response.data.pic ? `http://shalashapi.azurewebsites.net/Uploads/${response.data.pic}` : '';
    }
    else if (response && response.status == "failure") {
      this.toast.error('Failed to load text data');
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

  saveTextData() {
    if (this.textId) {
      //edit
      this.editTextData();
    }
    else {
      //add
      this.addTextData();
    }
  }

  async editTextData() {
    let obj = {
      title: this.textForm.controls.title.value,
      date: this.textForm.controls.date.value,
      shortText: this.textForm.controls.shortText.value,
      longText: this.textForm.controls.longText.value,
      archive: this.textForm.controls.archive.value,
      pic: this.textForm.controls.pic.value
    };
    if (this.image && !this.imageDisplay.toString().includes('.jpg')) {
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
      response2 = await this.service.editTextById(this.textId, obj).toPromise();
    } catch (error) {
      this.toast.error('Error adding details');
      this.load.hide();
    }
    if (response2 && response2.status == "success") {
      this.toast.success('Edited successfully');
      this.loadTextData(this.textId);
      this.image = null;
    }
    else if (response2 && response2.status == "failure") {
      this.toast.error('Failed to edit text data');
    }
  }

  async addTextData() {
    let obj = {
      title: this.textForm.controls.title.value,
      date: this.textForm.controls.date.value,
      shortText: this.textForm.controls.shortText.value,
      longText: this.textForm.controls.longText.value,
      archive: this.textForm.controls.archive.value,
      pic: null
    };
    if (this.image) {
      let fd = new FormData();
      fd.append('files', this.image);
      let response;
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
      response2 = await this.service.addText(obj).toPromise();
    } catch (error) {
      this.toast.error('Error adding details');
      this.load.hide();
    }
    if (response2 && response2.status == "success") {
      this.toast.success('Added successfully');
      this.defaultForm.resetForm();
      this.initForm();
      this.image = null;
      this.imageDisplay = '';
    }
    else if (response2 && response2.status == "failure") {
      this.toast.error('Failed to add text data');
    }
  }

  newscasting() {
    this.router.navigate(['/dashboard/default'])
  }
}