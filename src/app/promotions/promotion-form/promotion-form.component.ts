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
import { CREATE_PROMOTION, GET_PROMOTION, UPDATE_PROMOTION } from '../../../graphql/promotions';
import { Exhibition, ExhibitionService } from '../../core/services/exhibition.service';
import { Gallery, GalleryService } from '../../core/services/gallery.service';
import { Artwork, ArtworkService } from '../../core/services/artwork.service';

@Component( {
  selector: 'app-promotion-form',
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
  templateUrl: './promotion-form.component.html',
  styleUrls: ['./promotion-form.component.scss']
} )
export class PromotionFormComponent implements OnInit {

  registered = false;
  loading = false;
  errorMessage = '';
  isEdit = false;
  promotionId?: number;
  exhibitions: Exhibition[] = [];
  artists: Artist[] = [];
  galleries: Gallery[] = [];
  artworks: Artwork[] = [];

  form = this.fb.group( {
    code: ['', Validators.required], // código obligatorio
    discount: [null, [Validators.required, Validators.min( 0 ), Validators.max( 100 )]], // porcentaje 0-100
    description: [''],
    active: [true, Validators.required],
    startDate: [''], // puedes usar input type="date"
    endDate: [''],
    gallery_id: ['', Validators.required], // selección de galería obligatoria
    artworks: [[] as ( Artwork | number )[]],
  } );

  constructor (
    private fb: FormBuilder,
    private apollo: Apollo,
    private exhibitionService: ExhibitionService,
    private artistService: ArtistService,
    private galleryService: GalleryService,
    private artworkService: ArtworkService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit () {
    const id = this.route.snapshot.paramMap.get( 'id' );
    if ( id ) {
      this.isEdit = true;
      this.promotionId = +id;
      this.loadPromotion( this.promotionId );
    }

    this.exhibitionService.getExhibitions().subscribe( g => this.exhibitions = g );
    this.artistService.getArtists().subscribe( a => this.artists = a );
    this.galleryService.getGalleries().subscribe( g => this.galleries = g );
    this.artworkService.getArtworks().subscribe( a => this.artworks = a );

  }

  loadPromotion ( id: number ) {
    this.apollo.watchQuery( {
      query: GET_PROMOTION,
      variables: { id }
    } ).valueChanges.subscribe( {
      next: ( result: any ) => {
        const promotion = result?.data?.promotion;
        if ( promotion ) {
          this.form.patchValue( {
            code: promotion.code ?? '',
            discount: promotion.discount ?? null,
            description: promotion.description ?? '',
            active: promotion.active ?? true,
            startDate: promotion.startDate ? promotion.startDate.substring( 0, 10 ) : '',
            endDate: promotion.endDate ? promotion.endDate.substring( 0, 10 ) : '',
            gallery_id: promotion.gallery?.id ?? null,
            artworks: promotion.artworks?.map( ( a: Artwork ) => a.id ) ?? [],
          } );

        }
      },
      error: ( err ) => {
        console.error( 'Error cargando obra', err );
        this.errorMessage = 'No se pudo cargar la obra ❌';
      }
    } );
  }

  onSubmit () {
    if ( this.form.invalid ) return;

    this.loading = true;
    this.errorMessage = '';

    const input = {
      code: this.form.value.code ?? null,
      discount: +this.form.value.discount!,
      description: this.form.value.description ?? null,
      active: this.form.value.active,
      startDate: this.form.value.startDate ?? null,
      endDate: this.form.value.endDate ?? null,
      gallery_id: +this.form.value.gallery_id!,
      artworks: this.form.value.artworks?.map( ( a: Artwork | number ) => typeof a === 'number' ? a : a.id ) ?? [],
    };

    const mutation = this.isEdit ? UPDATE_PROMOTION : CREATE_PROMOTION;
    const variables: any = this.isEdit
      ? { id: this.promotionId, input }
      : { input };

    this.apollo.mutate( {
      mutation,
      variables,
      refetchQueries: this.isEdit && this.promotionId
        ? [{ query: GET_PROMOTION, variables: { id: this.promotionId } }]
        : []
    } ).subscribe( {
      next: () => {
        this.loading = false;
        this.openSuccessDialog(
          this.isEdit
            ? 'Promoción actualizada correctamente<br><small>Volviendo al listado...</small>'
            : 'Promoción creada correctamente<br><small>Volviendo al listado...</small>'
        );
        setTimeout( () => {
          this.dialog.closeAll();
          this.router.navigate( ['/manage/promotions'] );
        }, 3000 );
      },
      error: ( err ) => {
        this.loading = false;
        console.error( 'Error en mutation:', err );
        this.errorMessage = err.message || 'Error al guardar la promoción ❌';
      }
    } );
  }


  goToList () {
    this.router.navigate( ['/manage/promotions'] );
  }

  private openSuccessDialog ( message: string ) {
    this.dialog.open( SuccessDialog, { data: { message } } );
  }
}
