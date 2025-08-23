import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- necesario para ngFor, ngIf
import { GalleryCardComponent } from '../shared/components/gallery-card/gallery-card.component';
import { AuthService, User } from '../core/services/auth.service';

@Component( {
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GalleryCardComponent], // <-- incluir CommonModule
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
} )
export class HomeComponent {
  galleryItems = [
    { title: 'Card 1', description: 'Descripción 1', image: 'https://via.placeholder.com/150' },
    { title: 'Card 2', description: 'Descripción 2', image: 'https://via.placeholder.com/150' },
    { title: 'Card 3', description: 'Descripción 3', image: 'https://via.placeholder.com/150' },
  ];

  user: User | null = null;

  constructor ( private authService: AuthService ) { }

  ngOnInit (): void {
    this.authService.currentUser$.subscribe( user => {
      this.user = user;
    } );
  }
}
