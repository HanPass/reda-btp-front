import { Etape, Guide, Materiau, Question } from './models';

const questions: Question[] = [
  {code:'zone', libelle:'Quelle zone souhaitez-vous carreler ?', options:[{code:'sol',libelle:'Sol'},{code:'mur',libelle:'Murs'},{code:'les-deux',libelle:'Sol et murs'},{code:'inconnu',libelle:'Je ne sais pas'}]},
  {code:'etatSupport', libelle:'Quel est l’état du support ?', options:[{code:'ancien-a-retirer',libelle:'Ancien carrelage à retirer'},{code:'neuf',libelle:'Support neuf'},{code:'recouvrir',libelle:'Pose sur carrelage existant'},{code:'inconnu',libelle:'Je ne sais pas'}]},
  {code:'douche', libelle:'Le projet comporte-t-il une douche ?', options:[{code:'oui',libelle:'Oui'},{code:'non',libelle:'Non'},{code:'inconnu',libelle:'Je ne sais pas'}]}
];

const materiaux: Materiau[] = [
  {code:'gres-cerame',nom:'Grès cérame',description:'Dense, résistant et polyvalent : le choix le plus courant en salle de bain.',usages:'Sol et mur selon modèle',entretien:'Facile',resistance:'Élevée',difficultePose:'Moyenne',niveauPrix:'€€',avantages:['Résistant','Grand choix de formats'],inconvenients:['Découpe parfois exigeante']},
  {code:'faience',nom:'Faïence',description:'Revêtement décoratif léger, principalement destiné aux murs.',usages:'Mur',entretien:'Facile',resistance:'Moyenne',difficultePose:'Moyenne',niveauPrix:'€€',avantages:['Très décorative','Facile à nettoyer'],inconvenients:['Généralement déconseillée au sol']},
  {code:'mosaique',nom:'Mosaïque',description:'Petits carreaux qui épousent les formes et facilitent les pentes de douche.',usages:'Mur et certains sols',entretien:'Joints exigeants',resistance:'Variable',difficultePose:'Élevée',niveauPrix:'€€€',avantages:['Suit les pentes','Décorative'],inconvenients:['Nombreux joints','Pose minutieuse']},
  {code:'pierre',nom:'Pierre naturelle',description:'Un matériau authentique dont la porosité et l’entretien varient selon la pierre.',usages:'Sol et mur sous conditions',entretien:'Spécifique',resistance:'Variable',difficultePose:'Élevée',niveauPrix:'€€€',avantages:['Aspect unique','Durable si adaptée'],inconvenients:['Traitement hydrofuge possible','Entretien spécifique']}
];

