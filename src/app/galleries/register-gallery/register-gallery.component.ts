import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CREATE_GALLERY_MUTATION } from '../../../graphql/mutations';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../core/services/modal.service';
import { AuthService, User } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component( {
  selector: 'app-register-gallery',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule],
  templateUrl: './register-gallery.component.html',
  styleUrl: './register-gallery.component.scss'
} )
export class RegisterGalleryComponent implements OnInit {

  @Output() openLoginModal = new EventEmitter<void>();
  registered = false;
  loading = false;
  successMessage = '';
  errorMessage = '';
  galleryUsers: User[] = [];

  form = this.fb.group( {
    usuarioId: ['', Validators.required], // admin elige propietario
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    direccion: ['', Validators.required],
    ciudad: ['', Validators.required],
    web: [''],
    email_contacto: ['', [Validators.required, Validators.email]],
    telefono: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  } );

  constructor ( private fb: FormBuilder, private apollo: Apollo, private modalService: ModalService,
    private authService: AuthService, private usersService: UserService, private router: Router
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
      mutation: CREATE_GALLERY_MUTATION,
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

  ngOnInit () {
    if ( this.isAdmin ) {
      this.usersService.getUsuariosPorRol( 'GALLERY' ).subscribe( {
        next: ( users ) => {
          this.galleryUsers = users;
        },
        error: ( err ) => {
          console.error( 'Error cargando usuarios GALLERY', err );
          this.errorMessage = 'No se pudieron cargar los usuarios de galería ❌';
        }
      } );
    }
  }

}
