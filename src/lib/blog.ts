// Blog content — single source of truth for the "Информации" / "Blog" section.
// Kept separate from translations.ts (which holds short UI chrome) because the
// articles are long-form prose. Both locales share an `id` so each post can link
// to its translation (canonical + hreflang). Consumed by:
//   - SiteNav (the "Информации" dropdown cards)
//   - BlogIndexPage / BlogPostPage (the rendered pages)
//   - sitemap.ts (route enumeration)
//   - the route files (generateStaticParams / generateMetadata / JSON-LD)

import { type Lang } from "@/lib/translations";

// SVG cover illustration variants (see BlogCover.tsx). Themed, file-free so the
// posts stay self-contained with no missing-image fallbacks.
export type CoverKey = "cost" | "time" | "seo" | "store";

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogFaq = { q: string; a: string };

export type BlogPost = {
  // Locale-agnostic key shared by the mk/en versions of the same article.
  id: string;
  slug: string;
  // `cover` selects both the photographic card image (public/blog/<cover>.jpg,
  // via coverImage()) and the matching SVG illustration shown on the post page.
  cover: CoverKey;
  imageAlt: string;
  category: string;
  // H1 on the page.
  title: string;
  // <title> tag (can be tuned independently from the on-page H1).
  metaTitle: string;
  metaDescription: string;
  // Card / index summary.
  excerpt: string;
  readingTime: string;
  datePublished: string; // ISO date
  dateModified: string; // ISO date
  intro: string;
  keyTakeaways: string[];
  sections: BlogSection[];
  faq: BlogFaq[];
};

// Per-locale base path for the blog index. Post URLs are `${base}/${slug}`.
export function blogBasePath(lang: Lang): string {
  return lang === "mk" ? "/informacii" : "/en/blog";
}

export function postPath(lang: Lang, slug: string): string {
  return `${blogBasePath(lang)}/${slug}`;
}

// Photographic card cover (real image). The post page uses the SVG instead.
export function coverImage(cover: CoverKey): string {
  return `/blog/${cover}.jpg`;
}

export function getPosts(lang: Lang): BlogPost[] {
  return blogPosts[lang];
}

export function getPost(lang: Lang, slug: string): BlogPost | undefined {
  return blogPosts[lang].find((p) => p.slug === slug);
}

// The matching slug for the same article in the other locale (for hreflang).
export function alternateSlug(id: string, lang: Lang): string | undefined {
  return blogPosts[lang].find((p) => p.id === id)?.slug;
}

