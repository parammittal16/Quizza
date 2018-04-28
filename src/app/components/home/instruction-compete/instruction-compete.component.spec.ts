import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionCompeteComponent } from './instruction-compete.component';

describe('InstructionCompeteComponent', () => {
  let component: InstructionCompeteComponent;
  let fixture: ComponentFixture<InstructionCompeteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructionCompeteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionCompeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
