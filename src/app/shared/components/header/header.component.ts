import { Component } from '@angular/core';
import { LOGIN_MUTATION } from '../../../../graphql/mutations';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

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

  constructor ( private apollo: Apollo, private router: Router, private authService: AuthService ) { }

  openLoginModal () {
    this.loginModalOpen = true;
  }

  closeLoginModal () {
    this.loginModalOpen = false;
  }

  // Cierra al hacer click fuera del modal
  closeLoginModalOnOutside ( event: Event ) {
    const target = event.target as HTMLElement;
    if ( target.classList.contains( 'modal' ) ) {
      this.closeLoginModal();
    }
  }

  login () {
    console.log( 'this.email', this.email, this.password );
    this.apollo.mutate( {
      mutation: LOGIN_MUTATION,
      variables: { input: { email: this.email, password: this.password } }
    } ).subscribe( {
      next: ( res: any ) => {

        localStorage.setItem( 'token', res.data.login.token );
        localStorage.setItem( 'login', JSON.stringify( res.data.login ) );
        this.authService.setUser( res.data.login.user );
        this.closeLoginModal();
        this.router.navigate( ['/profile'] );
      },
      error: ( err ) => {
        console.error( 'Error login:', err );
        alert( 'Login fallido' );
      }
    } );
  }

  logout () {
    localStorage.removeItem( 'token' );
    this.token = null;
    this.router.navigate( ['/'] );
  }
}