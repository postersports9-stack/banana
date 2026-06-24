// Site copy for both locales. The home page is rendered from a single shared
// component (src/components/SiteHome.tsx); the route decides which dictionary to
// feed it: `/` -> mk, `/en` -> en. Add a locale by adding a key here.

export type Lang = "mk" | "en";

export type Review = {
  title: string;
  person: string;
  company: string;
  rating: number;
  quote: string;
  image: string;
  imageAlt: string;
};

// Shape shared by the dedicated service landing pages (web design, SEO …).
// Each lives at its own route and is rendered by a shared-shape component
// (WebDesignPage / SeoPage). The service-overview cards and testimonials on
// those pages reuse the `services` / `testimonials` keys below.
export type ServicePage = {
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleHighlight: string;
    subtitle: string;
    body: string;
    cta: string;
    secondaryCta: string;
  };
  value: {
    heading: string;
    paragraphs: string[];
    bullets: string[];
  };
  process: {
    badge: string;
    heading: string;
    intro: string;
    steps: { num: string; title: string; desc: string }[];
    timelineNote: string;
  };
  benefits: {
    heading: string;
    intro: string;
    cards: { icon: string; title: string; desc: string }[];
  };
  faq: {
    eyebrow: string;
    heading: string;
    items: { q: string; a: string }[];
  };
  servicesHeading: string;
  finalCta: {
    badge: string;
    heading: string;
    button: string;
  };
};

// One portfolio entry. `image` is the screenshot mockup (added later — until the
// file exists the card falls back to the client `logo`). `industry` drives the
// sidebar list and `packages` the checkbox filters; both taxonomies are derived
// from the projects array, so adding a project updates the filters automatically.
export type PortfolioProject = {
  name: string;
  url: string;
  image: string;
  imageAlt: string;
  logo: string;
  industry: string;
  packages: string[];
  bullets: string[];
};

// Copy + data for the portfolio page (/portfolio & /en/portfolio,
// src/components/PortfolioPage.tsx).
export type PortfolioContent = {
  searchLabel: string;
  searchPlaceholder: string;
  industriesTitle: string;
  allIndustries: string;
  packagesTitle: string;
  resultsLabel: string;
  clearFilters: string;
  noResults: string;
  projects: PortfolioProject[];
};

export type Dict = {
  clientsHeading: string;
  nav: {
    webDesign: string;
    webDesignCard1Title: string;
    webDesignCard1Desc: string;
    webDesignCard2Title: string;
    webDesignCard2Desc: string;
    info: string;
    blog: string;
    allPosts: string;
    seo: string;
    portfolio: string;
    contact: string;
    quote: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleHighlight: string;
    titleMid: string;
    titleEnd: string;
    quote: string;
    portfolio: string;
  };
  services: {
    heading: string;
    intro: string;
    // Each overview card links to its dedicated service page (locale-specific
    // href — the dictionary is already split per locale).
    cards: { icon: string; title: string; desc: string; href: string }[];
  };
  features: {
    badge: string;
    heading: string;
    cards: { icon: string; title: string; desc: string }[];
    cta: string;
    imgAlt: string;
  };
  testimonials: {
    eyebrow: string;
    heading: string;
    reviews: Review[];
    showReview: string;
  };
  cta: {
    badge: string;
    heading: string;
    button: string;
  };
  // Copy for the dedicated service landing pages. `webDesignPage` ->
  // /web-dizajn & /en/web-design (src/components/WebDesignPage.tsx); `seoPage`
  // -> /seo-optimizacija & /en/seo (src/components/SeoPage.tsx). Only the
  // sections unique to those pages live here.
  webDesignPage: ServicePage;
  webStorePage: ServicePage;
  seoPage: ServicePage;
  portfolioPage: PortfolioContent;
  footer: {
    brandDesc: string;
    servicesTitle: string;
    services: string[];
    navTitle: string;
    nav: { label: string; href: string }[];
    contactTitle: string;
    location: string;
    quote: string;
    copyright: string;
    privacy: string;
    terms: string;
  };
  modal: {
    close: string;
    badge: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    activityLabel: string;
    activityPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
  };
};

