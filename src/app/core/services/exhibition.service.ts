import { Injectable } from '@angular/core';

export interface Exhibition {
  id_exhibition: number;
  titulo: string;
}

@Injectable( {
  providedIn: 'root'
} )
export class ExhibitionService {

  constructor () { }
}
