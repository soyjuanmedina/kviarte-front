import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Gallery {
  id: number;
  name: string;
  city: string;
  description: string;
  imageUrl: string;
}

@Injectable( {
  providedIn: 'root'
} )
export class GalleryService {
  private apiUrl = 'https://tu-backend.com/api/galleries';

  constructor ( private http: HttpClient ) { }

  getGalleries (): Observable<Gallery[]> {
    return this.http.get<Gallery[]>( this.apiUrl );
  }

  getGallery ( id: number ): Observable<Gallery> {
    return this.http.get<Gallery>( `${this.apiUrl}/${id}` );
  }
}
