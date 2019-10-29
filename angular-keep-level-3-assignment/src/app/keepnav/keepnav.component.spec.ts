import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepnavComponent } from './keepnav.component';

describe('KeepnavComponent', () => {
  let component: KeepnavComponent;
  let fixture: ComponentFixture<KeepnavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeepnavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeepnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
