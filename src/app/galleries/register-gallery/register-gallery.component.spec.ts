import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterGalleryComponent } from './register-gallery.component';

describe( 'RegisterComponent', () => {
  let component: RegisterGalleryComponent;
  let fixture: ComponentFixture<RegisterGalleryComponent>;

  beforeEach( async () => {
    await TestBed.configureTestingModule( {
      imports: [RegisterGalleryComponent]
    } )
      .compileComponents();

    fixture = TestBed.createComponent( RegisterGalleryComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );
} );
