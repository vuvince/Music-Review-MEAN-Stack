import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcaNoticeComponent } from './dmca-notice.component';

describe('DmcaNoticeComponent', () => {
  let component: DmcaNoticeComponent;
  let fixture: ComponentFixture<DmcaNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmcaNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcaNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
