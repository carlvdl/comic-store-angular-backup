import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {GradingService} from '../services/grading.service';
import {DecimalPipe} from '@angular/common';
import {Grading} from '../models/grading';
import {Observable} from 'rxjs';
import {NgbdSortableHeader, SortEvent} from '../sortable.directive';


@Component( {
    selector: 'app-grading-list',
    templateUrl: './grading-list.component.html',
    styleUrls: ['./grading-list.component.css'],
    providers: [GradingService, DecimalPipe]
})
export class GradingListComponent implements OnInit {
  gradings$: Observable<Grading[]>;
  total$: Observable<number>;

  ngOnInit() {
  }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public gradingService: GradingService) {
    this.gradings$ = gradingService.gradings$;
    this.total$ = gradingService.total$;
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.gradingService.sortColumn = column;
    this.gradingService.sortDirection = direction;
  }
}
