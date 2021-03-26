import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'anglo-google-dialog',
  templateUrl: './GoogleDialog.component.html',
  styleUrls: ['./GoogleDialog.component.scss']
})
export class GoogleDialogComponent implements OnInit {

   constructor(public dialogRef : MatDialogRef<GoogleDialogComponent>) { }

   ngOnInit() {
   }
}
