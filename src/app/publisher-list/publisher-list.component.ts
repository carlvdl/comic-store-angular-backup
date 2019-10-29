import { Component, OnInit } from '@angular/core';
import {Publisher} from '../models/publisher';
import {PublishersDataSource} from './publishers.datasource';
import {ActivatedRoute} from '@angular/router';
import {PublisherService} from '../services/publisher.service';

@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.css']
})
export class PublisherListComponent implements OnInit {

  publisher:Publisher;
  dataSource: PublishersDataSource;
  displayedColumns= ["code", "description"];

  constructor(private route: ActivatedRoute,
              private publisherService: PublisherService) {
    console.log("Get publishers list 1...");

  }

  ngOnInit() {
    console.log("Get publishers list 2...");

    this.dataSource = new PublishersDataSource(this.publisherService);

    this.dataSource.loadPublishers( '', 'asc', 0, 3);
    // this.dataSource.loadLessons(this.course.id, '', 'asc', 0, 3);

  }

}
