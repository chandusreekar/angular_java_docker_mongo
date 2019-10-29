import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderdashboardComponent } from './reminderdashboard.component';

describe('ReminderdashboardComponent', () => {
  let component: ReminderdashboardComponent;
  let fixture: ComponentFixture<ReminderdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
