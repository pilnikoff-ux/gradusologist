import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy Gemini client helper
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    geminiAvailable: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY")
  });
});

// Helper to generate content with fallback
async function generateWithFallback(ai: GoogleGenAI, prompt: string, isJson: boolean = true): Promise<string> {
  const modelsToTry = ["gemini-3.8-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: isJson
          ? {
              responseMimeType: "application/json",
              temperature: 0.95,
            }
          : {
              temperature: 0.7,
            },
      });
      if (response && response.text) {
        return response.text;
      }
    } catch (err) {
      lastError = err;
      console.info(`Model ${model} request unavailable, attempting fallback...`);
    }
  }

  throw lastError || new Error("All Gemini models failed");
}

// Generator for "Це пиздець" (Wild nonexistent crazy cocktails)
app.post("/api/gemini/crazy-cocktail", async (req, res) => {
  const { mood = "insane", vibe = "party", language = "uk" } = req.body || {};
  const isUa = language === "uk";
  const ai = getGeminiClient();

  if (!ai) {
    const fallbackItem = getRandomOfflineMadness(language);
    return res.json({
      success: true,
      source: "curated",
      ...fallbackItem,
      cocktail: fallbackItem
    });
  }

  try {
    const prompt = `You are a legendary eccentric mixologist and philosopher from the app "Градусолог".
The user clicked the extreme generator button "Це пиздець" (Total Madness/Impossible Cocktail).
Generate a hilarious, outlandish, fictional yet poetically detailed cocktail recipe that DOES NOT EXIST in regular bars, but sounds shockingly creative and funny.
Language: ${isUa ? "Ukrainian" : "English"}.
Context/Mood: ${mood}, Vibe: ${vibe}.

Return ONLY valid JSON matching this structure:
{
  "name": "string (funny, epic or crazy name)",
  "tagline": "string (one-line funny slogan)",
  "dangerLevel": 5,
  "ingredients": [
    "string (ingredient 1 with funny measurement)",
    "string (ingredient 2 with funny measurement)",
    "string (ingredient 3 with funny measurement)",
    "string (ingredient 4 with funny measurement)"
  ],
  "instructions": [
    "string (step 1)",
    "string (step 2)",
    "string (step 3)"
  ],
  "morningEffect": "string (hilarious morning after forecast)",
  "glass": "string (funny glassware)",
  "abv": "string (e.g. 58% or ∞%)"
}`;

    const text = await generateWithFallback(ai, prompt, true);
    const parsed = JSON.parse(text || "{}");

    const normalizedIngredients: string[] = Array.isArray(parsed.ingredients)
      ? parsed.ingredients.map((ing: any) => {
          if (typeof ing === "string") return ing;
          if (typeof ing === "object" && ing !== null) {
            return `${ing.name || ""} — ${ing.amount || ""} ${ing.note ? `(${ing.note})` : ""}`.trim();
          }
          return String(ing);
        })
      : isUa
      ? [
          "Витриманий крафтовий бурбон — 60 мл",
          "Холодний подвійний еспресо — 30 мл",
          "Екстракт пекучого перцю — 2 краплі",
          "Тертий гіркий шоколад 99% — щіпка"
        ]
      : [
          "Aged craft bourbon — 60 ml",
          "Double cold brew espresso — 30 ml",
          "Habanero pepper tincture — 2 drops",
          "Grated 99% dark chocolate — pinch"
        ];

    const normalizedInstructions: string[] = Array.isArray(parsed.instructions)
      ? parsed.instructions.map((inst: any) => String(inst))
      : isUa
      ? [
          "Змішати все в шейкері з кубиками льоду.",
          "Інтенсивно потрясти, заплющивши очі.",
          "Перелити в гранчак без соломинки."
        ]
      : [
          "Combine everything in an ice-filled shaker.",
          "Shake violently with eyes closed.",
          "Pour into a heavy tumbler."
        ];

    const rawDanger = parsed.dangerLevel;
    let dangerNum = 5;
    if (typeof rawDanger === "number") {
      dangerNum = Math.min(5, Math.max(1, Math.round(rawDanger)));
    } else if (typeof rawDanger === "string") {
      const match = rawDanger.match(/\d+/);
      if (match) {
        dangerNum = Math.min(5, Math.max(1, Math.round(Number(match[0]) / 2)));
      }
    }

    const cocktail = {
      id: `crazy_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: parsed.name || (isUa ? "«Сльози Бухгалтера перед Звітом»" : '"Accountant Tears at 3 AM"'),
      tagline: parsed.tagline || parsed.subtitle || (isUa ? "Коктейль, після якого 1С починає говорити латиною" : "A drink that makes spreadsheets whisper in ancient Latin"),
      dangerLevel: dangerNum,
      ingredients: normalizedIngredients,
      instructions: normalizedInstructions,
      morningEffect: parsed.morningEffect || parsed.morningAfterEffect || (isUa ? "Повне перезавантаження особистості." : "Total personality reset."),
      glass: parsed.glass || (isUa ? "Гранчак з калькулятором" : "Heavy tumbler"),
      abv: parsed.abv || "52%",
      createdAt: new Date().toISOString()
    };

    return res.json({
      success: true,
      source: "ai",
      ...cocktail,
      cocktail
    });
  } catch (error) {
    console.warn("Gemini crazy cocktail fallback triggered:", error instanceof Error ? error.message : error);
    const fallbackItem = getRandomOfflineMadness(language);
    return res.json({
      success: true,
      source: "fallback",
      ...fallbackItem,
      cocktail: fallbackItem
    });
  }
});

// Generator for Toasts
app.post("/api/gemini/generate-toast", async (req, res) => {
  const { occasion = "friends", tone = "funny", recipient = "", customSubject = "", language = "uk" } = req.body || {};
  const isUa = language === "uk";
  const ai = getGeminiClient();

  if (!ai) {
    const fallbackToast = getOfflineToast(occasion, tone, language);
    return res.json({
      success: true,
      source: "curated",
      ...fallbackToast,
      toast: fallbackToast
    });
  }

  try {
    const prompt = `You are a master of eloquence and drinking culture for the app "Градусолог".
Generate a memorable, punchy toast for:
Occasion: ${occasion}
Tone: ${tone} (e.g., funny, philosophical, short, hearty, poetic, sarcastic)
Dedicated to / Recipient: ${recipient || customSubject || "friends and good company"}
Language: ${isUa ? "Ukrainian" : "English"}

Return ONLY valid JSON:
{
  "title": "string (short title of the toast)",
  "text": "string (the main body of the toast, 2-3 sentences of wit or soul)",
  "punchline": "string (the final loud cheer to say before drinking)",
  "suggestedDrink": "string (what to drink with this toast)"
}`;

    const text = await generateWithFallback(ai, prompt, true);
    const parsed = JSON.parse(text || "{}");

    const toast = {
      id: `toast_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      occasion,
      tone,
      title: parsed.title || (isUa ? "За справжніх людей поруч!" : "To Genuine Companionship!"),
      titleEn: parsed.titleEn || parsed.title,
      text: parsed.text || (isUa ? "Вип'ємо за те, щоб келихи були повними, а серця — спокійними!" : "Let's drink to full glasses and peaceful minds!"),
      textEn: parsed.textEn || parsed.text,
      punchline: parsed.punchline || (isUa ? "Будьмо!" : "Cheers!"),
      punchlineEn: parsed.punchlineEn || parsed.punchline,
      suggestedDrink: parsed.suggestedDrink || (isUa ? "Витриманий віскі або улюблений коктейль" : "Aged whiskey or favorite cocktail"),
      suggestedDrinkEn: parsed.suggestedDrinkEn || parsed.suggestedDrink
    };

    return res.json({
      success: true,
      source: "ai",
      ...toast,
      toast
    });
  } catch (error) {
    console.warn("Gemini toast fallback triggered:", error instanceof Error ? error.message : error);
    const fallbackToast = getOfflineToast(occasion, tone, language);
    return res.json({
      success: true,
      source: "fallback",
      ...fallbackToast,
      toast: fallbackToast
    });
  }
});

