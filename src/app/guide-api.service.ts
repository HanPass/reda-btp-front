import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guide, GuidePersonnalise, SurfaceResult } from './models';

@Injectable({providedIn: 'root'})
export class GuideApiService {
  private readonly api = 'http://localhost:8080/api';
  constructor(private readonly http: HttpClient) {}
  getGuide(): Observable<Guide> { return this.http.get<Guide>(`${this.api}/guides/salle-de-bain/carrelage`); }
  personnaliser(reponses: Record<string,string>): Observable<GuidePersonnalise> {
    return this.http.post<GuidePersonnalise>(`${this.api}/guides/salle-de-bain-carrelage/personnalisation`, {reponses});
  }
  calculerSurface(payload: object): Observable<SurfaceResult> { return this.http.post<SurfaceResult>(`${this.api}/calculateurs/surface-carrelage`, payload); }
}
