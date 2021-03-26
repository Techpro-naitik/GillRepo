import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'anglo-dialog3',
  templateUrl: './Dialog3.component.html',
  styleUrls: ['./Dialog3.component.scss']
})
export class Dialog3Component implements OnInit {

  constructor(public dialogRef : MatDialogRef<Dialog3Component>) { }

  ngOnInit() {
  }

}