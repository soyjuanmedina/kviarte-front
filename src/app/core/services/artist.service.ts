import { Injectable } from '@angular/core';

export interface Artist {
  id_artist: number;
  nombre: string;
}

@Injectable( {
  providedIn: 'root'
} )
export class ArtistService {

  constructor () { }
}
