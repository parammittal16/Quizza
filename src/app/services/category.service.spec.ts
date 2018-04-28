import { TestBed, inject } from '@angular/core/testing';
import { Categories } from './categories.service';


describe('CategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Categories]
    });
  });

  it('should be created', inject([Categories], (service: Categories) => {
    expect(service).toBeTruthy();
  }));
});
