import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { AuthService, User } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { UserItemComponent } from './user-item/user-item.component';
import { ModalService } from '../../core/services/modal.service';

@Component( {
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    UserItemComponent
  ],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
} )
export class ManageUsersComponent {
  users: User[] = [];
  errorMessage = '';
  filterText = '';

  constructor (
    private authService: AuthService,
    private usersService: UserService,
    private router: Router,
    private modalService: ModalService
  ) { }

  get isAdmin (): boolean {
    return this.authService.getUser()?.role === 'ADMIN';
  }

  ngOnInit () {
    if ( this.isAdmin ) {
      this.usersService.getUsers().subscribe( {
        next: users => ( this.users = users ),
        error: err => {
          console.error( 'Error cargando usuarios', err );
          this.errorMessage = 'No se pudieron cargar los usuarios ❌';
        }
      } );
    }
  }

  filteredUsers () {
    if ( !this.filterText.trim() ) return this.users;
    return this.users.filter( u =>
      u.name.toLowerCase().includes( this.filterText.toLowerCase() )
    );
  }

  viewProfile ( user: User ) {
    this.router.navigate( ['/profile', user.id] );
  }

  deleteUser ( user: User ) {
    this.modalService
      .openConfirm( {
        title: 'Eliminar Usuario',
        message: `¿Seguro que deseas eliminar a ${user.name}?`
      } )
      .subscribe( confirmed => {
        if ( !confirmed ) return;

        this.usersService.deleteUser( user.id ).subscribe( {
          next: () => {
            this.users = this.users.filter( u => u.id !== user.id );
          },
          error: err => {
            console.error( 'Error eliminando usuario', err );
            this.errorMessage = 'No se pudo eliminar el usuario ❌';
          }
        } );
      } );
  }

  addUser () {
    this.router.navigate( ['register/user'] );
  }
}
