import { AlcoholHistoryItem } from '../types';

export const ALCOHOL_HISTORY_DATABASE: AlcoholHistoryItem[] = [
  {
    id: 'wine',
    name: 'Вино та Ігристе (Wine & Champagne)',
    nameEn: 'Wine, Champagne & Fortified',
    category: 'wine',
    abvRange: '10% - 20%',
    originCountry: 'Грузія / Вірменія / Середземномор\'я',
    originCountryEn: 'Georgia / Armenia / Mediterranean',
    originCentury: 'VI тисячоліття до н.е. (понад 8000 років)',
    originCenturyEn: '6000 BCE (Over 8000 Years Ago)',
    iconName: 'Wine',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    shortTagline: 'Дар Діоніса: напій богів, що визначив розвиток європейської цивілізації, культури та гастрономії',
    shortTaglineEn: 'The nectar of gods that shaped human civilization, philosophy, and haute cuisine for millennia',
    history: 'Найдавніші археологічні свідчення виноробства (глиняні глечики квеврі із залишками виноградного сусла) знайдені на території сучасної Грузії та Вірменії віком понад 8000 років. Антична Греція та Рим перетворили виноробство на високе мистецтво та основу культури. У Середньовіччі католицькі монастирі Франції (Бургундія, Шампань) та Італії селекціонували найкращі сорти лози (Піно Нуар, Шардоне, Каберне Совіньйон). У XVII столітті монах Дом Периньйон удосконалив створення ігристого шампанського.',
    historyEn: 'The earliest archaeological evidence of winemaking (clay kvevri jars with grape residues) was discovered in Georgia and Armenia dating back over 8,000 years. Ancient Greeks and Romans elevated viticulture to a cornerstone of philosophy and commerce. During the Middle Ages, French and Italian Benedictine monasteries developed grand cru terroirs (Burgundy, Champagne, Bordeaux). In the 17th century, monk Dom Pérignon mastered effervescent champagne.',
    keyMilestones: [
      { year: '6000 до н.е.', event: 'Перші глиняні квеврі для бродіння винограду на Кавказі.', eventEn: 'Earliest clay kvevri fermentation vessels in the Caucasus region.' },
      { year: '1690-ті', event: 'Дом Периньйон та абатство Отвільє удосконалюють технологію ігристого вина Шампані.', eventEn: 'Dom Pérignon pioneers sparkling Champagne blending and thick glass bottling.' },
      { year: '1855', event: 'Офіційна класифікація вин Бордо за наказом імператора Наполеона III.', eventEn: 'Official 1855 Bordeaux Wine Classification established under Emperor Napoleon III.' }
    ],
    funFacts: [
      'У пляшці класичного шампанського міститься тиск близько 5–6 атмосфер — це втричі більше, ніж у автомобільній шині, і понад 49 мільйонів бульбашок!',
      'Червоне сухе вино містить ресвератрол — потужний природний антиоксидант із шкірки темного винограду, що сприяє захисту судин (так званий «Французький парадокс»).'
    ],
    funFactsEn: [
      'A bottle of authentic Champagne contains 5-6 atmospheres of internal pressure (three times higher than a car tire) and over 49 million bubbles!',
      'Red wine contains resveratrol, a potent natural antioxidant in dark grape skins linked to cardiovascular health (the "French Paradox").'
    ],
    productionMethod: 'Дроблення стиглого винограду, мацерація (для насичення танінами та кольором), ферментація за участю винних дріжджів, витримка в дубових баріках або сталевих чанах. Для ігристих вин — вторинне бродіння в пляшці (традиційний метод Шампенуаз) або в автоклавах (метод Шарма/Просекко).',
    productionMethodEn: 'Crushing harvested grapes, maceration on skins (for color and tannins), yeast fermentation, and aging in French oak barrels or stainless steel tanks. For sparkling wines, secondary in-bottle fermentation (Méthode Champenoise) or tank Charmat method is applied.',
    howToDrink: 'Червоні повнотілі вина (Каберне, Мерло, Шираз) — при 16–18°C у широких келихах Бордо; Білі свіжі вина (Совіньйон Блан, Рислінг) — при 8–11°C; Шампанське та Просекко — крижаними (6–8°C) у келихах флюте або тюльпанах.',
    howToDrinkEn: 'Serve full-bodied reds at 16-18°C in large Bordeaux bowls; crisp whites at 8-11°C; Champagne and sparkling wines chilled to 6-8°C in flute or tulip glasses.',
    foodPairing: 'Червоні вина бездоганно пасують до соковитого м\'яса на грилі (стейк Рибай, каре ягняти) та витриманих сирів; Білі сухі вина — до морепродуктів, риби та козячих сирів; Ігристі — до устриць, ікри та брускет.',
    foodPairingEn: 'Rich red wines match grilled beef ribeye, lamb chops, and aged cheeses; crisp whites pair with fresh seafood and goat cheese; sparkling wines pair exquisitely with oysters and caviar.',
    idealSnacks: ['Сирна тарілка (Пармезан, Брі, Горгонзола)', 'Прошутто ді Парма та хамон', 'Свіжі устриці з лимоном', 'Брускети з томатами та базиліком', 'Виноград та волоські горіхи'],
    idealSnacksEn: ['Artisan cheese board (Parmesan, Brie, Gorgonzola)', 'Prosciutto di Parma & Iberico ham', 'Fresh oysters with mignonette', 'Heirloom tomato bruschetta', 'Fresh grapes and walnuts']
  },
  {
    id: 'vodka',
    name: 'Горілка та Оковита (Vodka & Okovyta)',
    nameEn: 'Vodka & Okovyta',
    category: 'vodka',
    abvRange: '40% - 60%',
    originCountry: 'Україна / Східна Європа',
    originCountryEn: 'Ukraine / Eastern Europe',
    originCentury: 'XIV - XV століття',
    originCenturyEn: '14th - 15th Century',
    iconName: 'Flame',
    image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80',
    shortTagline: '«Aqua Vitae» — вода життя, що очищувалася сріблом та козацьким гартом',
    shortTaglineEn: '"Aqua Vitae" — the water of life distilled through Slavic heritage',
    history: 'Термін «оковита» походить від латинського Aqua Vitae («жива вода»). В Україні традиція дистиляції зернового спирту з жита й пшениці розквітла за часів Гетьманщини та Запорозької Січі. Козацькі шинки славилися медовими, перцевими та калгановими настоянками, які слугували не лише частуванням, але й природними ліками від лихоманки та ран.',
    historyEn: 'The Ukrainian term "okovyta" derives from the Latin Aqua Vitae ("water of life"). In Ukraine, the distillation of grain spirit from rye and wheat flourished during the Cossack Hetmanate era. Cossack taverns were famous for honey, chili pepper (Pertsovka), and root herbal infusions, used both for hearty fellowship and field medicine.',
    keyMilestones: [
      { year: '1405', event: 'Перша письмова згадка назви «горілка» у судових актах Сандомирського воєводства.', eventEn: 'First written court record of the word "gorzałka/vodka" in Sandomierz.' },
      { year: '1650+', event: 'Розквіт козацького винокуріння: на Запорожжі виготовляють медовуху та горілку з перцем.', eventEn: 'Peak of Cossack distilling: production of honey-pepper vodkas across Ukraine.' },
      { year: '1894', event: 'Впровадження стандарту вугільної фільтрації та закріплення міцності 40% об.', eventEn: 'Standardization of charcoal filtration and 40% ABV benchmark.' }
    ],
    funFacts: [
      'Слово «горілка» походить від дієслова «горіти» — перевіряли якість напою, підпалюючи його: чистий спирт мав горіти рівним блакитним полум\'ям.',
      'У XVIII столітті українські шляхтичі та козацькі полковники володіли правом вільного винокуріння («пропінація»), а садиби створювали власні крафтові наливки за секретними родинними книгами.'
    ],
    funFactsEn: [
      'The Ukrainian word "horilka" originates from the root "hority" (to burn) — quality was verified by setting a spoonful on fire: premium spirit had to burn with an even blue flame.',
      'In the 18th century, noble Ukrainian estates guarded secret family recipe books for cherry, raspberry, and herbal cordials.'
    ],
    productionMethod: 'Багатократна ректифікація збродженого зернового сусла (пшениця, жито, кукурудза) з подальшим пом\'якшенням артезіанською водою та фільтрацією через активоване березове чи кварцове вугілля, срібні чи платинові колони.',
    productionMethodEn: 'Continuous column distillation of fermented cereal mash (wheat, rye), diluted with pure artesian water and filtered through silver, birch charcoal, or quartz columns.',
    howToDrink: 'Подавати сильно охолодженою (6–8°C) у невеликих стопках (30–50 мл). Обов’язково супроводжувати ситними гарячими або солоними холодними закусками.',
    howToDrinkEn: 'Serve well chilled (6–8°C) in neat shot glasses (30–50 ml). Always pair with savory rich foods: salo, pickles, sourdough bread, and warm soups.',
    foodPairing: 'Ідеально поєднується з українським салом з часником, домашнім житнім хлібом, малосольними огірками, маринованими грибами, оселедцем та гарячим борщем.',
    foodPairingEn: 'Classic companion to cured pork fatback (salo) with garlic, dark rye sourdough, pickles, pickled forest mushrooms, herring, and hot borsch.',
    idealSnacks: ['Тонко нарізане сало з часником та гірчицею', 'Малосольні хрусткі огірочки та корнішони', 'Оселедець на чорному хлібі з маринованою цибулею', 'Мариновані білі гриби та опеньки', 'Канапе з червоною ікрою'],
    idealSnacksEn: ['Thin sliced cured salo with garlic and mustard', 'Crisp brined pickles and cornichons', 'Herring fillet on dark rye with red onion', 'Marinated forest mushrooms', 'Red caviar canapés']
  },
  {
    id: 'whiskey',
    name: 'Віскі (Scotch, Irish, Bourbon & Rye)',
    nameEn: 'Whisky & Whiskey',
    category: 'whiskey',
    abvRange: '40% - 62%',
    originCountry: 'Шотландія / Ірландія / США',
    originCountryEn: 'Scotland / Ireland / USA',
    originCentury: 'XV століття (1494 р.)',
    originCenturyEn: '15th Century (1494)',
    iconName: 'GlassWater',
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80',
    shortTagline: 'Гельське «Uisge Beatha» — благородний дух ячменю та дубових бочок',
    shortTaglineEn: 'Gaelic "Uisge Beatha" — liquid gold born of barley, peat, and charred oak',
    history: 'Перша задокументована партія віскі датується 1494 роком у казначейських сувоях Шотландії: чернець Джон Кор отримав солод для виготовлення «води життя» за наказом короля Якова IV. Ірландці стверджують, що технологію привіз ще святий Патрік у V столітті. Згодом емігранти перевезли рецепти до США, де народився кукурудзяний Бурбон у Кентуккі.',
    historyEn: 'The first official record of whisky production appears in the 1494 Scottish Exchequer Rolls, when Friar John Cor was commissioned by King James IV. Meanwhile, Irish monks refined triple distillation even earlier. Immigrants brought distilling to Kentucky, giving birth to sweet charred-oak Bourbon.',
    keyMilestones: [
      { year: '1494', event: 'Перший запис у шотландських королівських документах про віскі для короля.', eventEn: 'First official Scottish royal record of malt purchase for "aqua vitae".' },
      { year: '1823', event: 'Закон про акциз у Великій Британії легалізував сотні підпільних дистилерій Гайленду.', eventEn: 'The UK Excise Act legalizes hundreds of illicit Highland moonshine distilleries.' },
      { year: '1964', event: 'Конгрес США визнав Бурбон офіційним національним надбанням Америки.', eventEn: 'US Congress declares Bourbon as America\'s distinctive native spirit.' }
    ],
    funFacts: [
      '«Частка ангелів» (Angel\'s Share) — щороку з кожної дубової бочки через мікропори випаровується близько 1.5–2% віскі.',
      'Шотландці пишуть «Whisky», а ірландці та американці додають літеру «е» — «Whiskey».'
    ],
    funFactsEn: [
      'The "Angel\'s Share" accounts for 1.5-2% of whisky volume evaporating each year through wood pores.',
      'Scottish producers spell it "Whisky", whereas Irish and American distillers write "Whiskey".'
    ],
    productionMethod: 'Осолоджування ячменю (іноді з копченням торфом), подрібнення, бродіння та подвійна або потрійна дистиляція у мідних перегінних кубах (Pot Stills). Витримка у дубових бочках з-під бурбону, хересу чи портвейну щонайменше 3 роки.',
    productionMethodEn: 'Malting grain (peat drying for Scotch), mashing, fermentation, and copper pot still distillation. Maturation in charred oak barrels for a minimum of 3 years.',
    howToDrink: 'Пити кімнатної температури (18–20°C) з келиха Glencairn або тумблера. Для розкриття ароматів додайте кілька крапель чистої негазованої води.',
    howToDrinkEn: 'Sip at room temperature (18-20°C) from a Glencairn or lowball glass. Add 2-3 drops of pure water to unleash tight aromatic oils.',
    foodPairing: 'Скотч і бурбон чудово смакують зі соковитими м\'ясними стейками, качиною грудкою, копченим лососем, витриманими сирами та темним шоколадом.',
    foodPairingEn: 'Scotch and Bourbon pair sensationally with Ribeye steaks, smoked salmon, mature Cheddar, and single-origin dark chocolate.',
    idealSnacks: ['Темний гіркий шоколад (75-85%)', 'Смажений мигдаль, фундук та пекан', 'В\'ялена яловичина (джеркі)', 'Витриманий сир Чеддер або Пармезан', 'Копчений лосось на тостах'],
    idealSnacksEn: ['Dark chocolate (75-85% cocoa)', 'Roasted almonds and salted pecans', 'Artisan beef jerky', 'Aged Cheddar or Gouda', 'Smoked salmon toasts']
  },
  {
    id: 'gin',
    name: 'Джин (London Dry, Plymouth & Old Tom)',
    nameEn: 'Gin & Genever',
    category: 'gin',
    abvRange: '37.5% - 47%',
    originCountry: 'Нідерланди / Велика Британія',
    originCountryEn: 'Netherlands / Great Britain',
    originCentury: 'XVII століття (1650-ті рр.)',
    originCenturyEn: '17th Century (1650s)',
    iconName: 'Wine',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    shortTagline: '«Голландська хоробрість», що підкорила Британську імперію та барну класику',
    shortTaglineEn: '"Dutch Courage" that forged British mixology and botanical mastery',
    history: 'Прабатьком джину був голландський ялівцевий дистилят «Женевер» (Jenever), створений у Лейдені лікарем Франциском Сільвієм як ліки для нирок. Під час Тридцятилітньої війни британські солдати пили його перед битвами, називаючи «голландською хоробрістю». Потрапивши до Лондона за короля Вільгельма III Оранського, напій спричинив справжню «Джинову лихоманку» (Gin Craze), а згодом еволюціонував у сухий шляхетний London Dry Gin.',
    historyEn: 'Gin originated from Dutch juniper spirit "Jenever", formulated by physician Franciscus Sylvius in Leiden. British troops adopted it during the Eighty Years\' War as "Dutch Courage". Under King William of Orange, it sparked London\'s famous Gin Craze, eventually refining into the pristine botanical London Dry style.',
    keyMilestones: [
      { year: '1650', event: 'Доктор Сільвій створив формулу настоянки ялівцю на зерновому спирті.', eventEn: 'Dr. Sylvius formulates medicinal juniper-infused grain spirit in Leiden.' },
      { year: '1751', event: 'Парламентський «Акт про джин» у Лондоні запровадив ліцензування та високу якість.', eventEn: 'The Gin Act of 1751 regulates production and curbs London drunkenness.' },
      { year: '1870', event: 'Британські офіцери в Індії змішують джин з хініновим тоніком — народження Джин-Тоніка.', eventEn: 'British officers in India mix bitter medicinal tonic with gin to fight malaria.' }
    ],
    funFacts: [
      'Головний компонент будь-якого джину — шишкоягоди ялівцю (Juniperus communis). Також додають коріандр, цедру цитрусових, корінь дягелю та кардамон.',
      'Джин-Тонік був створений як ліки проти малярії для британських солдатів в Індії.'
    ],
    funFactsEn: [
      'Juniper berries (Juniperus communis) are legally required to dominate the botanical profile, accompanied by coriander, angelica root, and citrus peel.',
      'Gin & Tonic was originally created by the British East India Company to make bitter anti-malarial quinine palatable.'
    ],
    productionMethod: 'Дистиляція нейтрального зернового спирту з використанням ботанікалів у мідному кубі або через підвішений джин-кошик (парова інфузія).',
    productionMethodEn: 'Redistillation of neutral grain spirit steeped with botanicals, or via steam vapor infusion through copper botanical baskets.',
    howToDrink: 'У складі коктейлів (Джин-Тонік, Негроні, Сухий Мартіні) або чистим сильно охолодженим.',
    howToDrinkEn: 'Superb in classic cocktails (Gin & Tonic, Negroni, Dry Martini) or served chilled over ice with aromatic garnishes.',
    foodPairing: 'Пасує до морепродуктів (устриці, мідії), севіче, свіжих огіркових салатів, козячих сирів та середземноморських тапас.',
    foodPairingEn: 'Fabulous with fresh oysters, sea bass ceviche, smoked salmon, cucumber tartines, and goat cheese crostini.',
    idealSnacks: ['Свіжі устриці з лимоном та табаско', 'Тартар з лосося або сибаса', 'Канапе з козячим сиром Шевр', 'Зелені оливки з лимоном', 'Хрусткі огіркові канапе з крем-сиром'],
    idealSnacksEn: ['Fresh oysters with lemon', 'Salmon or sea bass tartare', 'Goat cheese crostini with honey', 'Lemon-stuffed green olives', 'Cucumber cream cheese bites']
  },
  {
    id: 'rum',
    name: 'Ром (Rum, Ron & Rhum Agricole)',
    nameEn: 'Rum & Rhum Agricole',
    category: 'rum',
    abvRange: '37.5% - 75%',
    originCountry: 'Карибський басейн (Барбадос, Куба, Ямайка)',
    originCountryEn: 'Caribbean (Barbados, Cuba, Jamaica)',
    originCentury: 'XVII століття (1650-ті рр.)',
    originCenturyEn: '17th Century (1650s)',
    iconName: 'Compass',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    shortTagline: '«Кров Карибів» — золото тростини, морські подорожі та свобода',
    shortTaglineEn: 'The spirit of tropical sugarcane, high seas piracy, and island liberty',
    history: 'Ром виник на цукрових плантаціях Карибів у XVII столітті, коли раби виявили, що густа патока (меляса) — побічний продукт виробництва цукру — легко зброджується в алкоголь. Дистилерія Mount Gay на Барбадосі офіційно працює з 1703 року. Ром став головною валютою мореплавців, щоденним пайком британських моряків (Tot) та візитівкою піратів.',
    historyEn: 'Rum was born on 17th-century Caribbean plantations when enslaved workers discovered that molasses fermented into alcohol. Mount Gay in Barbados has operated since 1703. Rum became trade currency, a daily staple of the Royal Navy ("daily tot"), and pirate lore.',
    keyMilestones: [
      { year: '1703', event: 'Заснування найстарішої діючої ромової дистилерії Mount Gay на Барбадосі.', eventEn: 'Establishment of Mount Gay in Barbados, the world\'s oldest commercial rum brand.' },
      { year: '1740', event: 'Британський адмірал Едвард Вернон наказує розбавляти ром водою з лаймом — так народився Грог.', eventEn: 'Admiral Edward Vernon invents "Grog" by diluting navy rum with water and lime juice.' },
      { year: '1862', event: 'Дон Факундо Бакарді на Кубі розробив технологію очищення рому через вугілля.', eventEn: 'Don Facundo Bacardí pioneers smooth charcoal-filtered light rum in Cuba.' }
    ],
    funFacts: [
      'Британський Королівський флот щодня видавав кожному моряку порцію рому аж до 31 липня 1970 року — цей день в історії флоту назвали «Днем чорного ковтка» (Black Tot Day).',
      'Rhum Agricole з острова Мартиніка виготовляють не з патоки, а з свіжовичавленого соку цукрової тростини.'
    ],
    funFactsEn: [
      'The British Royal Navy maintained a mandatory daily rum ration for all sailors until July 31, 1970 ("Black Tot Day").',
      'French AOC Rhum Agricole from Martinique is pressed directly from fresh cane juice rather than industrial molasses.'
    ],
    productionMethod: 'Ферментація меляси або свіжого тростинного соку, дистиляція в кубах або колонах, витримка в бочках з білого дуба в умовах тропічного клімату.',
    productionMethodEn: 'Fermentation of molasses or pure sugar cane juice, pot or column distillation, matured in oak barrels under tropical climate.',
    howToDrink: 'Світлий ром — основа для Мохіто і Дайкірі; Витриманий темний ром — чистим з кубиком льоду.',
    howToDrinkEn: 'Light rum is stellar in Mojitos & Daiquiris; dark aged rums are best sipped neat like fine Cognac.',
    foodPairing: 'Пасує до карибських страв BBQ, креветок гриль, ананасів, смажених бананів платано та свинини.',
    foodPairingEn: 'Fantastic pairing with jerk chicken, barbecue pork ribs, coconut shrimp, grilled pineapple, and sweet plantains.',
    idealSnacks: ['Тигрові креветки на грилі з лаймом', 'Курячі крильця Джерк у гострому соусі', 'Чіпси з бананів платано', 'Смажені ананаси на грилі з корицею', 'Карибські емпанадас'],
    idealSnacksEn: ['Grilled tiger prawns with lime', 'Spicy Jamaican jerk chicken bites', 'Crispy plantain chips', 'Cinnamon grilled pineapple slices', 'Cuban beef empanadas']
  },
  {
    id: 'tequila',
    name: 'Текіла та Мескаль (Tequila & Mezcal)',
    nameEn: 'Tequila & Mezcal',
    category: 'tequila',
    abvRange: '38% - 55%',
    originCountry: 'Мексика (штат Халіско та Оахака)',
    originCountryEn: 'Mexico (Jalisco & Oaxaca)',
    originCentury: 'XVI століття (1530-ті рр.)',
    originCenturyEn: '16th Century (1530s)',
    iconName: 'Flame',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80',
    shortTagline: 'Серце блакитної агави: мексиканський вогонь та містичний дим',
    shortTaglineEn: 'The sacred heart of blue agave: smoky mysticism and vibrant energy',
    history: 'Корінні ацтеки століттями зброджували сік агави в напій «пульке». Коли у XVI столітті іспанські конкістадори вичерпали запаси європейського бренді, вони почали дистилювати запечені серцевини агави (піньяс). Місто Текіла в штаті Халіско стало центром виробництва, а у 1795 році родина Куерво отримала першу королівську ліцензію на комерційне виробництво.',
    historyEn: 'Aztecs fermented agave sap into sacred pulque. Spanish conquistadors distilled baked agave hearts (piñas) when brandy ran dry. The town of Tequila in Jalisco became the epicenter, with the Cuervo family securing the first royal permit in 1795.',
    keyMilestones: [
      { year: '1530-ті', event: 'Перша дистиляція запеченої агави іспанськими переселенцями в Мексиці.', eventEn: 'First distillation of baked agave by Spanish settlers in Mexico.' },
      { year: '1795', event: 'Хосе Марія Гваделупе де Куерво отримує першу офіційну ліцензію короля Іспанії.', eventEn: 'Jose Maria Cuervo receives official royal license to produce tequila.' },
      { year: '1974', event: 'Захист найменування за походженням (DOT) — текілу можна виробляти лише в 5 штатах Мексики.', eventEn: 'Declaration of the Appellation of Origin (DOT) legally protecting Tequila production.' }
    ],
    funFacts: [
      'Справжня якісна текіла має маркування «100% de Agave». Якщо написано просто «Tequila» — це міксто (тільки 51% агави, решта цукровий очерет).',
      'Для дозрівання однієї блакитної агави Tequilana Weber потрібно від 7 до 12 років під пекучим сонцем.'
    ],
    funFactsEn: [
      'Top-tier tequila is strictly labeled "100% de Agave". Mixed "mixto" tequilas only require 51% agave sugars.',
      'Blue Weber Agave plants require 7 to 12 years of intense sun exposure before jimadors harvest the piña.'
    ],
    productionMethod: 'Збір піньяс хімадорами, запікання в печах (або земляних ямах для димного мескалю), подрібнення, ферментація та подвійна дистиляція. Класи: Blanco (без витримки), Reposado (2-12 міс.), Añejo (1-3 роки).',
    productionMethodEn: 'Harvesting agave piñas, slow roasting in brick ovens (or volcanic stone pits for smoky Mezcal), crushing, fermentation, and copper pot still distillation. Graded Blanco, Reposado, and Añejo.',
    howToDrink: 'Текілу 100% агави та мескаль п\'ють неспішними ковтками (не залпом!) з келихів у формі тюльпана або кабальїто, запиваючи томатною сангрітою.',
    howToDrinkEn: 'Sip premium 100% agave tequila slowly from tulip glasses, alternating with spicy citrus Sangrita.',
    foodPairing: 'Ідеально поєднується з мексиканськими стравами: тако, гуакамоле з кукурудзяними начос, севіче, кесадільєю та м\'ясом на грилі.',
    foodPairingEn: 'Pairs magnificently with authentic Mexican cuisine: fish tacos, guacamole with tortilla chips, lime ceviche, and carne asada.',
    idealSnacks: ['Кукурудзяні чіпси начос з гуакамоле', 'Тако з креветками або куркою та сальсою', 'Севіче з білої риби з лаймом', 'Кесаділья з сиром та перцем халапеньйо', 'Часточки апельсина з сіллю та чилі'],
    idealSnacksEn: ['Tortilla chips with fresh guacamole', 'Shrimp or chicken tacos with pico de gallo', 'White fish ceviche with lime', 'Jalapeño cheese quesadilla', 'Orange slices dusted with worm salt and chili']
  },
  {
    id: 'cognac',
    name: 'Коньяк та Бренді (Cognac & Armagnac)',
    nameEn: 'Cognac, Armagnac & Brandy',
    category: 'brandy',
    abvRange: '40% - 45%',
    originCountry: 'Франція (регіон Шаранта)',
    originCountryEn: 'France (Charente / Cognac)',
    originCentury: 'XVI століття',
    originCenturyEn: '16th Century',
    iconName: 'Wine',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    shortTagline: 'Шляхетна вершина дистиляції: виноградний спирт, витриманий у дубах Лімузену',
    shortTaglineEn: 'The aristocratic summit of distillation: grape spirits aged in French Limousin oak',
    history: 'Голландські купці дистилювали французьке вино з регіону річки Шаранта, щоб воно не псувалося під час тривалих морських подорожей (так виник термін «брандевейн» — спалене вино). Потім з\'ясувалося, що витримка цього спирту в дубових бочках перетворює різкий напій на золотавий, ароматний еліксир.',
    historyEn: 'Dutch merchants distilled wine from Charente to prevent spoilage during sea voyages ("brandewijn"). Storing these spirits in French oak casks revealed miraculous golden transformation.',
    keyMilestones: [
      { year: '1638', event: 'Перші згадки про подвійну перегонку шарантського вина на коньячний спирт.', eventEn: 'First records of Charentais double distillation for fine eau-de-vie.' },
      { year: '1715', event: 'Заснування найстарішого великого коньячного дому Martell.', eventEn: 'Jean Martell establishes the historic Martell Cognac house.' },
      { year: '1909', event: 'Французький уряд законодавчо закріпив географічні межі регіону Коньяк.', eventEn: 'French decree establishes strict Cognac Appellation of Origin boundaries.' }
    ],
    funFacts: [
      'Маркування віку коньяку: VS (Very Special) — від 2 років; VSOP (Very Superior Old Pale) — від 4 років; XO (Extra Old) — від 10 років.',
      'Для виробництва коньяку використовують переважно один сорт білого винограду — Уні Блан (Ugni Blanc).'
    ],
    funFactsEn: [
      'Age classifications: VS (minimum 2 years), VSOP (minimum 4 years), and XO (minimum 10 years in oak).',
      'Over 95% of all Cognac is made from a single high-acid grape variety: Ugni Blanc (Trebbiano).'
    ],
    productionMethod: 'Подвійна перегонка білого вина в мідних шарантських кубах (Alambic Charentais) з обов\'язковою тривалою витримкою в бочках з лімузенського або тронсейського дуба.',
    productionMethodEn: 'Double distillation in copper Charentais alembic stills, followed by mandatory extended maturation in French Limousin or Tronçais oak casks.',
    howToDrink: 'Подавати при 18–20°C у келихах тюльпан (або снифтер). Зігрівати келих у долоні, щоб розкрити аромати сухофруктів, ванілі та шкіри.',
    howToDrinkEn: 'Serve at 18-20°C in a tulip glass. Warm gently with your palm to unleash layers of dried fruit, vanilla, and fine leather.',
    foodPairing: 'Прекрасно пасує до фуа-гра, качиного паштету, витриманих твердих сирів (Конте, Пармезан), трюфелів та чорного шоколаду.',
    foodPairingEn: 'Sublime beside duck foie gras, aged Comté cheese, truffle crostini, and high-cocoa dark chocolate.',
    idealSnacks: ['Витриманий сир Конте або Пармезан', 'Паштет з печінки качки або кролика', 'Темний шоколад з горіхами та цедрою', 'В\'ялений інжир та фініки', 'Канапе з хамоном та грушею'],
    idealSnacksEn: ['Vintage Comté or Parmigiano Reggiano', 'Duck liver pâté with brioche', 'Dark chocolate with orange peel', 'Dried figs and Medjool dates', 'Jamón and pear skewers']
  }
];
