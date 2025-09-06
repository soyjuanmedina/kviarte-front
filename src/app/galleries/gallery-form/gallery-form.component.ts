import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CREATE_GALLERY, GET_GALLERY, UPDATE_GALLERY } from '../../../graphql/galleries';
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

  form = this.fb.group( {
    id: [null as number | null, Validators.required], // siempre el ID
    name: ['', Validators.required],
    email: ['', [Validators.email]],
    address: [''],
    city: [''],
    website: [''],
    description: [''],
    phone: [''],
    picture: [''],
    owner: ['']
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
    return user?.role === 'ADMIN';
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
        next: users => ( this.galleryUsers = users ),
        error: err => {
          console.error( 'Error cargando usuarios GALLERY', err );
          this.errorMessage = 'No se pudieron cargar los usuarios de galería ❌';
        }
      } );
    } else {
      const user = this.authService.getUser();
      if ( user ) {
        this.form.patchValue( { id: user.id } ); // solo el ID
      }
    }
  }

  loadGallery ( id: number ) {
    this.apollo.watchQuery( {
      query: GET_GALLERY,
      variables: { id }
    } ).valueChanges.subscribe( {
      next: ( result: any ) => {
        if ( result?.data?.gallery ) {
          const gallery = result.data.gallery;
          this.form.patchValue( {
            name: gallery.name,
            description: gallery.description,
            address: gallery.address,
            city: gallery.city,
            website: gallery.website,
            email: gallery.email,
            phone: gallery.phone,
            picture: gallery.picture,
            owner: gallery.owner?.id // solo el ID
          } );
        }
        if ( this.isEdit ) {
          this.form.get( 'usuario_id' )?.disable();
        }
      },
      error: err => {
        console.error( 'Error cargando galería', err );
        this.errorMessage = 'No se pudo cargar la galería ❌';
      }
    } );
  }

  onSubmit () {
    if ( this.form.invalid ) return;

    this.loading = true;
    this.errorMessage = '';

    const payload = {
      name: this.form.value.name,
      description: this.form.value.description ?? null,
      address: this.form.value.address ?? null,
      city: this.form.value.city ?? null,
      website: this.form.value.website ?? null,
      phone: this.form.value.phone ?? null,
      email: this.form.value.email ?? null,
      picture: this.form.value.picture ?? null,
      id: this.form.value.id // solo el ID, obligatorio
    };

    let variables: any;
    let mutation;

    if ( this.isEdit && this.galleryId ) {
      // UPDATE
      variables = { id: this.galleryId, data: payload };
      mutation = UPDATE_GALLERY;
    } else {
      // CREATE
      variables = { input: payload };
      mutation = CREATE_GALLERY;
    }

    this.apollo.mutate( {
      mutation,
      variables,
      refetchQueries: this.isEdit && this.galleryId
        ? [{ query: GET_GALLERY, variables: { id: this.galleryId } }]
        : []
    } ).subscribe( {
      next: () => {
        this.loading = false;
        this.openSuccessDialog(
          this.isEdit
            ? 'Galería actualizada correctamente<br><small>Volviendo al listado de galerías...</small>'
            : 'Galería creada correctamente<br><small>Volviendo al listado de galerías...</small>'
        );

        setTimeout( () => {
          this.dialog.closeAll();
          this.router.navigate( ['/manage/galleries'] );
        }, 3000 );
      },
      error: err => {
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

  private openSuccessDialog ( message: string ) {
    const dialogRef = this.dialog.open( SuccessDialog, {
      data: { message }
    } );

    dialogRef.afterClosed().subscribe( () => {
      console.log( 'Modal cerrado' );
    } );
  }
}
