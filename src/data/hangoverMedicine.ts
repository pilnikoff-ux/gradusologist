import { MedicineInfo, HangoverProtocol } from '../types';

export const HANGOVER_PROTOCOLS: HangoverProtocol[] = [
  {
    stage: 'before',
    title: 'До застілля (Профілактика та підготовка)',
    titleEn: 'Before the Party (Pre-Game Armor)',
    tagline: 'Захисти слизову, підготуй печінку та насич організм водою',
    taglineEn: 'Shield your stomach lining, prime enzymes, and super-hydrate',
    actionChecklist: [
      {
        task: 'Правильне жирно-білкове перекушування за 1–2 години',
        taskEn: 'Protein & healthy fat snack 1-2 hours prior',
        details: 'Авокадо, яйця, шматочок вершкового масла або жирної риби, горіхи. Жири та білки уповільнюють всмоктування етанолу в кров на 40-50%. Ніколи не починай пити натщесерце!',
        detailsEn: 'Avocado, eggs, butter, salmon, or nuts. Healthy lipids slow down gastric ethanol absorption by 40%. Never drink on an empty stomach!'
      },
      {
        task: 'Прийом сорбентів за 1.5 години до першого тосту',
        taskEn: 'Take sorbents 1.5 hours before the first toast',
        details: 'Ентеросгель (1 столова ложка), Полісорб або біле вугілля зв\'язують сивушні олії та токсичні фракції ще до їх потрапляння у кров.',
        detailsEn: 'Enterosgel, Polysorb, or activated charcoal binds congeners and fusel oils before they flood your bloodstream.'
      },
      {
        task: 'Ударна гідратація',
        taskEn: 'Hydration pre-load',
        details: 'Випий 500–700 мл мінеральної води з високим вмістом натрію, калію та магнію (наприклад, Боржомі, Поляна Квасова).',
        detailsEn: 'Drink 500-700ml of mineral water rich in sodium, magnesium, and potassium.'
      },
      {
        task: 'Вітамінна підтримка (В-комплекс + Янтарна кислота)',
        taskEn: 'B-Complex + Succinic Acid primer',
        details: 'Вітаміни B1 та B6 активують фермент алкогольдегідрогеназу в печінці. 1-2 таблетки бурштинової кислоти прискорюють цикл Кребса.',
        detailsEn: 'B-vitamins boost liver alcohol-dehydrogenase enzymes; succinic acid fuels cellular energy cycles.'
      }
    ]
  },
  {
    stage: 'during',
    title: 'Під час вечора (Золоті правила виживання)',
    titleEn: 'During the Night (Combat Rules)',
    tagline: 'Контроль гідратації, правило градуса та відмова від солодкої газованки',
    taglineEn: 'Pacing, water intervals, and avoiding sugary carbonation traps',
    actionChecklist: [
      {
        task: 'Правило «1:1» (Склянка води на кожен дрінк)',
        taskEn: 'The 1:1 Hydration Rule',
        details: 'Алкоголь блокує вазопресин (антидіуретичний гормон) — на 100 мл алкоголю організм втрачає до 400 мл води. Вода рятує клітини мозку від зневоднення.',
        detailsEn: 'Ethanol suppresses vasopressin, causing 4x fluid loss. A glass of water per drink prevents severe morning brain shrinkage.'
      },
      {
        task: 'Не знижуй градус і не змішуй зерно з виноградом',
        taskEn: 'Never lower ABV & avoid mixing base spirits',
        details: 'Перехід від міцних напоїв до пива/вина або змішування віскі з вином перевантажує різні ланцюжки ферментів печінки, викликаючи важку інтоксикацію.',
        detailsEn: 'Switching from whiskey to beer or mixing grape and grain spirits overtaxes distinct liver enzyme pathways.'
      },
      {
        task: 'Обережно з солодкою газованою водою',
        taskEn: 'Beware of carbonated sugar mixers',
        details: 'Вуглекислий газ прискорює відкриття воротаря шлунка і миттєво доставляє спирт у тонкий кишечник. Цукор маскує відчуття контролю.',
        detailsEn: 'CO2 accelerates gastric emptying directly into the small intestine, spiking blood alcohol unpredictably.'
      },
      {
        task: 'Фінал перед сном: велика склянка води біля ліжка',
        taskEn: 'Pre-bed rescue glass',
        details: 'Перед тим, як лягти спати, випий ще 500 мл води з дрібкою солі або таблеткою аскорбінки і відкрий вікно для притоку кисню.',
        detailsEn: 'Down 500ml water with a pinch of salt before bed and crack a window for fresh oxygen exchange.'
      }
    ]
  },
  {
    stage: 'morning',
    title: 'Ранок після (Детокс, відновлення та ліки)',
    titleEn: 'The Morning After (Detox & Medical Protocol)',
    tagline: 'Покроковий алгоритм порятунку: від нудоти до ясності розуму',
    taglineEn: 'Step-by-step recovery: stopping nausea, restoring electrolytes, and calming the brain',
    actionChecklist: [
      {
        task: 'Регідратація електролітами (Регідрон / Нормогідрон)',
        taskEn: 'Electrolyte rehydration (Rehydron)',
        details: 'Розведи 1 пакетик Регідрону на 1 літр теплої води і пий невеликими ковтками кожні 5-10 хвилин. Це відновлює баланс калію і натрію.',
        detailsEn: 'Sip 1 liter of warm Rehydron solution in small sips to replenish critical mineral ions without triggering nausea.'
      },
      {
        task: 'Свіжий наваристий курячий бульйон або хаш',
        taskEn: 'Warm chicken bone broth',
        details: 'Бульйон містить L-цистеїн, що зв\'язує токсичний ацетальдегід, і м\'яко запускає моторику шлунка.',
        detailsEn: 'Rich in L-cysteine which neutralizes acetaldehyde toxins while gently awakening gut motility.'
      },
      {
        task: 'Контрастний теплий/прохолодний душ',
        taskEn: 'Gentle contrast shower',
        details: 'Змиває токсини, виділені зі шкірою, і стимулює кровообіг. Уникай занадто гарячої ванни чи сауни (небезпечне навантаження на серце!).',
        detailsEn: 'Washes away dermal toxin exudates and stimulates vascular tone. Avoid extreme boiling saunas!'
      }
    ]
  }
];

