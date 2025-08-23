import { Component, EventEmitter, Output } from '@angular/core';
import { REGISTER_MUTATION } from '../../../graphql/mutations';
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
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
} )
export class RegisterUserComponent {

  @Output() openLoginModal = new EventEmitter<void>();
  registered = false;
  loading = false;
  successMessage = '';
  errorMessage = '';

  form = this.fb.group( {
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength( 6 )]],
    rol: ['USER', Validators.required], // valor por defecto
  } );

  constructor ( private fb: FormBuilder, private apollo: Apollo, private modalService: ModalService,
    private authService: AuthService, private router: Router
  ) { }

  get isAdmin (): boolean {
    const user = this.authService.getUser();
    return user?.rol === 'ADMIN';
  }

  goToProfile () {
    this.router.navigate( ['/profile'] );
  }

  onSubmit () {
    if ( this.form.invalid ) return;

    this.loading = true;
    this.errorMessage = '';

    this.apollo.mutate( {
      mutation: REGISTER_MUTATION,
      variables: { input: this.form.value }
    } ).subscribe( {
      next: () => {
        this.loading = false;
        this.registered = true;
        this.form.reset( { rol: 'USER' } );

        // Abrir modal después de 3 segundos
        if ( !this.isAdmin ) {
          setTimeout( () => this.modalService.openLogin(), 3000 );
        } else {
          this.router.navigate( ['/manage/users'] );
        }
      },
      error: ( err ) => {
        this.loading = false;
        this.errorMessage = err.message || 'Error al registrar ❌';
      }
    } );
  }

}
