import { Component } from '@angular/core';
import { LOGIN_USER } from '../../../../graphql/users';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ModalService } from '../../../core/services/modal.service';

@Component( {
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
} )
export class HeaderComponent {
  menuOpen = false;
  loginModalOpen = false;
  email = '';
  password = '';
  token = localStorage.getItem( 'token' );

  constructor ( private apollo: Apollo, private router: Router, private authService: AuthService, private modalService: ModalService ) {
    this.modalService.loginModal$.subscribe( open => this.loginModalOpen = open );
  }

  openLoginModal () {
    this.modalService.openLogin();
  }

  closeLoginModal () {
    this.modalService.closeLogin();
  }

  // Cierra al hacer click fuera del modal
  closeLoginModalOnOutside ( event: Event ) {
    const target = event.target as HTMLElement;
    if ( target.classList.contains( 'modal' ) ) {
      this.closeLoginModal();
    }
  }

  login () {
    this.apollo.mutate( {
      mutation: LOGIN_USER,
      variables: { input: { email: this.email, password: this.password } }
    } ).subscribe( {
      next: ( res: any ) => {

        localStorage.setItem( 'token', res.data.login.token );
        localStorage.setItem( 'login', JSON.stringify( res.data.login ) );
        this.token = res.data.login.token;
        this.authService.setUser( res.data.login.user );
        this.closeLoginModal();
        this.router.navigate( ['/home'] );
      },
      error: ( err ) => {
        console.error( 'Error login:', err );
        alert( 'Login fallido' );
      }
    } );
  }

  logout () {
    localStorage.removeItem( 'token' );
    this.authService.setUser( null );
    this.token = null;
    this.router.navigate( ['/'] );
  }
}