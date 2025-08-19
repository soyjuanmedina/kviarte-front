import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // '' redirige a 'home'
  { path: 'home', component: HomeComponent },         // ruta real para HomeComponent
  { path: 'galleries', loadChildren: () => import( './galleries/galleries.module' ).then( m => m.GalleriesModule ) },
  { path: 'artists', loadChildren: () => import( './artists/artists.module' ).then( m => m.ArtistsModule ) },
  { path: 'exhibitions', loadChildren: () => import( './exhibitions/exhibitions.module' ).then( m => m.ExhibitionsModule ) },
  { path: 'shop', loadChildren: () => import( './shop/shop.module' ).then( m => m.ShopModule ) },
  { path: 'user', loadChildren: () => import( './user/user.module' ).then( m => m.UserModule ) },
  { path: '**', redirectTo: 'home' } // catch-all
];

@NgModule( {
  imports: [RouterModule.forRoot( routes )],
  exports: [RouterModule]
} )
export class AppRoutingModule { }
