import { CrazyCocktail, Language } from '../types';

export interface CrazyRecipeTemplate {
  titleUa: string;
  titleEn: string;
  taglineUa: string;
  taglineEn: string;
  dangerLevel: number;
  ingredientsUa: string[];
  ingredientsEn: string[];
  instructionsUa: string[];
  instructionsEn: string[];
  morningEffectUa: string;
  morningEffectEn: string;
}

export const CRAZY_COCKTAIL_TEMPLATES: CrazyRecipeTemplate[] = [
  {
    titleUa: '«Сльози Бухгалтера перед Звітом»',
    titleEn: '«Accountant Tears at 3 AM»',
    taglineUa: 'Коктейль, після якого 1С починає говорити латиною та прощати податки',
    taglineEn: 'A potion that makes Excel spreadsheets whisper in ancient Latin',
    dangerLevel: 5,
    ingredientsUa: [
      'Горілка перцівка домашня — 60 мл',
      'Сльози головного бухгалтера за 4-й квартал — 3 краплі',
      'Енергетик Red Bull — 100 мл',
      'Подвійне еспресо без цукру — 30 мл',
      'Гілочка розмарину (підпалена) для аромату паніки'
    ],
    ingredientsEn: [
      'Craft pepper vodka — 60 ml',
      'Q4 accountant tears — 3 drops',
      'Red Bull energy potion — 100 ml',
      'Double espresso zero sugar — 30 ml',
      'Flaming rosemary sprig (infused with pure panic)'
    ],
    instructionsUa: [
      'Влити все у металевий термос.',
      'Інтенсивно потрясти, заплющивши очі та згадуючи податкові перевірки.',
      'Подавати у гранчастому стакані без соломинки.'
    ],
    instructionsEn: [
      'Pour everything into an industrial steel thermos.',
      'Shake violently while recalling unresolved Jira tickets.',
      'Serve in a chipped highball with no mercy.'
    ],
    morningEffectUa: 'Повне перезавантаження особистості, здатність рахувати в умі до трильйона і непереборне бажання поїхати в Карпати пасти вівці.',
    morningEffectEn: 'Spontaneous ability to calculate derivatives mentally and an overwhelming urge to live off the grid as a mountain shepherd.'
  },
  {
    titleUa: '«Нічний Дедлайн на Дизель-Генераторі»',
    titleEn: '«Blackout Diesel Generator Rush»',
    taglineUa: 'Коли немає світла, немає зв\'язку, але реліз повинен вийти до ранку',
    taglineEn: 'No grid power, no Wi-Fi, but production deploy is due in 2 hours',
    dangerLevel: 4,
    ingredientsUa: [
      'Темний ром 73% (Overproof) — 50 мл',
      'Холодний міцний пуер або енергетик — 80 мл',
      'Крапля дизельного пального (символічно, замінити на сироп копченого дуба) — 10 мл',
      'Шматочок чорного шоколаду 99% замість льоду',
      'Аскорбінова кислота — 1 пакетик'
    ],
    ingredientsEn: [
      'Overproof Dark Rum 73% — 50 ml',
      'Cold brewed Pu-erh tea or Monster Energy — 80 ml',
      'Smoked oak syrup (diesel vibe) — 10 ml',
      'Block of 99% dark chocolate instead of ice',
      'Vitamin C booster pack — 1 sachet'
    ],
    instructionsUa: [
      'Змішати під гуркіт генератора на балконі.',
      'Пити при світлі налобного ліхтарика залпом.',
      'Заїсти сирою кавовою зерниною.'
    ],
    instructionsEn: [
      'Mix under the rhythmic roar of a balcony generator.',
      'Gulp in one go under headlamp illumination.',
      'Chew a roasted coffee bean for instant overclocking.'
    ],
    morningEffectUa: 'Здатність бачити в темряві, повна відсутність страху перед замовниками та заряд енергії до вечора вівторка.',
    morningEffectEn: 'Night vision superpowers, total immunity to client feedback, and unyielding energy until Tuesday.'
  },
  {
    titleUa: '«Козацький Чорнобиль»',
    titleEn: '«Cossack Chornobyl Reactor»',
    taglineUa: 'Екстремальний шот, здатний розтопити кригу в серці та запустити турбіни',
    taglineEn: 'An extreme shot engineered to melt permafrost and ignite internal turbines',
    dangerLevel: 5,
    ingredientsUa: [
      'Самогон подвійного перегону на буряку 65° — 40 мл',
      'Табаско екстра-гострий — 5 крапель',
      'Хрін тертий гострий — 1/2 чайної ложки',
      'Томатний сік густий з сіллю — 30 мл',
      'Шматочок підкопченого сала на шпажці'
    ],
    ingredientsEn: [
      '65% Double-distilled beet moonshine — 40 ml',
      'Extra-hot Tabasco — 5 drops',
      'Fiery grated horseradish — 1/2 tsp',
      'Thick salted tomato juice — 30 ml',
      'Smoked salo cube on a skewer'
    ],
    instructionsUa: [
      'Викласти шарами: сік з хроном на дно, зверху по лезу ножа міцний дистилят.',
      'Капнути табаско в центр, щоб він завис вогняною краплею.',
      'Випити залпом, закурити салом і голосно крикнути «ГЕЙ!»'
    ],
    instructionsEn: [
      'Layer tomato juice and horseradish at the bottom, float 65% spirit on top using a bar spoon.',
      'Drop fiery Tabasco into the eye of the storm.',
      'Down in one shot, bite the salo, and roar proudly.'
    ],
    morningEffectUa: 'Всі віруси та бактерії у радіусі 5 метрів самоліквідуються. Голос стає оксамитовим баритоном.',
    morningEffectEn: 'All known pathogens within a 5-meter perimeter surrender. Your voice drops into a heroic velvet baritone.'
  },
  {
    titleUa: '«Квантова Медовуха Баби Галі»',
    titleEn: '«Baba Galya’s Quantum Mead»',
    taglineUa: 'Рецепт знайдено на пожовклому пергаменті в скрині на горищі у селі',
    taglineEn: 'Found on an ancient yellowed parchment inside a village attic chest',
    dangerLevel: 3,
    ingredientsUa: [
      'Карпатська медовуха витримана — 50 мл',
      'Яблучний сидр натурального бродіння — 100 мл',
      'Сироп бузини та чебрецю — 20 мл',
      'Крижані ягоди журавлини та обліпихи — жменя',
      'Паличка кориці для перемішування'
    ],
    ingredientsEn: [
      'Aged Carpathian honey mead — 50 ml',
      'Wild fermented apple cider — 100 ml',
      'Elderberry & wild thyme syrup — 20 ml',
      'Frozen cranberries and sea buckthorn — 1 handful',
      'Cinnamon stick stirrer'
    ],
    instructionsUa: [
      'Потовкти ягоди на дні глиняного куманця.',
      'Додати медовуху, сидр та сироп трав.',
      'Перемішати паличкою кориці 33 рази за годинниковою стрілкою.'
    ],
    instructionsEn: [
      'Muddle wild berries in an earthen chalice.',
      'Add aged mead, crisp cider, and herbal syrup.',
      'Stir 33 times clockwise with a cinnamon stick.'
    ],
    morningEffectUa: 'Душевний спокій рівня буддійського монаха, запах польових квітів та раптове знання 40 українських народних пісень.',
    morningEffectEn: 'Enlightenment comparable to Tibetan monks, aroma of wild meadow honey, and fluency in traditional folklore.'
  },
  {
    titleUa: '«Сповідь Сисадміна в Серверній»',
    titleEn: '«Sysadmin Server Room Confession»',
    taglineUa: 'Коли впали всі DNS, а користувачі продовжують питати "чому не робить інтернет"',
    taglineEn: 'When root DNS fails and users keep asking if the Wi-Fi is on',
    dangerLevel: 4,
    ingredientsUa: [
      'Джин Лондонський Сухий — 50 мл',
      'Ізотонік блакитний (Powerade) — 80 мл',
      'М\'ятний лікер (Crème de Menthe) — 20 мл',
      'Лимонний фреш — 15 мл',
      'Оптичний кабель замість трубочки (символічно)'
    ],
    ingredientsEn: [
      'London Dry Gin — 50 ml',
      'Neon Blue Isotonic drink — 80 ml',
      'Green Crème de Menthe liqueur — 20 ml',
      'Fresh lemon juice — 15 ml',
      'Decorative patch-cord garnish'
    ],
    instructionsUa: [
      'Змішати у шейкері під монотонний гул серверних кулерів (температура подачі -5°C).',
      'Процідити у келих з крижаною підсвіткою.',
      'Пити повільно, промовляючи: "sudo apt-get upgrade life".'
    ],
    instructionsEn: [
      'Shake vigorously to the rhythm of server cooling fans at -5°C.',
      'Strain into a neon-glowing highball.',
      'Sip slowly while chanting "sudo apt-get upgrade life".'
    ],
    morningEffectUa: 'Ping до найближчого кавового апарату падає до 0.1 мс. Відсутність бажання відповідати на дзвінки.',
    morningEffectEn: 'Network latency to nearest espresso machine drops to 0.1ms. Absolute zero tolerance for trivial tickets.'
  },
  {
    titleUa: '«Армагеддон на Контрактовій»',
    titleEn: '«Kontraktova Square Armageddon»',
    taglineUa: 'Коктейль для тих, хто планував зайти в бар "на один сидр" о 19:00',
    taglineEn: 'For those who promised to "just grab one light cider" at 7 PM',
    dangerLevel: 5,
    ingredientsUa: [
      'Текіла Репосадо — 30 мл',
      'Бурбон — 30 мл',
      'Абсент 70% — 15 мл',
      'Малиновий кордіал — 20 мл',
      'Ігристе просекко — долити до верху'
    ],
    ingredientsEn: [
      'Tequila Reposado — 30 ml',
      'Kentucky Bourbon — 30 ml',
      'Green Absinthe 70% — 15 ml',
      'Raspberry cordial — 20 ml',
      'Dry Prosecco — top up'
    ],
    instructionsUa: [
      'З\'єднати міцні спирти у високому келиху.',
      'Долити малиновий кордіал для оманливо ніжного рожевого кольору.',
      'Увінчати вибуховим ігристим вином.'
    ],
    instructionsEn: [
      'Combine hard spirits in a tall Collins glass.',
      'Add raspberry cordial for a deceptive pink hue.',
      'Crown with bubbling dry Prosecco.'
    ],
    morningEffectUa: 'Ви прокинетеся в іншому районі міста, у чужих сонцезахисних окулярах, але з відчуттям повної величі.',
    morningEffectEn: 'You will wake up in a completely different neighborhood wearing someone else\'s designer shades with supreme swagger.'
  },
  {
    titleUa: '«Борщ зі Спрайтом і Самогоном»',
    titleEn: '«Borsch, Sprite & Holy Moonshine»',
    taglineUa: 'Кулінарний декаданс на стику високої гастрономії та божевілля',
    taglineEn: 'Avant-garde mixology at the crossroads of Ukrainian borsch and sheer madness',
    dangerLevel: 3,
    ingredientsUa: [
      'Настоянка на буряку та чорносливі — 45 мл',
      'Бульйон овочевий прозорий (охолоджений) — 30 мл',
      'Газований лимонад Sprite або Tonic — 60 мл',
      'Свіжий кріп та гілочка петрушки',
      'Крапля часникового біттеру'
    ],
    ingredientsEn: [
      'Beetroot and smoked prune infusion — 45 ml',
      'Chilled clarified vegetable bouillon — 30 ml',
      'Crisp Sprite or floral tonic — 60 ml',
      'Fresh dill sprig and parsley garnish',
      '1 dash of aromatic garlic bitter'
    ],
    instructionsUa: [
      'Збити бурякову настоянку з бульйоном та часниковим біттером у шейкері з льодом.',
      'Перелити у келих рокс, долити спрайтом для ігристої бульбашкової текстури.',
      'Прикрасити розтертим свіжим кропом.'
    ],
    instructionsEn: [
      'Shake beet infusion with chilled broth and garlic bitters.',
      'Strain into a rocks glass over a massive ice cube, top with Sprite for effervescence.',
      'Garnish with bruised fresh dill.'
    ],
    morningEffectUa: 'Неймовірний апетит на гарячі пампушки з часником та непереможний імунітет.',
    morningEffectEn: 'Immense craving for hot garlic pampushky bread and ironclad immunity to cold weather.'
  },
  {
    titleUa: '«Дзвінок Військкому о 4-й Ранку»',
    titleEn: '«4 AM Tactical Recall»',
    taglineUa: 'Адреналіновий шок з максимальним коефіцієнтом тверезості',
    taglineEn: 'Adrenaline spike with an instant clarity coefficient',
    dangerLevel: 4,
    ingredientsUa: [
      'Міцний ялівцевий джин — 40 мл',
      'Грейпфрутовий фреш з гірчинкою — 50 мл',
      'Еспресо тонік — 50 мл',
      'Дрібка морської солі та порошку перцю чилі на обідок келиха'
    ],
    ingredientsEn: [
      'Navy Strength Gin 57% — 40 ml',
      'Tart pink grapefruit juice — 50 ml',
      'Espresso Tonic blend — 50 ml',
      'Sea salt & chili pepper crust rim'
    ],
    instructionsUa: [
      'Зробити соляно-перцевий обідок (красту) на келиху.',
      'Налити холодний джин з грейпфрутом, обережно нашарувати еспресо тонік.',
      'Пити через перцевий обідок без зупинки.'
    ],
    instructionsEn: [
      'Rim the glass with sea salt and fiery cayenne pepper.',
      'Pour gin and tart grapefruit over ice, layer chilled espresso tonic on top.',
      'Sip directly across the chili rim.'
    ],
    morningEffectUa: 'Миттєва стройова підготовка, готовність бігти 10-кілометровий крос з перешкодами.',
    morningEffectEn: 'Tactical alertness, readiness to run a 10k obstacle course before breakfast.'
  }
];

