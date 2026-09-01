import { DatingAdviceItem } from '../types';

export const DATING_PSYCHOLOGY_DATABASE: DatingAdviceItem[] = [
  // --- WITH A WOMAN ---
  {
    id: 'woman_first_date',
    scenarioKey: 'woman_first_date',
    targetGender: 'woman',
    title: 'Перше побачення з жінкою: Елегантний старт та легкість',
    titleEn: 'First Date with a Woman: Elegance, Calm & Zero Risk',
    description: 'На першому побаченні коктейль — це соціальне мастило, а не засіб відключити свідомість. Головне правило: тримати темп, обирати естетичні келихи та напій з помірним вмістом алкоголю.',
    descriptionEn: 'On a first date, cocktails are social lubricants, not knockout drops. Pacing, glassware aesthetics, and moderate ABV keep the conversation effortless.',
    rules: [
      'Ніколи не замовляй для неї без її прямої згоди («Хочеш, я пораджу щось цитрусово-свіже чи ягідне?»).',
      'Обирай напої з красивою подачею (купе, винний келих) — це додає естетичного задоволення.',
      'Тримай золоте правило барного етикету: 1 келих води на кожен коктейль.'
    ],
    rulesEn: [
      'Never order for her without asking her flavor preferences first ("Do you prefer citrus-fresh, berry-sweet, or dry?").',
      'Choose drinks with beautiful stemware (coupe, wine glass) for refined aesthetics.',
      'Always order still water for the table immediately.'
    ],
    recommendedDrinksForHer: [
      { name: 'Aperol Spritz / Hugo Spritz', why: 'Легкий, ігристий, свіжий, створює відчуття сонячного свята без швидкого сп\'яніння.', whyEn: 'Sparkling, refreshing, and festive without heavy alcohol load.' },
      { name: 'Clover Club / French 75', why: 'Витончена ягідна шовковистість або легкість ігристого в келиху флюте.', whyEn: 'Velvety raspberry silk or refined champagne sophistication.' },
      { name: 'Gin Basil Smash', why: 'Трав\'яний, свіжий, небанальний вибір сучасної дівчини з гарним смаком.', whyEn: 'Crisp basil aromatics showing modern mixology appreciation.' }
    ],
    recommendedDrinksForYou: [
      { name: 'Negroni / Boulevardier', why: 'Сигнал зрілого смаку, впевненості та розуміння балансу гіркоти.', whyEn: 'Signals mature taste, quiet confidence, and cocktail appreciation.' },
      { name: 'Old Fashioned', why: 'Класика поза часом: підкреслює спокійний, надійний характер.', whyEn: 'Timeless classic reflecting grounded presence and stability.' },
      { name: 'Whiskey Sour', why: 'Стильний, збалансований, не перевантажує міцністю.', whyEn: 'Balanced, approachable craft without appearing pretentious.' }
    ],
    whatToAvoid: [
      'Шоти (B-52, Текіла) на старті — виглядає як спроба швидко напитися.',
      'Лонг Айленд — репутація студентської пиятики.',
      'Напої з різким запахом часнику чи цибулі в гарніші.'
    ],
    whatToAvoidEn: [
      'Taking quick shots right at the beginning — looks like rushing the vibe.',
      'Long Island Iced Tea — screams college frat party.',
      'Drinks with pungent garlicky garnishes unless shared mutually.'
    ],
    psychologicalTip: 'Звертай увагу на те, як вона тримає келих і як часто робить ковтки. Якщо вона п\'є дуже повільно — не підганяй замовленням другого туру. Якщо нервує — замовлена легка закуска зніме напругу.',
    psychologicalTipEn: 'Observe her pace. If she sips slowly, never rush to order round two. Ordering a light sharing plate (olives, bruschetta) creates a cozy shared dynamic.'
  },
  {
    id: 'woman_romantic_dinner',
    scenarioKey: 'woman_romantic_dinner',
    targetGender: 'woman',
    title: 'Романтична вечеря з жінкою: Підігрів пристрасті та тактильність',
    titleEn: 'Romantic Dinner with a Woman: Sensual Warmth & Flirtation',
    description: 'Коли контакт уже встановлено, а вечір переходить у фазу глибоких поглядів і флірту. Час для оксамитових текстур, кавових та ягідних афродизіаків.',
    descriptionEn: 'When chemistry is sparkling and the night shifts to deep eye contact. Time for velvety textures, berry notes, and sensual cacao.',
    rules: [
      'Підбирай коктейль під десерт або основну страву (гастрономічний пейринг).',
      'Запропонуй скуштувати свій напій — це скорочує фізичну дистанцію та створює інтимний момент.',
      'Переходьте на більш камерну атмосферу з теплим м\'яким світлом.'
    ],
    rulesEn: [
      'Pair the drink with dessert or food course harmony.',
      'Offer her a sip of your drink — sharing tastes builds tactile trust.',
      'Move toward cozy lighting and unhurried conversation.'
    ],
    recommendedDrinksForHer: [
      { name: 'Espresso Martini', why: 'Шоколадно-кавовий оксамит + легкий заряд енергії для продовження ночі.', whyEn: 'Decadent coffee-chocolate crema + energy boost for late hours.' },
      { name: 'Passion Fruit Martini', why: 'Тропічна маракуйя з шотом просекко — вибух сексуальності та гри.', whyEn: 'Luscious passion fruit with a side shot of prosecco.' },
      { name: 'White Russian', why: 'Ніжний кремовий смак, наче рідкий дорогий десерт.', whyEn: 'Silky dessert comfort in a glass.' }
    ],
    recommendedDrinksForYou: [
      { name: 'Manhattan / Godfather', why: 'Глибокий, солодкувато-горіховий, дорослий напій для неспішної бесіди.', whyEn: 'Deep almond/cherry warmth tailored for close conversation.' },
      { name: 'Penicillin', why: 'Мед, імбир і легкий дим створюють магнетичний затишок.', whyEn: 'Smoky honey-ginger complexity with irresistible magnetism.' }
    ],
    whatToAvoid: [
      'Пиво у пляшці на романтичній вечері — руйнує естетику і викликає здуття живота.',
      'Перебір з надмірно цукровими сиропами.'
    ],
    whatToAvoidEn: [
      'Bottled lager at a candlelit table — ruins intimacy and causes bloating.',
      'Overly sugary syrup bombs that guarantee a midnight headache.'
    ],
    psychologicalTip: 'Спільний смаковий досвід активує лімбічну систему мозку, що відповідає за емоційну прив\'язаність. Комплімент її вибору або спільне відкриття нового коктейлю запам\'ятається надовго.',
    psychologicalTipEn: 'Shared sensory discoveries activate the brain\'s emotional bonding centers. Complimenting her palate leaves an indelible warm memory.'
  },
  {
    id: 'woman_decoder',
    scenarioKey: 'woman_decoder',
    targetGender: 'woman',
    title: 'Психологічний декодер: Що говорить її замовлення про характер',
    titleEn: 'The Decoder: What Her Cocktail Choice Reveals',
    description: 'Швидкий навігатор по психологічних типажах жінки за її улюбленим напоєм у барі.',
    descriptionEn: 'A psychological field guide to female personality archetypes through cocktail choices.',
    rules: [
      'Це орієнтир для розмови та жартів, а не суворий діагноз!',
      'Використовуй ці знання для легкого грайливого підколювання.'
    ],
    rulesEn: [
      'Use this for witty banter and observant jokes, not rigid stereotyping!',
      'Delight her with playful observation about her flavor personality.'
    ],
    recommendedDrinksForHer: [
      { name: 'Сухий Джин-Тонік або Мартіні з оливкою', why: 'Прямолінійна, впевнена жінка, яка точно знає, чого хоче від життя і не терпить фальші.', whyEn: 'Direct, sharp-witted, elegant woman who values authentic quality.' },
      { name: 'Negroni / Campari Bitter', why: 'Смілива, інтелектуальна, любить складні емоції та нестандартні пригоди.', whyEn: 'Bold, cultured, adventurous mind drawn to complex bittersweet tastes.' },
      { name: 'Aperol Spritz / Bellini', why: 'Життєрадісна, комунікабельна, любить естетику, подорожі та легкість.', whyEn: 'Outgoing, sunny, aesthetic lover who celebrates every weekend.' },
      { name: 'Витриманий віскі / Бурбон', why: 'Рідкісний скарб: самодостатня, глибока, цінує справжній зміст більше за обгортку.', whyEn: 'Rare gem: deeply independent, authentic, and delightfully confident.' }
    ],
    recommendedDrinksForYou: [],
    whatToAvoid: [
      'Не повчай її про те, «як правильно пити» — це вбиває романтику.',
      'Не коментуй калорійність її коктейлю.'
    ],
    whatToAvoidEn: [
      'Never lecture her on "how to drink properly" — major mood killer.',
      'Never mention calories or sugar content.'
    ],
    psychologicalTip: 'Коли вона замовляє коктейль, скажи: «Цікавий вибір. Це показує, що ти цінуєш гармонію...» і запитай, чому саме цей напій її улюблений.',
    psychologicalTipEn: 'Ask warmly: "Great pick! What drew you to this flavor profile first?" — opens an authentic conversational door.'
  },

  // --- WITH A MAN ---
  {
    id: 'man_first_date',
    scenarioKey: 'man_first_date',
    targetGender: 'man',
    title: 'Перше побачення з чоловіком: Впевненість, тонкий смак та гармонія',
    titleEn: 'First Date with a Man: Confidence, Sophistication & Ease',
    description: 'Як почуватися невимушено, підібрати напій, що підкреслить твою індивідуальність, та створити атмосферу довіри та взаємного інтересу.',
    descriptionEn: 'How to feel confident and poised, choose drinks that showcase your authentic taste, and spark mutual fascination.',
    rules: [
      'Обирай напій, який справді любиш, а не те, що «прийнято замовляти». Автентичність — найпривабливіша риса.',
      'Якщо він вагається з вибором, запропонуй звернути увагу на авторську карту бару або твій улюблений класичний твіст.',
      'Пам\'ятай про баланс: пийте не поспішаючи, насолоджуючись смаком і діалогом.'
    ],
    rulesEn: [
      'Order what you genuinely love rather than what feels expected. Authenticity is the ultimate charisma.',
      'If he hesitates, suggest checking out the signature craft section or your favorite twist.',
      'Savor the drink slowly to allow natural conversational rhythm to build.'
    ],
    recommendedDrinksForHer: [
      { name: 'Paloma / Gin Basil Smash', why: 'Свіжий, харизматичний, не надто солодкий вибір, що показує сучасний витончений смак.', whyEn: 'Vibrant, refreshing, unpretentious craft choice radiating great energy.' },
      { name: 'Dry Martini / French 75', why: 'Класика вищої ліги: підкреслює жіночність, гострий розум та елегантність.', whyEn: 'High-society icon showing sharp wit, poise, and sophistication.' },
      { name: 'Negroni / Boulevardier', why: 'Справжній вау-ефект: чоловіки захоплюються жінками, які оцінили шляхетну гіркоту біттерів.', whyEn: 'Instant admiration magnet: reveals boldness, character, and mixology confidence.' }
    ],
    recommendedDrinksForYou: [
      { name: 'Old Fashioned / Sazerac', why: 'Солідний, надійний вибір, що транслює впевненість у собі та повагу до традицій.', whyEn: 'Solid, grounded classic reflecting quiet confidence and dignity.' },
      { name: 'Whiskey Sour / Penicillin', why: 'Пряний, збалансований баланс диму чи цитрусу — відкритість до діалогу.', whyEn: 'Approachable nuance combining citrus cut with whiskey depth.' },
      { name: 'Dark and Stormy', why: 'Карибський ром та імбир — ознака енергійного авантюриста з чудовим гумором.', whyEn: 'Spicy ginger and rum highlighting adventurous personality and humor.' }
    ],
    whatToAvoid: [
      'Демонстративно замовляти найдорожчий напій лише заради ціни.',
      'Критикувати його смак або вибір («Ти що, п\'єш таке?!»).',
      'Пити залпом або замовляти занадто міцні шоти поспіль.'
    ],
    whatToAvoidEn: [
      'Ordering the most expensive bottle solely to test his budget.',
      'Judging or mocking his drink preference ("You drink that?!").',
      'Downing drinks too quickly or chaining high-proof shots.'
    ],
    psychologicalTip: 'Якщо чоловік замовляє класичний віскі чи Олд Фешен — він цінує стабільність, структуру та прямоту. Якщо обирає екзотичний авторський мікс — він творчий, відкритий до нового та цінує нешаблонні враження.',
    psychologicalTipEn: 'A man who picks neat single malts or an Old Fashioned values consistency and honesty. One who orders signature craft drinks is usually inventive, curious, and open-minded.'
  },
  {
    id: 'man_decoder',
    scenarioKey: 'man_decoder',
    targetGender: 'man',
    title: 'Психологічний декодер: Що говорить замовлення чоловіка про його характер',
    titleEn: 'Male Decoder: What His Drink Choice Says About Him',
    description: 'Глибокий барний профайлінг: що насправді приховують улюблені напої чоловіків.',
    descriptionEn: 'Bar profiling guide: what a man’s go-to drink reveals about his worldview, ambitions, and emotional style.',
    rules: [
      'Звертай увагу на те, як він спілкується з барменом (ввічливість = справжнє виховання).',
      'Напій — це ключ до його зони комфорту та стилю життя.'
    ],
    rulesEn: [
      'Notice how he treats the bartender (courtesy is the truest marker of character).',
      'His order is a subtle window into his comfort zone and lifestyle.'
    ],
    recommendedDrinksForHer: [
      { name: 'Old Fashioned / Manhattan', why: 'Типаж: Джентльмен-традиціоналіст. Цінує надійність, якість, тримає слово, не любить пустих розмов.', whyEn: 'Archetype: The Traditional Gentleman. Values reliability, authenticity, and keeps his word.' },
      { name: 'Negroni / Campari Spritz', why: 'Типаж: Інтелектуал-естет. Любить мистецтво, подорожі, італійську кухню, має чудове почуття гумору.', whyEn: 'Archetype: The Cultured Aesthete. Loves travel, fine design, sharp banter, and culinary adventures.' },
      { name: 'Сухе червоне вино / Single Malt Scotch', why: 'Типаж: Глибокий стратег. Терплячий, зрілий, вміє насолоджуватися моментом і не женеться за дешевим хайпом.', whyEn: 'Archetype: The Thoughtful Strategist. Patient, mature, unhurried, appreciates depth over flash.' },
      { name: 'Крафтове пиво IPA або Сидр', why: 'Типаж: Невимушений новатор. Простий у спілкуванні, дружній, любить природу, активний відпочинок та щирість.', whyEn: 'Archetype: The Easygoing Innovator. Friendly, outdoorsy, down-to-earth, and honest.' }
    ],
    recommendedDrinksForYou: [],
    whatToAvoid: [
      'Не квап його, якщо він уважно вивчає карту напоїв.',
      'Не нав\'язуй стереотипи («справжні чоловіки п\'ють тільки горілку»).'
    ],
    whatToAvoidEn: [
      'Do not rush him if he enjoys studying the cocktail menu.',
      'Avoid outdated macho stereotypes ("real men only drink neat vodka").'
    ],
    psychologicalTip: 'Якщо хочеш зробити йому найкращий комплімент — відзнач його смак у напої: «У тебе чудовий вибір, цей коктейль має неймовірний баланс». Це підкреслить твою спостережливість та підніме його впевненість.',
    psychologicalTipEn: 'Compliment his drink selection sincerely: "Great choice, the balance in that classic is incredible." It affirms his taste and creates instant warmth.'
  },
  {
    id: 'man_romantic_night',
    scenarioKey: 'man_romantic_night',
    targetGender: 'man',
    title: 'Романтичний вечір з чоловіком: Як створити ідеальну атмосферу',
    titleEn: 'Romantic Night with a Man: Atmosphere, Rhythm & Intimacy',
    description: 'Як налаштувати ритм вечора, підібрати дижестиви та створити магнетичний затишок для душевних розмов.',
    descriptionEn: 'How to set the evening mood, choose after-dinner digestifs, and cultivate magnetic closeness.',
    rules: [
      'Обирайте місця з приглушеним світлом та джазом або лаунж-музикою.',
      'Після основної вечері переходьте на напої-дижестиви (Амарето, Бульвардьє, Еспресо Мартіні).',
      'Діліться враженнями про смаки — це природний місток до особистих історій.'
    ],
    rulesEn: [
      'Choose intimate spots with warm ambient lighting and soft acoustic or jazz music.',
      'Transition from dinner to complex digestifs (Amaretto Sour, Boulevardier, Espresso Martini).',
      'Discuss flavor nuances to naturally segue into deeper personal storytelling.'
    ],
    recommendedDrinksForHer: [
      { name: 'Espresso Martini / White Russian', why: 'Кавово-шоколадний заряд настрою, тепло та грайливий релакс.', whyEn: 'Silky espresso decadence keeping the night energetic and cozy.' },
      { name: 'Amaretto Sour', why: 'Марципанова ніжність з лимонною свіжістю — напій абсолютного задоволення.', whyEn: 'Velvety sweet almond with bright lemon lift.' }
    ],
    recommendedDrinksForYou: [
      { name: 'Godfather / Penicillin', why: 'Шотландський віскі з мигдалем або димний мед — затишний чоловічий дижестив.', whyEn: 'Warm Scotch with amaretto or peaty honey smoke for unhurried intimacy.' },
      { name: 'Boulevardier', why: 'Глибока бурбонова версія Негроні для довгих щирих розмов.', whyEn: 'Rich, layered bourbon twist on Negroni ideal for heart-to-heart dialogue.' }
    ],
    whatToAvoid: [
      'Не перетворювати бар на місце для вирішення робочих конфліктів.',
      'Уникати галасливих місць, де доводиться кричати одне одному на вухо.'
    ],
    whatToAvoidEn: [
      'Turning the bar table into a stressful work debate arena.',
      'Loud venues where you have to yell over the music.'
    ],
    psychologicalTip: 'Чоловіки часто розкриваються емоційно тоді, коли відчувають, що їх слухають без критики та оцінок. Затишний келих та щире питання про його мрії чи захоплення створять незабутній зв\'язок.',
    psychologicalTipEn: 'Men open up emotionally when they feel listened to without judgment. A warm drink and an open question about his passions will cement a deep connection.'
  }
];
