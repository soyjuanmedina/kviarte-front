import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CREATE_ARTIST_MUTATION, UPDATE_ARTIST_MUTATION, GET_ARTIST_BY_ID_QUERY } from '../../../graphql/mutations';
import { ModalService } from '../../core/services/modal.service';
import { AuthService } from '../../core/services/auth.service';
import { Gallery, GalleryService } from '../../core/services/gallery.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialog } from '../../shared/components/success-dialog/success-dialog.component';

@Component( {
  selector: 'app-artist-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule],
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.scss']
} )
export class ArtistFormComponent implements OnInit {

  @Output() openLoginModal = new EventEmitter<void>();
  registered = false;
  loading = false;
  errorMessage = '';
  galeries: Gallery[] = [];
  isEdit = false;
  artistId?: number;

  form = this.fb.group( {
    nombre: ['', Validators.required],
    biografia: [''],
    estilo: [''],
    id_galeria: [null]
  } );

  constructor (
    private fb: FormBuilder,
    private apollo: Apollo,
    private dialog: MatDialog,
    private authService: AuthService,
    private galleryService: GalleryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  get isAdmin (): boolean {
    const user = this.authService.getUser();
    return user?.rol === 'ADMIN';
  }

  ngOnInit () {
    // Cargar galerías si es admin
    if ( this.isAdmin ) {
      this.galleryService.getGalleries().subscribe( {
        next: ( galeries ) => this.galeries = galeries,
        error: ( err ) => this.errorMessage = 'No se pudieron cargar las galerías ❌'
      } );
    }

    // Revisar si es edición
    const idParam = this.route.snapshot.paramMap.get( 'id' );
    if ( idParam ) {
      this.isEdit = true;
      this.artistId = +idParam;
      this.loadArtist( this.artistId );
    }
  }

  private loadArtist ( id: number ) {
    this.apollo.watchQuery( {
      query: GET_ARTIST_BY_ID_QUERY,
      variables: { id }
    } ).valueChanges.subscribe( {
      next: ( result: any ) => {
        const artist = result?.data?.artista;
        if ( artist ) {
          this.form.patchValue( {
            nombre: artist.nombre,
            biografia: artist.biografia,
            estilo: artist.estilo,
            id_galeria: artist.galeria?.id_galeria ?? null
          } );
        }
      },
      error: ( err ) => this.errorMessage = 'No se pudo cargar el artista ❌'
    } );
  }

  onSubmit () {
    if ( this.form.invalid ) return;

    this.loading = true;
    this.errorMessage = '';

    let variables;
    if ( this.isEdit ) {
      // Para editar, separa id_galeria fuera de data
      const { nombre, biografia, estilo, id_galeria } = this.form.value;
      variables = {
        id: this.artistId,          // Float o number
        data: { nombre, biografia, estilo },
        id_galeria: id_galeria || null
      };
    } else {
      // Para crear, pasa directamente todo el form
      variables = { ...this.form.value };
    }

    const mutation = this.isEdit ? UPDATE_ARTIST_MUTATION : CREATE_ARTIST_MUTATION;

    this.apollo.mutate( { mutation, variables } ).subscribe( {
      next: () => {
        this.loading = false;
        if ( this.isEdit ) {
          this.openSuccessDialog( 'Artista actualizado con éxito' );
        } else {
          this.registered = true;
          this.form.reset();
        }
      },
      error: ( err ) => {
        this.loading = false;
        this.errorMessage = err.message || 'Error al guardar el artista ❌';
      }
    } );
  }

  private openSuccessDialog ( message: string ) {
    const dialogRef = this.dialog.open( SuccessDialog, {
      data: { message }
    } );

    dialogRef.afterClosed().subscribe( () => {
      console.log( 'Modal cerrado' );
    } );
  }

  goToProfile () {
    this.router.navigate( ['/profile'] );
  }
}
