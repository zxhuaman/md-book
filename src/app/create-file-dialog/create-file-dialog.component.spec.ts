import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFileDialogComponent } from './create-file-dialog.component';

describe('CreateFileDialogComponent', () => {
  let component: CreateFileDialogComponent;
  let fixture: ComponentFixture<CreateFileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFileDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
