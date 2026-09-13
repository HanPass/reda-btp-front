import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { GuideDataService } from './guide-data.service';

describe('GuideDataService',()=>{
  let service:GuideDataService;
  beforeEach(()=>{TestBed.configureTestingModule({});service=TestBed.inject(GuideDataService);});

  it('propose plusieurs travaux par pièce',()=>{
    expect(service.worksFor('salle-de-bain').map(w=>w.code)).toContain('plomberie');
    expect(service.worksFor('piece-de-vie').map(w=>w.code)).toContain('peinture');
  });

  it('adapte réellement le guide au pays',async()=>{
    const france=await firstValueFrom(service.getGuide('FR','terrasse','etancheite'));
    const maroc=await firstValueFrom(service.getGuide('MA','terrasse','etancheite'));
    expect(france.conseilsPays[0]).not.toEqual(maroc.conseilsPays[0]);
    expect(maroc.conseilsPays[0]).toContain('UV');
  });

  it('filtre les étapes conditionnelles',async()=>{
    const guide=await firstValueFrom(service.getGuide('FR','salle-de-bain','carrelage'));
    const result=await firstValueFrom(service.personnaliser(guide,{support:'bon',zone:'sol',depose:'non',eau:'non'}));
    expect(result.etapes.map(e=>e.code)).not.toContain('depose');
    expect(result.etapes.map(e=>e.code)).not.toContain('etancheite');
  });

  it('ne déduit pas une porte de la surface du sol',async()=>{
    const result=await firstValueFrom(service.calculerSurface({longueur:4,largeur:3,hauteur:2.5,inclureSol:true,inclureMurs:false,margePourcent:10,ouvertures:[{largeur:.8,hauteur:2,quantite:1}]}));
    expect(result.surfaceNette).toBe(12);
    expect(result.total).toBe(13.2);
  });
});
