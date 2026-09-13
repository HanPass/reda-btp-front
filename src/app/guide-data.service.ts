import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { COUNTRIES, createGuide, PIECES, WORKS } from './guide-data';
import { CountryCode, CountryProfile, Guide, GuidePersonnalise, Piece, SurfaceRequest, SurfaceResult, WorkType } from './models';

@Injectable({providedIn:'root'})
export class GuideDataService {
  countries():CountryProfile[]{return COUNTRIES;}
  pieces():Piece[]{return PIECES;}
  worksFor(pieceCode:string):WorkType[]{const codes=PIECES.find(p=>p.code===pieceCode)?.travaux??[];return WORKS.filter(w=>codes.includes(w.code));}
  getGuide(country:CountryCode,piece:string,work:string):Observable<Guide>{return of(createGuide(country,piece,work));}
  personnaliser(guide:Guide,reponses:Record<string,string>):Observable<GuidePersonnalise>{
    const etapes=guide.etapes.filter(e=>!e.visibleWhen||Object.entries(e.visibleWhen).every(([k,v])=>v.includes(reponses[k])));
    const recommandations=[guide.conseilsPays[0]];
    if(reponses['support']==='degrade')recommandations.push('Le support est dégradé : diagnostic et réparation sont prioritaires avant toute finition.');
    if(reponses['humidite']==='oui'||reponses['infiltration']==='oui')recommandations.push('L’humidité visible doit être diagnostiquée à sa source avant de recouvrir.');
    if(reponses['zoneHumide']==='oui'||reponses['eau']==='oui')recommandations.push('L’exposition à l’eau impose de valider protections et compatibilités avant fermeture.');
    const pays=COUNTRIES.find(p=>p.code===guide.pays)?.nom;
    return of({resume:`${guide.titre} — ${pays}. ${etapes.length} étapes adaptées à vos réponses.`,recommandations,etapes,questionsArtisan:guide.questionsArtisan,glossaire:guide.glossaire});
  }
  calculerSurface(r:SurfaceRequest):Observable<SurfaceResult>{
    const brute=(r.inclureSol?r.longueur*r.largeur:0)+(r.inclureMurs?2*(r.longueur+r.largeur)*r.hauteur:0);
    const deductions=r.inclureMurs?r.ouvertures.reduce((t,o)=>t+o.largeur*o.hauteur*o.quantite,0):0;
    const nette=Math.max(0,brute-deductions),marge=nette*r.margePourcent/100,round=(v:number)=>Math.round(v*100)/100;
    return of({surfaceBrute:round(brute),deductions:round(deductions),surfaceNette:round(nette),marge:round(marge),total:round(nette+marge)});
  }
}
