import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcaTakedownComponent } from './dmca-takedown.component';

describe('DmcaTakedownComponent', () => {
  let component: DmcaTakedownComponent;
  let fixture: ComponentFixture<DmcaTakedownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmcaTakedownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcaTakedownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
