import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { SearchResults } from 'app/Models/ArtistSearchModel/ArtistSearch';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
})
export class SearchresultsComponent implements OnInit {

  @Input('artistData') artist: SearchResults;
  @Input('picAtMost') atMost: number;
  @Input('remarks') remarksForAll: string;

  artistPicturesForDisplay: any[];
  externalLink: string;
  videosList: Array<{ title: string, value: string }>;

  constructor(private router: Router, private translate: TranslateService) { }

  onChange(checked) {
    this.artist.isSelected = checked;
  }

  sendMessageToParent() {
    this.artist.messageForEmail = this.remarksForAll;
  }

  ngOnInit() {
    this.artist.isSelected = false;
    this.displayImagesForCount(this.atMost);
    this.getVideosList(this.artist.artistVideos);
  }

  displayImagesForCount(count) {
    this.artistPicturesForDisplay = [];
    if (this.artist.artistImages.length > 0 && this.artist != undefined) {
      for (let i = 0; i < this.atMost; i++) {
        this.artistPicturesForDisplay.push(this.artist.artistImages[i]);
        if (this.artistPicturesForDisplay.length == this.artist.artistImages.length)
          break;
      }

    }
  }

  ngOnChanges(change: SimpleChange) {
    if (change['remarksForAll']) {
      this.artist.messageForEmail = change['remarksForAll'].currentValue;
    }
    if (change['atMost']) {
      this.displayImagesForCount(change['atMost'].currentValue)
    }
  }

  calculateAge(): number {
    let timeDiff = Math.abs(Date.now() - new Date(this.artist.age).getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  }

  playerupdate(value) {
    this.router.navigate(['/dashboard/playerupdate', { 'value': value }]);
  }

  getExternalLink() {
    this.artist.externalLink = this.externalLink;
  }

  getVideosList(data: any[]) {
    if(data.length > 0){
      this.artist.artistVideos = data.map(e => JSON.parse(e.embed));
      console.log(this.artist.artistVideos);
    }
  }
}