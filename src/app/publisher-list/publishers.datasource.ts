import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
// import {Lesson} from "../model/lesson";
// import {CoursesService} from "./courses.service";
import {Publisher} from '../models/publisher';
import {PublisherService} from '../services/publisher.service';


export class PublishersDataSource implements DataSource<Publisher> {

  private publishersSubject = new BehaviorSubject<Publisher[]>([]);
  publishersCount: Number;

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private publisherService: PublisherService) {

  }


  getPublisherCount() {
    console.log('Get publisher count...');

  }

  loadPublishers(filter: string,
                 sortDirection: string,
                 pageIndex: number,
                 pageSize: number) {

    console.log('Get publishers...');
    this.loadingSubject.next(true);

    this.publisherService.findPublishers2(filter, sortDirection, pageIndex, pageSize).subscribe(response => {
            console.log('got response --> ' + response);
            console.log('got respons body --> ' + response.body);
            console.log('got response.headers.keys() --> ' + response.headers.keys());
            console.log('-----------------');
            // console.log(publisherDTO);
            this.publishersSubject.next(response.body);
            // this.publishersSubject.next(publisher);
            // const {next} = this.publishersSubject;
            // next(publisherDTO.body.publisherArray);
            // display its headers
            let count = response.headers.get('x-total-count');
            console.log('the count is: '+count);
            //
            // const keys = response.headers.keys();
            // console.log('keys---> ');
            // console.log(keys);
            //
            // const headers = keys.map(key =>
            //   '${key}: ${response.headers.get(key)}');
            // console.log('headers ---');
            // console.log(headers );
          });

  //   this.publisherService.findPublishers(filter, sortDirection, pageIndex, pageSize).pipe(
  //     catchError(() => of([])),
  //     finalize(() => this.loadingSubject.next(false))
  //   )
  //     .subscribe(publisher => {
  //       console.log('got next --> ' + publisher);
  //       this.publishersSubject.next(publisher);
  //     });
  //
  }


  connect(collectionViewer: CollectionViewer): Observable<Publisher[]> {
    console.log('Connecting data source');
    return this.publishersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.publishersSubject.complete();
    this.loadingSubject.complete();
  }

}

