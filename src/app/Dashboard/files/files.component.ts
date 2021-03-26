import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MessageService } from 'app/Services/message.service';
import { IMessageResponse } from 'app/Models/MessageSystem Model/message';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  filesArray: any[];
  constructor(private dialog: MatDialogRef<FilesComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private service: MessageService, private toast: ToastrService, private load: NgxSpinnerService,
    private dialog2: MatDialog) { }

  ngOnInit() {
    setTimeout(async () => {
      await this.getAllFiles();
      if (this.data) {
        this.filesArray.forEach(e => {
          this.data.forEach(f => {
            if (f === e.fileName) {
              e.isSelected = true;
            }
          });
        });
      }
    });
  }

  async getAllFiles() {
    let response;
    try {
      response = await this.service.getAllFiles().toPromise();
    } catch (error) {
      this.toast.error('Error fetching file details');
      this.load.hide();
    }
    if (response && response.status == "success") {
      this.filesArray = response.data;
      this.filesArray.forEach(e => e.isSelected === true ? true : false);
      // console.log(this.filesArray);
    }
    else if (response && response.status == "failure") {
      this.toast.error('Failed to get files');
    }
  }

  isSelected(id) {
    let data = this.filesArray.filter(e => e.id === id);
    data[0].isSelected = !data[0].isSelected;
  }

  closeDialog() {
    let files: any[] = [];
    files = this.filesArray.filter(e => e.isSelected === true).map(e => e.fileName);
    this.dialog.close(files.length > 0 ? files : null);
  }

  async onFileSelect(event) {
    if (event.target.files[0].type === "image/jpeg" || event.target.files[0].type === "image/jpg" || event.target.files[0].type === "image/png" || event.target.files[0].type === "application/doc" || event.target.files[0].type === "application/docx" || event.target.files[0].type === "application/pdf") {
      let fd: FormData = new FormData();
      fd.append('file', event.target.files[0]);
      // console.log(event.target.files[0]);
      if (fd != null) {
        let response: IMessageResponse;
        try {
          response = await this.service.uploadFile(fd).toPromise();
        } catch (error) {
          this.toast.error('Error while upoading file');
          this.load.hide();
        }
        if (response && response.status === "success") {
          this.toast.success('File uploaded successfully');
          this.getAllFiles();
        }
        else if (response && response.status == "failure") {
          this.toast.error('Failed to upload file');
        }
      }
      else {
        // console.log(fd);
      }
    }
    else {
      this.toast.error('File type not accepted');
    }
  }

  checkForImage(name: string, type: string): string {
    if (type === 'image/jpeg' || type === 'image/jpg' || type === 'image/png') {
      return `http://shalashapi.azurewebsites.net/UploadsFiles/${name}`;
    }
    else if (type === "application/pdf") {
      return `../../../assets/image/pdffile.png`;
    }
    else {
      return `../../../assets/image/wordfile.png`;
    }
  }

  async confirmDeleteFile(id: number, name: string) {
    const dialogRef = this.dialog2.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { action: 'Delete', name: name }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result == 'yes') {
        this.deleteFile(id);
      }
    });
  }

  async deleteFile(id) {
    let response: IMessageResponse;
    try {
      response = await this.service.deleteFileById(id).toPromise();
    } catch (error) {
      this.toast.error('Error while deleting file');
      this.load.hide();
    }
    if (response && response.status === "success") {
      this.toast.success('File deleted successfully');
      this.getAllFiles();
    }
    else if (response && response.status == "failure") {
      this.toast.error('Failed to delete file');
    }
  }

  deleteMultiple() {
    let ids = this.filesArray.filter(e => e.isSelected === true).map(e => e.id);
    if (ids.length > 0) {
      const dialogRef = this.dialog2.open(ConfirmationDialogComponent, {
        width: '250px',
        data: { action: 'Delete', name: 'multiple' }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined && result == 'yes') {
          ids.forEach(e => this.deleteFile(e));
        }
      });
    }
    else {
      this.toast.error('No file selected');
    }
  }
}