// Sommelier consultation / Q&A
app.post("/api/gemini/sommelier-consult", async (req, res) => {
  const { query = "", language = "uk" } = req.body || {};
  const isUa = language === "uk";
  const ai = getGeminiClient();

  if (!ai) {
    return res.json({
      success: true,
      reply: isUa
        ? "Градусолог радить: Головне правило вечора — не знижувати градус, пити склянку води на кожен шот і ніколи не писати колишнім після третього Negroni!"
        : "Gradusologist advises: The golden rule is never lower your ABV, drink a glass of water for every shot, and never text your ex after your third Negroni!"
    });
  }

  try {
    const prompt = `You are "Градусолог" (The Gradusologist) — a witty, knowledgeable, charming bartender, sommelier and party survival expert.
Respond in ${isUa ? "Ukrainian" : "English"}.
Tone: witty, professional, warm, slightly humorous, responsible about alcohol consumption.
User query: "${query}"`;

    const text = await generateWithFallback(ai, prompt, false);
    return res.json({ success: true, reply: text });
  } catch (error) {
    console.warn("Gemini sommelier fallback triggered:", error instanceof Error ? error.message : error);
    return res.json({
      success: true,
      reply: isUa
        ? "Градусолог на зв'язку: обирай перевірені класичні пропорції, закушуй білковою їжею і пий воду!"
        : "Gradusologist here: Stick to balanced classic ratios, eat protein snacks, and hydrate!"
    });
  }
});

