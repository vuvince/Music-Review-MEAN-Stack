import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcaFormComponent } from './dmca-form.component';

describe('DmcaFormComponent', () => {
  let component: DmcaFormComponent;
  let fixture: ComponentFixture<DmcaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmcaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
