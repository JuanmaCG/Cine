import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteleraTestComponent } from './cartelera-test.component';

describe('CarteleraTestComponent', () => {
  let component: CarteleraTestComponent;
  let fixture: ComponentFixture<CarteleraTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteleraTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteleraTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
