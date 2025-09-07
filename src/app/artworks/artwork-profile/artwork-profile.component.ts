// src/app/artworks/artwork-profile/artwork-profile.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_ARTWORK } from '../../../graphql/artworks';
import { Artwork } from '../../core/services/artwork.service';

@Component( {
  selector: 'app-artwork-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  templateUrl: './artwork-profile.component.html',
  styleUrls: ['./artwork-profile.component.scss']
} )
export class ArtworkProfileComponent implements OnInit {

  artwork?: Artwork;
  loading = true;
  error?: string;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private apollo: Apollo
  ) { }

  ngOnInit (): void {
    const idParam = this.route.snapshot.paramMap.get( 'id' );
    if ( !idParam ) {
      this.router.navigate( ['/home'] );
      return;
    }

    const id = +idParam;
    this.loading = true;

    this.apollo.watchQuery( {
      query: GET_ARTWORK,
      variables: { id }
    } ).valueChanges.subscribe( {
      next: ( result: any ) => {
        this.artwork = result?.data?.artwork;
        this.loading = false;
      },
      error: ( err ) => {
        console.error( err );
        this.error = 'No se pudo cargar la obra';
        this.loading = false;
      }
    } );

  }
}
