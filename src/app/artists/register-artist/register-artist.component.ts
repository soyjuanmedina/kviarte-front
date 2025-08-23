import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CREATE_ARTIST_MUTATION } from '../../../graphql/mutations';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { AuthService, User } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { Gallery } from '../../core/services/gallery.service';

@Component( {
  selector: 'app-register-artist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule],
  templateUrl: './register-artist.component.html',
  styleUrl: './register-artist.component.scss'
} )
export class RegisterArtistComponent {

  @Output() openLoginModal = new EventEmitter<void>();
  registered = false;
  loading = false;
  successMessage = '';
  errorMessage = '';
  galeries: Gallery[] = [];

  form = this.fb.group( {
    nombre: ['', Validators.required],
    biografia: [''],
    estilo: [''],
    id_galeria: [null]
  } );

  constructor ( private fb: FormBuilder, private apollo: Apollo, private modalService: ModalService,
    private authService: AuthService, private usersService: UsersService, private router: Router
  ) { }

  get isAdmin (): boolean {
    const user = this.authService.getUser();
    return user?.rol === 'ADMIN';
  }

  onSubmit () {
    if ( this.form.invalid ) return;

    this.loading = true;
    this.errorMessage = '';

    this.apollo.mutate( {
      mutation: CREATE_ARTIST_MUTATION,
      variables: { ...this.form.value }  // <-- pasa los valores directos
    } ).subscribe( {
      next: () => {
        this.loading = false;
        this.registered = true;
        this.form.reset();
      },
      error: ( err ) => {
        this.loading = false;
        this.errorMessage = err.message || 'Error al registrar ❌';
      }
    } );
  }

  goToProfile () {
    this.router.navigate( ['/profile'] );
  }


}
