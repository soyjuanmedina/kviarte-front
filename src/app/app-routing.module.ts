import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExhibitionsComponent } from './exhibitions/exhibitions.component';
import { ProfileUserComponent } from './user/profile-user/profile-user.component';
import { RegisterUserComponent } from './user/register-user/register-user.component';
import { registerGuard } from './guards/auth.guard';
import { ArtistFormComponent } from './artists/artist-form/artist-form.component';
import { ManageUsersComponent } from './user/manage-users/manage-users.component';
import { ManageGalleriesComponent } from './galleries/manage-galleries/manage-galleries.component';
import { GalleryFormComponent } from './galleries/gallery-form/gallery-form.component';
import { GalleryProfileComponent } from './galleries/gallery-profile/gallery-profile.component';
import { ManageArtistsComponent } from './artists/manage-artists/manage-artists.component';
import { ArtistProfileComponent } from './artists/artist-profile/artist-profile.component';

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
  { path: 'manage/artists', component: ManageArtistsComponent, canActivate: [registerGuard] },
  { path: 'manage/artists/new', component: ArtistFormComponent, canActivate: [registerGuard], },
  { path: 'manage/artists/:id/edit', component: ArtistFormComponent, canActivate: [registerGuard], },
  { path: 'artists/:id/profile', component: ArtistProfileComponent },
  { path: '**', redirectTo: 'home' } // catch-all
];

@NgModule( {
  imports: [RouterModule.forRoot( routes )],
  exports: [RouterModule]
} )
export class AppRoutingModule { }
