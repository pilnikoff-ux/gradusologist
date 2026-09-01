import { RouletteOption } from '../types';

export const ROULETTE_OPTIONS: RouletteOption[] = [
  {
    index: 1,
    textUa: '1. Йти спати',
    textEn: '1. Go to sleep',
    category: 'sleep',
    color: '#059669', // Emerald
    badge: 'Мудрий вибір',
    badgeEn: 'Wise Choice',
    adviceUa: 'Найкраще стратегічне рішення вечора. Випий 500 мл негазованої мінералки, відкрий кватирку і лягай в ліжко. Твоя печінка скаже тобі «дякую» о 8-й ранку.',
    adviceEn: 'The best strategic move of the night. Drink 500ml of mineral water, crack a window, and hit the pillow. Your liver will salute you at 8 AM.',
    suggestedTrackOrActionUa: 'Поставити склянку води біля ліжка та будильник на тихий режим.',
    suggestedTrackOrActionEn: 'Put a glass of water on the nightstand and set a gentle alarm.'
  },
  {
    index: 2,
    textUa: '2. Випити ще',
    textEn: '2. Have another drink',
    category: 'more',
    color: '#dc2626', // Red
    badge: 'Гра з вогнем',
    badgeEn: 'Playing with Fire',
    adviceUa: 'Рулетка вимагає банкету! Але увага: тільки чистий напій без солодкої газованки, або легкий шот з лимоном. І обов’язково закуска!',
    adviceEn: 'The wheel demands celebration! Caution: keep it neat, avoid sugary mixers, and get a solid snack immediately.',
    suggestedTrackOrActionUa: 'Замовити щось із високим вмістом цитрусу або порцію гарного бурбону.',
    suggestedTrackOrActionEn: 'Order something citrus-forward or a neat sip of aged bourbon.'
  },
  {
    index: 3,
    textUa: '3. Запросити дівчину',
    textEn: '3. Invite a girl',
    category: 'social',
    color: '#db2777', // Pink
    badge: 'Романтичний гамбіт',
    badgeEn: 'Romantic Gambit',
    adviceUa: 'Перевір спочатку: чи не плутається язик? Якщо ти ще здатний підтримувати інтелектуальну бесіду без фрази «а знаєш, яка в мене тонка душа?», сміливо пиши приємний комплімент!',
    adviceEn: 'Check yourself first: can you talk clearly? If you can hold a charming chat without lamenting life philosophy, send a sweet, thoughtful invite.',
    suggestedTrackOrActionUa: 'Написати: «Привіт, згадав про тебе і посміхнувся. Як твій вечір?» (ніяких голосових!)',
    suggestedTrackOrActionEn: 'Text: "Hey, was just thinking of you and smiled. How is your night going?" (NO voice messages!)'
  },
  {
    index: 4,
    textUa: '4. Замовити повію',
    textEn: '4. Order an escort',
    category: 'escort',
    color: '#9333ea', // Purple
    badge: 'Кризовий менеджмент',
    badgeEn: 'Crisis Management',
    adviceUa: 'Гарячий поворот сюжету! Але порада від Градусолога: почекай 15 хвилин, випий холодної води. Якщо бажання не розчинилося разом з алкоголем — готуй готівку і будь джентльменом.',
    adviceEn: 'A spicy plot twist! Bartender tip: wait 15 minutes and drink ice water. If the urge is still there, have cash ready and stay a thorough gentleman.',
    suggestedTrackOrActionUa: 'Перевірити стан банківського рахунку перед будь-якими дзвінками.',
    suggestedTrackOrActionEn: 'Double check your bank balance before making impulsive calls.'
  },
  {
    index: 5,
    textUa: '5. Погуляти з песиком',
    textEn: '5. Walk the dog',
    category: 'pets',
    color: '#0284c7', // Sky blue
    badge: 'Хвостикотерапія',
    badgeEn: 'Doggo Therapy',
    adviceUa: 'Собака — єдина істота, яка любить тебе навіть тоді, коли ти пахнеш як розлита текіла. Свіже повітря провітрить мізки, а пес буде на сьомому небі від щастя.',
    adviceEn: 'Your dog is the only being that unconditionally loves you even when you smell like spilled tequila. Fresh air will clear your head instantly.',
    suggestedTrackOrActionUa: 'Взяти повідок, пакетики і зробити довге коло навколо парку.',
    suggestedTrackOrActionEn: 'Grab the leash, bags, and take an extra loop around the park.'
  },
  {
    index: 6,
    textUa: '6. Вигуляти коня',
    textEn: '6. Walk the horse',
    category: 'pets',
    color: '#ea580c', // Orange
    badge: 'Епічний квест',
    badgeEn: 'Epic Quest',
    adviceUa: 'Якщо у тебе є кінь — ти або козак, або принц, або уявив конем свого сусіда. Якщо коня нема — вийди на балкон і уяви, що ти мчиш у туман!',
    adviceEn: 'If you actually have a horse, you are either a knight, a Cossack, or mistaking a neighbor for one. Otherwise, take a heroic breath of night air.',
    suggestedTrackOrActionUa: 'Зробити величну позу полководця біля вікна.',
    suggestedTrackOrActionEn: 'Strike a commanding commander pose by the window.'
  },
  {
    index: 7,
    textUa: '7. Відхватити люлей у жінки',
    textEn: '7. Get scolded by wife',
    category: 'danger',
    color: '#b91c1c', // Dark red
    badge: 'Сімейний екстрим',
    badgeEn: 'Domestic Extreme',
    adviceUa: 'Уникай прямого зіткнення! Стратегія: зняти взуття біля дверей без шуму, не впускати ключі, зробити вигляд котика зі шрека і тихенько доповзти до дивана.',
    adviceEn: 'Avoid direct confrontation! Stealth tactic: take off shoes silently, don’t drop keys, adopt the Puss in Boots eyes, and slide straight onto the sofa.',
    suggestedTrackOrActionUa: 'Шепіт: «Кохана, ти найкрасивіша жінка у Всесвіті» і швидкий сон.',
    suggestedTrackOrActionEn: 'Whisper: "Honey, you are the most stunning woman in the galaxy" and fake immediate sleep.'
  },
  {
    index: 8,
    textUa: '8. Піти у себе',
    textEn: '8. Go into yourself',
    category: 'mind',
    color: '#4f46e5', // Indigo
    badge: 'Дзен-транс',
    badgeEn: 'Zen Transcendence',
    adviceUa: 'Одягни навушники, ввімкни ембієнт або шуми дощу, сядь у м’яке крісло і заплющ очі. Пливи по хвилях свідомості, поки хвилі не перетворяться на міцний сон.',
    adviceEn: 'Put on headphones, queue some warm ambient tones or rain sounds, lean back, and drift along your thoughts into deep restorative sleep.',
    suggestedTrackOrActionUa: 'Трек: Brian Eno — An Ending (Ascent)',
    suggestedTrackOrActionEn: 'Track: Brian Eno — An Ending (Ascent)'
  },
  {
    index: 9,
    textUa: '9. Подрочити',
    textEn: '9. Jerk off / Self-care',
    category: 'social',
    color: '#e11d48', // Rose
    badge: 'Гормональний скид',
    badgeEn: 'Dopamine Flush',
    adviceUa: 'Швидкий викид ендорфінів та окситоцину знижує рівень алкогольного кортизолу та моментально клонить у солодкий сон без драм та смс.',
    adviceEn: 'A natural surge of endorphins and oxytocin will calm your alcohol-induced cortisol and guarantee an instant, peaceful slumber without texting drama.',
    suggestedTrackOrActionUa: 'Закрити всі вкладки інкогніто після процесу і випити води.',
    suggestedTrackOrActionEn: 'Close incognito tabs afterwards, drink a glass of water, and snooze.'
  },
  {
    index: 10,
    textUa: '10. Розібратися, чому мене не поважають',
    textEn: '10. Find out why I\'m not respected',
    category: 'mind',
    color: '#d97706', // Amber
    badge: 'Філософський спаринг',
    badgeEn: 'Existential Inquest',
    adviceUa: 'СТОП! Класична пастка 3-ї стадії сп’яніння. Тебе всі поважають, просто зараз не час проводити консиліум у чаті під\'їзду чи телефонувати шефу. Відклади розбірки на понеділок.',
    adviceEn: 'HALT! The classic Stage 3 drinking trap. Everybody respects you; tonight is definitely NOT the time to debate it in group chats or call your boss.',
    suggestedTrackOrActionUa: 'Записати свої претензії у паперовий блокнот і прочитати вранці зі сміхом.',
    suggestedTrackOrActionEn: 'Write your grievances on a paper notepad; read and laugh at them tomorrow.'
  },
  {
    index: 11,
    textUa: '11. Написати колишній',
    textEn: '11. Text the ex',
    category: 'ex',
    color: '#c026d3', // Fuchsia
    badge: 'Червона зона',
    badgeEn: 'Red Alert Zone',
    adviceUa: 'НЕ РОБИ ЦЬОГО! Поклади телефон екраном донизу. Твоє «спиш?» або «а пам’ятаєш Одесу 2019?» зараз звучить як катастрофа. Віддай телефон коту.',
    adviceEn: 'DO NOT DO IT! Put your phone face down. That "u up?" or "remember that summer?" is a booby trap. Hand the phone over to your pet.',
    suggestedTrackOrActionUa: 'Ввімкнути режим "У літаку" на найближчі 6 годин.',
    suggestedTrackOrActionEn: 'Turn on Airplane Mode for the next 6 hours immediately.'
  },
  {
    index: 12,
    textUa: '12. Замовити якусь хуйню на тему',
    textEn: '12. Order random useless stuff online',
    category: 'shopping',
    color: '#ca8a04', // Yellow-amber
    badge: 'Шопоголічний рейд',
    badgeEn: 'Midnight Shopping Spree',
    adviceUa: 'Самурайський меч, надувний басейн у вітальню чи лазерна указка для тарганів? Додай все в кошик, але НЕ ТИСНИ «Оплатити» до 11:00 ранку.',
    adviceEn: 'A replica samurai sword, inflatable flamingo, or titanium garlic press? Add it all to the cart, but DO NOT click Checkout until tomorrow morning.',
    suggestedTrackOrActionUa: 'Накидати 15 божевільних товарів у кошик на AliExpress / Amazon і лягти спати.',
    suggestedTrackOrActionEn: 'Fill your Amazon/AliExpress cart with weird gadgets, then walk away.'
  },
  {
    index: 13,
    textUa: '13. Покурити',
    textEn: '13. Have a smoke',
    category: 'smoke',
    color: '#71717a', // Zinc
    badge: 'Нікотинова пауза',
    badgeEn: 'Nicotine Pause',
    adviceUa: 'Класичний ритуал нічного двору. Повільний дим, погляд на зорі і тиша. Не забудь загасити недопалок до кінця!',
    adviceEn: 'Classic quiet night balcony ritual. Watch the stars, catch the quiet breeze, and make sure the cigarette is 100% extinguished.',
    suggestedTrackOrActionUa: 'Подихати нічним повітрям 5 хвилин без гаджетів.',
    suggestedTrackOrActionEn: 'Breathe the cool air for 5 minutes without checking screens.'
  },
  {
    index: 14,
    textUa: '14. Послухати музику 80х',
    textEn: '14. Listen to 80s music',
    category: 'music',
    color: '#06b6d4', // Cyan
    badge: 'Синтвейв ейфорія',
    badgeEn: 'Synthwave Euphoria',
    adviceUa: 'Найкращий терапевтичний вайб! Synth-pop, Modern Talking, Depeche Mode або українська естрада 80-90х подарують абсолютний кайф.',
    adviceEn: 'The absolute best audio vibe! Synth-pop, 80s disco, New Wave and electric nostalgia will carry you straight into a golden mood.',
    suggestedTrackOrActionUa: 'Трек: a-ha — Take On Me або Modern Talking — Cheri Cheri Lady',
    suggestedTrackOrActionEn: 'Track: a-ha — Take On Me or New Order — Blue Monday'
  },
  {
    index: 15,
    textUa: '15. Ще раз поміркувати над життям і крутанути рулетку',
    textEn: '15. Reflect on life and spin again',
    category: 'spin',
    color: '#8b5cf6', // Violet
    badge: 'Колесо долі',
    badgeEn: 'Wheel of Fate',
    adviceUa: 'Доля дає тобі другий шанс! Зроби глибокий вдих, прислухайся до свого внутрішнього бармена і крути колесо фортуни знову!',
    adviceEn: 'Destiny grants you a reroll! Take a deep breath, listen to your inner gradusologist, and let the wheel spin once more!',
    suggestedTrackOrActionUa: 'Натиснути кнопку «Крутити знову» з повним ентузіазмом!',
    suggestedTrackOrActionEn: 'Hit the Spin Again button with maximum flair!'
  },
  {
    index: 16,
    textUa: '16. Винести пляшки',
    textEn: '16. Take out the bottles',
    category: 'clean',
    color: '#10b981', // Emerald
    badge: 'Операція «Чистота»',
    badgeEn: 'Operation Cleanup',
    adviceUa: 'Дзвін порожньої склотари — це музика переможеного свята. Збери всі пляшки в міцний пакет, винеси до бака, і вранці квартира зустріне тебе затишком, а не баром після штурму.',
    adviceEn: 'The clinking of empty bottles is the symphony of a conquered party. Bag them up, take them out, and wake up to a pristine home.',
    suggestedTrackOrActionUa: 'Скласти пляшки в пакет і викинути у контейнер для скла.',
    suggestedTrackOrActionEn: 'Pack empty glass bottles into a recycling bag and carry them out.'
  },
  {
    index: 17,
    textUa: '17. Винести мозок',
    textEn: '17. Drive someone crazy / philosophical rant',
    category: 'rage',
    color: '#f43f5e', // Rose-Red
    badge: 'Інтелектуальний штурм',
    badgeEn: 'Brainstorm Riot',
    adviceUa: 'Твій мозок зараз генерує 100 геніальних ідей на секунду про квантову фізику, теорію змови чи історію Римської імперії. Знайди співрозмовника або напиши статтю в нотатки!',
    adviceEn: 'Your mind is outputting 100 wild theories per second about Roman architecture, quantum physics, and alien pyramids. Channel it into your notes app!',
    suggestedTrackOrActionUa: 'Відкрити голосові нотатки і надиктувати свій маніфест для історії.',
    suggestedTrackOrActionEn: 'Open voice notes and record your philosophical manifesto for future generations.'
  }
];
