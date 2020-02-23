import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {PublisherService} from '../services/publisher.service';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {Publisher} from '../models/publisher';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-publisher-accordion',
  templateUrl: './publisher-accordion.component.html',
  styleUrls: ['./publisher-accordion.component.css']
})
export class PublisherAccordionComponent implements OnInit {

  publishers: Publisher[];

  constructor(private publisherService: PublisherService) {
    this.getPublishers();

  }

  ngOnInit() {
  }

  getPublishers(): void {
    this.publisherService.findPublishers( '', 'asc', 0, 10000).subscribe(response =>{
      console.log('----');
      console.log("getting publishers for page "+response);
      console.log('----');
      this.publishers = response.body;
    })
  }


  handlePanelClickEvent($event: MouseEvent) {

  }

  handlePanelChangeEvent($event: NgbPanelChangeEvent) {

  }
}
