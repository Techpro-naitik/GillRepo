import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-addagencyrank',
  templateUrl: './addagencyrank.component.html',
  styleUrls: ['./addagencyrank.component.css']
})
export class AddagencyrankComponent implements OnInit {

  rankForm: FormGroup;

  constructor(private _toast: ToastrService, private _fb: FormBuilder,
    private dialog: MatDialogRef<AddagencyrankComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private translate: TranslateService) {
    this.rankForm = this._fb.group({
      rank: [null, Validators.required],
      color: ['#000000', Validators.required]
    });
    if (this.data) {
      this.rankForm.patchValue(this.data);
    }
  }

  ngOnInit() {
  }

  closeDialog() {
    if (this.rankForm.valid) {
      let data = this.rankForm.value;
      this.data ? data.id = this.data.id : null;
      this.dialog.close({ data: data, type: this.data ? 'edit' : 'add' });
    }
  }
}