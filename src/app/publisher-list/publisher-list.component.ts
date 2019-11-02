import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Publisher} from '../models/publisher';
import {PublishersDataSource} from './publishers.datasource';
import {ActivatedRoute} from '@angular/router';
import {PublisherService} from '../services/publisher.service';
import {MatPaginator, MatSort} from '@angular/material';
import {fromEvent, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';


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

  @ViewChild('inputCode', { static: true }) inputCode: ElementRef;

  @ViewChild('inputDescription', { static: true }) inputDescription: ElementRef;


  constructor(private route: ActivatedRoute,
              private publisherService: PublisherService) {
  }

  ngOnInit() {

    console.log('ngOnInit...');
    this.dataSource = new PublishersDataSource(this.publisherService);

    this.dataSource.loadPublishers( '', 'asc', 0, 3);

  }

  //ListURL.aspx?FilterField1=column&FilterValue1=value
  getFilter() {

    let filter = '?';
    let code = this.inputCode.nativeElement.value;
    let description = this.inputDescription.nativeElement.value;
    console.log('code --> '+code );
    console.log('description --> '+description );

    if (code){
      filter = filter.concat("code=" , code);
    }
    if (description){
      if(code) {
        filter = filter.concat("&")
      }
      filter = filter.concat("description=", description);

    }
    return filter;


  }

  ngAfterViewInit() {
    console.log('-------------ngAfterViewInit---------');
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);


    if (this.inputCode)
    fromEvent(this.inputCode.nativeElement,'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {

          let filter = this.getFilter();
          console.log('filter by code--> '+filter);

          this.paginator.pageIndex = 0;
          this.dataSource.loadPublishers( filter, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
        })
      )
      .subscribe();

    if (this.inputDescription)
      fromEvent(this.inputDescription.nativeElement,'keyup')
        .pipe(
          debounceTime(150),
          distinctUntilChanged(),
          tap(() => {

            let filter = this.getFilter();
            console.log('filter by description--> '+filter);

            this.paginator.pageIndex = 0;
            this.dataSource.loadPublishers( filter, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
          })
        )
        .subscribe();


    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          let filter = this.getFilter();
          console.log('paginating away--> '+filter);

          this.dataSource.loadPublishers( filter, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
        })
      )
      .subscribe();

  }


}
