import { Component, OnInit, Input } from '@angular/core';
import { SearchResults } from 'app/Models/ArtistSearchModel/ArtistSearch';

@Component({
  selector: 'app-searchresultscolumnview',
  templateUrl: './searchresultscolumnview.component.html',
  styleUrls: ['./searchresultscolumnview.component.css']
})
export class SearchresultscolumnviewComponent implements OnInit {

  @Input('artistData') artist: SearchResults;

  constructor() { 
    // console.log
  }

  ngOnInit() {
  }

}
