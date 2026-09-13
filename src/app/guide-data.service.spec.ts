import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { GuideDataService } from './guide-data.service';

describe('GuideDataService', () => {
  let service: GuideDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuideDataService);
  });

  it('retire les étapes de dépose pour un support neuf', async () => {
    const guide = await firstValueFrom(service.personnaliser({etatSupport:'neuf', douche:'non', zone:'sol'}));
    const codes = guide.etapes.map(etape => etape.code);
    expect(codes).not.toContain('depose');
    expect(codes).not.toContain('gravats');
    expect(codes).not.toContain('etancheite');
  });

  it('ajoute les étapes de dépose et étanchéité quand elles sont nécessaires', async () => {
    const guide = await firstValueFrom(service.personnaliser({etatSupport:'ancien-a-retirer', douche:'oui', zone:'les-deux'}));
    const codes = guide.etapes.map(etape => etape.code);
    expect(codes).toContain('depose');
    expect(codes).toContain('gravats');
    expect(codes).toContain('etancheite');
    expect(codes).toContain('points-singuliers');
  });

  it('calcule une surface avec sa marge', async () => {
    const result = await firstValueFrom(service.calculerSurface({longueur:4, largeur:3, hauteur:2.5, inclureSol:true, inclureMurs:false, margePourcent:10, ouvertures:[]}));
    expect(result.surfaceNette).toBe(12);
    expect(result.total).toBe(13.2);
  });
});
