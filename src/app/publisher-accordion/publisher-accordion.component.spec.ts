import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherAccordionComponent } from './publisher-accordion.component';

describe('PublisherAccordionComponent', () => {
  let component: PublisherAccordionComponent;
  let fixture: ComponentFixture<PublisherAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublisherAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
