export type Language = 'uk' | 'en';

export type CocktailType = 'long' | 'short' | 'shot' | 'hot' | 'aperitif' | 'digestif' | 'mocktail';

export type EmotionType =
  | 'joy'
  | 'rage'
  | 'sadness'
  | 'celebration'
  | 'heartbreak'
  | 'in_love'
  | 'irritated'
  | 'fed_up'
  | 'cosmic_sorrow'
  | 'stress'
  | 'tiredness'
  | 'zen'
  | 'party_beast'
  | 'adventurous'
  | 'melancholy'
  | 'passion'
  | 'euphoria';

export interface Ingredient {
  name: string;
  nameEn?: string;
  amount: string;
  amountEn?: string;
  note?: string;
  noteEn?: string;
  optional?: boolean;
}

export interface CocktailItem {
  id: string;
  name: string;
  nameEn: string;
  originalName?: string;
  description?: string;
  descriptionEn?: string;
  type: CocktailType;
  baseSpirit: 'whiskey' | 'vodka' | 'gin' | 'rum' | 'tequila' | 'brandy' | 'liqueur' | 'wine' | 'none';
  abv: number; // approximate percentage e.g. 18
  ibaOfficial?: boolean;
  isTop10?: boolean;
  isAuthor?: boolean;
  top10Rank?: number; // 1 to 10 if in top 10
  rating?: number; // 4.5 - 5.0
  image: string;
  glass?: string;
  glassEn?: string;
  glassware?: string;
  glasswareEn?: string;
  method?: 'shake' | 'stir' | 'build' | 'blend' | 'layer' | 'muddle';
  ingredients: Ingredient[];
  instructions: string[];
  instructionsEn: string[];
  garnish?: string;
  garnishEn?: string;
  emotionalFit?: EmotionType[];
  emotionalReason?: string;
  emotionalReasonEn?: string;
  foodPairing?: string;
  foodPairingEn?: string;
  idealSnacks?: string[];
  idealSnacksEn?: string[];
  flavorProfile?: {
    sweet?: number;
    sour?: number;
    bitter?: number;
    strong?: number;
    refreshing?: number;
    refreshingness?: number;
    sweetness?: number;
    sourness?: number;
    bitterness?: number;
    strength?: number;
  };
  calories?: number;
  caloriesApprox?: number;
  history?: string;
  historyEn?: string;
  historyNote?: string;
  historyNoteEn?: string;
}

export type Cocktail = CocktailItem;

export interface EmotionalState {
  id: string;
  type: EmotionType;
  emoji: string;
  labelUa: string;
  labelEn: string;
  taglineUa: string;
  taglineEn: string;
  descriptionUa: string;
  descriptionEn: string;
  sommelierLogicUa: string;
  sommelierLogicEn: string;
  matchedCocktailIds: string[];
  color: string;
}

export interface CrazyCocktail {
  id: string;
  name: string;
  tagline: string;
  dangerLevel: number;
  ingredients: string[];
  instructions: string[];
  morningEffect: string;
  createdAt: string;
  glass?: string;
  abv?: string;
  tasteProfile?: string;
  warning?: string;
}

export type CrazyCocktailJournalEntry = CrazyCocktail;

export interface AlcoholHistoryItem {
  id: string;
  name: string;
  nameEn: string;
  category: 'whiskey' | 'vodka' | 'gin' | 'rum' | 'tequila' | 'brandy' | 'wine' | 'beer' | 'absinthe' | 'liqueurs' | 'cider' | string;
  abvRange: string;
  originCountry: string;
  originCountryEn: string;
  originCentury: string;
  originCenturyEn: string;
  iconName: string;
  image: string;
  shortTagline: string;
  shortTaglineEn: string;
  history: string;
  historyEn: string;
  keyMilestones: { year: string; event: string; eventEn: string }[];
  funFacts: string[];
  funFactsEn: string[];
  productionMethod: string;
  productionMethodEn: string;
  howToDrink: string;
  howToDrinkEn: string;
  foodPairing?: string;
  foodPairingEn?: string;
  bestSnacks?: string[];
  bestSnacksEn?: string[];
  idealSnacks?: string[];
  idealSnacksEn?: string[];
}

export interface ToastItem {
  id: string;
  occasion: string;
  tone: string;
  title: string;
  titleEn?: string;
  text: string;
  textEn?: string;
  punchline: string;
  punchlineEn?: string;
  suggestedDrink?: string;
  suggestedDrinkEn?: string;
}

export interface DatingAdviceItem {
  id: string;
  scenarioKey: string;
  targetGender: 'woman' | 'man';
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  rules: string[];
  rulesEn: string[];
  recommendedDrinksForHer?: { name: string; why: string; whyEn: string }[];
  recommendedDrinksForHim?: { name: string; why: string; whyEn: string }[];
  recommendedDrinksForYou: { name: string; why: string; whyEn: string }[];
  whatToAvoid: string[];
  whatToAvoidEn: string[];
  psychologicalTip: string;
  psychologicalTipEn: string;
}

export interface MedicineInfo {
  name: string;
  nameEn: string;
  status: 'recommended' | 'caution' | 'dangerous';
  purpose: string;
  purposeEn: string;
  howItWorks: string;
  howItWorksEn: string;
  usageAdvice: string;
  usageAdviceEn: string;
  warning?: string;
  warningEn?: string;
}

export interface HangoverProtocol {
  stage: 'before' | 'during' | 'morning';
  title: string;
  titleEn: string;
  tagline: string;
  taglineEn: string;
  actionChecklist: { task: string; taskEn: string; details: string; detailsEn: string }[];
}

export interface FoodPairingItem {
  id: string;
  category: string;
  categoryEn: string;
  icon: string;
  bestDishes: string[];
  bestDishesEn: string[];
  idealSnacks: string[];
  idealSnacksEn: string[];
  worstMistakes: string[];
  worstMistakesEn: string[];
  sommelierRule: string;
  sommelierRuleEn: string;
}

export interface FiveFactorsStopItem {
  id: string;
  factorNumber: number;
  title: string;
  titleEn: string;
  behaviorTrigger: string;
  behaviorTriggerEn: string;
  scientificExplanation: string;
  scientificExplanationEn: string;
  bartenderAction: string;
  bartenderActionEn: string;
  humorousQuote: string;
  humorousQuoteEn: string;
  dangerBadge: string;
  dangerBadgeEn: string;
}

export interface RouletteOption {
  index: number;
  textUa: string;
  textEn: string;
  category: string;
  color: string;
  badge: string;
  badgeEn: string;
  adviceUa: string;
  adviceEn: string;
  suggestedTrackOrActionUa: string;
  suggestedTrackOrActionEn: string;
}

export interface DrinkLogEntry {
  id: string;
  name: string;
  volumeMl: number;
  abvPercent: number;
  timeHoursAgo: number;
}
