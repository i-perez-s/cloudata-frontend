import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDirComponent } from './create-dir.component';

describe('CreateDirComponent', () => {
  let component: CreateDirComponent;
  let fixture: ComponentFixture<CreateDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
