/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BmcanvasViewComponent } from './bmcanvas-view.component';

describe('BmcanvasViewComponent', () => {
  let component: BmcanvasViewComponent;
  let fixture: ComponentFixture<BmcanvasViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmcanvasViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmcanvasViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
