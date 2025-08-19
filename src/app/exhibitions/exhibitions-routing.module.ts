import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExhibitionsComponent } from './exhibitions.component';

const routes: Routes = [{ path: '', component: ExhibitionsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExhibitionsRoutingModule { }
