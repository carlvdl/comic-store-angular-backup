import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Publisher} from '../models/publisher';
import {PublishersDataSource} from './publishers.datasource';
import {ActivatedRoute} from '@angular/router';
import {PublisherService} from '../services/publisher.service';
import {MatPaginator, MatSort} from '@angular/material';
import {merge} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.css']
})
export class PublisherListComponent implements OnInit {

  publisher:Publisher;
  dataSource: PublishersDataSource;
  displayedColumns= ["code", "description"];
  publishersCount: Number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild('input', { static: true }) input: ElementRef;


  constructor(private route: ActivatedRoute,
              private publisherService: PublisherService) {
    console.log("Get publishers list 1...");

  }

  ngOnInit() {
    console.log("Get publishers list 2...");

    this.dataSource = new PublishersDataSource(this.publisherService);

    this.dataSource.loadPublishers( '', 'asc', 0, 3);

    this.publishersCount = 200;
    // this.dataSource.loadLessons(this.course.id, '', 'asc', 0, 3);

  }

  ngAfterViewInit() {
    console.log('-------------ngAfterViewInit---------');
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // fromEvent(this.input.nativeElement,'keyup')
    //   .pipe(
    //     debounceTime(150),
    //     distinctUntilChanged(),
    //     tap(() => {
    //       this.paginator.pageIndex = 0;
    //       console.log('---------fromEvent-----------');
    //       this.loadLessonsPage();
    //     })
    //   )
    //   .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          console.log('pagination, this.sort.sortChange: '+this.sort.sortChange);
          console.log('pagination, this.sort.direction: '+this.sort.direction);
          // console.log('pagination, this.paginator.sortChange: '+this.paginator.page);
          // console.log('this.input.nativeElement.value: '+this.input.nativeElement.value);
          console.log('this.sort.direction: '+this.sort.direction);
          console.log('this.paginator.pageIndex: '+this.paginator.pageIndex);
          console.log('this.paginator.pageSize: '+this.paginator.pageSize);

          // this.input.nativeElement.value,
          //   this.sort.direction,
          //   this.paginator.pageIndex,
          //   this.paginator.pageSize);
          //

          this.dataSource.loadPublishers( '', this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
        })
      )
      .subscribe();

  }

  // loadLessonsPage() {
  //   console.log('------------loadLessonsPage---------');
  //
  //   this.dataSource.loadLessons(
  //     this.course.id,
  //     this.input.nativeElement.value,
  //     this.sort.direction,
  //     this.paginator.pageIndex,
  //     this.paginator.pageSize);
  // }
  //
  // ngAfterViewInit() {
  //   console.log('-------------ngAfterViewInit---------');
  //   this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  //
  //   fromEvent(this.input.nativeElement,'keyup')
  //     .pipe(
  //       debounceTime(150),
  //       distinctUntilChanged(),
  //       tap(() => {
  //         this.paginator.pageIndex = 0;
  //         console.log('---------fromEvent-----------');
  //         this.loadLessonsPage();
  //       })
  //     )
  //     .subscribe();
  //
  //   merge(this.sort.sortChange, this.paginator.page)
  //     .pipe(
  //       tap(() => {
  //         console.log('---------mergex-----------');
  //         this.loadLessonsPage();
  //       })
  //     )
  //     .subscribe();
  //
  // }


}