export const MEDICINES_GUIDE: MedicineInfo[] = [
  {
    name: 'Регідрон / Електроліти',
    nameEn: 'Rehydron / Oral Electrolytes',
    status: 'recommended',
    purpose: 'Миттєве відновлення водно-сольового балансу, зняття сухості в роті та м\'язової слабкості.',
    purposeEn: 'Instant restoration of osmotic and electrolyte balance, quenching dehydration.',
    howItWorks: 'Містить збалансовану суміш натрію хлориду, калію хлориду, натрію цитрату та глюкози, яка всмоктується навіть при ослабленому шлунку.',
    howItWorksEn: 'Delivers balanced sodium, potassium, and glucose that absorb rapidly into depleted cells.',
    usageAdvice: 'Розчинити 1 пакетик у 1 л чистої води кімнатної температури. Пити дрібними ковтками кожні 5–10 хвилин.',
    usageAdviceEn: 'Dissolve 1 sachet in 1 liter of clean water; take small sips every 5-10 minutes.'
  },
  {
    name: 'Метоклопрамід (Церукал) / Домперидон (Мотиліум)',
    nameEn: 'Metoclopramide / Domperidone (Antiemetic)',
    status: 'recommended',
    purpose: 'Проти блювоти та нудоти (якщо нестерпно нудить і неможливо навіть попити води).',
    purposeEn: 'Targeted antiemetic relief when severe nausea prevents retaining water.',
    howItWorks: 'Блокує дофамінові рецептори в тригерній зоні блювотного центру головного мозку та нормалізує перистальтику шлунка зверху вниз.',
    howItWorksEn: 'Blocks dopamine trigger receptors in the brain\'s vomiting center and normalizes downward gastric motility.',
    usageAdvice: '1 таблетка (10 мг) за 20-30 хв до їжі чи води. Застосовувати лише якщо блювота вже не має залишків алкоголю (шлунок порожній).',
    usageAdviceEn: '10mg tablet with a tiny sip of water. Use only after stomach has emptied remaining alcohol.'
  },
  {
    name: 'Ібупрофен (Нурофен) / Дексалгін',
    nameEn: 'Ibuprofen / Dexketoprofen (Headache relief)',
    status: 'caution',
    purpose: 'Зняття розпираючого головного болю та запалення судин мозку.',
    purposeEn: 'Relief from pounding hangover headache and vascular inflammation.',
    howItWorks: 'Нестероїдний протизапальний засіб (НПЗЗ). Блокує синтез простагландинів, що викликають біль.',
    howItWorksEn: 'NSAID that curbs prostaglandin-driven neurovascular throbbing.',
    usageAdvice: 'Приймати ТІЛЬКИ ПІСЛЯ ЇЖІ або склянки киселю/бульйону (щоб не подразнювати слизову шлунка). Дозування: 200–400 мг.',
    usageAdviceEn: 'Take strictly after eating soup or oatmeal to protect stomach lining. Dose: 200-400mg.',
    warning: 'Не приймати на голодний шлунок або при наявності гастриту/виразки!',
    warningEn: 'Do not take on an empty stomach or if you suffer from gastritis/ulcers!'
  },
  {
    name: 'Бурштинова кислота (Янтарна кислота)',
    nameEn: 'Succinic Acid',
    status: 'recommended',
    purpose: 'Прискорення розщеплення ацетальдегіду та повернення енергії клітинам.',
    purposeEn: 'Accelerating toxic acetaldehyde breakdown and cellular ATP recovery.',
    howItWorks: 'Головний субстрат циклу Кребса. Стимулює клітинне дихання в мітохондріях та прискорює детоксикацію печінки в 2-3 рази.',
    howItWorksEn: 'Fuels mitochondrial respiration, accelerating natural liver detox pathways.',
    usageAdvice: '1-2 таблетки (100–200 мг) розсмоктати або запити водою вранці після сніданку.',
    usageAdviceEn: '1-2 tablets (100-200mg) after morning breakfast with water.'
  },
  {
    name: 'Гліцин (Glycine)',
    nameEn: 'Glycine (Neuro-protector)',
    status: 'recommended',
    purpose: 'Зняття тривоги («похмільний стид/шугард»), заспокоєння тремору та покращення сну.',
    purposeEn: 'Alleviates hangover anxiety ("hangxiety"), shaky hands, and mental fog.',
    howItWorks: 'Гальмівний нейромедіатор. Зв\'язує ацетальдегід у нетоксичний глікоацетальдегід і заспокоює перезбуджену ЦНС.',
    howItWorksEn: 'Inhibitory neurotransmitter that binds acetaldehyde and dampens nervous overexcitation.',
    usageAdvice: '2 таблетки під язик (сублінгвально) кожні 1.5 години (до 6-8 таблеток на добу).',
    usageAdviceEn: '2 sublingual tablets dissolved under tongue every 1.5 hours.'
  },
  {
    name: 'ПАРАЦЕТАМОЛ (Цитрамон / Комбігрип тощо)',
    nameEn: 'PARACETAMOL / ACETAMINOPHEN',
    status: 'dangerous',
    purpose: 'Знеболювальне (КАТЕГОРИЧНО НЕ РЕКОМЕНДУЄТЬСЯ З АЛКОГОЛЕМ!)',
    purposeEn: 'Painkiller (STRICTLY DANGEROUS WITH ALCOHOL RESIDUES!)',
    howItWorks: 'При розпаді в печінці за наявності етанолу утворює високотоксичний метаболіт N-ацетил-p-бензохінонімін (NAPQI), який виснажує запаси глутатіону і викликає масивний некроз клітин печінки (токсичний гепатит).',
    howItWorksEn: 'When combined with alcohol, liver cytochrome enzymes convert paracetamol into hepatotoxic NAPQI, causing acute toxic liver necrosis!',
    usageAdvice: 'УНИКАТИ! Замінити на Ібупрофен або Аспірин (після їжі).',
    usageAdviceEn: 'AVOID COMPLETELY during hangovers. Substitute with Ibuprofen after food.',
    warning: 'Смертельно небезпечно для печінки при змішуванні з алкоголем або з похмілля!',
    warningEn: 'Severe hepatotoxicity risk when taken within 24 hours of heavy drinking!'
  },
  {
    name: 'Снодійні бензодіазепіни та седативні (Корвалол, Феназепам)',
    nameEn: 'Corvalol / Phenobarbital / Sedatives',
    status: 'dangerous',
    purpose: 'Заспокійливі краплі (НЕБЕЗПЕЧНО!)',
    purposeEn: 'Sedative Drops (EXTREMELY DANGEROUS!)',
    howItWorks: 'Фенобарбітал та спирт взаємно посилюють пригнічення дихального центру мозку, що може призвести до зупинки дихання уві сні та коми.',
    howItWorksEn: 'Synergistic central nervous depression can induce respiratory arrest during sleep and cardiac failure.',
    usageAdvice: 'Категорично заборонено приймати Корвалол чи Барбовал на фоні алкоголю!',
    usageAdviceEn: 'Never use Corvalol, Barbaoval or barbiturates after alcohol.',
    warning: 'Ризик зупинки дихання та гострої серцевої недостатності!',
    warningEn: 'High risk of fatal respiratory depression!'
  }
];
