import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-insertprops',
  templateUrl: './insertprops.component.html',
  styleUrls: ['./insertprops.component.css']
})
export class InsertpropsComponent implements OnInit {
  insertPropsValue: FormGroup;

  constructor(public router: Router, @Inject(MAT_DIALOG_DATA) public data: any, public value: FormBuilder,
  private translate: TranslateService) {
    this.insertPropsValue = this.value.group({
      name: [null, Validators.required],
      val1: [null, Validators.required],
      val2: [null, Validators.required],
      val3: [null, Validators.required],
      val4: [null, Validators.required],
      val5: [null, Validators.required],
    });
  }

  ngOnInit() {
    if (this.data) {
      // console.log(this.data);
      this.insertPropsValue.controls.name.setValue(this.data.prop5Name);
      this.insertPropsValue.controls.val1.setValue(this.data.options[0].value);
      this.insertPropsValue.controls.val2.setValue(this.data.options[1].value);
      this.insertPropsValue.controls.val3.setValue(this.data.options[2].value);
      this.insertPropsValue.controls.val4.setValue(this.data.options[3].value);
      this.insertPropsValue.controls.val5.setValue(this.data.options[4].value);
    }
  }

  insertprops() {

  }
}