// Party Drunk Roulette Generator endpoint
app.post("/api/gemini/party-roulette", async (req, res) => {
  const {
    alcohols = ["Горілка", "Єгермейстер", "Пиво"],
    snacks = ["Солоні огірочки", "Лимон", "Чіпси"],
    softDrinks = ["Бабусин компот", "Тонік", "Кола"],
    peopleCount = 4,
    guestNames = [],
    partyVibe = "party", // "light", "party", "hardcore"
    language = "uk"
  } = req.body || {};

  const isUa = language === "uk";
  const ai = getGeminiClient();

  const getOfflineChallenges = () => {
    const alcStr = alcohols.length ? alcohols : ["Горілка", "Пиво"];
    const snkStr = snacks.length ? snacks : ["Солоні огірочки", "Лимон"];
    const sftStr = softDrinks.length ? softDrinks : ["Компот", "Тонік"];

    const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    return [
      {
        id: "pr_1",
        title: isUa ? "🎯 Пряме влучання" : "🎯 Direct Shot",
        action: isUa
          ? `Випий 40 мл [${pick(alcStr)}] і закуси [${pick(snkStr)}] без допомоги рук!`
          : `Take 40 ml of [${pick(alcStr)}] and eat [${pick(snkStr)}] with no hands!`,
        intensity: "medium",
        icon: "🎯"
      },
      {
        id: "pr_2",
        title: isUa ? "😭 Тобі не пощастило!" : "😭 Unlucky Sip",
        action: isUa
          ? `Тобі не повезло: всі піднімають алкоголь, а ти п'єш повний келих [${pick(sftStr)}] залпом і кажеш душевний тост!`
          : `Unlucky: while everyone drinks alcohol, you must down a full glass of [${pick(sftStr)}] in one gulp!`,
        intensity: "low",
        icon: "🧃"
      },
      {
        id: "pr_3",
        title: isUa ? "🧪 Пекельний алхімік" : "🧪 Mad Alchemist",
        action: isUa
          ? `Змішай у чарці 30 мл [${pick(alcStr)}] з 50 мл [${pick(sftStr)}], скажи «Хай живе хімія!» і випий за здоров'я сусіда праворуч.`
          : `Mix 30 ml of [${pick(alcStr)}] with 50 ml of [${pick(sftStr)}] and drink to your right neighbor's health!`,
        intensity: "high",
        icon: "🧪"
      },
      {
        id: "pr_4",
        title: isUa ? "🍋 Лимонна / Закусочна дуель" : "🍋 Snack Duel",
        action: isUa
          ? `З'їж порцію [${pick(snkStr)}] із кам'яним виразом обличчя протягом 15 секунд. Якщо скривишся — п'єш шот [${pick(alcStr)}]!`
          : `Eat [${pick(snkStr)}] with a stone face for 15 seconds. If you smile or flinch, drink a shot of [${pick(alcStr)}]!`,
        intensity: "medium",
        icon: "🍋"
      },
      {
        id: "pr_5",
        title: isUa ? "👑 Королівський указ" : "👑 Royal Decree",
        action: isUa
          ? `Ти призначаєш будь-кого з компанії випити [${pick(alcStr)}] разом із закускою [${pick(snkStr)}]. Відмовитися не можна!`
          : `You command any guest to drink [${pick(alcStr)}] paired with [${pick(snkStr)}]!`,
        intensity: "medium",
        icon: "👑"
      },
      {
        id: "pr_6",
        title: isUa ? "🛡️ Щасливий імунітет" : "🛡️ Lucky Immunity",
        action: isUa
          ? `Пропускаєш хід і отримуєш право з'їсти улюблену [${pick(snkStr)}]. Наступний гравець отримує подвійну порцію уваги!`
          : `Skip this turn and treat yourself to [${pick(snkStr)}]!`,
        intensity: "low",
        icon: "🛡️"
      },
      {
        id: "pr_7",
        title: isUa ? "⚡ Бліц-шот" : "⚡ Rapid Shot",
        action: isUa
          ? `Назви 3 столиці світу за 5 секунд. Встиг — п'єш смачний [${pick(sftStr)}]. Не встиг — п'єш 40 мл [${pick(alcStr)}]!`
          : `Name 3 world capitals in 5 seconds. If you succeed, drink [${pick(sftStr)}], otherwise take [${pick(alcStr)}]!`,
        intensity: "high",
        icon: "⚡"
      },
      {
        id: "pr_8",
        title: isUa ? "🫙 Вітамінний ковток" : "🫙 Refreshing Sip",
        action: isUa
          ? `Зроби 3 великих ковтки [${pick(sftStr)}] для відновлення водного балансу компанії!`
          : `Take 3 big sips of [${pick(sftStr)}] to balance your hydration!`,
        intensity: "low",
        icon: "💧"
      },
      {
        id: "pr_9",
        title: isUa ? "🔥 Братнє коло" : "🔥 Brotherhood Toast",
        action: isUa
          ? `Чокнутися з усіма за столом і зробити по ковтку [${pick(alcStr)}]. Той, хто чокнеться останнім, закушує [${pick(snkStr)}]!`
          : `Clink glasses with everyone! The last person to clink eats [${pick(snkStr)}]!`,
        intensity: "medium",
        icon: "🍻"
      },
      {
        id: "pr_10",
        title: isUa ? "🤐 Обітниця мовчання" : "🤐 Vow of Silence",
        action: isUa
          ? `Мовчи до наступного свого кола. Якщо скажеш хоч слово — п'єш штрафний шот [${pick(alcStr)}]!`
          : `Stay silent until your next turn or drink a penalty shot of [${pick(alcStr)}]!`,
        intensity: "high",
        icon: "🤐"
      },
      {
        id: "pr_11",
        title: isUa ? "🎭 Тост навпаки" : "🎭 Backward Toast",
        action: isUa
          ? `Скажи тост від імені кота або бармена, що втомився. Якщо всі засміються — компанія п'є [${pick(alcStr)}]!`
          : `Deliver a toast in the persona of a tired bartender! If people laugh, everyone drinks [${pick(alcStr)}]!`,
        intensity: "medium",
        icon: "🎭"
      },
      {
        id: "pr_12",
        title: isUa ? "🧊 Випробування холодом" : "🧊 Chill Challenge",
        action: isUa
          ? `Випий шот [${pick(alcStr)}] з льодом і обов'язково закуси [${pick(snkStr)}].`
          : `Take a chilled shot of [${pick(alcStr)}] paired with [${pick(snkStr)}].`,
        intensity: "medium",
        icon: "🧊"
      }
    ];
  };

  if (!ai) {
    return res.json({
      success: true,
      source: "curated",
      challenges: getOfflineChallenges()
    });
  }

  try {
    const prompt = `You are the master creator of drinking party games for "Градусолог".
The user is having a real party with their friends and provided their available items:
Alcohol bottles available: ${alcohols.join(", ") || "various alcohol"}
Snacks available: ${snacks.join(", ") || "various snacks"}
Soft / Non-alcoholic drinks available: ${softDrinks.join(", ") || "water, juice"}
Number of people: ${peopleCount}
Guest names (if any): ${guestNames.join(", ") || "Guests"}
Party Vibe: ${partyVibe} (light, party, or hardcore)
Language: ${isUa ? "Ukrainian" : "English"}

Generate exactly 12 unique, hilarious, highly creative and interactive "Drunk Roulette" tasks based DIRECTLY on the user's specific alcohol, snacks, and soft drinks!
Include tasks like:
- Drinking exact ml of their alcohol and eating specific snack with weird rules (e.g. without hands, with eyes closed)
- "Unlucky" tasks where someone has to drink a huge glass of their soft drink (e.g., compote, pickle brine, or milk) while everyone else toasts
- Funny mixes of their alcohol + soft drink
- Party toasts, duels, silence challenges, and comedic forfeits.

Return ONLY valid JSON array:
[
  {
    "id": "string",
    "title": "string (short funny title with emoji)",
    "action": "string (the specific challenge instruction using their actual items)",
    "intensity": "low" | "medium" | "high",
    "icon": "string (emoji)"
  }
]`;

    const text = await generateWithFallback(ai, prompt, true);
    const parsed = JSON.parse(text || "[]");

    if (Array.isArray(parsed) && parsed.length > 0) {
      return res.json({
        success: true,
        source: "ai",
        challenges: parsed
      });
    }

    return res.json({
      success: true,
      source: "fallback",
      challenges: getOfflineChallenges()
    });
  } catch (error) {
    console.warn("Gemini party roulette fallback triggered:", error instanceof Error ? error.message : error);
    return res.json({
      success: true,
      source: "fallback",
      challenges: getOfflineChallenges()
    });
  }
});

