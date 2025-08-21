import { Component } from '@angular/core';

@Component( {
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
} )
export class HeaderComponent {
  menuOpen = false;
  loginModalOpen = false;

  openLoginModal () {
    this.loginModalOpen = true;
  }

  closeLoginModal () {
    this.loginModalOpen = false;
  }
}
