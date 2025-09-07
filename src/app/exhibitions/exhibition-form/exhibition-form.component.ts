import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SuccessDialog } from '../../shared/components/success-dialog/success-dialog.component'
import { Gallery, GalleryService } from '../../core/services/gallery.service';
import { CREATE_EXHIBITION, GET_EXHIBITION, UPDATE_EXHIBITION } from '../../../graphql/exhibitions';
import { Artist, ArtistService } from '../../core/services/artist.service';

@Component( {
  selector: 'app-exhibition-form',
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
  templateUrl: './exhibition-form.component.html',
  styleUrls: ['./exhibition-form.component.scss']
} )
export class ExhibitionFormComponent implements OnInit {

  registered = false;
  loading = false;
  errorMessage = '';
  isEdit = false;
  exhibitionId?: number;
  galleries: Gallery[] = [];
  artists: Artist[] = [];

  form = this.fb.group( {
    title: ['', Validators.required],
    description: [''],
    picture: [''],
    gallery_id: ['', Validators.required],
    artist_id: ['', Validators.required],
  } );

  constructor (
    private fb: FormBuilder,
    private apollo: Apollo,
    private galleryService: GalleryService,
    private artistService: ArtistService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit () {
    const id = this.route.snapshot.paramMap.get( 'id' );
    if ( id ) {
      this.isEdit = true;
      this.exhibitionId = +id;
      this.loadExhibition( this.exhibitionId );
    }

    this.galleryService.getGalleries().subscribe( g => ( this.galleries = g ) );
    this.artistService.getArtists().subscribe( a => ( this.artists = a ) );
  }

  loadExhibition ( id: number ) {
    this.apollo.watchQuery( {
      query: GET_EXHIBITION,
      variables: { id }
    } ).valueChanges.subscribe( {
      next: ( result: any ) => {
        const exhibition = result?.data?.exhibition;
        if ( exhibition ) {
          this.form.patchValue( {
            title: exhibition.title,
            description: exhibition.description,
            picture: exhibition.picture,
            gallery_id: exhibition.gallery?.id ?? null, // asigna el ID correcto
            artist_id: exhibition.artist?.id ?? null     // asigna el ID correcto
          } );
        }
      },
      error: ( err ) => {
        console.error( 'Error cargando exposición', err );
        this.errorMessage = 'No se pudo cargar la exposición ❌';
      }
    } );
  }


  onSubmit () {
    if ( this.form.invalid ) return;

    this.loading = true;
    this.errorMessage = '';

    // Construimos el input que espera GraphQL
    const dataInput = {
      title: this.form.value.title,
      description: this.form.value.description ?? null,
      picture: this.form.value.picture ?? null,
      gallery_id: +this.form.value.gallery_id!,
      artist_id: +this.form.value.artist_id!,
    };

    // Variables para la mutation
    const variables: any = this.isEdit
      ? { id: this.exhibitionId, data: dataInput }
      : { data: dataInput };

    // Elegimos la mutation correcta
    const mutation = this.isEdit ? UPDATE_EXHIBITION : CREATE_EXHIBITION;

    this.apollo.mutate( {
      mutation,
      variables,
      refetchQueries: this.isEdit && this.exhibitionId
        ? [{ query: GET_EXHIBITION, variables: { id: this.exhibitionId } }]
        : []
    } ).subscribe( {
      next: () => {
        this.loading = false;
        this.openSuccessDialog(
          this.isEdit
            ? 'Exposición actualizada correctamente<br><small>Volviendo al listado...</small>'
            : 'Exposición creada correctamente<br><small>Volviendo al listado...</small>'
        );
        setTimeout( () => {
          this.dialog.closeAll();
          this.router.navigate( ['/manage/exhibitions'] );
        }, 3000 );
      },
      error: ( err ) => {
        this.loading = false;
        console.error( 'Error en mutation:', err );
        this.errorMessage = err.message || 'Error al guardar la exposición ❌';
      }
    } );
  }


  goToList () {
    this.router.navigate( ['/manage/exhibitions'] );
  }

  private openSuccessDialog ( message: string ) {
    this.dialog.open( SuccessDialog, { data: { message } } );
  }
}
