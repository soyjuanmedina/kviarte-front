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
import { SuccessDialog } from '../../shared/components/success-dialog/success-dialog.component';
import { Artist, ArtistService } from '../../core/services/artist.service';
import { CREATE_ARTWORK, GET_ARTWORK, UPDATE_ARTWORK } from '../../../graphql/artworks';
import { Exhibition, ExhibitionService } from '../../core/services/exhibition.service';
import { Gallery, GalleryService } from '../../core/services/gallery.service';

@Component( {
  selector: 'app-artwork-form',
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
  templateUrl: './artwork-form.component.html',
  styleUrls: ['./artwork-form.component.scss']
} )
export class ArtworkFormComponent implements OnInit {

  registered = false;
  loading = false;
  errorMessage = '';
  isEdit = false;
  artworkId?: number;
  exhibitions: Exhibition[] = [];
  artists: Artist[] = [];
  galleries: Gallery[] = [];

  form = this.fb.group( {
    title: ['', Validators.required],
    description: [''],
    style: [''],
    picture: [''],
    gallery_id: ['', Validators.required],
    artist_id: ['', Validators.required],
    exhibition_id: [''],
  } );

  constructor (
    private fb: FormBuilder,
    private apollo: Apollo,
    private exhibitionService: ExhibitionService,
    private artistService: ArtistService,
    private galleryService: GalleryService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit () {
    const id = this.route.snapshot.paramMap.get( 'id' );
    if ( id ) {
      this.isEdit = true;
      this.artworkId = +id;
      this.loadArtwork( this.artworkId );
    }

    // Cargar catálogos
    this.galleryService.getGalleries().subscribe( g => this.galleries = g );
    this.artistService.getArtists().subscribe( a => this.artists = a );
    this.exhibitionService.getExhibitions().subscribe( ex => this.exhibitions = ex );

    // Si cambia la galería seleccionada, limpiar artista y exposición
    this.form.get( 'gallery_id' )?.valueChanges.subscribe( () => {
      this.form.get( 'artist_id' )?.setValue( null );
      this.form.get( 'exhibition_id' )?.setValue( null );
    } );
  }

  loadArtwork ( id: number ) {
    this.apollo.watchQuery( {
      query: GET_ARTWORK,
      variables: { id }
    } ).valueChanges.subscribe( {
      next: ( result: any ) => {
        const artwork = result?.data?.artwork;
        if ( artwork ) {
          this.form.patchValue( {
            title: artwork.title,
            description: artwork.description,
            style: artwork.style,
            picture: artwork.picture,
            artist_id: artwork.artist?.id ?? null,
            gallery_id: artwork.gallery?.id ?? null,
            exhibition_id: artwork.exhibition?.id ?? null
          } );
        }
      },
      error: ( err ) => {
        console.error( 'Error cargando obra', err );
        this.errorMessage = 'No se pudo cargar la obra ❌';
      }
    } );
  }

  // 🔹 Filtrar exposiciones por galería
  get filteredExhibitions () {
    const galleryIdStr = this.form.get( 'gallery_id' )?.value;
    if ( !galleryIdStr ) return [];
    const galleryId = +galleryIdStr;
    return this.exhibitions.filter( expo => expo.gallery?.id === galleryId );
  }

  // 🔹 Filtrar artistas por galería
  get filteredArtists () {
    const galleryIdStr = this.form.get( 'gallery_id' )?.value;
    if ( !galleryIdStr ) return [];
    const galleryId = +galleryIdStr;
    return this.artists.filter( artist => artist.gallery?.id === galleryId );
  }

  onSubmit () {
    if ( this.form.invalid ) return;

    this.loading = true;
    this.errorMessage = '';

    const input = {
      title: this.form.value.title,
      description: this.form.value.description ?? null,
      style: this.form.value.style ?? null,
      picture: this.form.value.picture ?? null,
      artist_id: +this.form.value.artist_id!,
      exhibition_id: this.form.value.exhibition_id ? +this.form.value.exhibition_id : null,
      gallery_id: +this.form.value.gallery_id!
    };

    const mutation = this.isEdit ? UPDATE_ARTWORK : CREATE_ARTWORK;
    const variables: any = this.isEdit
      ? { id: this.artworkId, input }
      : { input };

    this.apollo.mutate( {
      mutation,
      variables,
      refetchQueries: this.isEdit && this.artworkId
        ? [{ query: GET_ARTWORK, variables: { id: this.artworkId } }]
        : []
    } ).subscribe( {
      next: () => {
        this.loading = false;
        this.openSuccessDialog(
          this.isEdit
            ? 'Obra actualizada correctamente<br><small>Volviendo al listado...</small>'
            : 'Obra creada correctamente<br><small>Volviendo al listado...</small>'
        );
        setTimeout( () => {
          this.dialog.closeAll();
          this.router.navigate( ['/manage/artworks'] );
        }, 3000 );
      },
      error: ( err ) => {
        this.loading = false;
        console.error( 'Error en mutation:', err );
        this.errorMessage = err.message || 'Error al guardar la obra ❌';
      }
    } );
  }

  goToList () {
    this.router.navigate( ['/manage/artworks'] );
  }

  private openSuccessDialog ( message: string ) {
    this.dialog.open( SuccessDialog, { data: { message } } );
  }
}
