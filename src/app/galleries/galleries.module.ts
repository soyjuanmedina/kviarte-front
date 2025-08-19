import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleriesRoutingModule } from './galleries-routing.module';
import { GalleriesComponent } from './galleries.component';


@NgModule({
  declarations: [
    GalleriesComponent
  ],
  imports: [
    CommonModule,
    GalleriesRoutingModule
  ]
})
export class GalleriesModule { }
