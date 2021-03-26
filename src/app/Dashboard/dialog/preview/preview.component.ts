import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

interface IPreview {
  id: number;
  artistId: number;
  creationDate: string;
  readDate: string;
  emailDate: string;
  msgType: number;
  direction: number;
  disabled: number;
  readOnce: number;
  hidden: number;
  addToEmailQueue: number;
  title: string;
  body: string | SafeHtml;
  pageNumber: number;
  pageSize: number;
  firstName: string;
  lastName: string;
  wasread: string;
  msgtypename: string;
}
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  @Input('data') data: IPreview;

  constructor(private sanitizer: DomSanitizer, private translate: TranslateService) { }

  ngOnInit() {  }

  getHTML(html): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getTitle(title: string): string {
    return title.slice(title.indexOf('|') + 1, title.length);
  }

}