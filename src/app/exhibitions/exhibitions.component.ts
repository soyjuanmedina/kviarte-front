import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ExhibitionCardComponent } from '../shared/components/exhibition-card/exhibition-card.component';
import { CommonModule } from '@angular/common';

const GET_EXPOSICIONES = gql`
  query {
    exposiciones {
      id_exposicion
      titulo
      descripcion
      galeria {
        id_galeria
        nombre
      }
      artista {
        id_artista
        nombre
      }
      obras {
        id_obra
        titulo
      }
    }
  }
`;

@Component( {
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.component.html',
  standalone: true,
  imports: [CommonModule, ExhibitionCardComponent],
  styleUrls: ['./exhibitions.component.scss']
} )
export class ExhibitionsComponent {
  exhibitionItems: any[] = [];

  constructor ( private apollo: Apollo ) { }

  ngOnInit () {
    this.apollo
      .watchQuery<any>( { query: GET_EXPOSICIONES } )
      .valueChanges
      .subscribe( result => {
        this.exhibitionItems = result.data?.exposiciones || [];
      } );
  }
}
