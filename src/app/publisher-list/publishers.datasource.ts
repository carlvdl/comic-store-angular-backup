import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Publisher} from '../models/publisher';
import {PublisherService} from '../services/publisher.service';

export class PublishersDataSource implements DataSource<Publisher> {

  private publishersSubject = new BehaviorSubject<Publisher[]>([]);
  publishersCount: Number;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private publisherService: PublisherService) {
  }

  /*
    1 - populate the publishersSubject with the response body
    2 - populate the publishersCount from the response header
   */
  loadPublishers(filter: string,
                 sortDirection: string,
                 pageIndex: number,
                 pageSize: number) {

    this.loadingSubject.next(true);

    this.publisherService.findPublishers(filter, sortDirection, pageIndex, pageSize).subscribe(response => {
      this.publishersSubject.next(response.body);
      this.publishersCount = parseInt(response.headers.get('x-total-count'));
      console.log('PublishersCount...'+this.publishersCount);
      // this.setPublishersCount(this.publishersCount);
      this.loadingSubject.next(false);
    });

  }

  connect(collectionViewer: CollectionViewer): Observable<Publisher[]> {
    console.log('Connecting data source');
    return this.publishersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    console.log('DisConnecting data source');
    this.publishersSubject.complete();
    this.loadingSubject.complete();
  }

}

