import { CocktailItem, Language } from '../types';

export interface SommelierLevel {
  level: number;
  id: 'neophyte' | 'social_butterfly' | 'home_sommelier' | 'mixologist_master' | 'gradusologist_legend';
  titleUa: string;
  titleEn: string;
  badge: string;
  minFavorites: number;
  maxFavorites: number | null; // null for max level
  taglineUa: string;
  taglineEn: string;
  descriptionUa: string;
  descriptionEn: string;
  perksUa: string[];
  perksEn: string[];
  color: string;
  bgGradient: string;
  cardBorder: string;
}

export const SOMMELIER_LEVELS: SommelierLevel[] = [
  {
    level: 1,
    id: 'neophyte',
    titleUa: 'Цікавий Неофіт',
    titleEn: 'Curious Neophyte',
    badge: '🍸',
    minFavorites: 0,
    maxFavorites: 1,
    taglineUa: 'Тільки знайомиться з барною картою світу',
    taglineEn: 'Taking first steps into the world cocktail scene',
    descriptionUa: 'Ви робите перші відкриття: розрізняєте лонгдрінки від шотів і шукаєте свій ідеальний смаковий профіль.',
    descriptionEn: 'You are taking first sips: learning the difference between sours and spritzes.',
    perksUa: ['Базовий доступ до каталогу', 'Калькулятор проміле', 'Початковий бейдж гостя'],
    perksEn: ['Catalog access', 'BAC calculator', 'Starter guest badge'],
    color: 'text-stone-400',
    bgGradient: 'from-stone-800 to-stone-900',
    cardBorder: 'border-stone-700'
  },
  {
    level: 2,
    id: 'social_butterfly',
    titleUa: 'Соціальний Метелик',
    titleEn: 'Social Butterfly',
    badge: '🦋',
    minFavorites: 2,
    maxFavorites: 4,
    taglineUa: 'Душа будь-якої вечірки та експерт у замовленнях за барною стійкою',
    taglineEn: 'Heart of every party and master of bar orders',
    descriptionUa: 'У вашому обраному вже кілька хітів. Ви ніколи не губитесь перед барменом, знаєте, чим пригостити знайомих і як створити настрій у компанії.',
    descriptionEn: 'With multiple favorites saved, you navigate bar menus like a pro and always know what to order for friends.',
    perksUa: ['Аура легкого знайомства за баром', 'Доступ до спеціальних тостів', 'Бейдж «Соціальний Метелик» у профілі'],
    perksEn: ['Charisma boost at bars', 'Curated party toasts access', 'Social Butterfly badge'],
    color: 'text-sky-400',
    bgGradient: 'from-sky-950 via-stone-900 to-indigo-950',
    cardBorder: 'border-sky-500/50'
  },
  {
    level: 3,
    id: 'home_sommelier',
    titleUa: 'Домашній Сомельє',
    titleEn: 'Home Sommelier',
    badge: '🍷',
    minFavorites: 5,
    maxFavorites: 8,
    taglineUa: 'Має домашній міні-бар, джигер та розуміє правильний пейринг',
    taglineEn: 'Owns a shaker, understands dilution and food pairings',
    descriptionUa: '5+ улюблених рецептів! Ви розумієте різницю між струшуванням (shake) та перемішуванням (stir), цінуєте якісний лід та легко підбираєте закуски під кожен напій.',
    descriptionEn: '5+ favorites collected! You appreciate proper ice, shake vs stir techniques, and spot-on food pairing.',
    perksUa: ['Право критикувати температуру подачі', 'Експерт з гастрономічного пейрингу', 'Персональний мікро-бар'],
    perksEn: ['Right to critique glassware', 'Gastronomy pairing advisor', 'Personal home bar status'],
    color: 'text-amber-400',
    bgGradient: 'from-amber-950 via-stone-900 to-orange-950',
    cardBorder: 'border-amber-500/60'
  },
  {
    level: 4,
    id: 'mixologist_master',
    titleUa: 'Шеф-Міксолог Вечірок',
    titleEn: 'Party Mixologist Master',
    badge: '🧪',
    minFavorites: 9,
    maxFavorites: 14,
    taglineUa: 'Змішує сауери наосліп, тримає ідеальний баланс мілілітрів',
    taglineEn: 'Blends sours blindfolded, masters bitter-sweet ratios',
    descriptionUa: 'Солідна колекція з 9+ коктейлів. Друзі більше не ходять у бари — вони просто приходять до вас у гості, бо ваші напої смачніші.',
    descriptionEn: 'Impressive repertoire of 9+ cocktails. Your living room has officially replaced the neighborhood cocktail lounge.',
    perksUa: ['Шосте відчуття міцності (ABV)', 'Доступ до секретних шалених рецептів', 'Титул почесного бар-шефа'],
    perksEn: ['Innate ABV balance sense', 'Secret crazy recipes priority', 'Honorary bar master status'],
    color: 'text-emerald-400',
    bgGradient: 'from-emerald-950 via-stone-900 to-teal-950',
    cardBorder: 'border-emerald-500/60'
  },
  {
    level: 5,
    id: 'gradusologist_legend',
    titleUa: 'Легендарний Градусолог',
    titleEn: 'Legendary Gradusologist',
    badge: '👑',
    minFavorites: 15,
    maxFavorites: null,
    taglineUa: 'Верховний оракул барної культури, знавець історії Савою та IBA',
    taglineEn: 'Supreme bar culture oracle, walking Savoy encyclopedia',
    descriptionUa: '15+ збережених шедеврів! Ви знаєте пропорції на памʼять, історію сухого закону і можете врятувати будь-яку вечірку трьома інгредієнтами.',
    descriptionEn: '15+ legendary drinks! You are an encyclopedic mixology authority with elite bar wisdom.',
    perksUa: ['Золотий вензель Градусолога', 'Незламна стійкість до несмачних напоїв', 'Вічний статус легенди застілля'],
    perksEn: ['Golden Gradusologist Seal', 'Supreme cocktail taste palate', 'Eternal party legend status'],
    color: 'text-yellow-300',
    bgGradient: 'from-amber-950 via-yellow-950 to-stone-900',
    cardBorder: 'border-yellow-400/80'
  }
];

