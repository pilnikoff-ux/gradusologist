export interface TestOption {
  textUa: string;
  textEn: string;
  points: number;
}

export interface TestQuestion {
  id: number;
  questionUa: string;
  questionEn: string;
  options: TestOption[];
}

export const ALCOHOLIC_TEST_QUESTIONS: TestQuestion[] = [
  {
    id: 1,
    questionUa: 'Як часто ти вживаєш алкогольні напої (включаючи пиво та легкі коктейлі)?',
    questionEn: 'How often do you consume alcoholic beverages (including beer and light cocktails)?',
    options: [
      { textUa: 'Раз на кілька місяців або тільки на великі свята', textEn: 'Once every few months or strictly on major holidays', points: 0 },
      { textUa: '1–2 рази на тиждень (зазвичай вихідні / п\'ятниця)', textEn: '1-2 times a week (usually weekends / Friday vibes)', points: 2 },
      { textUa: '3–4 рази на тиждень (келих вина або пива після роботи)', textEn: '3-4 times a week (a glass of wine or beer after work)', points: 5 },
      { textUa: 'Майже щодня (це мій стабільний ритуал перезавантаження)', textEn: 'Almost daily (my non-negotiable unwinding ritual)', points: 9 }
    ]
  },
  {
    id: 2,
    questionUa: 'Чи буває в тебе відчуття: «сьогодні вип\'ю лише один келих», а закінчується третім шотом о 3-й ночі?',
    questionEn: 'Do you ever plan for "just one glass", ending up taking the 3rd shot at 3 AM?',
    options: [
      { textUa: 'Ніколи, мій самоконтроль залізний', textEn: 'Never, my self-discipline is ironclad', points: 0 },
      { textUa: 'Вкрай рідко, коли компанія занадто душевна', textEn: 'Very rarely, only if the company is exceptionally fun', points: 2 },
      { textUa: 'Періодично — алкоголь вміє переконувати', textEn: 'From time to time — alcohol is a persuasive speaker', points: 5 },
      { textUa: 'Постійно, слово «один» для мене суто теоретичне', textEn: 'Constantly, the word "one" is purely theoretical', points: 9 }
    ]
  },
  {
    id: 3,
    questionUa: 'Чи відчував ти коли-небудь вранці почуття провини або незручності за вчорашні вчинки/повідомлення?',
    questionEn: 'Have you ever felt morning guilt or "hangxiety" over last night’s texts or actions?',
    options: [
      { textUa: 'Ніколи, я завжди пам\'ятаю і контролюю себе', textEn: 'Never, I maintain absolute clarity and composure', points: 0 },
      { textUa: 'Бувало раз чи два в житті у бурхливій юності', textEn: 'Maybe once or twice in wild college days', points: 2 },
      { textUa: 'Час від часу видаляю історію дзвінків із заплющеними очима', textEn: 'Occasionally check outgoing messages with one eye closed', points: 6 },
      { textUa: 'Це мій щосуботній ранковий екзистенційний жах', textEn: 'My regular Saturday morning existential dread', points: 10 }
    ]
  },
  {
    id: 4,
    questionUa: 'Чи буває в тебе потреба «похмелитися» (випити пива або 50 г) зранку, щоб стало легше?',
    questionEn: 'Do you feel the urge to have a "hair of the dog" drink in the morning to function?',
    options: [
      { textUa: 'Ніколи, зранку від однієї думки про алкоголь верне', textEn: 'Never, the mere thought of alcohol in the morning is nauseating', points: 0 },
      { textUa: 'Дуже рідко, на другий день великого весілля чи фестивалю', textEn: 'Extremely rarely, on day 2 of a massive wedding or festival', points: 3 },
      { textUa: 'Іноді пляшечка холодного сидру чи пива реально рятує', textEn: 'Sometimes a cold lager or cider genuinely rescues the day', points: 7 },
      { textUa: 'Регулярно, без цього день не почнеться', textEn: 'Regularly, my engine refuses to start without it', points: 12 }
    ]
  },
  {
    id: 5,
    questionUa: 'Чи траплялися у тебе провали в пам\'яті після вечірки («пам\'ятаю тост, а потім прокинувся вдома»)?',
    questionEn: 'Have you ever experienced memory blackouts after a night out?',
    options: [
      { textUa: 'Ніколи в житті', textEn: 'Never in my life', points: 0 },
      { textUa: 'Було 1 раз багато років тому', textEn: 'Happened once years ago', points: 2 },
      { textUa: 'Буває кілька разів на рік при переборі', textEn: 'Happens a few times a year during heavy sessions', points: 6 },
      { textUa: 'Часто доводиться відновлювати хронологію за фотографіями друзів', textEn: 'Frequently reconstruct timeline via friends\' Instagram stories', points: 10 }
    ]
  },
  {
    id: 6,
    questionUa: 'Як оточуючі (родина, партнер, друзі) реагують на твоє вживання алкоголю?',
    questionEn: 'How do family, partners, or close friends react to your drinking habits?',
    options: [
      { textUa: 'Всі задоволені, я п\'ю символічно', textEn: 'Everyone is chill, I drink purely symbolically', points: 0 },
      { textUa: 'Іноді жартують, що я душа компанії', textEn: 'They joke that I am the life of the party', points: 2 },
      { textUa: 'Періодично натякають, що варто пригальмувати', textEn: 'They occasionally drop hints that I should pace down', points: 6 },
      { textUa: 'Бувають серйозні конфлікти через кількість випитого', textEn: 'There have been serious arguments over my intake', points: 11 }
    ]
  },
  {
    id: 7,
    questionUa: 'Чи помічаєш ти, що твоя «толерантність» зросла (треба випити значно більше, ніж раніше, щоб сп\'яніти)?',
    questionEn: 'Have you noticed your tolerance increasing (needing more drinks to feel the buzz)?',
    options: [
      { textUa: 'Ні, від одного келиха вже відчуваю легкість', textEn: 'No, one glass still gives me a warm buzz', points: 0 },
      { textUa: 'Трохи більше, ніж у студентські роки', textEn: 'Slightly higher than in my student years', points: 2 },
      { textUa: 'Так, можу випити пляшку віскі і виглядати тверезим', textEn: 'Yes, I can drink a bottle of whisky and look composed', points: 6 },
      { textUa: 'Моя печінка перетворилася на титановий завод', textEn: 'My liver is basically an industrial titanium refinery', points: 10 }
    ]
  },
  {
    id: 8,
    questionUa: 'Чи вживаєш ти алкоголь на самоті перед телевізором чи комп\'ютером?',
    questionEn: 'Do you drink alone in front of the TV or computer?',
    options: [
      { textUa: 'Ніколи, для мене алкоголь — суто соціальна річ у компанії', textEn: 'Never, alcohol for me is strictly social', points: 0 },
      { textUa: 'Рідко можу випити келих пива під хороший фільм', textEn: 'Rarely a single beer during a great movie', points: 2 },
      { textUa: 'Регулярно — люблю спокійно посидіти наодинці з келихом', textEn: 'Regularly — I enjoy quiet solo evenings with a drink', points: 6 },
      { textUa: 'Майже завжди, мені компанія для випивки не потрібна', textEn: 'Almost always, I need no company to enjoy drinking', points: 10 }
    ]
  },
  {
    id: 9,
    questionUa: 'Чи траплялося тобі сідати за кермо або виконувати важливу роботу «під градусом»?',
    questionEn: 'Have you ever driven or performed critical work under the influence?',
    options: [
      { textUa: 'Ніколи, табу і повна відповідальність', textEn: 'Never, strict non-negotiable taboo', points: 0 },
      { textUa: 'Тільки пішки або на таксі', textEn: 'Only on foot or via taxi', points: 0 },
      { textUa: 'Було відчуття «та я ж майже тверезий» і легкий ризик', textEn: 'Had the fleeting "I am basically sober" temptation', points: 7 },
      { textUa: 'Траплялося неодноразово', textEn: 'Happened multiple times', points: 15 }
    ]
  },
  {
    id: 10,
    questionUa: 'Чи пробував ти робити перерву («сухий місяць» / тверезість) і чи було це важко?',
    questionEn: 'Have you ever attempted a "Dry January" / break, and was it tough?',
    options: [
      { textUa: 'Легко можу не пити місяцями і навіть не помічати', textEn: 'Can easily go months without noticing', points: 0 },
      { textUa: 'Робив перерви, спокійно витримував без дискомфорту', textEn: 'Took breaks comfortably without cravings', points: 1 },
      { textUa: 'Було нудно на святах та посиденьках з друзями', textEn: 'Felt socially bored during parties with friends', points: 4 },
      { textUa: 'Зривався на 4-й день через стрес', textEn: 'Relapsed on day 4 due to stress', points: 9 }
    ]
  }
];