const definitions: Array<[string,string,string,string]> = [
  ['diagnostic','Diagnostic du support','Comprendre l’existant','L’artisan contrôle l’humidité, les fissures, la stabilité et la planéité du support.'],
  ['mesures','Mesure des surfaces','Évaluer le chantier','Les murs, le sol et les ouvertures sont mesurés précisément.'],
  ['choix','Choix du carrelage','Choisir un produit compatible','L’usage, le format, l’adhérence, l’entretien et le rendu sont validés.'],
  ['quantites','Calcul des quantités','Éviter manque et surplus','La surface nette est calculée avec une marge pour les découpes et la casse.'],
  ['protection','Protection du chantier','Préserver le logement','Les équipements conservés et les zones de circulation sont protégés.'],
  ['depose','Dépose de l’ancien carrelage','Retirer le revêtement existant','Le carrelage et l’ancienne colle sont retirés sans endommager les réseaux.'],
  ['gravats','Évacuation des gravats','Libérer la zone','Les déchets sont triés puis évacués conformément aux règles locales.'],
  ['inspection','Nettoyage et inspection','Révéler les défauts','Le support mis à nu est aspiré et contrôlé avant toute réparation.'],
  ['reparations','Réparation du support','Retrouver un support stable','Trous, fissures et parties non adhérentes sont traités.'],
  ['planeite','Ragréage ou dressage','Corriger la planéité','Le support est remis à niveau selon les tolérances du système de pose.'],
  ['primaire','Primaire d’adhérence','Favoriser l’accrochage','Un primaire compatible est appliqué si le support ou le fabricant l’exige.'],
  ['etancheite','Étanchéité sous carrelage','Protéger contre les infiltrations','Un système de protection à l’eau est appliqué dans les zones exposées.'],
  ['points-singuliers','Traitement des points singuliers','Sécuriser les zones sensibles','Angles, raccords et traversées de canalisations reçoivent les accessoires adaptés.'],
  ['sechage-support','Séchage des préparations','Garantir les performances','Les délais de séchage des réparations et de l’étanchéité sont respectés.'],
  ['calepinage','Calepinage','Préparer un rendu harmonieux','La disposition des carreaux et l’emplacement des découpes sont planifiés.'],
  ['tracage','Traçage des repères','Guider la pose','Des axes de référence horizontaux et verticaux sont tracés.'],
  ['colle','Préparation de la colle','Obtenir un mélange régulier','Le mortier-colle est dosé et malaxé selon sa fiche technique.'],
  ['encollage','Encollage','Assurer une bonne adhérence','La colle est étalée avec un peigne adapté ; le double encollage est utilisé si nécessaire.'],
  ['pose','Pose des carreaux','Créer une surface régulière','Les carreaux sont posés en suivant les repères et la largeur de joint prévue.'],
  ['decoupes','Découpes','Traiter proprement les obstacles','Les carreaux sont découpés autour des angles, tuyaux et équipements.'],
  ['controle-pose','Contrôle en cours de pose','Corriger avant la prise','L’alignement, le niveau et la planéité sont vérifiés en continu.'],
  ['prise','Temps de prise','Ne pas fragiliser la pose','Le revêtement reste sans sollicitation pendant la prise de la colle.'],
  ['jointoiement','Jointoiement','Protéger les espaces entre carreaux','Les joints sont remplis avec un produit compatible avec la zone.'],
  ['nettoyage-voile','Nettoyage du voile','Obtenir une surface propre','Les résidus de joint sont retirés au bon moment sans creuser les joints.'],
  ['joints-souples','Joints souples et sanitaires','Absorber les mouvements','Les changements de plan et raccords reçoivent un mastic adapté.'],
  ['sechage-final','Séchage final','Permettre la mise en service','Les délais avant circulation et remise en eau sont respectés.'],
  ['reception','Réception du chantier','Valider la qualité','Les finitions, pentes, joints, découpes et la propreté sont contrôlés.'],
  ['entretien','Conseils d’entretien','Préserver le résultat','Les produits compatibles et les gestes d’entretien sont expliqués.']
];

const etapes: Etape[] = definitions.map(([code,titre,objectif,description], index) => ({
  code, ordre:index+1, titre, objectif, description,
  dureeIndicative: index < 4 ? '30 min à 2 h' : 'Selon la surface et le support',
  tempsAttente: ['primaire','etancheite','prise','jointoiement','sechage-final'].includes(code) ? 'Respecter impérativement la fiche fabricant' : 'Pas d’attente spécifique annoncée',
  importance: index < 14 ? 'ESSENTIEL' : 'IMPORTANT',
  produits:[{nom: index < 14 ? 'Produit de préparation compatible' : 'Produit de pose compatible',fonction:'À confirmer selon le support et le fabricant'}],
  outils:['Mètre','Niveau','Équipements de protection'],
  controles:['Le support et les produits sont compatibles','Les délais annoncés sont respectés'],
  erreursFrequentes:['Passer l’étape trop vite','Ignorer la fiche technique du fabricant']
}));

export const GUIDE_DEMO: Guide = {
  code:'salle-de-bain-carrelage', titre:'Carreler une salle de bain',
  introduction:'Comprenez les choix et l’ordre d’intervention de l’artisan.',
  avertissement:'Ce guide est pédagogique et ne remplace pas le diagnostic d’un professionnel qualifié.',
  questions, materiaux, etapes,
  questionsArtisan:['Quel est l’état du support ?','Quel système d’étanchéité est prévu ?','Quel calepinage proposez-vous ?','Quand pourra-t-on utiliser la douche ?','Quelles garanties couvrent les travaux ?'],
  glossaire:{Calepinage:'Plan préparatoire de disposition des carreaux.',Ragréage:'Couche destinée à corriger la planéité d’un sol.','Double encollage':'Colle appliquée sur le support et au dos du carreau.','Point singulier':'Zone sensible comme un angle, une traversée ou un raccord.'}
};
