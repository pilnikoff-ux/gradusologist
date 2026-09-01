import { EmotionType } from '../types';

export interface EmotionMeta {
  id: EmotionType;
  labelUa: string;
  labelEn: string;
  emoji: string;
  colorClass: string;
  taglineUa: string;
  taglineEn: string;
  psychologicalDescriptionUa: string;
  psychologicalDescriptionEn: string;
  cocktailVibeUa: string;
  cocktailVibeEn: string;
  recommendedIds: string[];
}

export const EMOTIONS_LIST: EmotionMeta[] = [
  {
    id: 'rage',
    labelUa: 'Лють / Сказ',
    labelEn: 'Rage / Burning Anger',
    emoji: '💢',
    colorClass: 'from-red-800 to-stone-900 text-red-200 border-red-700',
    taglineUa: 'Коли хтось перейшов усі червоні лінії і треба випустити пару',
    taglineEn: 'When all boundaries are shattered and you need to blow off steam',
    psychologicalDescriptionUa: 'Сплеск адреналіну, норадреналіну та внутрішній кипіння. Потрібен крижаний різкий шок або пекучий перчено-томатний смаковий удар, що «перезавантажує» смакові рецептори та вирівнює тиск.',
    psychologicalDescriptionEn: 'Surge of adrenaline and norepinephrine. Needs an ice-cold punch or sharp spicy-savory contrast to shock sensory receptors and reboot calm.',
    cocktailVibeUa: 'Пекуча Bloody Mary, крижаний Mezcal Paloma або надміцний Long Island Iced Tea.',
    cocktailVibeEn: 'Spicy Bloody Mary, smoky Mezcal Paloma, or high-octane Long Island Iced Tea.',
    recommendedIds: ['bloody_mary', 'long_island', 'paloma', 'mezcal_sour']
  },
  {
    id: 'joy',
    labelUa: 'Радість',
    labelEn: 'Pure Joy',
    emoji: '☀️',
    colorClass: 'from-amber-500 to-yellow-400 text-amber-950 border-amber-400',
    taglineUa: 'Коли на душі сонячно, легко і хочеться посміхатися',
    taglineEn: 'When soul feels sunny, buoyant and naturally smiling',
    psychologicalDescriptionUa: 'Здоровий баланс серотоніну та ендорфінів. Освіжаючі цитрусові та ягідні формули на основі джину чи просекко підкреслюють легкість буття.',
    psychologicalDescriptionEn: 'Harmonious serotonin balance. Crisp citrus, berry and prosecco formulas gently elevate natural happiness.',
    cocktailVibeUa: 'Свіжий Gin Basil Smash, Aperol Spritz, сонячна Mimosa або Clover Club.',
    cocktailVibeEn: 'Crisp Gin Basil Smash, Aperol Spritz, sunny Mimosa, or silky Clover Club.',
    recommendedIds: ['gin_basil_smash', 'aperol_spritz', 'mimosa', 'clover_club']
  },
  {
    id: 'sadness',
    labelUa: 'Смуток',
    labelEn: 'Gentle Sadness',
    emoji: '🌧️',
    colorClass: 'from-blue-700 to-indigo-900 text-blue-200 border-blue-600',
    taglineUa: 'Тихий дощовий смуток, коли хочеться зігрітися і подумати',
    taglineEn: 'Quiet rainy sadness when you crave gentle warmth and reflection',
    psychologicalDescriptionUa: 'Зниження дофамінового тонусу, потреба у теплому захисті та затишку. Категорично не рекомендується різкий міцний алкоголь. Потрібні округлі оксамитові тони какао, вершків, кориці або меду.',
    psychologicalDescriptionEn: 'Lower dopamine tone needing gentle emotional wrapping. Warm, velvety tones of cacao, cream, honey, and oak soothe without agitating.',
    cocktailVibeUa: 'Зігріваючий Irish Coffee, вершковий White Russian або пряний Hot Toddy.',
    cocktailVibeEn: 'Warming Irish Coffee, soothing White Russian, or honey-lemon Hot Toddy.',
    recommendedIds: ['irish_coffee', 'white_russian', 'hot_toddy', 'penicillin']
  },
  {
    id: 'celebration',
    labelUa: 'Святковий настрій',
    labelEn: 'Festive Celebration',
    emoji: '🥂',
    colorClass: 'from-amber-400 via-rose-500 to-purple-600 text-white border-amber-300',
    taglineUa: 'Коли є привід для тріумфу та келихів з бульбашками',
    taglineEn: 'When victory calls for bubbling flutes and toast applause',
    psychologicalDescriptionUa: 'Тріумф, радісне збудження та бажання розділити свято з близькими. Ідеально підходять ігристі вина, шампанське, яскраві аперитиви та елегантна подача.',
    psychologicalDescriptionEn: 'Triumph and sparkling euphoria. Best celebrated with champagne cascades, botanical aperitifs, and grand stemware.',
    cocktailVibeUa: 'Вишуканий French 75, Bellini, Aperol Spritz або Cosmopolitan.',
    cocktailVibeEn: 'Refined French 75, sparkling Bellini, Aperol Spritz, or Cosmopolitan.',
    recommendedIds: ['french_75', 'bellini', 'aperol_spritz', 'cosmopolitan']
  },
  {
    id: 'heartbreak',
    labelUa: 'Розбите серце',
    labelEn: 'Heartbreak',
    emoji: '💔',
    colorClass: 'from-purple-900 via-rose-950 to-stone-900 text-rose-200 border-purple-600',
    taglineUa: 'Лікувати душевні рани без дурних нічних повідомлень',
    taglineEn: 'Soothing emotional wounds without drunk texting your ex',
    psychologicalDescriptionUa: 'Гострий дефіцит ендорфінів та емоційна вразливість. Заборонено пити на самоті дешевий алкоголь. Потрібен глибокий, дорослий, самодостатній смак — витриманий віскі з амарето або затишний кавовий лікер.',
    psychologicalDescriptionEn: 'Endorphin deficit and emotional tenderness. Needs comforting, dignified craftsmanship — aged whisky, amaretto warmth, or dark espresso crema.',
    cocktailVibeUa: 'Шляхетний Godfather, оксамитовий Espresso Martini або витриманий Boulevardier.',
    cocktailVibeEn: 'Noble Godfather, decadent Espresso Martini, or bittersweet Boulevardier.',
    recommendedIds: ['godfather', 'espresso_martini', 'boulevardier', 'old_fashioned']
  },
  {
    id: 'in_love',
    labelUa: 'Закоханий',
    labelEn: 'In Love / Butterflies',
    emoji: '💘',
    colorClass: 'from-pink-500 via-rose-500 to-red-500 text-white border-pink-400',
    taglineUa: 'Метелики в животі, електрика в погляді та солодке очікування',
    taglineEn: 'Butterflies in stomach, electric eye contact and sweet anticipation',
    psychologicalDescriptionUa: 'Окситоциновий та дофаміновий фонтан. Потрібні витончені, ягідні, шовковисті текстури та афродизіаки, що підкреслюють романтичний флер і чуттєвість.',
    psychologicalDescriptionEn: 'Oxytocin and dopamine fountain. Needs silky foam, botanical berry notes, and sensual passion-fruit aphrodisiacs.',
    cocktailVibeUa: 'Шовковий Clover Club, пристрасний Passion Fruit Martini або витончений French 75.',
    cocktailVibeEn: 'Silky Clover Club, seductive Passion Fruit Martini, or sparkling French 75.',
    recommendedIds: ['clover_club', 'passion_fruit_martini', 'french_75', 'cosmopolitan']
  },
  {
    id: 'irritated',
    labelUa: 'Дратівливий / Все бісить',
    labelEn: 'Irritated / Annoyed',
    emoji: '😤',
    colorClass: 'from-amber-700 via-orange-800 to-stone-900 text-amber-200 border-amber-600',
    taglineUa: 'Коли найдрібніша деталь виводить з рівноваги',
    taglineEn: 'When even the smallest hiccup tests your remaining patience',
    psychologicalDescriptionUa: 'Підвищена збудливість ЦНС. Потрібен холодний баланс кислоти та свіжості — цитрусові сауери чи освіжаючий грейпфрут швидко збивають напругу та повертають фокус.',
    psychologicalDescriptionEn: 'Heightened central nervous system agitation. Cold citrus-sour balance instantly breaks mental loops and restores grounding.',
    cocktailVibeUa: 'Класичний Whiskey Sour, освіжаюча Paloma або Margarita з сіллю.',
    cocktailVibeEn: 'Classic Whiskey Sour, refreshing Paloma, or crisp salted Margarita.',
    recommendedIds: ['whiskey_sour', 'paloma', 'margarita', 'amaretto_sour']
  },
  {
    id: 'fed_up',
    labelUa: 'Все дістало',
    labelEn: 'Fed Up / Done With Everything',
    emoji: '🤯',
    colorClass: 'from-stone-800 to-zinc-950 text-stone-200 border-stone-700',
    taglineUa: 'Коли ресурс вичерпано на 101% і хочеться тиші',
    taglineEn: 'When your mental battery is at 0% and you just want silence',
    psychologicalDescriptionUa: 'Глибока сенсорна перевантаженість. Протипоказані солодкі приторні сиропи. Необхідний міцний, прямий, чесний смак чистого релаксу — без зайвого пафосу.',
    psychologicalDescriptionEn: 'Deep sensory overload. Avoid cloying sweet syrups. Needs an honest, structured, no-nonsense spirit profile to anchor the evening.',
    cocktailVibeUa: 'Безкомпромісний Negroni, сухий Dry Martini або класичний Old Fashioned.',
    cocktailVibeEn: 'Uncompromising Negroni, crisp Dry Martini, or timeless Old Fashioned.',
    recommendedIds: ['negroni', 'dry_martini', 'old_fashioned', 'manhattan']
  },
  {
    id: 'cosmic_sorrow',
    labelUa: 'Всесвітня печаль',
    labelEn: 'Cosmic Sorrow / Weltschmerz',
    emoji: '🌌',
    colorClass: 'from-slate-900 via-indigo-950 to-stone-900 text-indigo-200 border-indigo-700',
    taglineUa: 'Філософські роздуми про крихкість буття та таємниці всесвіту',
    taglineEn: 'Philosophical contemplation of the fragility of existence',
    psychologicalDescriptionUa: 'Екзистенційне занурення. Потрібні складні шари аромату: торф’яний дим шотландського віскі, трави альпійських біттерів або витриманий хересний дуб.',
    psychologicalDescriptionEn: 'Deep existential contemplation. Demands complex multi-layered aromatics: peaty scotch smoke, Alpine herbal bitters, and aged oak.',
    cocktailVibeUa: 'Димний Penicillin, гірко-пряний Boulevardier, Sazerac або Rusty Nail.',
    cocktailVibeEn: 'Smoky Penicillin, bittersweet Boulevardier, Sazerac, or honeyed Rusty Nail.',
    recommendedIds: ['penicillin', 'boulevardier', 'sazerac', 'rusty_nail']
  },
  {
    id: 'stress',
    labelUa: 'Стрес / Дедлайн',
    labelEn: 'Stress & Deadlines',
    emoji: '⚡',
    colorClass: 'from-rose-700 to-amber-700 text-white border-rose-500',
    taglineUa: 'Коли мозок перегрівся від дзвінків і нескінченних тасок',
    taglineEn: 'When your brain is fried by non-stop task notifications',
    psychologicalDescriptionUa: 'Високий рівень кортизолу. Округлий витриманий віскі та цитрусовий біттер м’яко активують парасимпатичну нервову систему.',
    psychologicalDescriptionEn: 'High cortisol and tight neck muscles. Smooth bourbon and aromatic bitters gently trigger parasympathetic decompression.',
    cocktailVibeUa: 'Шовковий Old Fashioned, Penicillin або Manhattan.',
    cocktailVibeEn: 'Silky Old Fashioned, Penicillin, or Manhattan.',
    recommendedIds: ['old_fashioned', 'penicillin', 'manhattan', 'dark_and_stormy']
  },
  {
    id: 'tiredness',
    labelUa: 'Втома / Без сил',
    labelEn: 'Deep Fatigue',
    emoji: '🔋',
    colorClass: 'from-emerald-800 to-teal-900 text-teal-200 border-emerald-600',
    taglineUa: 'Відновити внутрішній ресурс після важкого дня',
    taglineEn: 'Recharge your inner battery after a long sprint',
    psychologicalDescriptionUa: 'Фізичне та ментальне виснаження. Потрібні імбир, мед, цитрусовий вітамін С і помірний алкоголь без важкого сп\'яніння.',
    psychologicalDescriptionEn: 'Physical exhaustion. Needs ginger root, wild honey, vitamin C and light refreshing effervescence.',
    cocktailVibeUa: 'Імбирний Moscow Mule, гарячий Hot Toddy або цитрусова Paloma.',
    cocktailVibeEn: 'Ginger-packed Moscow Mule, warming Hot Toddy, or citrusy Paloma.',
    recommendedIds: ['moscow_mule', 'hot_toddy', 'paloma', 'dark_and_stormy']
  },
  {
    id: 'zen',
    labelUa: 'Абсолютний Дзен',
    labelEn: 'Absolute Zen / Chill',
    emoji: '🧘',
    colorClass: 'from-cyan-700 to-sky-900 text-cyan-200 border-cyan-500',
    taglineUa: 'Повна внутрішня гармонія і спокійний плин думок',
    taglineEn: 'Total calm, meditative equilibrium and steady mind',
    psychologicalDescriptionUa: 'Стан балансу. Напій не квапить: освіжаючий бокал із повільним таненням льоду, м\'ятою, базиліком чи свіжим огірком.',
    psychologicalDescriptionEn: 'Equilibrium state. Drink that rewards slow sips with cool botanical herbs, mint, and crisp cucumber.',
    cocktailVibeUa: 'Gin Basil Smash, класичний Gin Tonic або соковитий Mojito.',
    cocktailVibeEn: 'Gin Basil Smash, classic Gin & Tonic, or fresh mint Mojito.',
    recommendedIds: ['gin_basil_smash', 'gin_tonic', 'mojito', 'cuba_libre']
  },
  {
    id: 'party_beast',
    labelUa: 'Нічний рознос',
    labelEn: 'Party Beast / Wild Night',
    emoji: '🚀',
    colorClass: 'from-fuchsia-600 via-purple-600 to-amber-500 text-white border-fuchsia-400',
    taglineUa: 'Коли завтра не існує, музика качає, а ніч тільки починається',
    taglineEn: 'When the beat drops, tomorrow is canceled and the night begins',
    psychologicalDescriptionUa: 'Пікова екстраверсія та драйв. Шаруваті палаючі шоти або міцні тропічні комбінації для максимального відриву.',
    psychologicalDescriptionEn: 'Full extroverted party momentum. Layered flaming shooters or multi-spirit tropical giants for uninhibited celebration.',
    cocktailVibeUa: 'Палаючий B-52, тропічний Mai Tai, Zombie або Long Island.',
    cocktailVibeEn: 'Layered B-52 shot, tropical Mai Tai, Zombie, or Long Island Iced Tea.',
    recommendedIds: ['b52', 'mai_tai', 'zombie', 'long_island']
  },
  {
    id: 'adventurous',
    labelUa: 'Жага пригод',
    labelEn: 'Adventurous Spirit',
    emoji: '🧭',
    colorClass: 'from-amber-600 to-emerald-700 text-white border-amber-500',
    taglineUa: 'Спробувати щось незвичне, екзотичне та несподіване',
    taglineEn: 'Craving bold flavor alchemy and untamed exotic concoctions',
    psychologicalDescriptionUa: 'Пошук нових нейронних вражень. Підходять копчені мескалі, складні тікі-ром коктейлі з фалернумом або кисло-солодкий Pisco Sour.',
    psychologicalDescriptionEn: 'Novelty seeking. Complex botanical tiki rums, smoky Oaxaca mezcals, or velvety Peruvian Pisco Sour.',
    cocktailVibeUa: 'Перуанський Pisco Sour, Bramble з ожиною, або димний Mezcal Sour.',
    cocktailVibeEn: 'Peruvian Pisco Sour, berry-rich Bramble, or smoky Mezcal Sour.',
    recommendedIds: ['pisco_sour', 'bramble', 'mezcal_sour', 'singapore_sling']
  }
];
