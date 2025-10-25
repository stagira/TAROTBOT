import { TarotCard } from './types';

export const BASE_URL = "https://raw.githubusercontent.com/stagira/TDM-IMG/main/img/";

const arcanesMajeursMap: Omit<TarotCard, 'key'>[] = [
  { name: "Le Bateleur", interpretation: { upright: "Représente l’impulsion créatrice, la volonté personnelle, le pouvoir de l’unité et de la confiance en soi, la capacité de maîtriser chaque projet et défi, l’unification et le contrôle de toutes les forces opposées, le combattant.", reversed: "Méfait, ambivalence, manipulation." } },
  { name: "La Papesse", interpretation: { upright: "Représente la Déesse Mère, le dépositaire de la mémoire et de la sagesse ancestrale, la psyché imprégnant tous les mystères, le féminin sacré, l’initiation aux enseignements sacrés et occultes, l’Oracle tenant le Livre de la Vie.", reversed: "Froideur, rétention, totalitarisme." } },
  { name: "L'Impératrice", interpretation: { upright: "Représente la conception créative souveraine des choses, l’intelligence spirituelle fertile, la puissance génératrice et la concrétisation des idées, l’initiative de réalisation dans la forme et la matière, la mère nourricière, la providence.", reversed: "Inexpérience, vénalité, avidité narcissique." } },
  { name: "L'Empereur", interpretation: { upright: "Représente le chef, l’affirmation de l’autorité et de l’ordre, le pouvoir de réalisation et de solidification, la stabilité établie, la cohésion matérielle, l’abondance, la protection et la garantie de sécurité.", reversed: "Abus de pouvoir, immuabilité, imposition de limites." } },
  { name: "Le Pape", interpretation: { upright: "Représente le père spirituel, le berger du sacré, le coordinateur de la vie spirituelle au cœur du plan matériel de l’existence, les enseignements ésotériques, le mentor magnétique et inspiré, le clairvoyant.", reversed: "Sectarisme, dogmatisme strict, manipulation mentale." } },
  { name: "L'Amoureux", interpretation: { upright: "Représente la liberté de choix et l’émancipation, l’éclat intellectuel, le génie, le médiateur, le charisme, le plaisir de l’épanouissement personnel dans le processus créatif et dynamique des relations sociales.", reversed: "Ambiguïté, doute et co-dépendance, manipulation." } },
  { name: "Le Chariot", interpretation: { upright: "Représente la domination des oppositions, l’esprit de conquête, la détermination, la mise en œuvre de l’ensemble des ressources et des compétences acquises, le pouvoir au service du développement personnel.", reversed: "Choc des oppositions, mégalomanie, agressivité." } },
  { name: "La Justice", interpretation: { upright: "Représente l’équilibre universel, l’harmonisation des forces antagonistes, l’évaluation stricte des conséquences des actions, l’adaptation aux nécessités, l’établissement des règles et des lois, la délimitation de l’espace vital.", reversed: "Intransigeance, rigidité, inflexibilité." } },
  { name: "L'Hermite", interpretation: { upright: "Représente l’expérience, l’intériorisation des choses, la potentialité latente, la contemplation, la distanciation du monde, la précipitation du changement, l’étape critique avant une mutation inévitable, le sage, le veilleur, le passeur.", reversed: "Déclin, tromperie, méfaits pervers." } },
  { name: "La Roue de Fortune", interpretation: { upright: "Représente le renouvellement perpétuel des choses, les pulsions créatives, la capacité de redéfinir son être, le libre arbitre, la chance, l’opportunité, les fluctuations de l’existence, l’impermanence, l’alternance du pouvoir.", reversed: "Désorganisation, instabilité chronique, frénésie." } },
  { name: "La Force", interpretation: { upright: "Représente l’assimilation et l’unification des puissances naturelles, la force stable, la domination de l’esprit sur la matière, la cohésion, la capacité de maîtrise de soi-même et des autres, la détermination, la mise au point, la vertu.", reversed: "Conflit de division, soumission par la force, inflexibilité." } },
  { name: "Le Pendu", interpretation: { upright: "Représente la transmission, l’enseignement et l’éducation à travers les épreuves, le détachement pour l’assimilation des choses, l’abnégation, l’altruisme, l’accumulation de force et la maturation, la contemplation avant toute action décisive.", reversed: "Obstacle, attente passive, incapacité ou réticence à agir." } },
  { name: "L'Arcane sans nom", interpretation: { upright: "Représente la transformation, le dur labeur, le test d’un changement radical, de l’effondrement des vieux concepts, le questionnement existentiel, la charnière entre le connu et l’inconnu, les inévitables mutations cycliques.", reversed: "Dévitalisation, décomposition et mort, dévastation." } },
  { name: "Tempérance", interpretation: { upright: "Représente la mise en place d’un nouveau cycle, la guérison la facilitation d’une mutation fertile, les échanges vitaux, la communication, la communion spirituelle, l’harmonie des mixtes, la réversibilité et l’adaptation aux circonstances.", reversed: "Limitations, stagnation, échappatoire." } },
  { name: "Le Diable", interpretation: { upright: "Représente l’organisation hiérarchique d’un groupe, la dépendance à une structure corporative, la chaîne des instincts, l’attachement aux passions et à la matérialité, les ressources vitales profondes, le leadership.", reversed: "Perversion, assujettissement, sectarisme occulte." } },
  { name: "La Maison Dieu", interpretation: { upright: "Représente le retour précipité à la réalité, la destruction des illusions, la décharge des contraintes matérielles, la libération des énergies vitales, le processus de régénération joyeux ou douloureux, la libération, la prise de conscience.", reversed: "Destruction, révolte, événement catastrophique." } },
  { name: "L'Étoile", interpretation: { upright: "Représente les actions reflétant un idéal, l’expression de la vie naturelle et de l’harmonie, l’écoute de la voix intérieure, l’espoir, l’accomplissement de son destin, le combat entre la vérité et le mensonge, le retour à la source.", reversed: "Mélancolie, utopisme, déliquescence." } },
  { name: "La Lune", interpretation: { upright: "Représente la catalyse des rêves et des espoirs pour dépasser une condition, la sublimation des intentions, les forces internes, le stress et les tensions dirigées vers un but fixé, la fantasmagorie, les facultés psychiques.", reversed: "Situation critique, adversité, bourbier psychologique." } },
  { name: "Le Soleil", interpretation: { upright: "Représente l’illumination, le bonheur et l’harmonie naturelle, la réception et la croissance au sein d’une communauté, l’atteinte d’un idéal, des possibilités illimitées de prospérité, l’accession à une terre promise.", reversed: "Co-dépendance, purisme, isolationnisme." } },
  { name: "Le Jugement", interpretation: { upright: "Représente le siège de la conscience, le moment de vérité et de probation, l’humilité nécessaire pour s’élever, la délivrance du verdict, les derniers efforts, le renouveau par la destruction et la génération.", reversed: "Mise en examen, rigueur extrême, problèmes juridiques." } },
  { name: "Le Monde", interpretation: { upright: "Représente le triomphe, l’énergie créatrice ardente, la capacité de se dépasser, l’unification des forces, la plénitude de l’être, la sensualité débridée, une grande confiance en soi, les possibilités indéfinies de devenir.", reversed: "Surestimation de soi, aveuglement moral, impulsivité." } },
  { name: "Le Mat", interpretation: { upright: "Représente la quête personnelle, le parcours des sentiers de l’évolution, le dépassement des limites, le sacrifice de soi, le commencement et la fin d’un cycle, le couronnement des efforts, l’aspiration vers l’absolu, l’apothéose.", reversed: "Rejet ou auto-exil, inconséquence dans l’erreur, lunatisme et folie." } },
];


