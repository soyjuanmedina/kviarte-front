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
import { GalleriesComponent } from './galleries/galleries.component';
import { ArtistsComponent } from './artists/artists.component';
import { ExhibitionProfileComponent } from './exhibitions/exhibition-profile/exhibition-profile.component';
import { ManageExhibitionsComponent } from './exhibitions/manage-exhibitions/manage-exhibitions.component';
import { ExhibitionFormComponent } from './exhibitions/exhibition-form/exhibition-form.component';
import { ArtworksComponent } from './artworks/artworks.component';
import { ManageArtworksComponent } from './artworks/manage-artworks/manage-artworks.component';
import { ArtworkFormComponent } from './artworks/artwork-form/artwork-form.component';
import { ArtworkProfileComponent } from './artworks/artwork-profile/artwork-profile.component';
import { PromotionsComponent } from './promotions/promotions.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // '' redirige a 'home'
  { path: 'home', component: HomeComponent },         // ruta real para HomeComponent
  { path: 'profile', component: ProfileUserComponent },
  { path: 'profile/:id', component: ProfileUserComponent },
  { path: 'register/user', component: RegisterUserComponent },
  { path: 'manage/users', component: ManageUsersComponent, canActivate: [registerGuard], },
  { path: 'galleries', component: GalleriesComponent },
  { path: 'galleries/:id/profile', component: GalleryProfileComponent },
  { path: 'manage/galleries', component: ManageGalleriesComponent, canActivate: [registerGuard] },
  { path: 'manage/galleries/new', component: GalleryFormComponent, canActivate: [registerGuard] },
  { path: 'manage/galleries/:id/edit', component: GalleryFormComponent, canActivate: [registerGuard] },
  { path: 'artists', component: ArtistsComponent },
  { path: 'artists/:id/profile', component: ArtistProfileComponent },
  { path: 'manage/artists', component: ManageArtistsComponent, canActivate: [registerGuard] },
  { path: 'manage/artists/new', component: ArtistFormComponent, canActivate: [registerGuard], },
  { path: 'manage/artists/:id/edit', component: ArtistFormComponent, canActivate: [registerGuard], },
  { path: 'exhibitions', component: ExhibitionsComponent },
  { path: 'exhibitions/:id/profile', component: ExhibitionProfileComponent },
  { path: 'manage/exhibitions', component: ManageExhibitionsComponent, canActivate: [registerGuard] },
  { path: 'manage/exhibitions/new', component: ExhibitionFormComponent, canActivate: [registerGuard], },
  { path: 'manage/exhibitions/:id/edit', component: ExhibitionFormComponent, canActivate: [registerGuard], },
  { path: 'artworks', component: ArtworksComponent },
  { path: 'artworks/:id/profile', component: ArtworkProfileComponent },
  { path: 'manage/artworks', component: ManageArtworksComponent, canActivate: [registerGuard] },
  { path: 'manage/artworks/new', component: ArtworkFormComponent, canActivate: [registerGuard], },
  { path: 'manage/artworks/:id/edit', component: ArtworkFormComponent, canActivate: [registerGuard], },
  { path: 'promotions', component: PromotionsComponent },
  { path: '**', redirectTo: 'home' } // catch-all
];

@NgModule( {
  imports: [RouterModule.forRoot( routes )],
  exports: [RouterModule]
} )
export class AppRoutingModule { }
