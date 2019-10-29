


import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
// import {Lesson} from "../model/lesson";
// import {CoursesService} from "./courses.service";
import {catchError, finalize} from "rxjs/operators";
import {Publisher} from '../models/publisher';
import {PublisherService} from '../services/publisher.service';



export class PublishersDataSource implements DataSource<Publisher> {

    private publishersSubject = new BehaviorSubject<Publisher[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private publisherService: PublisherService) {

    }

    loadPublishers(filter:string,
                sortDirection:string,
                pageIndex:number,
                pageSize:number) {

        this.loadingSubject.next(true);
        console.log("Get publishers...");
        this.publisherService.findPublishers( filter, sortDirection,
          pageIndex, pageSize).pipe(
              catchError(() => of([])),
              finalize(() => this.loadingSubject.next(false))
          )
          .subscribe(publisher => {
            console.log("got next --> "+publisher);
            this.publishersSubject.next(publisher);
          });

    }


  connect(collectionViewer: CollectionViewer): Observable<Publisher[]> {
      console.log("Connecting data source");
      return this.publishersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.publishersSubject.complete();
      this.loadingSubject.complete();
  }
    //
    // connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
    //     console.log("Connecting data source");
    //     return this.lessonsSubject.asObservable();
    // }
    //
    // disconnect(collectionViewer: CollectionViewer): void {
    //     this.lessonsSubject.complete();
    //     this.loadingSubject.complete();
    // }

}

