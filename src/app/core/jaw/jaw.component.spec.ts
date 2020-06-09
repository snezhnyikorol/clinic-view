import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JawComponent } from './jaw.component';

describe('JawComponent', () => {
  let component: JawComponent;
  let fixture: ComponentFixture<JawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
