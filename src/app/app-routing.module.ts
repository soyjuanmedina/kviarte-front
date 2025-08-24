import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExhibitionsComponent } from './exhibitions/exhibitions.component';
import { ProfileUserComponent } from './user/profile-user/profile-user.component';
import { RegisterUserComponent } from './user/register-user/register-user.component';
import { registerGuard } from './guards/auth.guard';
import { RegisterArtistComponent } from './artists/register-artist/register-artist.component';
import { ManageUsersComponent } from './user/manage-users/manage-users.component';
import { ManageGalleriesComponent } from './galleries/manage-galleries/manage-galleries.component';
import { GalleryFormComponent } from './galleries/gallery-form/gallery-form.component';
import { GalleryProfileComponent } from './galleries/gallery-profile/gallery-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // '' redirige a 'home'
  { path: 'home', component: HomeComponent },         // ruta real para HomeComponent
  { path: 'profile', component: ProfileUserComponent },
  { path: 'profile/:id', component: ProfileUserComponent },
  { path: 'register/user', component: RegisterUserComponent, canActivate: [registerGuard], },
  { path: 'manage/users', component: ManageUsersComponent, canActivate: [registerGuard], },
  { path: 'manage/galleries', component: ManageGalleriesComponent, canActivate: [registerGuard] },
  { path: 'manage/galleries/new', component: GalleryFormComponent, canActivate: [registerGuard] },
  { path: 'manage/galleries/:id/edit', component: GalleryFormComponent, canActivate: [registerGuard] },
  { path: 'galleries/:id/profile', component: GalleryProfileComponent },
  { path: 'register/artist', component: RegisterArtistComponent, canActivate: [registerGuard], },
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
