import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GuideApiService } from './guide-api.service';
import { Etape, Guide, GuidePersonnalise, SurfaceResult } from './models';

@Component({selector:'app-root', standalone:true, imports:[CommonModule,ReactiveFormsModule], templateUrl:'./app.component.html', styleUrls:['./app.component.scss']})
export class AppComponent implements OnInit {
  guide?: Guide;
  personnalise?: GuidePersonnalise;
  loading = true;
  error = '';
  finished = new Set<string>(JSON.parse(localStorage.getItem('btp.finished') ?? '[]') as string[]);
  materialIndex = 0;
  surfaceResult?: SurfaceResult;

  readonly projectForm = this.fb.nonNullable.group({zone:['les-deux'], etatSupport:['inconnu'], douche:['inconnu']});
  readonly surfaceForm = this.fb.nonNullable.group({longueur:[3,[Validators.required,Validators.min(0.01)]], largeur:[2,[Validators.required,Validators.min(0.01)]], hauteur:[2.5,[Validators.required,Validators.min(0.01)]], inclureSol:[true], inclureMurs:[true], margePourcent:[10,[Validators.required,Validators.min(0),Validators.max(50)]], porteLargeur:[0.8,[Validators.min(0)]], porteHauteur:[2,[Validators.min(0)]]});

  constructor(private readonly api: GuideApiService, private readonly fb: FormBuilder) {}
  ngOnInit(): void { this.api.getGuide().subscribe({next:g=>{this.guide=g;this.loading=false;},error:()=>{this.error='Impossible de charger le guide. Vérifiez que le backend est démarré.';this.loading=false;}}); }
  generate(): void { this.api.personnaliser(this.projectForm.getRawValue()).subscribe({next:g=>{this.personnalise=g;setTimeout(()=>document.getElementById('timeline')?.scrollIntoView({behavior:'smooth'}));},error:()=>this.error='La personnalisation a échoué.'}); }
  steps(): Etape[] { return this.personnalise?.etapes ?? this.guide?.etapes ?? []; }
  toggle(code:string): void { this.finished.has(code)?this.finished.delete(code):this.finished.add(code); localStorage.setItem('btp.finished',JSON.stringify([...this.finished])); }
  progress(): number { const total=this.steps().length; return total?Math.round(this.steps().filter(s=>this.finished.has(s.code)).length*100/total):0; }
  calculate(): void { if(this.surfaceForm.invalid) return; const v=this.surfaceForm.getRawValue(); this.api.calculerSurface({longueur:v.longueur,largeur:v.largeur,hauteur:v.hauteur,inclureSol:v.inclureSol,inclureMurs:v.inclureMurs,margePourcent:v.margePourcent,ouvertures:[{largeur:v.porteLargeur,hauteur:v.porteHauteur,quantite:1}]}).subscribe(r=>this.surfaceResult=r); }
  glossaryEntries(): [string,string][] { return Object.entries(this.guide?.glossaire ?? {}); }
}
