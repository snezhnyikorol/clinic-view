import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JawControlComponent } from './jaw-control.component';

describe('JawControlComponent', () => {
  let component: JawControlComponent;
  let fixture: ComponentFixture<JawControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JawControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JawControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
