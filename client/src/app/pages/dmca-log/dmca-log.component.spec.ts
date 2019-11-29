import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcaLogComponent } from './dmca-log.component';

describe('DmcaLogComponent', () => {
  let component: DmcaLogComponent;
  let fixture: ComponentFixture<DmcaLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmcaLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcaLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
