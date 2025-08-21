import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExhibitionsComponent } from './exhibitions/exhibitions.component';
import { ProfileComponent } from './user/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'exhibitions', pathMatch: 'full' }, // '' redirige a 'exhibitions'
  { path: 'home', component: HomeComponent },         // ruta real para HomeComponent
  { path: 'profile', component: ProfileComponent },
  { path: 'galleries', loadChildren: () => import( './galleries/galleries.module' ).then( m => m.GalleriesModule ) },
  { path: 'artists', loadChildren: () => import( './artists/artists.module' ).then( m => m.ArtistsModule ) },
  { path: 'exhibitions', component: ExhibitionsComponent },
  { path: 'shop', loadChildren: () => import( './shop/shop.module' ).then( m => m.ShopModule ) },
  { path: 'user', loadChildren: () => import( './user/user.module' ).then( m => m.UserModule ) },
  { path: '**', redirectTo: 'home' } // catch-all
];

@NgModule( {
  imports: [RouterModule.forRoot( routes )],
  exports: [RouterModule]
} )
export class AppRoutingModule { }
