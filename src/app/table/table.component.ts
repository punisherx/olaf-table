import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface MovieHeroes {
  first: string;
  last: string;
}

const ELEMENT_DATA: MovieHeroes[] = [
  {first: 'John', last: 'Rambo'},
  {first: 'John', last: 'Wick'},
  {first: 'Indiana', last: 'Jones'},
  {first: 'Jack', last: 'Sparrow'},
  {first: 'Harry', last: 'Potter'},
  {first: 'Darth', last: 'Vader'},
  {first: 'Ellen', last: 'Ripley'}
];

/**
 * @title Table with sorting
 */
@Component({
  selector: 'app-table',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html'
})
export class TableComponent implements AfterViewInit {

  // Columns that are displayed (you can actually hide any of them if you remove them from this list)
  displayedColumns: string[] = ['first', 'last'];

  // This is the list of columns that you are looking for (filter columns, dropdowns, etc)
  filterColumns: string[] = ['first-filter', 'last-filter'];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer) {
  }

  @ViewChild(MatSort) sort: MatSort | undefined;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort!;
    this.dataSource.filterPredicate = (data: any, filtersJson: string) => {
        const matchFilter: any[] = [];
        const filters = JSON.parse(filtersJson);

        filters.forEach((filter: { id: string | number; value: string; }) => {
          const val = data[filter.id] === null ? '' : data[filter.id];
          matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
        });
        return matchFilter.every(Boolean);
      };
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(column: string, event: any) {
    if (!event || !event.target || !column) {
      return;
    }

    const filterValue: string = event.target.value;
    const tableFilters = [];
    tableFilters.push({
      id: column,
      value: filterValue
    });

    this.dataSource.filter = JSON.stringify(tableFilters);
  }
}
