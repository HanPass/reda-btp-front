export interface Option { code: string; libelle: string }
export interface Question { code: string; libelle: string; options: Option[] }
export interface Materiau { code: string; nom: string; description: string; usages: string; entretien: string; resistance: string; difficultePose: string; niveauPrix: string; avantages: string[]; inconvenients: string[] }
export interface Ressource { nom: string; fonction: string }
export interface Etape { code: string; ordre: number; titre: string; objectif: string; description: string; dureeIndicative: string; tempsAttente: string; importance: string; produits: Ressource[]; outils: string[]; controles: string[]; erreursFrequentes: string[] }
export interface Guide { code: string; titre: string; introduction: string; avertissement: string; questions: Question[]; materiaux: Materiau[]; etapes: Etape[]; questionsArtisan: string[]; glossaire: Record<string,string> }
export interface GuidePersonnalise { resume: string; recommandations: string[]; etapes: Etape[]; questionsArtisan: string[]; glossaire: Record<string,string> }
export interface SurfaceResult { surfaceBrute: number; deductions: number; surfaceNette: number; marge: number; total: number }
export interface SurfaceRequest { longueur: number; largeur: number; hauteur: number; inclureSol: boolean; inclureMurs: boolean; margePourcent: number; ouvertures: {largeur:number; hauteur:number; quantite:number}[] }