export interface TestResultBand {
  minScore: number;
  maxScore: number;
  titleUa: string;
  titleEn: string;
  badgeColor: string;
  emoji: string;
  summaryUa: string;
  summaryEn: string;
  detailedAnalysisUa: string;
  detailedAnalysisEn: string;
  recommendationUa: string;
  recommendationEn: string;
}

export const TEST_RESULT_BANDS: TestResultBand[] = [
  {
    minScore: 0,
    maxScore: 12,
    titleUa: 'Тверезий Естет / Драйвер Життя',
    titleEn: 'Sober Aesthetic / Designated Master',
    badgeColor: 'from-emerald-500 to-teal-600',
    emoji: '🌿',
    summaryUa: 'У тебе абсолютно здорове, рідкісне та зріле ставлення до алкоголю.',
    summaryEn: 'You have a healthy, mindful, and completely controlled relationship with alcohol.',
    detailedAnalysisUa: 'Алкоголь для тебе — не антидепресант і не втеча від реальності, а лише рідкісний смаковий акомпанемент свята. Твоя печінка співає серенади, а нервова система працює як швейцарський годинник.',
    detailedAnalysisEn: 'Alcohol for you is neither an escape nor a coping mechanism, but an occasional culinary accent. Your liver is thriving.',
    recommendationUa: 'Продовжуй насолоджуватися якісними безалкогольними моктейлями або рідкісними вишуканими винами!',
    recommendationEn: 'Keep enjoying fine craft mocktails and occasional vintage tastings!'
  },
  {
    minScore: 13,
    maxScore: 32,
    titleUa: 'П\'ятничний Гедоніст / Душа Компанії',
    titleEn: 'Friday Hedonist / Life of the Party',
    badgeColor: 'from-blue-500 to-indigo-600',
    emoji: '🥂',
    summaryUa: 'Класичний представник барної культури. Баланс у нормі, але пильнуй межу.',
    summaryEn: 'Classic bar culture connoisseur. Balanced, but watch your margins.',
    detailedAnalysisUa: 'Ти любиш смачні коктейлі, п\'ятничні розмови та святкову атмосферу. Ти контролюєш ситуацію у 85% випадків, хоча іноді суботній ранок вимагає додаткової мінералки.',
    detailedAnalysisEn: 'You appreciate artisanal cocktails and Friday laughter. You remain in control 85% of the time, though occasional mornings call for cold mineral water.',
    recommendationUa: 'Завжди тримай правило «1 склянка води на 1 коктейль» і не пропускай сніданок перед вечіркою.',
    recommendationEn: 'Stick to the 1:1 water rule and never party without a solid meal beforehand.'
  },
  {
    minScore: 33,
    maxScore: 60,
    titleUa: 'На межі фолу / Слизька доріжка',
    titleEn: 'On the Edge / Slippery Slope',
    badgeColor: 'from-amber-500 to-orange-600',
    emoji: '⚠️',
    summaryUa: 'Увага: алкоголь почав займати надто помітне місце у твоєму способі життя.',
    summaryEn: 'Warning: Alcohol has begun playing too central a role in your daily routine.',
    detailedAnalysisUa: 'Ти все частіше використовуєш градуси як універсальний знеболювач від стресу, втоми чи нудьги. Толерантність зростає, а похмільні синдроми стають регулярними супутниками вихідних.',
    detailedAnalysisEn: 'You increasingly use alcohol to numb fatigue or emotional stress. Tolerance is rising and hangxiety is creeping into weekends.',
    recommendationUa: 'Спробуй влаштувати «сухий челендж» на 2–3 тижні, знайди спорт чи нове хобі для розвантаження дофаміну.',
    recommendationEn: 'Try a 3-week dry reset, replace evening drinks with intense sports or herbal teas.'
  },
  {
    minScore: 61,
    maxScore: 100,
    titleUa: 'Терміново Боржомі, Котика і Тайм-аут',
    titleEn: 'Emergency Protocol: Time-Out & Reset',
    badgeColor: 'from-red-600 to-rose-700',
    emoji: '🚨',
    summaryUa: 'Високий ризик сформованої залежності. Потрібне свідоме перезавантаження!',
    summaryEn: 'High dependency indicators. Immediate conscious intervention recommended!',
    detailedAnalysisUa: 'Алкоголь диктує твій графік, сон, бюджет і настрій. Провали в пам\'яті, бажання похмелитися та конфлікти з близькими — це прямі червоні прапорці організму, який благає про допомогу.',
    detailedAnalysisEn: 'Alcohol is dictating your mood, sleep cycles, and relationships. Morning cravings and blackouts are clear red alert sirens.',
    recommendationUa: 'Постав вживання на паузу щонайменше на 30 днів. Не бійся звернутися до спеціаліста з ментального здоров\'я чи нарколога. Твоє здоров\'я та майбутнє дорожчі за будь-який напій!',
    recommendationEn: 'Commit to an unconditional 30-day detox. Consult a healthcare professional to build healthy coping strategies.'
  }
];
