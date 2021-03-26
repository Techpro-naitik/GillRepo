import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { PropsValues } from 'app/Models/MasterDataModel/model';

@Component({
  selector: 'app-filter-data',
  templateUrl: './filter-data.component.html',
  styleUrls: ['./filter-data.component.css']
})
export class FilterDataComponent implements OnInit {

  skillsCtrl = new FormControl();
  filteredSkills: Observable<PropsValues[]>;
  selectedSkills: PropsValues[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: PropsValues[], private dialog: MatDialogRef<FilterDataComponent>) {
    this.filteredSkills = this.skillsCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterSkills(state) : this.data.slice())
      );
  }

  ngOnInit() {
    // console.log(this.data);
  }

  private _filterSkills(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.data.filter(state => state.prop5Name.toLowerCase().indexOf(filterValue) === 0);;
  }

  getSelected(value) {
    let data = this.data.find(e => e.prop5Name === value);
    if (data) this.selectedSkills.push(data); this.skillsCtrl.setValue('');
  }

  removeItem(index) {
    this.selectedSkills.splice(index, 1);
    console.log(this.selectedSkills);
  }
}
