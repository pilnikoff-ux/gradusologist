// Keyboard Layout Maps and Transliteration Helpers for Smart Search

const EN_TO_UA_MAP: Record<string, string> = {
  'q': 'й', 'w': 'ц', 'e': 'у', 'r': 'к', 't': 'е', 'y': 'н', 'u': 'г', 'i': 'ш', 'o': 'щ', 'p': 'з',
  '[': 'х', ']': 'ї', 'a': 'ф', 's': 'і', 'd': 'в', 'f': 'а', 'g': 'п', 'h': 'р', 'j': 'о', 'k': 'л',
  'l': 'д', ';': 'ж', "'": 'є', 'z': 'я', 'x': 'ч', 'c': 'с', 'v': 'м', 'b': 'и', 'n': 'т', 'm': 'ь',
  ',': 'б', '.': 'ю', '`': "'", '/': '.'
};

const UA_TO_EN_MAP: Record<string, string> = {};
for (const [en, ua] of Object.entries(EN_TO_UA_MAP)) {
  UA_TO_EN_MAP[ua] = en;
}
// additional mappings
UA_TO_EN_MAP['ґ'] = 'g';

const TRANSLIT_PAIRS: [RegExp, string][] = [
  [/джин/gi, 'gin'],
  [/gin/gi, 'джин'],
  [/ром/gi, 'rum'],
  [/rum/gi, 'ром'],
  [/віскі|виски/gi, 'whiskey'],
  [/whiskey|whisky/gi, 'віскі'],
  [/горілка|водка/gi, 'vodka'],
  [/vodka/gi, 'горілка'],
  [/текіла|текила/gi, 'tequila'],
  [/tequila/gi, 'текіла'],
  [/аперол|апероль/gi, 'aperol'],
  [/aperol/gi, 'апероль'],
  [/негроні|негрони/gi, 'negroni'],
  [/negroni/gi, 'негроні'],
  [/мохіто|мохито/gi, 'mojito'],
  [/mojito/gi, 'мохіто'],
  [/маргарита/gi, 'margarita'],
  [/margarita/gi, 'маргарита'],
  [/безалкогольн/gi, 'mocktail non-alcoholic zero'],
  [/коктейл/gi, 'cocktail']
];

/**
 * Normalizes text: lowercases, unifies apostrophes, removes extra punctuation
 */
export function normalizeSearchString(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[`ʼ’"]/g, "'")
    .trim();
}

/**
 * Converts text typed in wrong keyboard layout (e.g., QWERTY -> Ukrainian)
 */
export function convertKeyboardLayout(text: string): string {
  const normalized = text.toLowerCase();
  let converted = '';
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i];
    if (EN_TO_UA_MAP[char]) {
      converted += EN_TO_UA_MAP[char];
    } else if (UA_TO_EN_MAP[char]) {
      converted += UA_TO_EN_MAP[char];
    } else {
      converted += char;
    }
  }
  return converted;
}

/**
 * Generates all search variations for a query (original, layout-swapped, transliterated, tokenized)
 */
export function getSearchVariants(rawQuery: string): string[] {
  const query = normalizeSearchString(rawQuery);
  if (!query) return [];

  const variants = new Set<string>();
  variants.add(query);

  // 1. Keyboard layout converted (e.g. "ghfe.'" -> "працює", "ytuhjys" -> "негроні")
  const convertedLayout = convertKeyboardLayout(query);
  if (convertedLayout && convertedLayout !== query) {
    variants.add(convertedLayout);
  }

  // 2. Transliteration variants
  for (const [pattern, replacement] of TRANSLIT_PAIRS) {
    if (pattern.test(query)) {
      variants.add(query.replace(pattern, replacement));
    }
    if (pattern.test(convertedLayout)) {
      variants.add(convertedLayout.replace(pattern, replacement));
    }
  }

  return Array.from(variants).filter(Boolean);
}

/**
 * Checks if target text matches the user's search query across all variants and tokens
 */
export function smartTextMatch(targetText: string | undefined | null, rawQuery: string): boolean {
  if (!targetText || !rawQuery) return false;
  const normTarget = normalizeSearchString(targetText);
  const variants = getSearchVariants(rawQuery);

  for (const variant of variants) {
    if (normTarget.includes(variant)) return true;

    // Check individual words/tokens if multi-word
    const tokens = variant.split(/\s+/).filter((t) => t.length >= 2);
    if (tokens.length > 1 && tokens.every((token) => normTarget.includes(token))) {
      return true;
    }
  }

  return false;
}
