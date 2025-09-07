// src/app/artworks/artwork-profile/artwork-profile.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_PROMOTION } from '../../../graphql/promotions';
import { Promotion } from '../../core/services/promotion.service';


@Component( {
  selector: 'app-promotion-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  templateUrl: './promotion-profile.component.html',
  styleUrls: ['./promotion-profile.component.scss']
} )
export class PromotionProfileComponent implements OnInit {

  promotion?: Promotion;
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
      query: GET_PROMOTION,
      variables: { id }
    } ).valueChanges.subscribe( {
      next: ( result: any ) => {
        this.promotion = result?.data?.promotion;
        this.loading = false;
        console.log( this.promotion );
      },
      error: ( err ) => {
        console.error( err );
        this.error = 'No se pudo cargar la promoción';
        this.loading = false;
      }
    } );

  }
}