const numeralsMap = [
  { name: 'As', number: 1, upright: 'Potentialité, motivation, créativité, inspiration, spontanéité, indépendance.', reversed: 'Individualisme, arrogance, vindication.' },
  { name: 'Deux', number: 2, upright: 'Complémentarité, co-dépendance, séparation et connexion, équilibre entre polarités.', reversed: 'Passivité, dualisme, opposition.' },
  { name: 'Trois', number: 3, upright: 'Créativité, démonstrativité, développements fertiles, esprit rayonnant.', reversed: 'Impulsivité, vanité, dispersion.' },
  { name: 'Quatre', number: 4, upright: 'Stabilité, organisation rationnelle, sécurité, conception logique et constructive.', reversed: 'Intransigeance, rigidité, obstruction.' },
  { name: 'Cinq', number: 5, upright: 'Harmonie, équilibre, conscience spirituelle, médiation, liberté de mouvement.', reversed: 'Déstabilisation, subversivité, manipulation.' },
  { name: 'Six', number: 6, upright: 'Équilibre, harmonie, amour, relations créatives, connexion universelle.', reversed: 'Indécision, tensions, ambiguïté.' },
  { name: 'Sept', number: 7, upright: 'Plénitude dynamique, éclat, autonomie, union parfaite de l’esprit et de la matérialité.', reversed: 'Égocentrisme, tyrannie, irréductibilité.' },
  { name: 'Huit', number: 8, upright: 'Infini, perfection de la continuité, équilibre terre/ciel, régénération perpétuelle.', reversed: 'Intolérance, inflexibilité, intransigeance.' },
  { name: 'Neuf', number: 9, upright: 'Gestation, expérience, épanouissement, stade ultime de l’évolution.', reversed: 'Transgression, déclin, corruption entropique.' },
  { name: 'Dix', number: 10, upright: 'Totalité, accomplissement, redéfinition créative, cycle universel de la vie.', reversed: 'Incertitude, précarité, impermanence.' }
];

