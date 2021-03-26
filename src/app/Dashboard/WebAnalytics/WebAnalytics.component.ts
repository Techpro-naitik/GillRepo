import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ServiceService } from 'app/service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'anglo-web-analytics',
    templateUrl: './WebAnalytics.component.html',
    styleUrls: ['./WebAnalytics.component.scss']
})
export class WebAnalyticsComponent implements OnInit {
    myForm: FormGroup;
    // emailPattern: '(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)';
    submitted: boolean;
    @ViewChild('artistForm', { static: true }) artistForm: NgForm;

    constructor(private translate: TranslateService, public router: Router,
        private fb: FormBuilder, private service: ServiceService, private toastr: ToastrService) {
        this.initForm();
    }

    initForm() {
        this.myForm = this.fb.group({
            FirstName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
            LastName: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(50)])],
            Gender: [0, Validators.required],
            Height: ['', Validators.compose([Validators.required, Validators.max(999), Validators.min(0)])],
            Description: [''],
            BirthDay: [new Date("01/01/1970"), Validators.required],
            MembershipStartDate: [new Date(), Validators.required],
            MembershipExpiryDate: [new Date("12/31/2100"), Validators.required],
            Disable: [0, Validators.required],
            Hidden: [0, Validators.required],
            Email: ['', [Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])]],
            Phone: ['', Validators.compose([Validators.required, Validators.pattern("^(00972|0|\\+972)[5][0-9]{8}$")])],
            MaxPictures: [5],
            MaxVideos: [2],
            MaxSounds: [1],
            UserName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
            Password: ['101010', Validators.required],
            MailArtistMsgs: [1, Validators.required],
            Friend: "0",
            LogInId: "0",
            Resume: "0"
        });
    }

    ngOnInit() {

    }

    onSubmit() {
        try {
            if (this.artistForm.valid && this.isStringEmpty()) {
                this.service.webAnalytics({
                    "firstName": this.myForm.controls.FirstName.value.trim().replace(/\s\s+/g, ' '),
                    "lastName": this.myForm.controls.LastName.value.trim().replace(/\s\s+/g, ' '),
                    "gender": this.myForm.controls.Gender.value,
                    "height": Math.floor(this.myForm.controls.Height.value),
                    "description": this.myForm.controls.Description.value.trim().replace(/\s\s+/g, ' '),
                    "birthDay": this.myForm.controls.BirthDay.value,
                    "membershipStartDate": this.myForm.controls.MembershipStartDate.value,
                    "membershipExpiryDate": this.myForm.controls.MembershipExpiryDate.value,
                    "disable": this.myForm.controls.Disable.value,
                    "hidden": this.myForm.controls.Hidden.value,
                    "email": this.myForm.controls.Email.value.trim().replace(/\s\s+/g, ' '),
                    "phone": this.myForm.controls.Phone.value,
                    "maxPictures": this.myForm.controls.MaxPictures.value,
                    "maxVideos": this.myForm.controls.MaxVideos.value,
                    "maxSounds": this.myForm.controls.MaxSounds.value,
                    "userName": this.myForm.controls.UserName.value.trim().replace(/\s\s+/g, ' '),
                    "password": this.myForm.controls.Password.value.trim().replace(/\s\s+/g, ' '),
                    "MailArtistMsgs": this.myForm.controls.MailArtistMsgs.value,
                    "friend": 0,
                    "loginId": 0,
                    "resume": '',
                    "agencyId": 0
                }).subscribe(res => {
                    if (res && res.status == "success") {
                        this.toastr.success("Player added Successfully");
                        this.artistForm.resetForm();
                        this.initForm();
                    }
                    else if (res.status == "failure") {
                        this.toastr.error(res.message);
                    }
                });
            }
            else {
                this.toastr.error('Please fill all the required details');
            }
        } catch (error) {
            this.toastr.error('Something went wrong...');
            console.log(error);
        }
    }

    isStringEmpty(): boolean {
        if (this.myForm.controls.FirstName.value.trim() === "" || this.myForm.controls.LastName.value.trim() === "" || this.myForm.controls.UserName.value.trim() === "" || this.myForm.controls.Password.value.trim() === "") {
            return false;
        }
        else {
            return true;
        }
    }

    pageforsearch() {
        this.router.navigate(["../dashboard/playerserach"])
    }

}