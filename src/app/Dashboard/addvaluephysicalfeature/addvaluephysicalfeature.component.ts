import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addvaluephysicalfeature',
  templateUrl: './addvaluephysicalfeature.component.html',
  styleUrls: ['./addvaluephysicalfeature.component.css']
})
export class AddvaluephysicalfeatureComponent implements OnInit {
  fieldArray: Array<any> = [];
  newAttribute: any = {};

  constructor(private dialogRef: MatDialogRef<AddvaluephysicalfeatureComponent>, private toast: ToastrService) { }

  ngOnInit() {
    this.addFieldValue()
  }

  addFieldValue() {
    this.fieldArray.push({});
    // this.newAttribute = {};
    // console.log(this.fieldArray)
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  checkValues(): boolean {
    let a = 0;
    for (let i = 0; i < this.fieldArray.length; i++) {
      if (this.fieldArray[i].name == undefined) {
        a++;
      }
    }
    if (a > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  save() {
    if (!this.checkValues()) {
      this.dialogRef.close(this.fieldArray);
    }
    else {
      // this.dialogRef.close(undefined);
      this.toast.error('Please fill all the values');
    }
  }

}