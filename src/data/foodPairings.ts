import { FoodPairingItem } from '../types';

export const FOOD_PAIRINGS_DATABASE: FoodPairingItem[] = [
  {
    id: 'whiskey',
    category: 'Віскі та Бурбон',
    categoryEn: 'Whisky & Bourbon',
    icon: 'Flame',
    bestDishes: [
      'Соковитий яловичий стейк (Рибай, Нью-Йорк) на грилі',
      'Копчена качина грудка або реберця BBQ',
      'Запечений лосось з димком'
    ],
    bestDishesEn: [
      'Juicy grilled Ribeye or NY Strip steak',
      'Smoked duck breast or sticky glazed BBQ ribs',
      'Cedar plank smoked wild salmon'
    ],
    idealSnacks: [
      'Темний гіркий шоколад (75–85% какао)',
      'Витримані тверді сири (Чеддер, Гауда 24 міс., Пармезан)',
      'Смажений мигдаль, волоські горіхи та сушений інжир'
    ],
    idealSnacksEn: [
      'Dark single-origin chocolate (75-85% cacao)',
      'Aged hard cheeses (vintage Cheddar, Gouda 24mo, Parmigiano)',
      'Toasted almonds, pecans, and dried figs'
    ],
    worstMistakes: [
      'Надто гострі азійські соуси каррі (палять рецептори)',
      'Мариновані огірки в оцті (кислота конфліктує з танінами дуба)'
    ],
    worstMistakesEn: [
      'Scorching fiery curries that numb your palate',
      'Harsh vinegar pickles fighting with oak tannins'
    ],
    sommelierRule: 'Торф\'яний острівний скотч ідеально доповнює копченості та устриці, а солодкий кентуккійський бурбон — шоколад, пекан та карамелізоване м\'ясо.',
    sommelierRuleEn: 'Peaty Islay scotches sing with smoked meats and fresh briny oysters, while sweet Kentucky bourbon thrives beside dark chocolate and pecan pie.'
  },
  {
    id: 'vodka',
    category: 'Горілка та Наливки',
    categoryEn: 'Vodka & Traditional Spirits',
    icon: 'Utensils',
    bestDishes: [
      'Традиційний гарячий український борщ з пампушками та часником',
      'Запечена буженина, домашня ковбаса з хроном',
      'Вареники з м\'ясом або картоплею та шкварками'
    ],
    bestDishesEn: [
      'Hot authentic Ukrainian borscht with garlic pampushky',
      'Slow-roasted pork loin with spicy horseradish',
      'Varenyky dumplings with potato, meat, and crispy cracklings'
    ],
    idealSnacks: [
      'Тонко нарізане генеральське сало на чорному житньому хлібі',
      'Хрусткі квашені огірки та помідори з бочки',
      'Малосольний оселедець з ялтинською фіолетовою цибулею'
    ],
    idealSnacksEn: [
      'Paper-thin cured Ukrainian salo on dark sourdough rye bread',
      'Barrel-fermented crispy dill pickles and sauerkraut',
      'Salted herring fillet with sweet marinated onions'
    ],
    worstMistakes: [
      'Торти та масляні солодкі тістечка (цукор змушує алкоголь бити в голову вдвічі швидше)',
      'Гарячі безалкогольні напої'
    ],
    worstMistakesEn: [
      'Super sweet frosting cakes (sugar accelerates rapid ethanol spikes)',
      'Hot non-alcoholic sugary drinks'
    ],
    sommelierRule: 'Горілка — нейтральний гастрономічний партнер. Їй потрібні солоні, ферментовані та помірно жирні страви, які запускають вироблення шлункового соку.',
    sommelierRuleEn: 'Vodka is a pristine culinary canvas requiring savory, fermented, and rich textured foods to stimulate natural digestion.'
  },
  {
    id: 'gin',
    category: 'Джин та Коктейлі з джином',
    categoryEn: 'Gin & Botanical Cocktails',
    icon: 'Sparkles',
    bestDishes: [
      'Свіжі морепродукти (устриці з лимоном, севіче з дорадо)',
      'Тартар з лосося з авокадо та каперсами',
      'Куряче філе з розмарином та лимоном на грилі'
    ],
    bestDishesEn: [
      'Fresh raw oysters with lemon mignonette, dorado ceviche',
      'Salmon tartare with avocado and capers',
      'Herb-crusted grilled chicken breast with rosemary'
    ],
    idealSnacks: [
      'Оливки сорту Каламата або Кастельветрано',
      'М\'які козячі сири (Chevre) та свіжий сир Фета',
      'Хрусткі скибочки свіжого огірка з морською сіллю'
    ],
    idealSnacksEn: [
      'Castelvetrano and Kalamata green olives',
      'Creamy goat cheese (Chèvre) and Greek Feta',
      'Crisp English cucumber slices with flaky sea salt'
    ],
    worstMistakes: [
      'Жирна смажена свинина або баранина (забиває тонкий ялівцевий букет)',
      'Надмірно солодкі десерти'
    ],
    worstMistakesEn: [
      'Heavy greasy lamb chops (overwhelms delicate botanicals)',
      'Syrupy chocolate desserts'
    ],
    sommelierRule: 'Джин — це симфонія ялівцю, трав та цитрусів. Обирай до нього зелені салати, свіжі морепродукти та цитрусові акценти.',
    sommelierRuleEn: 'Gin celebrates juniper, herbs, and citrus: pair with crisp greens, ocean crudo, and bright aromatic accents.'
  },
  {
    id: 'wine',
    category: 'Вино (Червоне, Біле, Ігристе)',
    categoryEn: 'Wine (Red, White & Sparkling)',
    icon: 'Wine',
    bestDishes: [
      'Червоне сухе: Каре ягняти з травами, качка конфі, яловичина Веллінгтон',
      'Біле сухе: Запечена річкова форель, ризото з морепродуктами, паста з вершковим соусом',
      'Ігристе (Brut): Свіжі устриці, канапе з червоною ікрою, полуниця'
    ],
    bestDishesEn: [
      'Dry Red: Herb-crusted rack of lamb, duck confit, Beef Wellington',
      'Dry White: Pan-seared trout, seafood risotto, fettuccine Alfredo',
      'Sparkling Brut: Fresh oysters, red caviar blinis, crisp tempura'
    ],
    idealSnacks: [
      'Сирна тарілка (Брі, Камамбер, Горгонзола, Пармезан) з медом',
      'В\'ялена шинка Прошуто ді Парма або Хамон',
      'Грісіні, оливки та стиглий виноград'
    ],
    idealSnacksEn: [
      'Artisanal cheese board (Brie, Camembert, Gorgonzola) with honey',
      'Prosciutto di Parma, Jamón Ibérico',
      'Artisan grissini, green olives, and fresh grapes'
    ],
    worstMistakes: [
      'Оцтові салати та майонезні заправки (руйнують кислотність вина)',
      'Артишоки та спаржа з червоним вином (дають металевий присмак)'
    ],
    worstMistakesEn: [
      'Heavy vinegar dressings (clashes with natural wine acidity)',
      'Raw artichokes with heavy red wine (creates metallic aftertaste)'
    ],
    sommelierRule: 'Правило теруару: вино та їжа з одного регіону завжди ідеально пасують (наприклад, К\'янті до флорентійського біфштексу, Шаблі до устриць).',
    sommelierRuleEn: 'Terroir harmony: local wine instinctively matches local cuisine (Chianti with Bistecca Fiorentina, Chablis with fresh oysters).'
  },
  {
    id: 'tequila',
    category: 'Текіла та Мескаль',
    categoryEn: 'Tequila & Mezcal',
    icon: 'Sun',
    bestDishes: [
      'Тако з тушкованою яловичиною Біррія або свининою Аль Пастор',
      'Фахітас з куркою на гарячій сковороді з перцем чилі',
      'Креветки у часниково-лаймовому маринаді'
    ],
    bestDishesEn: [
      'Beef Birria tacos or Al Pastor pork with pineapple',
      'Sizzling chicken fajitas with charred peppers',
      'Garlic-lime marinated grilled prawns'
    ],
    idealSnacks: [
      'Свіжий гуакамоле зі стиглих авокадо з кукурудзяними начос',
      'Часточки стиглого апельсина з сумішшю морської солі та перцю чилі',
      'Сальса піко де гайо з кінзою та соком лайма'
    ],
    idealSnacksEn: [
      'Fresh guacamole with crispy corn tortilla chips',
      'Orange slices dipped in chili-salt spice mix',
      'Pico de Gallo salsa with fresh cilantro and lime'
    ],
    worstMistakes: [
      'Вершкові молочні супи',
      'Дуже солодкі тістечка з масляним кремом'
    ],
    worstMistakesEn: [
      'Heavy dairy soups',
      'Overly sweet buttercream pastries'
    ],
    sommelierRule: 'Текіла обожнює свіжу кислотність лайма, пікантність кінзи та жирну ніжність авокадо.',
    sommelierRuleEn: 'Agave spirits love the zesty punch of fresh lime, fragrant cilantro, and the creamy richness of ripe avocado.'
  }
];
