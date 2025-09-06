import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- necesario para ngFor, ngIf
import { GalleryCardComponent } from '../galleries/gallery-card/gallery-card.component';
import { AuthService, User } from '../core/services/auth.service';
import { Apollo } from 'apollo-angular';
import { GET_GALLERIES } from '../../graphql/galleries';

@Component( {
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GalleryCardComponent], // <-- incluir CommonModule
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
} )
export class HomeComponent {

  user: User | null = null;
  galleries: any[] = [];
  loading = false;
  error: string | null = null;


  constructor ( private authService: AuthService, private apollo: Apollo ) { }

  fetchGalleries () {
    this.loading = true;
    this.apollo.watchQuery( { query: GET_GALLERIES } )
      .valueChanges
      .subscribe( {
        next: ( result: any ) => {
          this.galleries = result?.data?.galleries ?? [];
          this.loading = false;
        },
        error: ( err ) => {
          console.error( err );
          this.error = 'Error al cargar galerías';
          this.loading = false;
        }
      } );
  }

  ngOnInit (): void {
    this.fetchGalleries();
    this.authService.currentUser$.subscribe( user => {
      this.user = user;
    } );
  }
}
