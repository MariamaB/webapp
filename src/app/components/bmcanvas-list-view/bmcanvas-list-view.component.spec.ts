import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BmcanvasListViewComponent } from "./bmcanvas-list-view.component";

describe("BmcanvasListViewComponent", () => {
  let component: BmcanvasListViewComponent;
  let fixture: ComponentFixture<BmcanvasListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BmcanvasListViewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmcanvasListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
