// home.module.ts
import { NgModule } from '@angular/core';
// import { HomeComponent } from './home.component'; // ❌ eliminar
import { CommonModule } from '@angular/common';

@NgModule( {
  imports: [CommonModule],
  // declarations: [HomeComponent], // ❌ eliminar
  exports: []
} )
export class HomeModule { }
