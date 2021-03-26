import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef,MatDialog,MatDatepickerToggle ,MatDatepickerInputEvent,MatDatepicker} from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

import { CoreService} from '../../../Services/GlobalService/Core.service';


@Component({
   selector    : 'anglo-add-list-dialog',
   templateUrl : './AddListDialog.component.html',
   styleUrls   : ['./AddListDialog.component.scss']
})

export class AddListDialogComponent implements OnInit {

   form : FormGroup;
   data : any;

   constructor(public formBuilder:FormBuilder,
               public dialogRef:MatDialogRef<AddListDialogComponent>){}

   ngOnInit() {
      this.form = this.formBuilder.group(
         {
            title     : '',
            date     : ''
         } 
      )
   }

   addData() {
      this.dialogRef.close(this.form.value);
   }

}