export interface SommelierProgress {
  currentLevel: SommelierLevel;
  nextLevel: SommelierLevel | null;
  favoritesCount: number;
  progressPercent: number; // 0 to 100
  neededForNext: number;
  averageAbv: number;
  topSpirit: string;
  topFlavorNote: string;
}

export function getSommelierProgress(
  favoritesCount: number,
  favoriteCocktails: CocktailItem[] = []
): SommelierProgress {
  // Find current level
  let currentLevel = SOMMELIER_LEVELS[0];
  for (let i = SOMMELIER_LEVELS.length - 1; i >= 0; i--) {
    if (favoritesCount >= SOMMELIER_LEVELS[i].minFavorites) {
      currentLevel = SOMMELIER_LEVELS[i];
      break;
    }
  }

  const currentIndex = SOMMELIER_LEVELS.findIndex((l) => l.id === currentLevel.id);
  const nextLevel = currentIndex < SOMMELIER_LEVELS.length - 1 ? SOMMELIER_LEVELS[currentIndex + 1] : null;

  let progressPercent = 100;
  let neededForNext = 0;

  if (nextLevel) {
    const range = nextLevel.minFavorites - currentLevel.minFavorites;
    const progressInCurrent = Math.max(0, favoritesCount - currentLevel.minFavorites);
    progressPercent = Math.min(100, Math.round((progressInCurrent / range) * 100));
    neededForNext = Math.max(0, nextLevel.minFavorites - favoritesCount);
  }

  // Calculate average ABV
  let averageAbv = 0;
  if (favoriteCocktails.length > 0) {
    const totalAbv = favoriteCocktails.reduce((sum, c) => sum + (c.abv || 0), 0);
    averageAbv = Math.round((totalAbv / favoriteCocktails.length) * 10) / 10;
  }

  // Top spirit
  const spiritsCount: Record<string, number> = {};
  favoriteCocktails.forEach((c) => {
    const spirit = c.baseSpirit || 'none';
    spiritsCount[spirit] = (spiritsCount[spirit] || 0) + 1;
  });
  let topSpirit = 'Різноманітний';
  let maxSpiritCount = 0;
  for (const [spirit, count] of Object.entries(spiritsCount)) {
    if (count > maxSpiritCount && spirit !== 'none') {
      maxSpiritCount = count;
      topSpirit = spirit.charAt(0).toUpperCase() + spirit.slice(1);
    }
  }

  // Top flavor
  let sweet = 0, sour = 0, bitter = 0, strong = 0, fresh = 0;
  favoriteCocktails.forEach((c) => {
    const fp = c.flavorProfile;
    if (fp) {
      sweet += (fp.sweet || fp.sweetness || 0);
      sour += (fp.sour || fp.sourness || 0);
      bitter += (fp.bitter || fp.bitterness || 0);
      strong += (fp.strong || fp.strength || 0);
      fresh += (fp.refreshing || fp.refreshingness || 0);
    }
  });

  let topFlavorNote = 'Збалансований';
  const flavors = [
    { name: 'Свіжий та освіжаючий', val: fresh },
    { name: 'Міцний та глибокий', val: strong },
    { name: 'Гіркувато-пряний', val: bitter },
    { name: 'Кисло-солодкий сауер', val: sour },
    { name: 'Мʼякий та десертний', val: sweet }
  ];
  flavors.sort((a, b) => b.val - a.val);
  if (flavors[0].val > 0) {
    topFlavorNote = flavors[0].name;
  }

  return {
    currentLevel,
    nextLevel,
    favoritesCount,
    progressPercent,
    neededForNext,
    averageAbv,
    topSpirit,
    topFlavorNote
  };
}
