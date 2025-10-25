
import { TarotCard } from './types';

export const BASE_URL = "https://raw.githubusercontent.com/stagira/TDM-IMG/main/img/";

const arcanesMajeursMap: Omit<TarotCard, 'key'>[] = [
  { name: "Le Bateleur", interpretation: { upright: "Début, potentiel, habileté.", reversed: "Manipulation, manque de confiance." } },
  { name: "La Papesse", interpretation: { upright: "Intuition, secret, gestation.", reversed: "Connaissances cachées, inaction." } },
  { name: "L'Impératrice", interpretation: { upright: "Créativité, abondance, fertilité.", reversed: "Dépendance, stagnation." } },
  { name: "L'Empereur", interpretation: { upright: "Stabilité, autorité, structure.", reversed: "Rigidité, contrôle excessif." } },
  { name: "Le Pape", interpretation: { upright: "Tradition, enseignement, guidance.", reversed: "Dogmatisme, conformisme." } },
  { name: "L'Amoureux", interpretation: { upright: "Choix, amour, relation.", reversed: "Indécision, conflit, mauvais choix." } },
  { name: "Le Chariot", interpretation: { upright: "Victoire, volonté, maîtrise.", reversed: "Manque de direction, agression." } },
  { name: "La Justice", interpretation: { upright: "Équilibre, vérité, loi.", reversed: "Injustice, partialité." } },
  { name: "L'Hermite", interpretation: { upright: "Introspection, sagesse, solitude.", reversed: "Isolement, retrait excessif." } },
  { name: "La Roue de Fortune", interpretation: { upright: "Changement, cycle, destinée.", reversed: "Malchance, résistance au changement." } },
  { name: "La Force", interpretation: { upright: "Courage, maîtrise, compassion.", reversed: "Faiblesse, violence, manque de contrôle." } },
  { name: "Le Pendu", interpretation: { upright: "Sacrifice, nouvelle perspective, lâcher-prise.", reversed: "Stagnation, indécision." } },
  { name: "L'Arcane sans nom", interpretation: { upright: "Transformation, fin, renouveau.", reversed: "Stagnation, peur du changement." } },
  { name: "Tempérance", interpretation: { upright: "Harmonie, modération, patience.", reversed: "Déséquilibre, excès." } },
  { name: "Le Diable", interpretation: { upright: "Passion, matérialisme, attachement.", reversed: "Dépendance, restriction." } },
  { name: "La Maison Dieu", interpretation: { upright: "Révélation, changement soudain, libération.", reversed: "Catastrophe, chaos." } },
  { name: "L'Étoile", interpretation: { upright: "Espoir, inspiration, sérénité.", reversed: "Désespoir, manque de foi." } },
  { name: "La Lune", interpretation: { upright: "Intuition, illusion, inconscient.", reversed: "Peur, confusion, anxiété." } },
  { name: "Le Soleil", interpretation: { upright: "Joie, succès, clarté.", reversed: "Optimisme excessif, ego." } },
  { name: "Le Jugement", interpretation: { upright: "Renaissance, pardon, appel.", reversed: "Auto-critique, jugement." } },
  { name: "Le Monde", interpretation: { upright: "Accomplissement, intégration, voyage.", reversed: "Inachèvement, manque de clôture." } },
  { name: "Le Mat", interpretation: { upright: "Liberté, nouveau départ, spontanéité.", reversed: "Inconscience, folie, risque." } },
];

const arcanesMineursMap = {
  'Bâton': { key: 'b', count: 14, names: ["As", "Deux", "Trois", "Quatre", "Cinq", "Six", "Sept", "Huit", "Neuf", "Dix", "Valet", "Cavalier", "Reyne", "Roi"] },
  'Coupe': { key: 'c', count: 14, names: ["As", "Deux", "Trois", "Quatre", "Cinq", "Six", "Sept", "Huit", "Neuf", "Dix", "Valet", "Cavalier", "Reyne", "Roi"] },
  'Denier': { key: 'd', count: 14, names: ["As", "Deux", "Trois", "Quatre", "Cinq", "Six", "Sept", "Huit", "Neuf", "Dix", "Valet", "Cavalier", "Reyne", "Roi"] },
  'Épée': { key: 'e', count: 14, names: ["As", "Deux", "Trois", "Quatre", "Cinq", "Six", "Sept", "Huit", "Neuf", "Dix", "Valet", "Cavalier", "Reyne", "Roi"] }
};

export const TAROT_DECK: TarotCard[] = [
  ...arcanesMajeursMap.map((card, i) => ({
    ...card,
    key: `a${(i + 1).toString().padStart(2, '0')}`
  })),
  ...Object.entries(arcanesMineursMap).flatMap(([suit, data]) => 
    Array.from({ length: data.count }, (_, i) => ({
      name: `${data.names[i]} de ${suit}`,
      key: `${data.key}${(i + 1).toString().padStart(2, '0')}`,
      interpretation: { upright: `${data.names[i]} de ${suit} - Droit`, reversed: `${data.names[i]} de ${suit} - Renversé` }
    }))
  )
];