// Procedural random cocktail generator when clicking multiple times
export function generateProceduralCrazyCocktail(language: Language): CrazyCocktail {
  const isUa = language === 'uk';
  const randomIndex = Math.floor(Math.random() * CRAZY_COCKTAIL_TEMPLATES.length);
  const template = CRAZY_COCKTAIL_TEMPLATES[randomIndex];

  // Dynamic variations
  const prefixesUa = ['Аномальний', 'Шалений', 'Опівнічний', 'Карпатський', 'Космічний', 'Пекельний', 'Секретний', 'Непокірний'];
  const prefixesEn = ['Anomalous', 'Unhinged', 'Midnight', 'Carpathian', 'Cosmic', 'Infernal', 'Secret', 'Rebellious'];
  const randomPrefix = isUa
    ? prefixesUa[Math.floor(Math.random() * prefixesUa.length)]
    : prefixesEn[Math.floor(Math.random() * prefixesEn.length)];

  const baseTitle = isUa ? template.titleUa : template.titleEn;
  const uniqueId = `crazy_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  return {
    id: uniqueId,
    name: `${baseTitle}`,
    tagline: isUa ? `${randomPrefix}: ${template.taglineUa}` : `${randomPrefix}: ${template.taglineEn}`,
    dangerLevel: template.dangerLevel,
    ingredients: isUa ? template.ingredientsUa : template.ingredientsEn,
    instructions: isUa ? template.instructionsUa : template.instructionsEn,
    morningEffect: isUa ? template.morningEffectUa : template.morningEffectEn,
    createdAt: new Date().toISOString()
  };
}