// Offline mad cocktails collection
function getRandomOfflineMadness(lang: string) {
  const isUa = lang === "uk";
  const listUa = [
    {
      id: `crazy_offline_1_${Date.now()}`,
      name: "Сльози Бухгалтера о 4-й ранку",
      tagline: "Коли баланс зійшовся тільки з третьою чаркою",
      dangerLevel: 5,
      abv: "58%",
      glass: "Гранчак з калькулятором на блюдці",
      ingredients: [
        "Витриманий бурбон — 60 мл (для душевного спокою)",
        "Еспресо подвійний холодний — 30 мл (щоб очі дивились в екран)",
        "Лікер Калуа — 25 мл (для солодкої ілюзії премії)",
        "Крапля екстракту пекучого перцю — 2 краплі (як перевірка податкової)",
        "Тертий гіркий шоколад 99% — щіпка (як колір надії)"
      ],
      instructions: [
        "Змішати бурбон з еспресо в шейкері, додати лід розміром з податковий штраф.",
        "Додати 2 краплі перцю, струсити так, наче річний звіт горить.",
        "Перелити в гранчак, прикрасити чеком з супермаркету."
      ],
      morningEffect: "Нестерпне бажання відкрити ФОП у відкритому космосі та вимкнути робочий телефон.",
      createdAt: new Date().toISOString()
    },
    {
      id: `crazy_offline_2_${Date.now()}`,
      name: "Телепортатор у 2007-й",
      tagline: "Повертає чубчик, скіні-джинси і безтурботність",
      dangerLevel: 4,
      abv: "45%",
      glass: "Високий хайбол з неоновою трубочкою",
      ingredients: [
        "Джин на малині — 50 мл (рожевий, як твої старі кеди)",
        "Синій кюрасао або енергетик — 20 мл (для синтетичного сяйва)",
        "Тонік з грейпфрутом — 100 мл (гіркий, як доросле життя)",
        "Кисла шипучка 'Barberry' — 1 шт (кинути на дно)"
      ],
      instructions: [
        "Наповнити келих льодом до країв.",
        "Влити джин і блю кюрасао, обережно долити тонік.",
        "Кинути на дно кислу шипучку — вона почне люто вирувати під трек Tokio Hotel."
      ],
      morningEffect: "Прокинешся зі звуком вхідного повідомлення з ICQ в голові.",
      createdAt: new Date().toISOString()
    },
    {
      id: `crazy_offline_3_${Date.now()}`,
      name: "Чорна Діра Андромеди",
      tagline: "Коктейль, після якого час і простір міняються місцями",
      dangerLevel: 5,
      abv: "65%",
      glass: "Чорний матовий рокс з сухим льодом",
      ingredients: [
        "Чорна самбука — 40 мл (темна матерія)",
        "Абсент 70% — 30 мл (двигун деформації простору)",
        "Ожина розтерта з розмарином — 30 г (міжзоряний пил)",
        "Активоване вугілля мікронізоване — 1 капсула (для ідеальної чорноти)"
      ],
      instructions: [
        "Перетерти ожину з розмарином, додати вугілля.",
        "Залити самбукою та абсентом, збити з подрібненим льодом.",
        "Подавати з гілочкою розмарину, підпаленою з одного кінця."
      ],
      morningEffect: "Повне відчуття, що вчора ти підкорив галактику, але забув де запаркував зореліт.",
      createdAt: new Date().toISOString()
    }
  ];

  const listEn = [
    {
      id: `crazy_offline_en_1_${Date.now()}`,
      name: "Accountant's 4 AM Epiphany",
      tagline: "When the audit passed solely thanks to the third glass",
      dangerLevel: 5,
      abv: "58%",
      glass: "Old fashioned tumbler with a calculator",
      ingredients: [
        "Aged Bourbon — 60 ml (for soul stability)",
        "Double Cold Brew Espresso — 30 ml (to keep eyes on spreadsheets)",
        "Kahlua Coffee Liqueur — 25 ml (for sweet bonus illusions)",
        "Habanero Pepper Tincture — 2 drops (like a surprise tax audit)",
        "Grated 99% Dark Chocolate — pinch (color of hope)"
      ],
      instructions: [
        "Combine bourbon and cold brew in shaker filled with ice cubes sized like tax penalties.",
        "Add spicy tincture, shake violently as if your quarterly report is on fire.",
        "Strain into tumbler, garnish with supermarket receipt."
      ],
      morningEffect: "Overwhelming urge to register a business on Mars and mute work Slack.",
      createdAt: new Date().toISOString()
    },
    {
      id: `crazy_offline_en_2_${Date.now()}`,
      name: "Andromeda's Black Hole",
      tagline: "A drink after which time and space switch positions",
      dangerLevel: 5,
      abv: "65%",
      glass: "Matte black rocks glass with dry ice smoke",
      ingredients: [
        "Black Sambuca — 40 ml (dark matter)",
        "Absinthe 70% — 30 ml (warp drive fuel)",
        "Muddled Blackberries & Rosemary — 30 g (interstellar dust)",
        "Activated charcoal powder — 1 capsule (for pitch black void)"
      ],
      instructions: [
        "Muddle blackberries with fresh rosemary and charcoal powder.",
        "Add sambuca and absinthe, shake hard with crushed ice.",
        "Serve with a torched rosemary sprig."
      ],
      morningEffect: "Certainty that you conquered a galaxy, but forgot where you parked your starship.",
      createdAt: new Date().toISOString()
    }
  ];

  const list = isUa ? listUa : listEn;
  return list[Math.floor(Math.random() * list.length)];
}

