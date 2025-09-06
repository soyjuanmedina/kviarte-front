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
import { Artist, ArtistService } from '../../core/services/artist.service';
import { CREATE_ARTWORK, GET_ARTWORK, UPDATE_ARTWORK } from '../../../graphql/artworks';
import { Exhibition } from '../../exhibitions/exhibition-card/exhibition-card.component';
import { ExhibitionService } from '../../core/services/exhibition.service';
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
    titulo: ['', Validators.required],
    descripcion: [''],
    estilo: [''],
    picture: [''],
    galeria_id: ['', Validators.required],
    artist_id: ['', Validators.required],
    exposicion_id: [''],
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

    this.exhibitionService.getExhibitions().subscribe( g => this.exhibitions = g );
    this.artistService.getArtists().subscribe( a => this.artists = a );
    this.galleryService.getGalleries().subscribe( g => this.galleries = g );

    // Limpiar exposición si no pertenece a la galería seleccionada
    this.form.get( 'galeria_id' )?.valueChanges.subscribe( () => {
      const exposicionControl = this.form.get( 'exposicion_id' );
      const exposicionId = exposicionControl?.value ? +exposicionControl.value : null; // convertimos a número
      if ( !this.filteredExhibitions.some( e => e.id_exposicion === exposicionId ) ) {
        exposicionControl?.setValue( null );
      }
    } );
  }

  loadArtwork ( id: number ) {
    this.apollo.watchQuery( {
      query: GET_ARTWORK,
      variables: { id }
    } ).valueChanges.subscribe( {
      next: ( result: any ) => {
        const artwork = result?.data?.obra;
        if ( artwork ) {
          this.form.patchValue( {
            titulo: artwork.title,
            descripcion: artwork.description,
            picture: artwork.picture,
            artist_id: artwork.artist?.id ?? null,
            exposicion_id: artwork.exhibition?.id_exposicion ?? null,
            galeria_id: artwork.gallery?.id_galeria ?? null // ✅ corregido
          } );
        }
      },
      error: ( err ) => {
        console.error( 'Error cargando obra', err );
        this.errorMessage = 'No se pudo cargar la obra ❌';
      }
    } );
  }

  get filteredExhibitions () {
    const galleryIdStr = this.form.get( 'galeria_id' )?.value;
    if ( !galleryIdStr ) return [];
    const galleryId = +galleryIdStr;
    return this.exhibitions.filter( expo => expo.galeria?.id_galeria === galleryId );
  }

  onSubmit () {
    if ( this.form.invalid ) return;

    this.loading = true;
    this.errorMessage = '';

    const input = {
      titulo: this.form.value.titulo,
      descripcion: this.form.value.descripcion ?? null,
      estilo: this.form.value.estilo ?? null,
      picture: this.form.value.picture ?? null,
      id: +this.form.value.artist_id!,
      id_exposicion: this.form.value.exposicion_id ? +this.form.value.exposicion_id : null,
      id_galeria: +this.form.value.galeria_id! // ✅ agregamos galería al input
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