export const translations: Record<Lang, Dict> = {
  mk: {
    clientsHeading: "Доверба од нашите клиенти",
    nav: {
      webDesign: "Веб дизајн",
      webDesignCard1Title: "Изработка на веб страни",
      webDesignCard1Desc: "Модерни, брзи и респонзивни презентациски веб страни за вашиот бизнис.",
      webDesignCard2Title: "Изработка на веб продавници",
      webDesignCard2Desc: "Онлајн продавници со интегрирано плаќање и управување со производи.",
      info: "Информации",
      blog: "Блог",
      allPosts: "Сите објави",
      seo: "SEO",
      portfolio: "Портфолио",
      contact: "Контакт",
      quote: "побарај понуда",
    },
    hero: {
      eyebrow: "ИЗРАБОТКА НА ВЕБ СТРАНИ ВО МАКЕДОНИЈА",
      titleLine1: "Креативни веб",
      titleHighlight: "страни",
      titleMid: "кои носат",
      titleEnd: "успех!",
      quote: "Побарај понуда",
      portfolio: "портфолио",
    },
    services: {
      heading: "Ние изработуваме веб страни и интернет продавници кои помагаат да ги привлечете вашите идеални клиенти.",
      intro: "Тим од амбициозни веб дизајнери кој работат во Македонија и цела Европа. Вршиме Изработка на веб страна, веб сајт, изработка на онлајн продавници, редизајн застарени веб страни, но главен фокус ни се да сме целосно решение преку годишни пакети, за да не трошите време со одржување на веб-страната.",
      cards: [
        {
          icon: "edit_note",
          title: "Изработка на веб страна",
          desc: "Професионална веб страна изработена по ваша мерка. Нашите веб страни се уникатни и креирани за да ја зголемат вашата видливост и профит.",
          href: "/web-dizajn",
        },
        {
          icon: "shopping_cart",
          title: "Изработка на интернет продавници",
          desc: "Изработка на онлајн продавници кои лесно и едноставно ги продаваат вашите производи и услуги и ги прават лесно достапни за потрошувачите.",
          href: "/izrabotka-na-web-prodavnica",
        },
        {
          icon: "settings",
          title: "Одржување на веб страни",
          desc: "Одржување на веб страница подразбира мониторинг и постојано ажурирање, потребно за да се осигура постојано функционирање без прекини и проблеми.",
          href: "/web-dizajn",
        },
        {
          icon: "search",
          title: "SEO оптимизација за Google",
          desc: "SEO овозможува подобро рангирање на вашата веб страна на Google и ChatGPT, ние ќе ви помогнеме да бидете пред конкуренцијата!",
          href: "/seo-optimizacija",
        },
      ],
    },
    features: {
      badge: "Зошто Banana Studio",
      heading: "Веб страни кои ви добиваат доверба и ве ставаат пред вашите клиенти",
      cards: [
        {
          icon: "rocket_launch",
          title: "Амбициозен труд",
          desc: "Не застануваме на просечно. Работиме макотрпно за секој проект да ги надмине очекувањата и да донесе вистински резултати.",
        },
        {
          icon: "groups",
          title: "Креативен тим",
          desc: "Дизајнери и програмери со страст за детали, кои спојуваат естетика и функционалност во секоја веб страна.",
        },
        {
          icon: "tips_and_updates",
          title: "Напредни решенија",
          desc: "Користиме најнови технологии и пристапи за брзи, безбедни и скалабилни веб страни спремни за иднината.",
        },
        {
          icon: "sentiment_very_satisfied",
          title: "Среќни клиенти",
          desc: "Долгорочни соработки изградени на доверба. Вашиот успех е нашата најголема препорака.",
        },
      ],
      cta: "Видете го нашето портфолио",
      imgAlt: "Banana Studio екипа на работа",
    },
    testimonials: {
      eyebrow: "ВЕБ ДИЗАЈН МАКЕДОНИЈА",
      heading: "Успешни приказни од соработката со BANANA STUDIO",
      reviews: [
        {
          title: "СОРАБОТКА ШТО ГИ НАДМИНА ОЧЕКУВАЊАТА",
          person: "Сандра Радевска Марковиќ",
          company: "Клик Логистик",
          rating: 5,
          quote:
            "Најбрзата и наједноставана соработка која што вроди со вебстрана што ни ги надмина очекувањата. Професионален пристап, активно давање на идејни решенија и искрена желба за испорачување на квалитетен продукт, се причините зошто треба Banana Studio да го изработи твојот нов вебсајт.",
          image: "/review-klik-logistik.png",
          imageAlt: "Клик Логистик лого",
        },
      ],
      showReview: "Прикажи рецензија",
    },
    cta: {
      badge: "Подготвени за успех?",
      heading: "Сега и вие можете да имате професионална веб страна која ќе ви отвори врата кон успехот!",
      button: "Побарај понуда",
    },
    webDesignPage: {
      hero: {
        eyebrow: "ИЗРАБОТКА НА ВЕБ СТРАНА",
        titleLine1: "Изработка на веб",
        titleHighlight: "страна",
        subtitle: "Секоја веб страна е уникатна и креирана според ваша мерка!",
        body: "Изработуваме професионални веб страни кои ја отсликуваат визијата на вашиот бизнис. Без готови темплејти — секое решение е дизајнирано и програмирано од нула, за да се истакнете пред конкуренцијата.",
        cta: "Побарај понуда",
        secondaryCta: "Видете го портфолиото",
      },
      value: {
        heading: "Изработка на веб страна која носи успех!",
        paragraphs: [
          "Следиме современите трендови во веб дизајнот и ги применуваме на секој проект — за да добиете брза, безбедна и модерна веб страна спремна за иднината.",
          "Не користиме готови теми и темплејти. Секоја веб страна ја градиме посебно за вас, со внимание на детали, перформанси и искуство на корисникот.",
        ],
        bullets: [
          "Уникатен дизајн по ваша мерка",
          "Респонзивен изглед на сите уреди",
          "Оптимизирана брзина и SEO",
          "Лесно управување со содржината",
        ],
      },
      process: {
        badge: "Како работиме",
        heading: "Три чекори до вашата нова веб страна",
        intro: "Јасен и проверен процес — од првата идеја до лансирање и нови клиенти.",
        steps: [
          {
            num: "01",
            title: "Истражување и стратегија",
            desc: "Го запознаваме вашиот бизнис, целна публика и цели, па дефинираме стратегија и структура на веб страната.",
          },
          {
            num: "02",
            title: "Дизајн и изработка",
            desc: "Креираме уникатен дизајн и го програмираме од нула — брз, респонзивен и оптимизиран за пребарувачи.",
          },
          {
            num: "03",
            title: "Лансирање и раст",
            desc: "Ја објавуваме веб страната, ве обучуваме за управување и ви помагаме да привлечете нови клиенти.",
          },
        ],
        timelineNote: "Вообичаено време на изработка: според обемот на проектот.",
      },
      benefits: {
        heading: "Зошто ви е потребна професионална веб страна",
        intro: "Веб страната работи за вас 24/7 и е првиот впечаток што го оставате кај идните клиенти.",
        cards: [
          {
            icon: "schedule",
            title: "Присуство 24/7",
            desc: "Вашиот бизнис е достапен во секое време — клиентите ве наоѓаат и кога вие не сте на работа.",
          },
          {
            icon: "devices",
            title: "Респонзивен дизајн",
            desc: "Совршен изглед на телефон, таблет и компјутер — без разлика од каде ве посетуваат.",
          },
          {
            icon: "verified",
            title: "Зајакнат бренд",
            desc: "Професионална веб страна гради доверба и го издвојува вашиот бренд од конкуренцијата.",
          },
          {
            icon: "hub",
            title: "Централизирани информации",
            desc: "Сите ваши услуги, контакти и содржини на едно место, лесно достапни за секого.",
          },
        ],
      },
      faq: {
        eyebrow: "ЧЕСТО ПОСТАВУВАНИ ПРАШАЊА",
        heading: "Сè што треба да знаете за изработка на веб страна",
        items: [
          {
            q: "Колку чини изработка на веб страна?",
            a: "Цената зависи од обемот, функциите и сложеноста на проектот. Пополнете го формуларот за понуда и ќе ви испратиме бесплатна, прилагодена понуда според вашите потреби.",
          },
          {
            q: "Колку време е потребно за изработка?",
            a: "Времето зависи од обемот на проектот и брзината на доставување материјали. По првичниот разговор ќе ви дадеме реална временска рамка.",
          },
          {
            q: "Дали можам сам да ја менувам содржината?",
            a: "Да. Веб страните ги градиме така што лесно ќе можете да менувате текст, слики и содржини, а ве обучуваме како да го правите тоа.",
          },
          {
            q: "Дали веб страната ќе работи на мобилни телефони?",
            a: "Секако. Сите наши веб страни се целосно респонзивни и совршено функционираат на телефон, таблет и компјутер.",
          },
          {
            q: "Што ми е потребно за да започнеме?",
            a: "Доволно е вашата идеја и основни информации за бизнисот. Сè останато — дизајн, текстови и структура — го договараме заедно во текот на процесот.",
          },
        ],
      },
      servicesHeading: "Што изработуваме",
      finalCta: {
        badge: "Започнете денес",
        heading: "Нарачај изработка на веб страна и отвори врата кон успехот!",
        button: "Побарај понуда СЕГА",
      },
    },
    webStorePage: {
      hero: {
        eyebrow: "ИЗРАБОТКА НА ИНТЕРНЕТ ПРОДАВНИЦА",
        titleLine1: "Изработка на интернет",
        titleHighlight: "продавница",
        subtitle: "Брза и едноставна продажба на вашите производи!",
        body: "Продавајте ги вашите производи и услуги онлајн полесно од кога било. Изработуваме професионални интернет продавници со интегрирано плаќање, управување со производи и дизајн што продава — без готови темплејти.",
        cta: "Побарај понуда",
        secondaryCta: "Видете го портфолиото",
      },
      value: {
        heading: "Интернет продавница што продава 24/7!",
        paragraphs: [
          "Вашата онлајн продавница работи деноноќно — без физички простор, без големи трошоци и без ограничено работно време. Клиентите нарачуваат кога им одговара, а вие заработувате и додека спиете.",
          "Секоја продавница ја градиме посебно за вас, со едноставно управување со производи, брзо и сигурно плаќање и дизајн оптимизиран за поголема продажба.",
        ],
        bullets: [
          "Интегрирано онлајн и картично плаќање",
          "Лесно управување со производи и нарачки",
          "Респонзивен дизајн за купување од телефон",
          "Оптимизирана за брзина и Google",
        ],
      },
      process: {
        badge: "Како работиме",
        heading: "Четири чекори до вашата интернет продавница",
        intro: "Јасен процес — од планирање и изработка до поврзување со банка и првата онлајн продажба.",
        steps: [
          {
            num: "01",
            title: "Планирање и истражување",
            desc: "Го запознаваме вашиот бизнис и пазар, ги дефинираме производите, целната публика и стратегијата за продажба.",
          },
          {
            num: "02",
            title: "Изработка на продавницата",
            desc: "Изработуваме професионална интернет продавница со каталог, кошничка и интеграција за плаќање и достава.",
          },
          {
            num: "03",
            title: "Поврзување со банка",
            desc: "Ве поврзуваме со банка за прифаќање картични плаќања — обично 10–15 дена по одобрувањето.",
          },
          {
            num: "04",
            title: "Лансирање и продажба",
            desc: "Ја објавуваме продавницата, ве обучуваме за управување и почнувате да заработувате онлајн.",
          },
        ],
        timelineNote: "Картичното плаќање обично се активира 10–15 дена по одобрување од банка.",
      },
      benefits: {
        heading: "Зошто да продавате преку интернет продавница",
        intro: "Онлајн продажбата ви носи поголем дофат и помали трошоци отколку физичка продавница.",
        cards: [
          {
            icon: "trending_up",
            title: "Зголемен профит",
            desc: "Достапни сте до повеќе купувачи, во цела држава и пошироко, без ограничувања на физичка локација.",
          },
          {
            icon: "savings",
            title: "Ниски трошоци",
            desc: "Без кирија и без големи режиски трошоци — онлајн продавницата чини многу помалку од физички дуќан.",
          },
          {
            icon: "schedule",
            title: "Продажба 24/7",
            desc: "Продавницата прима нарачки деноноќно, дури и кога вие не работите.",
          },
          {
            icon: "credit_card",
            title: "Сигурно плаќање",
            desc: "Интегрирано картично и онлајн плаќање со автоматска потврда на нарачката.",
          },
        ],
      },
      faq: {
        eyebrow: "ЧЕСТО ПОСТАВУВАНИ ПРАШАЊА",
        heading: "Сè што треба да знаете за интернет продавница",
        items: [
          {
            q: "Дали можам сам да управувам со продавницата?",
            a: "Да. Продавницата ја градиме на систем за управување (CMS) преку кој лесно додавате производи, менувате цени и следите нарачки. Ве обучуваме како да го правите тоа.",
          },
          {
            q: "Колку производи можам да поставам?",
            a: "Неограничено. Продавницата поддржува од неколку до илјадници производи — расте заедно со вашиот бизнис.",
          },
          {
            q: "Како функционира картичното плаќање?",
            a: "Ве поврзуваме со банка која ги процесира картичните плаќања. По одобрување, активирањето обично трае 10–15 дена.",
          },
          {
            q: "Дали ќе добивам потврда за секоја нарачка?",
            a: "Да. Системот автоматски испраќа потврда за нарачката до вас и до купувачот.",
          },
          {
            q: "Дали продавницата ќе работи на мобилен?",
            a: "Секако. Сите наши продавници се целосно респонзивни и купувањето е едноставно од телефон, таблет и компјутер.",
          },
        ],
      },
      servicesHeading: "Што изработуваме",
      finalCta: {
        badge: "Започнете денес",
        heading: "Нарачај изработка на интернет продавница и започни да продаваш онлајн!",
        button: "Побарај понуда СЕГА",
      },
    },
    seoPage: {
      hero: {
        eyebrow: "SEO ОПТИМИЗАЦИЈА ВО МАКЕДОНИЈА",
        titleLine1: "SEO",
        titleHighlight: "оптимизација",
        subtitle: "Бидете пред конкуренцијата и високо рангирани на Google!",
        body: "Над 70% од луѓето пребаруваат на Google пред да купат. SEO оптимизацијата ја подобрува позицијата на вашата веб страна за вистинските клучни зборови — за да ве најдат вистинските клиенти, токму тогаш кога пребаруваат.",
        cta: "Побарај понуда",
        secondaryCta: "Видете го портфолиото",
      },
      value: {
        heading: "Што е SEO и зошто ви е потребно?",
        paragraphs: [
          "SEO (Search Engine Optimization) е оптимизација за пребарувачи — збир на техники кои ја зголемуваат количината и квалитетот на посетата на вашата веб страна преку органски (неплатени) резултати на Google.",
          "Колку повисоко се рангира вашата страна, толку поголема доверба градите кај идните клиенти. Подобра видливост значи повеќе посети, повеќе барања и повеќе продажби — без да плаќате за секој клик.",
        ],
        bullets: [
          "Релевантни клучни зборови за вашиот бизнис",
          "Оптимизација на текст, слики и содржина",
          "Внатрешно и надворешно поврзување (линкови)",
          "Техничка оптимизација и брзина на страната",
        ],
      },
      process: {
        badge: "Како работиме",
        heading: "Три чекори до врвот на Google",
        intro: "Јасен и мерлив процес — од анализа до стабилен раст на органската посета.",
        steps: [
          {
            num: "01",
            title: "Анализа и клучни зборови",
            desc: "Ја анализираме вашата веб страна, конкуренцијата и пазарот, па ги дефинираме клучните зборови по кои сакате да ве најдат.",
          },
          {
            num: "02",
            title: "Оптимизација",
            desc: "Оптимизираме содржина, технички елементи и брзина, и градиме квалитетни линкови кои го зајакнуваат авторитетот на вашата страна.",
          },
          {
            num: "03",
            title: "Следење и раст",
            desc: "Ги следиме позициите и резултатите, известуваме редовно и континуирано ја подобруваме стратегијата за стабилен раст.",
          },
        ],
        timelineNote: "Првите резултати од SEO обично се видливи по 3–6 месеци.",
      },
      benefits: {
        heading: "Предности од SEO оптимизација",
        intro: "SEO носи долгорочни резултати кои растат со времето — без трошок за секој клик.",
        cards: [
          {
            icon: "trending_up",
            title: "Прва страна на Google",
            desc: "Подобро рангирање за вашите клучни зборови — таму каде што клиентите гледаат прво.",
          },
          {
            icon: "groups",
            title: "Повеќе органска посета",
            desc: "Привлекувате релевантни посетители без да плаќате за секој клик, за разлика од рекламите.",
          },
          {
            icon: "verified",
            title: "Доверба и кредибилитет",
            desc: "Високите позиции градат доверба — корисниците им веруваат повеќе на врвните резултати.",
          },
          {
            icon: "savings",
            title: "Одржливи резултати",
            desc: "За разлика од платените реклами, ефектот од SEO останува и расте со времето.",
          },
        ],
      },
      faq: {
        eyebrow: "ЧЕСТО ПОСТАВУВАНИ ПРАШАЊА",
        heading: "Сè што треба да знаете за SEO оптимизација",
        items: [
          {
            q: "Што е SEO оптимизација?",
            a: "SEO е оптимизација за пребарувачи — процес на подобрување на вашата веб страна за да се рангира повисоко на Google за релевантни пребарувања и да привлече повеќе органска посета.",
          },
          {
            q: "Дали на мојот бизнис му треба SEO?",
            a: "Да. Ако вашите клиенти ве бараат на Google, SEO им помага да ве најдат вас наместо конкуренцијата. Без SEO, дури и одлична веб страна останува невидлива.",
          },
          {
            q: "За колку време ќе видам резултати?",
            a: "SEO е долгорочна инвестиција. Првите подобрувања обично се видливи по 3–6 месеци, а резултатите растат и се стабилизираат со времето.",
          },
          {
            q: "Дали социјалните мрежи влијаат на SEO?",
            a: "Индиректно. Социјалните мрежи носат посета и видливост на содржината, што може да помогне, но не се директен фактор за рангирање на Google.",
          },
          {
            q: "Која е разликата меѓу SEO и Google реклами?",
            a: "Google рекламите се плаќаат по клик и престануваат штом ќе го запрете буџетот. SEO гради органски позиции кои остануваат и носат посета без трошок за клик.",
          },
        ],
      },
      servicesHeading: "Што опфаќа SEO",
      finalCta: {
        badge: "Започнете денес",
        heading: "Подобрете го рангирањето на вашата веб страна и привлечете нови клиенти!",
        button: "Побарај понуда СЕГА",
      },
    },
    portfolioPage: {
      searchLabel: "Пребарај",
      searchPlaceholder: "Име, индустрија, услуга…",
      industriesTitle: "Индустрии",
      allIndustries: "Сите индустрии",
      packagesTitle: "Пакети",
      resultsLabel: "проекти",
      clearFilters: "Исчисти филтри",
      noResults: "Нема проекти што одговараат на филтрите.",
      projects: [
        {
          name: "Klik Logistik",
          url: "https://klikgroup.mk/",
          image: "/portfolio/klik-logistik.webp",
          imageAlt: "Клик Логистик веб страна",
          logo: "/logos/klik-logistik.png",
          industry: "Логистика",
          packages: ["Веб страна"],
          bullets: [
            "Модерна и респонзивна презентациска веб страна",
            "Јасен преглед на услугите и локациите",
            "Оптимизирана за брзина и Google пребарување",
          ],
        },
        {
          name: "BN Sound",
          url: "https://www.bnsound.com/",
          image: "/portfolio/bn-sound.webp",
          imageAlt: "BN Sound онлајн продавница",
          logo: "/logos/bn-sound.png",
          industry: "Аудио и опрема",
          packages: ["Веб продавница"],
          bullets: [
            "Интуитивна и респонзивна онлајн продавница",
            "Прегледен каталог со брзо пребарување",
            "Интеграција со онлајн плаќање",
          ],
        },
        {
          name: "Eco Zone",
          url: "https://www.ecozone.mk/",
          image: "/portfolio/eco-zone.webp",
          imageAlt: "Еко Зон онлајн продавница",
          logo: "/logos/eco-zone.webp",
          industry: "Еко производи",
          packages: ["Веб продавница"],
          bullets: [
            "Онлајн продавница за еко производи",
            "Прегледен каталог и едноставна нарачка",
            "Сигурно онлајн плаќање",
          ],
        },
      ],
    },
    footer: {
      brandDesc: "Креативно студио од Македонија. Изработуваме веб страни и интернет продавници кои носат успех.",
      servicesTitle: "Услуги",
      services: ["Изработка на веб страна", "Интернет продавници", "Одржување на веб страни", "SEO оптимизација"],
      navTitle: "Навигација",
      nav: [
        { label: "Почетна", href: "#" },
        { label: "За нас", href: "#services" },
        { label: "Информации", href: "/informacii" },
        { label: "Рецензии", href: "#testimonials" },
        { label: "Контакт", href: "#contact" },
      ],
      contactTitle: "Контакт",
      location: "Скопје, Македонија",
      quote: "Побарај понуда",
      copyright: "© 2026 Banana Studio. Сите права задржани.",
      privacy: "Политика на приватност",
      terms: "Услови за користење",
    },
    modal: {
      close: "Затвори",
      badge: "Побарај понуда",
      title: "Започнете го вашиот проект",
      subtitle: "Пополнете ги полињата и ќе ве контактираме со бесплатна понуда.",
      nameLabel: "Име и презиме",
      namePlaceholder: "пр. Марко Марковски",
      companyLabel: "Име на фирма",
      companyPlaceholder: "пр. Банана ДООЕЛ",
      activityLabel: "Дејност",
      activityPlaceholder: "пр. Логистика, угостителство…",
      phoneLabel: "Телефонски број",
      phonePlaceholder: "пр. +389 70 123 456",
      submit: "Испрати барање",
      sending: "Се испраќа…",
      success: "Барањето е испратено! Ќе ве контактираме наскоро.",
      error: "Нешто тргна наопаку. Обидете се повторно.",
    },
  },
  en: {
    clientsHeading: "Trusted by our clients",
    nav: {
      webDesign: "Web Design",
      webDesignCard1Title: "Website Development",
      webDesignCard1Desc: "Modern, fast and responsive presentation websites for your business.",
      webDesignCard2Title: "Online Store Development",
      webDesignCard2Desc: "Online stores with integrated payments and product management.",
      info: "Information",
      blog: "Blog",
      allPosts: "All posts",
      seo: "SEO",
      portfolio: "Portfolio",
      contact: "Contact",
      quote: "get a quote",
    },
    hero: {
      eyebrow: "WEB DEVELOPMENT IN MACEDONIA",
      titleLine1: "Creative",
      titleHighlight: "websites",
      titleMid: "that drive",
      titleEnd: "success!",
      quote: "Get a quote",
      portfolio: "portfolio",
    },
    services: {
      heading: "We build websites and online stores that help you attract your ideal customers.",
      intro: "A team of ambitious web designers working across Macedonia and all of Europe. We build websites and online stores and redesign outdated sites — but our main focus is to be a complete solution through annual packages, so you don't waste time maintaining your website.",
      cards: [
        {
          icon: "edit_note",
          title: "Website Development",
          desc: "A professional website built to your measure. Our websites are unique and crafted to increase your visibility and profit.",
          href: "/en/web-design",
        },
        {
          icon: "shopping_cart",
          title: "Online Store Development",
          desc: "Online stores that sell your products and services simply and make them easily available to your customers.",
          href: "/en/web-store",
        },
        {
          icon: "settings",
          title: "Website Maintenance",
          desc: "Website maintenance means monitoring and constant updates, needed to ensure continuous operation without downtime or problems.",
          href: "/en/web-design",
        },
        {
          icon: "search",
          title: "SEO Optimization for Google",
          desc: "SEO enables better ranking of your website on Google and ChatGPT — we'll help you stay ahead of the competition!",
          href: "/en/seo",
        },
      ],
    },
    features: {
      badge: "Why Banana Studio",
      heading: "Websites that win trust and put you in front of your clients",
      cards: [
        {
          icon: "rocket_launch",
          title: "Ambitious Work",
          desc: "We don't settle for average. We work tirelessly so every project exceeds expectations and delivers real results.",
        },
        {
          icon: "groups",
          title: "Creative Team",
          desc: "Designers and developers with a passion for detail, blending aesthetics and functionality into every website.",
        },
        {
          icon: "tips_and_updates",
          title: "Advanced Solutions",
          desc: "We use the latest technologies and approaches for fast, secure and scalable websites ready for the future.",
        },
        {
          icon: "sentiment_very_satisfied",
          title: "Happy Clients",
          desc: "Long-term partnerships built on trust. Your success is our greatest recommendation.",
        },
      ],
      cta: "See our portfolio",
      imgAlt: "Banana Studio team at work",
    },
    testimonials: {
      eyebrow: "WEB DESIGN MACEDONIA",
      heading: "Success stories from working with BANANA STUDIO",
      reviews: [
        {
          title: "A COLLABORATION THAT EXCEEDED EXPECTATIONS",
          person: "Sandra Radevska Markovikj",
          company: "Klik Logistik",
          rating: 5,
          quote:
            "The fastest and simplest collaboration, which resulted in a website that exceeded our expectations. A professional approach, active input on creative solutions, and a genuine desire to deliver a quality product are the reasons why you should let Banana Studio build your new website.",
          image: "/review-klik-logistik.png",
          imageAlt: "Klik Logistik logo",
        },
      ],
      showReview: "Show review",
    },
    cta: {
      badge: "Ready for success?",
      heading: "Now you too can have a professional website that opens the door to success!",
      button: "Get a quote",
    },
    webDesignPage: {
      hero: {
        eyebrow: "WEBSITE DEVELOPMENT",
        titleLine1: "Website",
        titleHighlight: "development",
        subtitle: "Every website is unique and built to your exact measure!",
        body: "We build professional websites that reflect your business vision. No ready-made templates — every solution is designed and coded from scratch, so you stand out from the competition.",
        cta: "Get a quote",
        secondaryCta: "See the portfolio",
      },
      value: {
        heading: "Website development that drives success!",
        paragraphs: [
          "We follow modern web design trends and apply them to every project — so you get a fast, secure and modern website ready for the future.",
          "We don't use ready-made themes or templates. Every website is built specifically for you, with attention to detail, performance and user experience.",
        ],
        bullets: [
          "Unique design built to your measure",
          "Responsive layout on every device",
          "Optimized speed and SEO",
          "Easy content management",
        ],
      },
      process: {
        badge: "How we work",
        heading: "Three steps to your new website",
        intro: "A clear, proven process — from the first idea to launch and new clients.",
        steps: [
          {
            num: "01",
            title: "Research & strategy",
            desc: "We get to know your business, target audience and goals, then define the strategy and structure of the website.",
          },
          {
            num: "02",
            title: "Design & development",
            desc: "We create a unique design and code it from scratch — fast, responsive and optimized for search engines.",
          },
          {
            num: "03",
            title: "Launch & growth",
            desc: "We publish the website, train you to manage it, and help you attract new clients.",
          },
        ],
        timelineNote: "Typical delivery time: depends on the scope of the project.",
      },
      benefits: {
        heading: "Why you need a professional website",
        intro: "Your website works for you 24/7 and is the first impression you make on future clients.",
        cards: [
          {
            icon: "schedule",
            title: "24/7 presence",
            desc: "Your business is available at all times — clients find you even when you're not at work.",
          },
          {
            icon: "devices",
            title: "Responsive design",
            desc: "A perfect look on phone, tablet and desktop — no matter where visitors come from.",
          },
          {
            icon: "verified",
            title: "Stronger brand",
            desc: "A professional website builds trust and sets your brand apart from the competition.",
          },
          {
            icon: "hub",
            title: "Centralized information",
            desc: "All your services, contacts and content in one place, easily accessible to everyone.",
          },
        ],
      },
      faq: {
        eyebrow: "FREQUENTLY ASKED QUESTIONS",
        heading: "Everything you need to know about website development",
        items: [
          {
            q: "How much does a website cost?",
            a: "The price depends on the scope, features and complexity of the project. Fill in the quote form and we'll send you a free, tailored quote based on your needs.",
          },
          {
            q: "How long does development take?",
            a: "The timeline depends on the project's scope and how quickly materials are provided. After the initial talk we'll give you a realistic time frame.",
          },
          {
            q: "Can I edit the content myself?",
            a: "Yes. We build websites so you can easily change text, images and content, and we train you on how to do it.",
          },
          {
            q: "Will the website work on mobile phones?",
            a: "Absolutely. All our websites are fully responsive and work perfectly on phone, tablet and desktop.",
          },
          {
            q: "What do I need to get started?",
            a: "Just your idea and some basic information about your business. Everything else — design, copy and structure — we work out together during the process.",
          },
        ],
      },
      servicesHeading: "What we build",
      finalCta: {
        badge: "Start today",
        heading: "Order your website development and open the door to success!",
        button: "Get a quote NOW",
      },
    },
    webStorePage: {
      hero: {
        eyebrow: "ONLINE STORE DEVELOPMENT",
        titleLine1: "Online store",
        titleHighlight: "development",
        subtitle: "Fast and simple selling of your products!",
        body: "Sell your products and services online more easily than ever. We build professional online stores with integrated payments, product management and a design that sells — no ready-made templates.",
        cta: "Get a quote",
        secondaryCta: "See the portfolio",
      },
      value: {
        heading: "An online store that sells 24/7!",
        paragraphs: [
          "Your online store runs around the clock — no physical space, no high overhead and no limited working hours. Customers order whenever it suits them, and you earn even while you sleep.",
          "We build every store specifically for you, with simple product management, fast and secure payments, and a design optimized to increase sales.",
        ],
        bullets: [
          "Integrated online and card payments",
          "Easy product and order management",
          "Responsive design for mobile shopping",
          "Optimized for speed and Google",
        ],
      },
      process: {
        badge: "How we work",
        heading: "Four steps to your online store",
        intro: "A clear process — from planning and development to bank integration and your first online sale.",
        steps: [
          {
            num: "01",
            title: "Planning & research",
            desc: "We get to know your business and market, then define the products, target audience and sales strategy.",
          },
          {
            num: "02",
            title: "Building the store",
            desc: "We build a professional online store with a catalog, cart and integration for payments and delivery.",
          },
          {
            num: "03",
            title: "Bank integration",
            desc: "We connect you with a bank to accept card payments — usually 10–15 days after approval.",
          },
          {
            num: "04",
            title: "Launch & sell",
            desc: "We publish the store, train you to manage it, and you start earning online.",
          },
        ],
        timelineNote: "Card payments are usually activated 10–15 days after bank approval.",
      },
      benefits: {
        heading: "Why sell through an online store",
        intro: "Selling online gives you greater reach and lower costs than a physical store.",
        cards: [
          {
            icon: "trending_up",
            title: "Increased profit",
            desc: "You reach more buyers across the country and beyond, with no physical location limits.",
          },
          {
            icon: "savings",
            title: "Low costs",
            desc: "No rent and no heavy overhead — an online store costs far less than a physical shop.",
          },
          {
            icon: "schedule",
            title: "Selling 24/7",
            desc: "The store takes orders around the clock, even when you're not working.",
          },
          {
            icon: "credit_card",
            title: "Secure payments",
            desc: "Integrated card and online payments with automatic order confirmation.",
          },
        ],
      },
      faq: {
        eyebrow: "FREQUENTLY ASKED QUESTIONS",
        heading: "Everything you need to know about an online store",
        items: [
          {
            q: "Can I manage the store myself?",
            a: "Yes. We build the store on a content management system (CMS) where you easily add products, change prices and track orders. We train you on how to do it.",
          },
          {
            q: "How many products can I list?",
            a: "Unlimited. The store supports anywhere from a few to thousands of products — it grows with your business.",
          },
          {
            q: "How do card payments work?",
            a: "We connect you with a bank that processes card payments. After approval, activation usually takes 10–15 days.",
          },
          {
            q: "Will I get a confirmation for every order?",
            a: "Yes. The system automatically sends an order confirmation to you and to the customer.",
          },
          {
            q: "Will the store work on mobile?",
            a: "Absolutely. All our stores are fully responsive and shopping is simple on phone, tablet and desktop.",
          },
        ],
      },
      servicesHeading: "What we build",
      finalCta: {
        badge: "Start today",
        heading: "Order your online store and start selling online!",
        button: "Get a quote NOW",
      },
    },
    seoPage: {
      hero: {
        eyebrow: "SEO OPTIMIZATION IN MACEDONIA",
        titleLine1: "SEO",
        titleHighlight: "optimization",
        subtitle: "Stay ahead of the competition and rank high on Google!",
        body: "Over 70% of people search on Google before they buy. SEO optimization improves your website's position for the right keywords — so the right clients find you exactly when they're searching.",
        cta: "Get a quote",
        secondaryCta: "See the portfolio",
      },
      value: {
        heading: "What is SEO and why do you need it?",
        paragraphs: [
          "SEO (Search Engine Optimization) is a set of techniques that increase the quantity and quality of traffic to your website through organic (unpaid) Google results.",
          "The higher your site ranks, the more trust you build with future clients. Better visibility means more visits, more enquiries and more sales — without paying for every click.",
        ],
        bullets: [
          "Relevant keywords for your business",
          "Optimized text, images and content",
          "Internal and external link building",
          "Technical optimization and site speed",
        ],
      },
      process: {
        badge: "How we work",
        heading: "Three steps to the top of Google",
        intro: "A clear, measurable process — from analysis to steady organic growth.",
        steps: [
          {
            num: "01",
            title: "Analysis & keywords",
            desc: "We analyze your website, competitors and market, then define the keywords you want to be found for.",
          },
          {
            num: "02",
            title: "Optimization",
            desc: "We optimize content, technical elements and speed, and build quality links that strengthen your site's authority.",
          },
          {
            num: "03",
            title: "Tracking & growth",
            desc: "We track rankings and results, report regularly, and continuously refine the strategy for steady growth.",
          },
        ],
        timelineNote: "First SEO results are usually visible after 3–6 months.",
      },
      benefits: {
        heading: "The benefits of SEO optimization",
        intro: "SEO delivers long-term results that grow over time — with no cost per click.",
        cards: [
          {
            icon: "trending_up",
            title: "First page of Google",
            desc: "Better ranking for your keywords — right where clients look first.",
          },
          {
            icon: "groups",
            title: "More organic traffic",
            desc: "Attract relevant visitors without paying for every click, unlike ads.",
          },
          {
            icon: "verified",
            title: "Trust & credibility",
            desc: "High positions build trust — users trust top results more.",
          },
          {
            icon: "savings",
            title: "Sustainable results",
            desc: "Unlike paid ads, the effect of SEO stays and grows over time.",
          },
        ],
      },
      faq: {
        eyebrow: "FREQUENTLY ASKED QUESTIONS",
        heading: "Everything you need to know about SEO optimization",
        items: [
          {
            q: "What is SEO optimization?",
            a: "SEO is search engine optimization — the process of improving your website so it ranks higher on Google for relevant searches and attracts more organic traffic.",
          },
          {
            q: "Does my business need SEO?",
            a: "Yes. If your clients search for you on Google, SEO helps them find you instead of the competition. Without SEO, even a great website stays invisible.",
          },
          {
            q: "How long until I see results?",
            a: "SEO is a long-term investment. The first improvements are usually visible after 3–6 months, and results grow and stabilize over time.",
          },
          {
            q: "Do social media affect SEO?",
            a: "Indirectly. Social media drive traffic and content visibility, which can help, but they're not a direct Google ranking factor.",
          },
          {
            q: "What's the difference between SEO and Google Ads?",
            a: "Google Ads are paid per click and stop the moment you pause the budget. SEO builds organic positions that remain and bring traffic with no cost per click.",
          },
        ],
      },
      servicesHeading: "What SEO covers",
      finalCta: {
        badge: "Start today",
        heading: "Boost your website's ranking and attract new clients!",
        button: "Get a quote NOW",
      },
    },
    portfolioPage: {
      searchLabel: "Search",
      searchPlaceholder: "Name, industry, service…",
      industriesTitle: "Industries",
      allIndustries: "All industries",
      packagesTitle: "Packages",
      resultsLabel: "projects",
      clearFilters: "Clear filters",
      noResults: "No projects match your filters.",
      projects: [
        {
          name: "Klik Logistik",
          url: "https://klikgroup.mk/",
          image: "/portfolio/klik-logistik.webp",
          imageAlt: "Klik Logistik website",
          logo: "/logos/klik-logistik.png",
          industry: "Logistics",
          packages: ["Website"],
          bullets: [
            "Modern, responsive presentation website",
            "Clear overview of services and locations",
            "Optimized for speed and Google search",
          ],
        },
        {
          name: "BN Sound",
          url: "https://www.bnsound.com/",
          image: "/portfolio/bn-sound.webp",
          imageAlt: "BN Sound online store",
          logo: "/logos/bn-sound.png",
          industry: "Audio & equipment",
          packages: ["Online store"],
          bullets: [
            "Intuitive and responsive online store",
            "Clear catalog with fast search",
            "Integrated online payments",
          ],
        },
        {
          name: "Eco Zone",
          url: "https://www.ecozone.mk/",
          image: "/portfolio/eco-zone.webp",
          imageAlt: "Eco Zone online store",
          logo: "/logos/eco-zone.webp",
          industry: "Eco products",
          packages: ["Online store"],
          bullets: [
            "Online store for eco products",
            "Clear catalog and simple checkout",
            "Secure online payments",
          ],
        },
      ],
    },
    footer: {
      brandDesc: "A creative studio from Macedonia. We build websites and online stores that drive success.",
      servicesTitle: "Services",
      services: ["Website Development", "Online Stores", "Website Maintenance", "SEO Optimization"],
      navTitle: "Navigation",
      nav: [
        { label: "Home", href: "#" },
        { label: "About us", href: "#services" },
        { label: "Blog", href: "/en/blog" },
        { label: "Reviews", href: "#testimonials" },
        { label: "Contact", href: "#contact" },
      ],
      contactTitle: "Contact",
      location: "Skopje, Macedonia",
      quote: "Get a quote",
      copyright: "© 2026 Banana Studio. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
    },
    modal: {
      close: "Close",
      badge: "Get a quote",
      title: "Start your project",
      subtitle: "Fill in the fields and we'll get back to you with a free quote.",
      nameLabel: "Full name",
      namePlaceholder: "e.g. John Smith",
      companyLabel: "Company name",
      companyPlaceholder: "e.g. Banana LLC",
      activityLabel: "Industry",
      activityPlaceholder: "e.g. Logistics, hospitality…",
      phoneLabel: "Phone number",
      phonePlaceholder: "e.g. +389 70 123 456",
      submit: "Send request",
      sending: "Sending…",
      success: "Request sent! We'll be in touch shortly.",
      error: "Something went wrong. Please try again.",
    },
  },
};

export const languages = [
  { code: "mk", label: "mk", flag: "/flag-mk.png", path: "/" },
  { code: "en", label: "en", flag: "/flag-en.png", path: "/en" },
] as const;
