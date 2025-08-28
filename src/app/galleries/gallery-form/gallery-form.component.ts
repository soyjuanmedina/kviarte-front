import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CREATE_GALLERY_MUTATION, GET_GALLERY_BY_ID_QUERY, UPDATE_GALLERY_MUTATION } from '../../../graphql/mutations';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SuccessDialog } from '../../shared/components/success-dialog/success-dialog.component';

@Component( {
  selector: 'app-gallery-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
  templateUrl: './gallery-form.component.html',
  styleUrls: ['./gallery-form.component.scss']
} )
export class GalleryFormComponent implements OnInit {

  @Output() openLoginModal = new EventEmitter<void>();
  registered = false;
  loading = false;
  successMessage = '';
  errorMessage = '';
  galleryUsers: User[] = [];
  isEdit = false;
  galleryId?: number;
  originalUsuarioId?: number;

  form = this.fb.group( {
    usuario_id: ['', Validators.required],
    nombre: ['', Validators.required],
    email: ['', [Validators.email]],
    direccion: [''],
    ciudad: [''],
    web: [''],
    descripcion: [''],
    telefono: [''],
    picture: ['']
  } );

  constructor (
    private fb: FormBuilder,
    private apollo: Apollo,
    private authService: AuthService,
    private usersService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  get isAdmin (): boolean {
    const user = this.authService.getUser();
    return user?.rol === 'ADMIN';
  }

  loadGallery ( id: number ) {
    this.apollo.watchQuery( {
      query: GET_GALLERY_BY_ID_QUERY,
      variables: { id }
    } ).valueChanges.subscribe( {
      next: ( result: any ) => {
        if ( result?.data?.galeria ) {
          this.form.patchValue( result.data.galeria );
          this.originalUsuarioId = result.data.galeria.usuario_id;
        }
        if ( this.isEdit ) {
          this.form.get( 'usuario_id' )?.disable();
        }
      },
      error: ( err ) => {
        console.error( 'Error cargando galería', err );
        this.errorMessage = 'No se pudo cargar la galería ❌';
      }
    } );
  }

  onSubmit () {
    if ( this.form.invalid ) return;

    this.loading = true;
    this.errorMessage = '';

    const variables: any = {
      usuario_id: this.isEdit
        ? this.originalUsuarioId
        : +( this.form.value.usuario_id ?? 0 ),
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion ?? null,
      direccion: this.form.value.direccion ?? null,
      ciudad: this.form.value.ciudad ?? null,
      web: this.form.value.web ?? null,
      telefono: this.form.value.telefono ?? null,
      email: this.form.value.email ?? null,
    };

    if ( this.isEdit && this.galleryId ) {
      variables.id = this.galleryId;
    }

    const mutation = this.isEdit ? UPDATE_GALLERY_MUTATION : CREATE_GALLERY_MUTATION;

    this.apollo.mutate( {
      mutation,
      variables,
      refetchQueries: this.isEdit && this.galleryId
        ? [{ query: GET_GALLERY_BY_ID_QUERY, variables: { id: this.galleryId } }]
        : []
    } ).subscribe( {
      next: () => {
        this.loading = false;

        if ( this.isEdit ) {
          this.openSuccessDialog(
            'Galería actualizada correctamente<br><small>Volviendo al listado de galerías...</small>'
          );
        } else {
          this.openSuccessDialog(
            'Galería creada correctamente<br><small>Volviendo al listado de galerías...</small>'
          );
        }

        setTimeout( () => {
          this.dialog.closeAll();
          this.router.navigate( ['/manage/galleries'] );
        }, 3000 );
      },
      error: ( err ) => {
        this.loading = false;
        console.error( 'Error en mutation:', err );
        this.errorMessage = err.message || 'Error al guardar la galería ❌';
      }
    } );
  }

  cancel () {
    this.router.navigate( ['/manage/galleries'] );
  }

  goToProfile () {
    this.router.navigate( ['/profile'] );
  }

  ngOnInit () {
    const id = this.route.snapshot.paramMap.get( 'id' );
    if ( id ) {
      this.isEdit = true;
      this.galleryId = +id;
      this.loadGallery( this.galleryId );
    }

    if ( this.isAdmin ) {
      this.usersService.getUsuariosPorRol( 'GALLERY' ).subscribe( {
        next: ( users ) => ( this.galleryUsers = users ),
        error: ( err ) => {
          console.error( 'Error cargando usuarios GALLERY', err );
          this.errorMessage = 'No se pudieron cargar los usuarios de galería ❌';
        }
      } );
    }
  }

  private openSuccessDialog ( message: string ) {
    const dialogRef = this.dialog.open( SuccessDialog, {
      data: { message }
    } );

    dialogRef.afterClosed().subscribe( () => {
      console.log( 'Modal cerrado' );
    } );
  }

}
