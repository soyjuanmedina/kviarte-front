import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Exhibition } from '../exhibition-card/exhibition-card.component';
import { ExhibitionService } from '../../core/services/exhibition.service';

@Component( {
  selector: 'app-exhibition-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule, MatProgressSpinnerModule, RouterModule],
  templateUrl: './exhibition-profile.component.html',
  styleUrl: './exhibition-profile.component.scss'
} )
export class ExhibitionProfileComponent implements OnInit {
  exhibition: Exhibition = {
    id_exposicion: 0,
    titulo: '',
    obras: []
  };
  loading = true;
  error?: string;

  constructor ( private authService: AuthService, private router: Router,
    private activatedRoute: ActivatedRoute, private exhibitionService: ExhibitionService
  ) { }

  goToManageExhibitions () {
    this.router.navigate( ['/manage/exhibitions'] );
  }

  goToProfile () {
    this.router.navigate( ['/profile'] );
  }

  goToRegisterArtist () {
    this.router.navigate( ['/register/exhibition'] );
  }

  ngOnInit (): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get( 'id' );
    if ( !idParam ) {
      this.router.navigate( ['/home'] );
      return;
    }

    const id = +idParam;
    this.loading = true;

    this.exhibitionService.getExhibition( id ).subscribe( {
      next: ( exhibition ) => {
        this.exhibition = exhibition;
        this.loading = false;
      },
      error: ( err ) => {
        this.error = 'No se pudo cargar la exposición';
        this.loading = false;
      }
    } );
  }

}