const courtsMap = [
    { rank: 'Valet', index: 11, upright: 'Humilité, culte dans les œuvres, émissaire dévoué, médiateur, recherche d’expérience.', reversed: 'Passivité, dédain, obéissance servile.' },
    { rank: 'Cavalier', index: 12, upright: 'Droiture de conduite, haute moralité, maîtrise de soi, rapidité d’action, messager.', reversed: 'Zèle, impatience, vanité.' },
    { rank: 'Reyne', index: 13, upright: 'Aspect féminin de la souveraineté, capacité de concevoir et sonder, intelligence, sagesse, intuition.', reversed: 'Tyrannie, abus de pouvoir, auto-complaisance.' },
    { rank: 'Roi', index: 14, upright: 'Aspect masculin de la souveraineté, capacité d’agir de façon décisive, autorité sur les règles, les lois et le jugement.', reversed: 'Tyrannie, abus de pouvoir, auto-complaisance.' }
];

const suitsMap: { [key: string]: { key: string; upright: string; reversed: string; } } = {
  'Bâton': { key: 'b', upright: 'Principe créateur primordial, feu de l’action, sexualité, pouvoir, et commandement.', reversed: 'Tyrannie, violence, destruction.' },
  'Coupe': { key: 'c', upright: 'Principe spirituel et religieux sacré, réceptacle de la mémoire et de la Tradition, cœur, essence de la vie.', reversed: 'Paresse, débauche, complaisance.' },
  'Denier': { key: 'd', upright: 'Principe matériel et physique, plan objectif, réalité quantifiable, corps, support de toute réalisation.', reversed: 'Rationalisme, matérialisme, inertie.' },
  'Épée': { key: 'e', upright: 'Principe spirituel, psychique et mental, action ardente du Verbe, droiture de l’intellect, et discernement.', reversed: 'Tyrannie, violence, perversion.' }
};

const generateMinorArcana = (): TarotCard[] => {
  const minors: TarotCard[] = [];
  for (const suitName in suitsMap) {
    const suit = suitsMap[suitName];
    // Numerals 1-10
    for (const numeral of numeralsMap) {
      minors.push({
        name: `${numeral.name} de ${suitName}`,
        key: `${suit.key}${numeral.number.toString().padStart(2, '0')}`,
        interpretation: {
          upright: `${numeral.upright} Associé à: ${suit.upright}`,
          reversed: `${numeral.reversed} Associé à: ${suit.reversed}`
        }
      });
    }
    // Courts
    for (const court of courtsMap) {
        minors.push({
            name: `${court.rank} de ${suitName}`,
            key: `${suit.key}${court.index.toString().padStart(2, '0')}`,
            interpretation: {
                upright: `${court.upright} Associé à: ${suit.upright}`,
                reversed: `${court.reversed} Associé à: ${suit.reversed}`
            }
        });
    }
  }
  return minors;
}


export const TAROT_DECK: TarotCard[] = [
  ...arcanesMajeursMap.map((card, i) => {
    // Le Mat is the 22nd card but often represented as 0. In our array it's the last one.
    // The key for Le Mat should not be a22, let's check the assets. It's a22. Ok.
    // The order in the array defines its index, so +1 is its number for key generation.
     const keyIndex = (card.name === "Le Mat") ? 22 : i + 1;
     return {
        ...card,
        key: `a${keyIndex.toString().padStart(2, '0')}`
     }
  }),
  ...generateMinorArcana()
];