function getOfflineToast(occasion: string, _tone: string, lang: string) {
  const isUa = lang === "uk";
  if (isUa) {
    if (occasion === "friends") {
      return {
        id: `toast_off_${Date.now()}`,
        occasion,
        tone: "hearty",
        title: "За справжніх друзів!",
        text: "Вип'ємо за друзів, які знають усі наші дурості, але все одно сідають з нами за один стіл і наливають по вінця!",
        punchline: "Будьмо, найкращі люди на цій планеті!",
        suggestedDrink: "Витриманий віскі або крижаний шот"
      };
    } else if (occasion === "love" || occasion === "women") {
      return {
        id: `toast_off_${Date.now()}`,
        occasion,
        tone: "hearty",
        title: "За прекрасну стать!",
        text: "За жінок, чия посмішка знезброює швидше за міцний ром, а погляд зігріває краще за будь-який глінтвейн.",
        punchline: "За твою неперевершену чарівність!",
        suggestedDrink: "Шовковий Cosmopolitan або French 75"
      };
    } else if (occasion === "friday") {
      return {
        id: `toast_off_${Date.now()}`,
        occasion,
        tone: "funny",
        title: "За перезавантаження тижня!",
        text: "Робочі дедлайни померли, а вечір тільки починається. Нехай градус буде правильним, а ранок — легким і добрим!",
        punchline: "До дна за святу п'ятницю!",
        suggestedDrink: "Old Fashioned або Gin Tonic"
      };
    }
    return {
      id: `toast_off_${Date.now()}`,
      occasion,
      tone: "philosophical",
      title: "За мудрість і баланс!",
      text: "Нехай наші келихи ніколи не бувають порожніми, а голови — завжди світлими, скільки б градусів не було в серці!",
      punchline: "За нас із вами і за мирний вечір!",
      suggestedDrink: "Гарне червоне вино або Negroni"
    };
  } else {
    return {
      id: `toast_off_${Date.now()}`,
      occasion,
      tone: "hearty",
      title: "To True Companionship!",
      text: "Here is to friends who know all our craziest stories, yet still choose to share the table and top up our glasses without hesitation.",
      punchline: "Cheers and bottom's up!",
      suggestedDrink: "Single Malt Scotch or crisp Martini"
    };
  }
}

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Gradusologist server running on http://localhost:${PORT}`);
  });
}

startServer();
