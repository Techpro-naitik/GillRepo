import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'app/service.service';

@Component({
	selector: 'anglo-login',
	templateUrl: './Login.component.html',
	styleUrls: ['./Login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	newTarget: string = "new";
	emailPattern: string = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";

	ReviewsSlides: any[] = [
		{
			// images: '/assets/img/user-3.jpg',
			// name:"Mia Mabanta",
			// heading:"UI Developer",
			content: "Login"
		},
		//   { 	images: '/assets/img/user-28.jpg',
		//       name:"Astell Mercell",
		//       heading:"Director of Brand Development at Quartz",
		//       content:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
		//   },
		//   { 
		//   	images: '/assets/img/user-4.jpg',
		//   	name:"Emmy Loren",
		//   	heading:"UX Developer",
		//   	content:"Sed consequat lobortis risus, vitae congue nulla tempor id. Curabitur eu augue id nibh tristique tristique. Phasellus vel est nisi"
		//   },
	];

	social_icon: any[] = [
		{
			icon: "fa fa-facebook",
			link: "https://www.facebook.com/",
			color: "text-color",
			color_class: "facebook"
		},
		{
			icon: "fa fa-google",
			link: "https://www.google.com/",
			color: "text-color",
			color_class: "google"
		},
		{
			icon: "fa fa-twitter",
			link: "https://twitter.com/",
			color: "text-color",
			color_class: "twitter"
		},
		{
			icon: "fa fa-github-alt",
			link: "https://github.com/",
			color: "text-color",
			color_class: "github"
		},
	]

	constructor(private router: Router,
		private formBuilder: FormBuilder,
		// public authService : AuthService,
		public translate: TranslateService,
		public service: ServiceService, private toastr: ToastrService) { }

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			Username: ['', [Validators.required]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			validate: ""
		})
	}

	/*
	 * signinFormOpen fuction is used to open the sign up page 
	 */
	signupFormOpen() {
		this.router.navigate(['/session/sign-up']);
	}

	/*
	 * logInFormOpen function is used to login on the anglo admin template.
	 */
	onSubmit() {

		// console.log(this.loginForm.value)
		// if (this.loginForm.value.Username == null && this.loginForm.value.Username == undefined) {
		// 	this.toastr.error("Please  Username and password!");
		// } else if (this.loginForm.value.password == undefined && this.loginForm.value.password == null) {
		// 	this.toastr.error("Please  password!");
		// } else if (this.loginForm.value.validate == "") {
		// 	this.toastr.error("plese Checked value");
		// } else {
		// 	this.service.login(this.loginForm.value).subscribe(res => {
		// 		if (res.status == 'failure') {
		// 			this.toastr.error("Invalid username and password");
		// 			this.loginForm.reset();
		// 		} else {
		// 			let token = res.data.token;
		// 			this.toastr.success("Successfully logged In!");
		// 			console.log(token)
		// 			localStorage.setItem('token', token)
		// 			this.router.navigate(['/dashboard/refreshlist'], { replaceUrl: true });
		// 		}
		// 	})
		// }

		if (this.loginForm.valid) {
			this.service.login(this.loginForm.value).subscribe(res => {
				if (res.status == 'failure') {
					this.toastr.error("Invalid username/password");
					this.loginForm.reset();
				} else {
					let token = window.btoa(res.data.token);
					this.toastr.success("Successfully logged In!");
					// console.log(token)
					localStorage.setItem('token', token)
					this.router.navigate(['/dashboard/refreshlist'], { replaceUrl: true });
				}
			});
		} else {
			this.toastr.error('Please enter your credentials');
		}
	}
}