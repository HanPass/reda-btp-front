import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GUIDE_DEMO } from './guide-data';
import { Guide, GuidePersonnalise, SurfaceRequest, SurfaceResult } from './models';

@Injectable({providedIn:'root'})
export class GuideDataService {
  getGuide(): Observable<Guide> { return of(GUIDE_DEMO); }

  personnaliser(reponses: Record<string,string>): Observable<GuidePersonnalise> {
    const etapes = GUIDE_DEMO.etapes
      .filter(etape => !['protection','depose','gravats'].includes(etape.code) || reponses['etatSupport'] === 'ancien-a-retirer')
      .filter(etape => !['etancheite','points-singuliers'].includes(etape.code) || reponses['douche'] === 'oui');
    const recommandations: string[] = [];
    if (['sol','les-deux'].includes(reponses['zone'] ?? '')) recommandations.push('Pour le sol, privilégiez un carrelage prévu pour cet usage et offrant une adhérence adaptée.');
    if (reponses['douche'] === 'oui') recommandations.push('Pour la douche, vérifiez la compatibilité du revêtement, de la colle et du système d’étanchéité.');
    if (recommandations.length === 0) recommandations.push('Vérifiez toujours la compatibilité indiquée sur la fiche technique du fabricant.');
    const zone = ({sol:'sol',mur:'murs','les-deux':'sol et murs'} as Record<string,string>)[reponses['zone']] ?? 'zone à confirmer';
    const support = ({'ancien-a-retirer':'ancien carrelage à retirer',neuf:'neuf',recouvrir:'ancien carrelage conservé'} as Record<string,string>)[reponses['etatSupport']] ?? 'à diagnostiquer';
    return of({resume:`Projet ${zone} — support ${support}.`, recommandations, etapes, questionsArtisan:GUIDE_DEMO.questionsArtisan, glossaire:GUIDE_DEMO.glossaire});
  }

  calculerSurface(r: SurfaceRequest): Observable<SurfaceResult> {
    const surfaceBrute = (r.inclureSol ? r.longueur*r.largeur : 0) + (r.inclureMurs ? 2*(r.longueur+r.largeur)*r.hauteur : 0);
    const deductions = r.ouvertures.reduce((total,o)=>total+o.largeur*o.hauteur*o.quantite,0);
    const surfaceNette = Math.max(0,surfaceBrute-deductions);
    const marge = surfaceNette*r.margePourcent/100;
    const round = (value:number):number => Math.round(value*100)/100;
    return of({surfaceBrute:round(surfaceBrute),deductions:round(deductions),surfaceNette:round(surfaceNette),marge:round(marge),total:round(surfaceNette+marge)});
  }
}