// Builds the structured-data graph for a single post: BlogPosting + FAQPage +
// BreadcrumbList. Lives here so both locale route files stay thin and the schema
// can never drift from the rendered content. `siteUrl` is the absolute origin.
export function buildPostLd(lang: Lang, post: BlogPost, siteUrl: string) {
  const ui = blogUI[lang];
  const url = `${siteUrl}${postPath(lang, post.slug)}`;
  const inLanguage = lang === "mk" ? "mk-MK" : "en-US";
  const publisher = {
    "@type": "Organization",
    name: "Banana",
    logo: { "@type": "ImageObject", url: `${siteUrl}/logo-nav.webp` },
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.metaDescription,
        image: `${siteUrl}${coverImage(post.cover)}`,
        inLanguage,
        articleSection: post.category,
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        author: publisher,
        publisher,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        url,
      },
      {
        "@type": "FAQPage",
        mainEntity: post.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.home, item: `${siteUrl}${lang === "mk" ? "/" : "/en"}` },
          { "@type": "ListItem", position: 2, name: ui.blog, item: `${siteUrl}${blogBasePath(lang)}` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}

// Short labels used by the index/post page chrome.
export const blogUI: Record<
  Lang,
  {
    home: string;
    blog: string;
    indexEyebrow: string;
    indexTitle: string;
    indexTitleHighlight: string;
    indexSubtitle: string;
    indexMetaTitle: string;
    indexMetaDescription: string;
    readMore: string;
    takeawaysTitle: string;
    faqTitle: string;
    backToBlog: string;
    published: string;
    updated: string;
    inThisArticle: string;
  }
> = {
  mk: {
    home: "Дома",
    blog: "Информации",
    indexEyebrow: "ИНФОРМАЦИИ И СОВЕТИ",
    indexTitle: "Одговори на прашањата што",
    indexTitleHighlight: "најмногу се пребаруваат",
    indexSubtitle:
      "Практични водичи за изработка на веб страна, онлајн продавница, цени и SEO — напишани за сопственици на бизниси во Македонија.",
    indexMetaTitle: "Информации и совети за веб страни и SEO | Banana",
    indexMetaDescription:
      "Практични водичи за изработка на веб страна, цени, рокови и SEO оптимизација во Македонија. Одговори на прашањата што најчесто ги поставуваат бизнисите.",
    readMore: "Прочитај повеќе",
    takeawaysTitle: "Накратко",
    faqTitle: "Често поставувани прашања",
    backToBlog: "Назад до сите објави",
    published: "Објавено",
    updated: "Ажурирано",
    inThisArticle: "Во оваа статија",
  },
  en: {
    home: "Home",
    blog: "Blog",
    indexEyebrow: "INFORMATION & GUIDES",
    indexTitle: "Answers to the questions",
    indexTitleHighlight: "people search the most",
    indexSubtitle:
      "Practical guides on website development, online stores, pricing and SEO — written for business owners in Macedonia.",
    indexMetaTitle: "Information & guides on websites and SEO | Banana",
    indexMetaDescription:
      "Practical guides on website development, pricing, timelines and SEO optimization in Macedonia. Answers to the questions businesses ask most.",
    readMore: "Read more",
    takeawaysTitle: "In short",
    faqTitle: "Frequently asked questions",
    backToBlog: "Back to all posts",
    published: "Published",
    updated: "Updated",
    inThisArticle: "In this article",
  },
};

export const blogPosts: Record<Lang, BlogPost[]> = {
  mk: [
    {
      id: "website-cost",
      slug: "kolku-chini-web-strana",
      cover: "cost",
      imageAlt: "Монети и младо растение — цената на веб страна како инвестиција",
      category: "Веб дизајн",
      title: "Колку чини изработка на веб страна во Македонија во 2026?",
      metaTitle: "Колку чини изработка на веб страна во Македонија? (2026)",
      metaDescription:
        "Колку чини веб страна во Македонија во 2026? Реални ценовни распони по тип на страна, што влијае на цената, скриени трошоци и како да добиете точна понуда.",
      excerpt:
        "Реален водич низ цените за изработка на веб страна во Македонија — што влијае на цената и како да добиете точна понуда.",
      readingTime: "8 мин читање",
      datePublished: "2026-03-10",
      dateModified: "2026-06-24",
      intro:
        "Ова е првото прашање што го поставува секој сопственик на бизнис. Краткиот одговор е: зависи — но не е празно „зависи“. Цената се определува од конкретни фактори, и штом ќе ги разберете, лесно ќе процените во кој распон спаѓа вашиот проект и што добивате за тие пари.",
      keyTakeaways: [
        "Едноставна презентациска веб страна во Македонија обично чини помеѓу €400 и €1.200.",
        "Онлајн продавница почнува од околу €800 и расте според бројот на функции.",
        "Доменот и хостингот се годишни трошоци одделно од изработката (обично €40–€120 годишно заедно).",
        "Најточната бројка ја добивате само со понуда базирана на вашите конкретни потреби.",
      ],
      sections: [
        {
          heading: "Од што зависи цената на веб страната",
          paragraphs: [
            "Веб страната не е производ со фиксна цена како телефон — таа е услуга што се прави по мерка. Затоа две страни што „изгледаат слично“ можат да чинат сосема различно.",
            "Главните фактори што ја одредуваат цената се:",
          ],
          bullets: [
            "Број на страници и количина на содржина",
            "Уникатен дизајн по мерка наспроти готов темплејт",
            "Функции: формулари, резервации, повеќејазичност, блог, плаќање",
            "Интеграции со други системи (CRM, ERP, достава, банка)",
            "Изработка на текстови, фотографии и лого ако ги немате",
            "Ниво на SEO оптимизација вградена од старт",
          ],
        },
        {
          heading: "Колку чини презентациска веб страна",
          paragraphs: [
            "Презентациската страна го прикажува вашиот бизнис: почетна, за нас, услуги, портфолио и контакт. За мал бизнис со 5–8 страници, во Македонија реалниот распон е најчесто помеѓу €400 и €1.200.",
            "Една едноставна landing страница (само една страна со јасен повик на дејство) може да чини и помалку — околу €150–€400. Поголеми страни со уникатен дизајн, анимации и побогата содржина одат над €1.200.",
          ],
        },
        {
          heading: "Колку чини онлајн продавница",
          paragraphs: [
            "Онлајн продавницата е посложена бидејќи вклучува каталог на производи, кошничка, плаќање и управување со нарачки. Затоа почнува од околу €800 и лесно поминува €3.000 за поголеми каталози со многу функции.",
            "На цената на самата изработка треба да го додадете и поврзувањето со банка за картично плаќање. Тоа е посебен процес кој обично се активира 10–15 дена по одобрувањето од банката.",
          ],
        },
        {
          heading: "Еднократна цена наспроти годишен пакет",
          paragraphs: [
            "Постојат два начина на плаќање. Првиот е еднократна цена — плаќате за изработката, а одржувањето и хостингот ги решавате одделно. Вториот е годишен пакет, каде изработката, хостингот, одржувањето и ажурирањата се на едно место за фиксна годишна сума.",
            "Пакетот е поскап на хартија, но често поисплатлив: не размислувате за надградби, безбедност и резервни копии, а страната постојано е ажурна. За бизнис што нема сопствено IT, ова обично е помирен избор.",
          ],
        },
        {
          heading: "Скриени трошоци: домен, хостинг и одржување",
          paragraphs: [
            "Изработката е еднократна, но веб страната има и тековни трошоци. Доменот (на пр. вашафирма.mk) се плаќа годишно, обично €10–€30. Хостингот, каде „живее“ страната, е најчесто €30–€100 годишно за мал бизнис.",
            "Одржувањето — ажурирања, безбедност, резервни копии и ситни измени — е препорачливо да не се изоставува. Запоставена страна станува бавна и ранлива, што долгорочно чини повеќе од редовното одржување.",
          ],
        },
        {
          heading: "Како да добиете точна понуда",
          paragraphs: [
            "Ниедна цена од интернет не е вашата цена додека некој не ги разбере вашите потреби. Пред да побарате понуда, подгответе: што сака да постигне страната, колку страници ви се потребни, дали ви треба продавница, и дали имате текстови, слики и лого.",
            "Колку појасно го опишете тоа, толку поточна е понудата. Кај нас понудата е бесплатна и прилагодена — пополнувате кратка форма и добивате реална цена за вашиот конкретен проект.",
          ],
        },
      ],
      faq: [
        {
          q: "Колку чини најевтина веб страна?",
          a: "Најевтини се едноставните landing страници — една страна со основна содржина — кои во Македонија се движат околу €150–€400. Сепак, за бизнис кој сака доверба и видливост, презентациска страна со повеќе страници е подобра инвестиција.",
        },
        {
          q: "Зошто цените за веб страна се толку различни?",
          a: "Бидејќи веб страната е услуга по мерка. Цената зависи од бројот на страници, дали дизајнот е уникатен или готов темплејт, какви функции и интеграции бара и колку содржина треба да се изработи од нула.",
        },
        {
          q: "Дали цената вклучува домен и хостинг?",
          a: "Не секогаш. Изработката е еднократен трошок, а доменот и хостингот се годишни. Кај годишните пакети тие се вклучени, додека кај еднократна изработка обично се одделни ставки.",
        },
        {
          q: "Дали е подобро еднократно плаќање или годишен пакет?",
          a: "Зависи од бизнисот. Еднократното плаќање е поевтино на почеток, но мора сами да се грижите за одржување. Годишниот пакет е помирен избор бидејќи хостингот, безбедноста и ажурирањата се решени.",
        },
      ],
    },
    {
      id: "timeline",
      slug: "kolku-vreme-izrabotka-web-strana",
      cover: "time",
      imageAlt: "Песочен часовник — времето потребно за изработка на веб страна",
      category: "Процес",
      title: "Колку време е потребно за изработка на веб страна?",
      metaTitle: "Колку време трае изработка на веб страна? Реални рокови",
      metaDescription:
        "Колку време трае изработка на веб страна? Реални рокови по тип на страна, фазите на процесот и што можете да направите за побрза изработка.",
      excerpt:
        "Реални рокови по тип на страна, низ кои фази минува проектот и што го забрзува, а што го забавува.",
      readingTime: "6 мин читање",
      datePublished: "2026-04-14",
      dateModified: "2026-06-24",
      intro:
        "Кога ќе одлучите за нова веб страна, сакате да знаете кога ќе биде онлајн. Реалноста е дека рокот зависи од обемот — но постојат типични рамки за секој тип проект, и најголемиот фактор за брзината сте всушност вие, клиентот.",
      keyTakeaways: [
        "Landing страница: обично 1–2 недели.",
        "Презентациска веб страна: обично 3–6 недели.",
        "Онлајн продавница: обично 6–10 недели, плус 10–15 дена за активирање на картично плаќање.",
        "Најголемото доцнење доаѓа од доцна испорачани текстови, слики и повратни информации.",
      ],
      sections: [
        {
          heading: "Од што зависи рокот",
          paragraphs: [
            "Времето на изработка не е иста бројка за секого. Тоа што го одредува се: бројот на страници, сложеноста на дизајнот, функциите што ги бара страната, и колку брзо вие ги доставувате потребните материјали и одобрувања.",
            "Парадоксот е дека дизајнерот често чека на клиентот, а не обратно. Затоа подготвеноста од ваша страна е најмоќниот начин да го скратите рокот.",
          ],
        },
        {
          heading: "Типични рокови по тип на страна",
          paragraphs: [
            "Ова се реални рамки за добро организиран проект:",
          ],
          bullets: [
            "Landing страница (една страна): 1–2 недели",
            "Презентациска страна (5–8 страници): 3–6 недели",
            "Онлајн продавница: 6–10 недели",
            "Поголеми проекти со интеграции: 10 недели и повеќе",
          ],
        },
        {
          heading: "Низ кои фази минува проектот",
          paragraphs: [
            "Изработката не е една задача туку низа чекори. Прво доаѓа истражување и стратегија — се дефинира целта, структурата и содржината. Потоа дизајн, каде се обликува изгледот и се одобрува.",
            "Следи програмирање, каде дизајнот оживува и станува функционален. На крај доаѓа тестирање и лансирање — проверка на сите уреди, брзина и формулари, па објавување. Секоја фаза бара ваше одобрување пред да се премине на следната.",
          ],
        },
        {
          heading: "Што го забрзува, а што го забавува процесот",
          paragraphs: [
            "Најчестата причина за доцнење не е техничка — туку чекање на содржина. Ако текстовите, фотографиите и логото се подготвени однапред, проектот тече без застој.",
            "Истото важи и за повратните информации: брзите и јасни одговори го држат темпото, додека неодлучноста и честите промени на правецот го растегнуваат рокот. Договорете кој од ваша страна одобрува, за да не се губи време во чекање на согласност.",
          ],
        },
        {
          heading: "Зошто побрзо не е секогаш подобро",
          paragraphs: [
            "Можно е да се направи страна за неколку дена, но брзањето обично се плаќа подоцна — со слаб дизајн, лоша SEO основа и грешки што се откриваат откако страната е веќе онлајн.",
            "Добра веб страна е инвестиција на години. Неколку недели повеќе на почетокот се незначителни наспроти страна што работи беспрекорно долгорочно.",
          ],
        },
      ],
      faq: [
        {
          q: "Може ли веб страна да се направи за неколку дена?",
          a: "Технички да, за многу едноставна landing страница со готова содржина. Но квалитетна страна со уникатен дизајн и добра SEO основа бара повеќе време за да биде вистинска инвестиција, а не привремено решение.",
        },
        {
          q: "Зошто изработката понекогаш доцни?",
          a: "Најчесто поради доцна доставена содржина или бавни повратни информации од клиентот. Кога текстовите, сликите и одобрувањата доаѓаат навреме, проектот ретко доцни.",
        },
        {
          q: "Колку време трае онлајн продавница?",
          a: "Обично 6–10 недели за самата изработка, во зависност од бројот на производи и функции. На тоа се додаваат и 10–15 дена за активирање на картичното плаќање по одобрување од банка.",
        },
        {
          q: "Што можам да направам за побрза изработка?",
          a: "Подгответе ги текстовите, фотографиите и логото однапред, определете една личност што одобрува и одговарајте брзо на прашањата. Подготвениот клиент е најголемиот фактор за брз рок.",
        },
      ],
    },
    {
      id: "seo-basics",
      slug: "shto-e-seo-optimizacija",
      cover: "seo",
      imageAlt: "Аналитика и графикони на лаптоп — SEO резултати на Google",
      category: "SEO",
      title: "Што е SEO и како да се рангирам прв на Google?",
      metaTitle: "Што е SEO и како да се рангирам прв на Google? (Водич)",
      metaDescription:
        "Што е SEO оптимизација и како да се рангирате повисоко на Google во Македонија? Едноставен водич: фактори на рангирање, локално SEO и реални очекувања.",
      excerpt:
        "Едноставен водич за SEO: како Google рангира, што е локално SEO и за колку време се гледаат резултати.",
      readingTime: "7 мин читање",
      datePublished: "2026-05-19",
      dateModified: "2026-06-24",
      intro:
        "Имате убава веб страна, но никој не ја наоѓа? Тоа е работа за SEO. SEO (Search Engine Optimization) е процес на подобрување на страната за да се рангира повисоко на Google за зборовите што вашите клиенти веќе ги пребаруваат — без да плаќате за секој клик.",
      keyTakeaways: [
        "SEO ве прави видливи на Google за пребарувањата на вашите потенцијални клиенти.",
        "Рангирањето зависи од содржина, техничка исправност и линкови кон вашата страна.",
        "Локалното SEO (Google Business Profile) е клучно за бизниси што служат одредено место.",
        "Резултатите од SEO обично се видливи по 3–6 месеци и растат со времето.",
      ],
      sections: [
        {
          heading: "Што всушност е SEO",
          paragraphs: [
            "Кога пишувате нешто на Google, тој враќа листа резултати подредени по тоа колку се корисни и релевантни. SEO е збир техники со кои на Google му давате јасни сигнали дека токму вашата страна е добриот одговор за дадено пребарување.",
            "За разлика од платените реклами, органските резултати не се плаќаат по клик. Затоа SEO е долгорочна инвестиција — еднаш изградената позиција носи посета месеци и години.",
          ],
        },
        {
          heading: "Како Google одлучува кој е прв",
          paragraphs: [
            "Google гледа стотици сигнали, но тие паѓаат во три големи групи:",
          ],
          bullets: [
            "Содржина — дали страната навистина одговара на прашањето на корисникот, со јасен текст и вистински клучни зборови",
            "Техничка исправност — брзина, мобилна верзија, чиста структура и без грешки",
            "Авторитет — колку други квалитетни страни упатуваат (линкуваат) кон вас",
          ],
        },
        {
          heading: "Локалното SEO е најважно за локалните бизниси",
          paragraphs: [
            "Ако служите одреден град или регион, локалното SEO ви носи најмногу клиенти. Основата е бесплатниот Google Business Profile — профилот што се појавува со мапа, работно време и рецензии кога некој бара „веб дизајн Скопје“ или сличен израз со локација.",
            "Целосно пополнет профил, реални рецензии и .mk домен испраќаат силен сигнал дека сте релевантни за пребарувачите во Македонија.",
          ],
        },
        {
          heading: "SEO наспроти Google реклами",
          paragraphs: [
            "Google рекламите ве ставаат на врвот веднаш, но престануваат во моментот кога ќе го запрете буџетот. SEO е побавно, но изградените позиции остануваат и не чинат по клик.",
            "Најдоброто решение често е комбинација: реклами за брзи резултати на почеток, а SEO за стабилен, долгорочен раст што не зависи од дневен буџет.",
          ],
        },
        {
          heading: "За колку време ќе видам резултати",
          paragraphs: [
            "SEO не е прекинувач што се пали. Првите подобрувања обично се видливи по 3–6 месеци, а вистинскиот ефект се гради и стабилизира со времето.",
            "Денес е важно и тоа што содржината што добро одговара на прашања се појавува и во AI алатки како ChatGPT. Јасно напишана, корисна содржина ве прави видливи и на Google и на новите начини на пребарување.",
          ],
        },
      ],
      faq: [
        {
          q: "Што е SEO со едноставни зборови?",
          a: "SEO е оптимизација за пребарувачи — подобрување на вашата веб страна за да се појавува повисоко на Google за зборовите што ги бараат вашите клиенти, и да привлече повеќе бесплатна (органска) посета.",
        },
        {
          q: "Колку време е потребно за резултати од SEO?",
          a: "Обично 3–6 месеци за првите видливи подобрувања. SEO е долгорочна инвестиција — резултатите растат и се стабилизираат како што страната гради авторитет со времето.",
        },
        {
          q: "Дали можам сам да правам SEO?",
          a: "Основите — јасна содржина, вистински клучни зборови и пополнет Google Business Profile — можете и сами. За техничка оптимизација, изградба на линкови и стратегија, специјалист носи побрзи и постабилни резултати.",
        },
        {
          q: "Која е разликата меѓу SEO и Google реклами?",
          a: "Рекламите се плаќаат по клик и престануваат штом го запрете буџетот. SEO гради органски позиции што остануваат и носат посета без трошок по клик, но за тоа е потребно повеќе време.",
        },
      ],
    },
    {
      id: "site-vs-store",
      slug: "web-strana-ili-online-prodavnica",
      cover: "store",
      imageAlt: "Онлајн купување со платежна картичка на лаптоп",
      category: "Совети",
      title: "Веб страна или онлајн продавница — што му треба на мојот бизнис?",
      metaTitle: "Веб страна или онлајн продавница — што ви треба?",
      metaDescription:
        "Веб страна или онлајн продавница? Кога е доволна презентациска страна, кога ви треба продавница и дали може да почнете со страна, па подоцна да додадете продажба.",
      excerpt:
        "Кога е доволна презентациска страна, кога навистина ви треба продавница и како да одлучите без да преплатите.",
      readingTime: "6 мин читање",
      datePublished: "2026-06-16",
      dateModified: "2026-06-24",
      intro:
        "Многу бизниси автоматски бараат „онлајн продавница“ кога им треба онлајн присуство — иако често е доволна обична веб страна. Разликата е важна бидејќи влијае на цената, рокот и одржувањето. Еве како да одлучите што навистина ви треба.",
      keyTakeaways: [
        "Презентациска страна прикажува и гради доверба; продавница продава директно онлајн.",
        "Ако не продавате физички производи преку интернет, веројатно ви е доволна презентациска страна.",
        "Продавницата е поскапа и бара повеќе одржување — земете ја само ако навистина продавате онлајн.",
        "Може да почнете со страна и подоцна да додадете продавница кога ќе ви затреба.",
      ],
      sections: [
        {
          heading: "Која е разликата",
          paragraphs: [
            "Презентациската веб страна го прикажува вашиот бизнис — кои сте, што нудите и како да ве контактираат. Нејзината цел е доверба и контакт: повик, порака или барање понуда.",
            "Онлајн продавницата оди чекор подалеку — клиентот избира производ, го става во кошничка и плаќа онлајн. Тоа бара каталог, систем за плаќање и управување со нарачки, па е посложена и поскапа.",
          ],
        },
        {
          heading: "Кога е доволна презентациска страна",
          paragraphs: [
            "Презентациската страна е вистинскиот избор за повеќето услужни дејности и бизниси што не продаваат физички производи директно онлајн. Доволна е ако:",
          ],
          bullets: [
            "Нудите услуги (адвокат, стоматолог, ресторан, занаетчија, агенција)",
            "Сакате да изградите доверба и да ве најдат на Google",
            "Продажбата се случува преку контакт, телефон или во живо",
            "Презентирате портфолио, цени или мени без онлајн плаќање",
          ],
        },
        {
          heading: "Кога навистина ви треба продавница",
          paragraphs: [
            "Онлајн продавница ви треба кога продажбата треба да се случува самата, без ваша вклученост за секоја нарачка. Тоа е случај ако продавате физички или дигитални производи што клиентите сакаат да ги нарачаат и платат веднаш.",
            "Ако имате каталог производи, сакате нарачки 24/7 и картично плаќање, продавницата се исплати. Ако пак немате што да продавате онлајн, таа само додава трошок и сложеност без корист.",
          ],
        },
        {
          heading: "Може ли да почнам со страна, па подоцна да додадам продавница",
          paragraphs: [
            "Да — и тоа е честа и паметна патека. Многу бизниси стартуваат со презентациска страна за да градат присуство и доверба, а продавницата ја додаваат кога ќе се појави вистинска потреба за онлајн продажба.",
            "Важно е страната да се изгради на основа што може да расте, за подоцнежното додавање продавница да не значи правење сè од почеток. Затоа вреди тоа да се спомене уште на првиот разговор.",
          ],
        },
        {
          heading: "Кратка листа за одлука",
          paragraphs: [
            "Поставете си едно прашање: дали клиентот треба да може да плати онлајн, веднаш, без мене? Ако одговорот е „да“ — потребна ви е продавница. Ако е „не, доволно е да ме контактираат“ — презентациска страна ја врши работата подобро и поевтино.",
            "Не плаќајте за продавница „за секаков случај“. Подобро вложете во квалитетна страна сега и надградете кога ќе има реална потреба.",
          ],
        },
      ],
      faq: [
        {
          q: "Која е разликата меѓу веб страна и онлајн продавница?",
          a: "Веб страната го прикажува бизнисот и гради доверба и контакт, додека онлајн продавницата овозможува клиентот да избере производ и да плати директно онлајн. Продавницата е посложена и поскапа.",
        },
        {
          q: "Дали на услужен бизнис му треба онлајн продавница?",
          a: "Најчесто не. Ако продажбата се случува преку контакт, телефон или во живо, презентациска страна е доволна, поевтина и полесна за одржување од продавница.",
        },
        {
          q: "Може ли подоцна да додадам продавница на постоечка страна?",
          a: "Да. Ако страната е изградена на основа што може да расте, продавница може да се додаде подоцна без да се прави сè од почеток. Вреди тоа да го споменете уште на почетокот.",
        },
        {
          q: "Што е поевтино за одржување?",
          a: "Презентациската страна. Продавницата бара повеќе одржување — ажурирања на производи, плаќање и безбедност — па земете ја само ако навистина продавате онлајн.",
        },
      ],
    },
  ],
  en: [
    {
      id: "website-cost",
      slug: "website-cost-macedonia",
      cover: "cost",
      imageAlt: "Coins and a young plant — the cost of a website as an investment",
      category: "Web Design",
      title: "How much does a website cost in Macedonia in 2026?",
      metaTitle: "How much does a website cost in Macedonia? (2026)",
      metaDescription:
        "How much does a website cost in Macedonia in 2026? Real price ranges by type of site, what affects the price, hidden costs and how to get an accurate quote.",
      excerpt:
        "A realistic walk through website prices in Macedonia — what affects the cost and how to get an accurate quote.",
      readingTime: "8 min read",
      datePublished: "2026-03-10",
      dateModified: "2026-06-24",
      intro:
        "It's the first question every business owner asks. The short answer is: it depends — but not an empty „it depends“. The price is set by specific factors, and once you understand them you can easily estimate which range your project falls into and what you get for the money.",
      keyTakeaways: [
        "A simple presentation website in Macedonia usually costs between €400 and €1,200.",
        "An online store starts at around €800 and grows with the number of features.",
        "Domain and hosting are yearly costs separate from development (usually €40–€120 per year together).",
        "The most accurate figure only comes from a quote based on your specific needs.",
      ],
      sections: [
        {
          heading: "What the price of a website depends on",
          paragraphs: [
            "A website isn't a fixed-price product like a phone — it's a service built to measure. That's why two sites that „look similar“ can cost very differently.",
            "The main factors that set the price are:",
          ],
          bullets: [
            "Number of pages and amount of content",
            "Custom unique design versus a ready-made template",
            "Features: forms, bookings, multiple languages, blog, payments",
            "Integrations with other systems (CRM, ERP, delivery, bank)",
            "Producing copy, photos and a logo if you don't have them",
            "How much SEO is built in from the start",
          ],
        },
        {
          heading: "How much a presentation website costs",
          paragraphs: [
            "A presentation site showcases your business: home, about, services, portfolio and contact. For a small business with 5–8 pages, the realistic range in Macedonia is usually between €400 and €1,200.",
            "A simple landing page (a single page with a clear call to action) can cost less — around €150–€400. Larger sites with custom design, animations and richer content go above €1,200.",
          ],
        },
        {
          heading: "How much an online store costs",
          paragraphs: [
            "An online store is more complex because it includes a product catalog, cart, payments and order management. So it starts at around €800 and easily exceeds €3,000 for large catalogs with many features.",
            "On top of the build cost you should add connecting to a bank for card payments. That's a separate process, usually activated 10–15 days after the bank approves it.",
          ],
        },
        {
          heading: "One-time price versus an annual package",
          paragraphs: [
            "There are two ways to pay. The first is a one-time price — you pay for the build and handle hosting and maintenance separately. The second is an annual package, where development, hosting, maintenance and updates sit in one place for a fixed yearly fee.",
            "The package looks more expensive on paper but is often the better value: you don't worry about upgrades, security and backups, and the site stays up to date. For a business without its own IT, it's usually the calmer choice.",
          ],
        },
        {
          heading: "Hidden costs: domain, hosting and maintenance",
          paragraphs: [
            "The build is one-time, but a website has ongoing costs too. The domain (e.g. yourcompany.mk) is paid yearly, usually €10–€30. Hosting, where the site „lives“, is typically €30–€100 per year for a small business.",
            "Maintenance — updates, security, backups and small edits — is best not skipped. A neglected site becomes slow and vulnerable, which costs more in the long run than regular upkeep.",
          ],
        },
        {
          heading: "How to get an accurate quote",
          paragraphs: [
            "No price from the internet is your price until someone understands your needs. Before requesting a quote, prepare: what the site should achieve, how many pages you need, whether you need a store, and whether you already have copy, images and a logo.",
            "The clearer you describe it, the more accurate the quote. Our quote is free and tailored — you fill in a short form and get a real price for your specific project.",
          ],
        },
      ],
      faq: [
        {
          q: "How much does the cheapest website cost?",
          a: "The cheapest are simple landing pages — a single page with basic content — which in Macedonia run around €150–€400. Still, for a business that wants trust and visibility, a multi-page presentation site is the better investment.",
        },
        {
          q: "Why do website prices vary so much?",
          a: "Because a website is a made-to-measure service. The price depends on the number of pages, whether the design is custom or a ready-made template, what features and integrations it needs, and how much content has to be created from scratch.",
        },
        {
          q: "Does the price include domain and hosting?",
          a: "Not always. The build is a one-time cost, while domain and hosting are yearly. Annual packages include them, whereas with a one-time build they're usually separate items.",
        },
        {
          q: "Is one-time payment or an annual package better?",
          a: "It depends on the business. One-time is cheaper up front but you must handle maintenance yourself. An annual package is the calmer choice because hosting, security and updates are taken care of.",
        },
      ],
    },
    {
      id: "timeline",
      slug: "how-long-to-build-a-website",
      cover: "time",
      imageAlt: "An hourglass — the time it takes to build a website",
      category: "Process",
      title: "How long does it take to build a website?",
      metaTitle: "How long does it take to build a website? Real timelines",
      metaDescription:
        "How long does it take to build a website? Real timelines by type of site, the phases of the process and what you can do to speed it up.",
      excerpt:
        "Real timelines by type of site, the phases a project goes through, and what speeds it up or slows it down.",
      readingTime: "6 min read",
      datePublished: "2026-04-14",
      dateModified: "2026-06-24",
      intro:
        "Once you decide on a new website, you want to know when it'll be live. The reality is the timeline depends on scope — but there are typical ranges for each type of project, and the biggest factor in the speed is actually you, the client.",
      keyTakeaways: [
        "Landing page: usually 1–2 weeks.",
        "Presentation website: usually 3–6 weeks.",
        "Online store: usually 6–10 weeks, plus 10–15 days to activate card payments.",
        "The biggest delays come from late copy, images and feedback.",
      ],
      sections: [
        {
          heading: "What the timeline depends on",
          paragraphs: [
            "Build time isn't the same number for everyone. What sets it is the number of pages, the complexity of the design, the features the site needs, and how quickly you provide the required materials and approvals.",
            "The paradox is that the designer often waits on the client, not the other way around. So your readiness is the most powerful way to shorten the timeline.",
          ],
        },
        {
          heading: "Typical timelines by type of site",
          paragraphs: [
            "These are realistic ranges for a well-organized project:",
          ],
          bullets: [
            "Landing page (single page): 1–2 weeks",
            "Presentation site (5–8 pages): 3–6 weeks",
            "Online store: 6–10 weeks",
            "Larger projects with integrations: 10 weeks and up",
          ],
        },
        {
          heading: "The phases a project goes through",
          paragraphs: [
            "Building a site isn't one task but a sequence of steps. First comes research and strategy — defining the goal, structure and content. Then design, where the look is shaped and approved.",
            "Next is development, where the design comes to life and becomes functional. Finally testing and launch — checking every device, speed and forms, then going live. Each phase needs your approval before moving to the next.",
          ],
        },
        {
          heading: "What speeds it up and what slows it down",
          paragraphs: [
            "The most common reason for delay isn't technical — it's waiting on content. If the copy, photos and logo are ready in advance, the project flows without stalls.",
            "The same goes for feedback: quick, clear answers keep the pace, while indecision and frequent changes of direction stretch the timeline. Agree on who approves from your side so no time is lost waiting for sign-off.",
          ],
        },
        {
          heading: "Why faster isn't always better",
          paragraphs: [
            "It's possible to throw a site together in a few days, but rushing usually gets paid for later — with weak design, a poor SEO foundation and bugs discovered after the site is already live.",
            "A good website is an investment for years. A few extra weeks at the start are insignificant next to a site that works flawlessly long-term.",
          ],
        },
      ],
      faq: [
        {
          q: "Can a website be built in a few days?",
          a: "Technically yes, for a very simple landing page with ready content. But a quality site with custom design and a solid SEO foundation needs more time to be a real investment rather than a temporary fix.",
        },
        {
          q: "Why does development sometimes run late?",
          a: "Most often because of late content or slow feedback from the client. When copy, images and approvals arrive on time, a project rarely runs late.",
        },
        {
          q: "How long does an online store take?",
          a: "Usually 6–10 weeks for the build itself, depending on the number of products and features. Add another 10–15 days to activate card payments after the bank approves it.",
        },
        {
          q: "What can I do to speed up the build?",
          a: "Prepare the copy, photos and logo in advance, name one person who approves, and answer questions quickly. A prepared client is the single biggest factor in a fast timeline.",
        },
      ],
    },
    {
      id: "seo-basics",
      slug: "what-is-seo",
      cover: "seo",
      imageAlt: "Analytics and charts on a laptop — SEO results on Google",
      category: "SEO",
      title: "What is SEO and how do I rank first on Google?",
      metaTitle: "What is SEO and how do I rank first on Google? (Guide)",
      metaDescription:
        "What is SEO and how do you rank higher on Google in Macedonia? A simple guide: ranking factors, local SEO and realistic expectations for results.",
      excerpt:
        "A simple guide to SEO: how Google ranks, what local SEO is, and how long results take.",
      readingTime: "7 min read",
      datePublished: "2026-05-19",
      dateModified: "2026-06-24",
      intro:
        "Got a beautiful website that nobody finds? That's a job for SEO. SEO (Search Engine Optimization) is the process of improving your site so it ranks higher on Google for the words your customers are already searching — without paying for every click.",
      keyTakeaways: [
        "SEO makes you visible on Google for your potential customers' searches.",
        "Ranking depends on content, technical health and links pointing to your site.",
        "Local SEO (Google Business Profile) is key for businesses serving a specific area.",
        "SEO results are usually visible after 3–6 months and grow over time.",
      ],
      sections: [
        {
          heading: "What SEO actually is",
          paragraphs: [
            "When you type something into Google, it returns a list of results ordered by how useful and relevant they are. SEO is a set of techniques that give Google clear signals that your page is the good answer for a given search.",
            "Unlike paid ads, organic results aren't paid per click. That's why SEO is a long-term investment — a position you build once brings traffic for months and years.",
          ],
        },
        {
          heading: "How Google decides who's first",
          paragraphs: [
            "Google looks at hundreds of signals, but they fall into three big groups:",
          ],
          bullets: [
            "Content — whether the page truly answers the user's question, with clear text and the right keywords",
            "Technical health — speed, a mobile version, clean structure and no errors",
            "Authority — how many other quality sites point (link) to you",
          ],
        },
        {
          heading: "Local SEO matters most for local businesses",
          paragraphs: [
            "If you serve a specific city or region, local SEO brings you the most customers. The foundation is the free Google Business Profile — the listing that appears with a map, hours and reviews when someone searches „web design Skopje“ or a similar phrase with a location.",
            "A fully completed profile, real reviews and a .mk domain send a strong signal that you're relevant to searchers in Macedonia.",
          ],
        },
        {
          heading: "SEO versus Google Ads",
          paragraphs: [
            "Google Ads put you at the top instantly, but stop the moment you pause the budget. SEO is slower, but the positions you build remain and don't cost per click.",
            "The best approach is often a combination: ads for quick results early on, and SEO for steady, long-term growth that doesn't depend on a daily budget.",
          ],
        },
        {
          heading: "How long until I see results",
          paragraphs: [
            "SEO isn't a switch you flip. The first improvements are usually visible after 3–6 months, and the real effect builds and stabilizes over time.",
            "It also matters today that content which answers questions well shows up in AI tools like ChatGPT too. Clearly written, useful content makes you visible both on Google and in the new ways people search.",
          ],
        },
      ],
      faq: [
        {
          q: "What is SEO in simple words?",
          a: "SEO is search engine optimization — improving your website so it appears higher on Google for the words your customers search, and attracts more free (organic) traffic.",
        },
        {
          q: "How long does it take to see SEO results?",
          a: "Usually 3–6 months for the first visible improvements. SEO is a long-term investment — results grow and stabilize as the site builds authority over time.",
        },
        {
          q: "Can I do SEO myself?",
          a: "The basics — clear content, the right keywords and a completed Google Business Profile — you can do yourself. For technical optimization, link building and strategy, a specialist brings faster and more stable results.",
        },
        {
          q: "What's the difference between SEO and Google Ads?",
          a: "Ads are paid per click and stop the moment you pause the budget. SEO builds organic positions that remain and bring traffic with no cost per click, but it takes more time.",
        },
      ],
    },
    {
      id: "site-vs-store",
      slug: "website-vs-online-store",
      cover: "store",
      imageAlt: "Online shopping with a payment card on a laptop",
      category: "Advice",
      title: "Website or online store — what does my business need?",
      metaTitle: "Website or online store — what do you need?",
      metaDescription:
        "Website or online store? When a presentation site is enough, when you really need a store, and whether you can start with a site and add selling later.",
      excerpt:
        "When a presentation site is enough, when you truly need a store, and how to decide without overpaying.",
      readingTime: "6 min read",
      datePublished: "2026-06-16",
      dateModified: "2026-06-24",
      intro:
        "Many businesses automatically ask for an „online store“ when they need an online presence — even though a plain website is often enough. The difference matters because it affects price, timeline and maintenance. Here's how to decide what you actually need.",
      keyTakeaways: [
        "A presentation site showcases and builds trust; a store sells directly online.",
        "If you don't sell physical products over the internet, a presentation site is probably enough.",
        "A store is more expensive and needs more maintenance — only get one if you truly sell online.",
        "You can start with a site and add a store later when you need it.",
      ],
      sections: [
        {
          heading: "What the difference is",
          paragraphs: [
            "A presentation website showcases your business — who you are, what you offer and how to reach you. Its goal is trust and contact: a call, a message or a quote request.",
            "An online store goes a step further — the customer picks a product, adds it to a cart and pays online. That requires a catalog, a payment system and order management, so it's more complex and more expensive.",
          ],
        },
        {
          heading: "When a presentation site is enough",
          paragraphs: [
            "A presentation site is the right choice for most service businesses and companies that don't sell physical products directly online. It's enough if you:",
          ],
          bullets: [
            "Offer services (lawyer, dentist, restaurant, tradesperson, agency)",
            "Want to build trust and be found on Google",
            "Close sales through contact, phone or in person",
            "Show a portfolio, prices or a menu without online payment",
          ],
        },
        {
          heading: "When you really need a store",
          paragraphs: [
            "You need an online store when sales should happen on their own, without your involvement in every order. That's the case if you sell physical or digital products customers want to order and pay for right away.",
            "If you have a product catalog, want orders 24/7 and card payments, a store pays off. But if you have nothing to sell online, it only adds cost and complexity without benefit.",
          ],
        },
        {
          heading: "Can I start with a site and add a store later",
          paragraphs: [
            "Yes — and it's a common, smart path. Many businesses start with a presentation site to build presence and trust, then add a store when a real need for online selling appears.",
            "What matters is building the site on a foundation that can grow, so adding a store later doesn't mean starting over. That's worth mentioning in the very first conversation.",
          ],
        },
        {
          heading: "A quick decision checklist",
          paragraphs: [
            "Ask yourself one question: should the customer be able to pay online, right away, without me? If the answer is „yes“ — you need a store. If it's „no, it's enough for them to contact me“ — a presentation site does the job better and cheaper.",
            "Don't pay for a store „just in case“. Better to invest in a quality site now and upgrade when there's a real need.",
          ],
        },
      ],
      faq: [
        {
          q: "What's the difference between a website and an online store?",
          a: "A website showcases the business and builds trust and contact, while an online store lets the customer pick a product and pay directly online. A store is more complex and more expensive.",
        },
        {
          q: "Does a service business need an online store?",
          a: "Usually not. If sales happen through contact, phone or in person, a presentation site is enough, cheaper and easier to maintain than a store.",
        },
        {
          q: "Can I add a store to an existing site later?",
          a: "Yes. If the site is built on a foundation that can grow, a store can be added later without starting over. It's worth mentioning this at the start.",
        },
        {
          q: "Which is cheaper to maintain?",
          a: "The presentation site. A store needs more upkeep — product updates, payments and security — so only get one if you truly sell online.",
        },
      ],
    },
  ],
};
