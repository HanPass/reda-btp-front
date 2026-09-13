import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GuideDataService } from './guide-data.service';
import { CountryCode, Etape, Guide, GuidePersonnalise, SurfaceResult, WorkType } from './models';

@Component({selector:'app-root',standalone:true,imports:[CommonModule,FormsModule,ReactiveFormsModule],templateUrl:'./app.component.html',styleUrls:['./app.component.scss']})
export class AppComponent implements OnInit {
  readonly countries=this.data.countries();
  readonly pieces=this.data.pieces();
  country:CountryCode=(localStorage.getItem('btp.country') as CountryCode)||'FR';
  pieceCode='salle-de-bain';
  workCode='carrelage';
  guide?:Guide;
  personnalise?:GuidePersonnalise;
  answers:Record<string,string>={};
  finished=new Set<string>();
  surfaceResult?:SurfaceResult;
  readonly surfaceForm=this.fb.nonNullable.group({longueur:[3,[Validators.required,Validators.min(.01)]],largeur:[2,[Validators.required,Validators.min(.01)]],hauteur:[2.5,[Validators.required,Validators.min(.01)]],inclureSol:[true],inclureMurs:[true],margePourcent:[10,[Validators.required,Validators.min(0),Validators.max(50)]],porteLargeur:[.8,[Validators.min(0)]],porteHauteur:[2,[Validators.min(0)]]});

  constructor(private readonly data:GuideDataService,private readonly fb:FormBuilder){}
  ngOnInit():void{this.loadGuide();}
  works():WorkType[]{return this.data.worksFor(this.pieceCode);}
  selectCountry(country:CountryCode):void{this.country=country;localStorage.setItem('btp.country',country);this.loadGuide();}
  selectPiece(code:string):void{this.pieceCode=code;this.workCode=this.works()[0].code;this.loadGuide();}
  selectWork(code:string):void{this.workCode=code;this.loadGuide();}
  loadGuide():void{this.data.getGuide(this.country,this.pieceCode,this.workCode).subscribe(guide=>{this.guide=guide;this.answers=Object.fromEntries(guide.questions.map(q=>[q.code,q.options.find(o=>o.code==='inconnu')?.code??q.options[0].code]));this.personnalise=undefined;this.surfaceResult=undefined;this.restoreProgress();});}
  generate():void{if(!this.guide)return;this.data.personnaliser(this.guide,this.answers).subscribe(result=>{this.personnalise=result;setTimeout(()=>document.getElementById('timeline')?.scrollIntoView({behavior:'smooth'}));});}
  steps():Etape[]{return this.personnalise?.etapes??this.guide?.etapes??[];}
  toggle(code:string):void{this.finished.has(code)?this.finished.delete(code):this.finished.add(code);localStorage.setItem(this.progressKey(),JSON.stringify([...this.finished]));}
  progress():number{const steps=this.steps();return steps.length?Math.round(steps.filter(s=>this.finished.has(s.code)).length*100/steps.length):0;}
  calculate():void{if(this.surfaceForm.invalid)return;const v=this.surfaceForm.getRawValue();this.data.calculerSurface({longueur:v.longueur,largeur:v.largeur,hauteur:v.hauteur,inclureSol:v.inclureSol,inclureMurs:v.inclureMurs,margePourcent:v.margePourcent,ouvertures:[{largeur:v.porteLargeur,hauteur:v.porteHauteur,quantite:1}]}).subscribe(r=>this.surfaceResult=r);}
  showCalculator():boolean{return ['carrelage','revetement-sol','peinture'].includes(this.workCode);}
  glossaryEntries():[string,string][]{return Object.entries(this.guide?.glossaire??{});}
  countryName():string{return this.countries.find(c=>c.code===this.country)?.nom??'';}
  private progressKey():string{return `btp.progress.${this.country}.${this.pieceCode}.${this.workCode}`;}
  private restoreProgress():void{try{this.finished=new Set(JSON.parse(localStorage.getItem(this.progressKey())??'[]'));}catch{this.finished=new Set();}}
}
