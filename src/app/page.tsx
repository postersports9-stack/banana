'use client'

import { useRef } from "react";
import { SplineScene } from "@/components/ui/splite";
import ClientsMarquee from "@/components/ClientsMarquee";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // The robot is a multi-MB WebGL scene driven by cursor proximity — pointless
  // on touch devices (no hover) and brutal on weaker hardware. Mount it only on
  // desktop; below md the element is not rendered at all.
  const showRobot = useMediaQuery("(min-width: 768px)");
  return (
    <>
      {/* Navigation */}
      <nav className="bg-black w-full top-0 sticky z-50 transition-all duration-300 border-b border-white/10">
        <div className="flex justify-between items-center h-20 w-full max-w-max-width mx-auto">
          <a className="flex items-center h-full pl-2 pr-4 md:pl-4 md:pr-6 border-r border-white/10" href="#">
            <img alt="Banana Studio Logo" className="h-14 w-auto object-contain" src="/logo.webp" />
          </a>
          
          <div className="hidden md:flex flex-1 justify-center h-full">
            <div className="flex items-center gap-8 font-label-bold text-label-bold uppercase tracking-tighter px-4 md:px-8 h-full">
              <a className="text-white hover:text-banana transition-colors" href="#work">Веб дизајн</a>
              <a className="text-white hover:text-banana transition-colors" href="#services">Информации</a>
              <a className="text-white hover:text-banana transition-colors" href="#process">SEO</a>
              <a className="text-white hover:text-banana transition-colors" href="#about">Портфолио</a>
              <a className="text-white hover:text-banana transition-colors" href="#contact">Контакт</a>
              
              <div className="flex items-center gap-2 border border-white/10 px-2 py-1 cursor-pointer hover:border-white/30 transition-colors ml-4">
                 <span className="text-sm">🇲🇰</span>
                 <span className="text-white lowercase text-xs">mk</span>
              </div>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center h-full px-4 md:px-8 border-l border-white/10">
            <a className="inline-flex items-center justify-center bg-banana text-black font-label-bold text-label-bold uppercase tracking-tighter px-8 py-3 border-2 border-transparent hover:border-banana hover:bg-transparent hover:text-banana transition-all duration-200" href="#contact">побарај понуда</a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden flex items-center justify-center p-4 text-banana border-l border-white/10 h-full">
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header 
        ref={containerRef}
        className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden px-margin-mobile md:px-margin-desktop bg-black text-white"
        onPointerMove={(e) => {
          // Cache the canvas after the first lookup so we don't run a DOM query
          // on every pointer move across the hero.
          if (!canvasRef.current) {
            canvasRef.current = document.querySelector('canvas');
          }
          canvasRef.current?.dispatchEvent(
            new PointerEvent(e.type, e.nativeEvent)
          );
        }}
      >
        {/* Abstract Tech Background Element */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex items-center justify-center">
          <svg className="w-full h-full max-w-4xl" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" opacity="0.5" stroke="#1c1b1b" strokeWidth="2">
              <circle cx="400" cy="400" r="300" strokeDasharray="10 10"></circle>
              <circle cx="400" cy="400" r="200" strokeDasharray="5 5"></circle>
              <path d="M100 400 H700 M400 100 V700" strokeDasharray="4 8"></path>
            </g>
          </svg>
        </div>
        <div className="relative z-10 w-full max-w-max-width mx-auto flex flex-col md:flex-row items-center gap-gutter">
          {/* Hero Content */}
          <div className="flex-1 flex flex-col items-start gap-8 z-20">
            <div className="inline-block text-banana font-label-bold text-sm uppercase tracking-[0.1em]">
              ИЗРАБОТКА НА ВЕБ СТРАНИ ВО МАКЕДОНИЈА
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-[4.5rem] font-extrabold tracking-[-0.04em] leading-[1.05]">
              <span className="text-white">Креативни веб</span>
              <br />
              <span className="text-banana">страни</span>{" "}
              <span className="text-white">кои носат</span>
              <br />
              <span className="text-white">успех!</span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
              <a className="inline-flex items-center justify-center rounded-md bg-banana text-black font-black text-sm uppercase tracking-tighter px-6 py-3 border-2 border-transparent hover:bg-white hover:text-black hover:border-white transition-all duration-300 w-full sm:w-auto" href="#contact">
                Побарај понуда<span className="material-symbols-outlined ml-2 text-base">arrow_forward</span>
              </a>
              <a className="inline-flex items-center justify-center rounded-md bg-transparent text-white font-black text-sm uppercase tracking-tighter px-6 py-3 border border-banana/60 hover:bg-banana hover:text-black hover:border-banana hover:scale-105 transition-all duration-100 w-full sm:w-auto" href="#work">
                портфолио
              </a>
            </div>
          </div>
          {/* Hero Image — desktop only; not mounted on mobile */}
          {showRobot && (
            <div className="flex-1 w-full mt-12 md:mt-0 relative z-10 flex justify-center md:justify-end">
              <div className="relative w-full max-w-lg aspect-square">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="relative z-10 w-full h-full min-h-[400px]"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Clients Logo Marquee */}
      <ClientsMarquee />

      {/* Services Section */}
      <section className="w-full py-24 md:py-32 px-margin-mobile md:px-margin-desktop bg-surface" id="services">
        <div className="max-w-max-width mx-auto">
          <div className="flex flex-col items-center text-center mb-16 gap-6 mx-auto max-w-4xl">
            <div className="max-w-2xl">
              <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-lg font-black text-on-background uppercase tracking-tighter mb-4">
                Ние изработуваме веб страни и интернет продавници кои помагаат да биде најден вашиот бизнис.
              </h2>
              <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto">
                Тим од професионалци со 17 години искуство во Веб дизајнот во Македонија и Европа. Вршиме Изработка на веб страна, веб сајт, изработка на онлајн продавници, редизајн застарени веб страни. Исто така вршиме и одржување, и постојана заштита и мониторинг на вашите веб страни.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Card 1 */}
            <div className="group bg-white border-4 border-black p-8 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full text-center items-center">
              <div className="w-16 h-16 bg-white flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-black text-4xl">edit_note</span>
              </div>
              <h3 className="font-headline-lg text-2xl font-black uppercase tracking-[-0.04em] mb-4 text-on-background">Изработка на веб страна</h3>
              <p className="font-body-md text-on-surface-variant">Професионална веб страна изработена по ваша мерка. Нашите веб страни се уникатни и креирани за да ја зголемат вашата видливост и профит.</p>
            </div>
            {/* Card 2 */}
            <div className="group bg-white border-4 border-black p-8 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full text-center items-center">
              <div className="w-16 h-16 bg-white flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-black text-4xl">shopping_cart</span>
              </div>
              <h3 className="font-headline-lg text-2xl font-black uppercase tracking-[-0.04em] mb-4 text-on-background">Изработка на интернет продавници</h3>
              <p className="font-body-md text-on-surface-variant">Изработка на онлајн продавници кои лесно и едноставно ги продаваат вашите производи и услуги и ги прават лесно достапни за потрошувачите.</p>
            </div>
            {/* Card 3 */}
            <div className="group bg-white border-4 border-black p-8 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full text-center items-center">
              <div className="w-16 h-16 bg-white flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-black text-4xl">settings</span>
              </div>
              <h3 className="font-headline-lg text-2xl font-black uppercase tracking-[-0.04em] mb-4 text-on-background">Одржување на веб страни</h3>
              <p className="font-body-md text-on-surface-variant">Одржување на веб страница подразбира мониторинг и постојано ажурирање, потребно за да се осигура постојано функционирање без прекини и проблеми.</p>
            </div>
            {/* Card 4 */}
            <div className="group bg-white border-4 border-black p-8 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full text-center items-center">
              <div className="w-16 h-16 bg-white flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-black text-4xl">search</span>
              </div>
              <h3 className="font-headline-lg text-2xl font-black uppercase tracking-[-0.04em] mb-4 text-on-background">SEO оптимизација за Google</h3>
              <p className="font-body-md text-on-surface-variant">SEO овозможува подобро рангирање на вашата веб страна на Google и ChatGPT, ние ќе ви помогнеме да бидете пред конкуренцијата!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Split Section */}
      <section className="w-full py-24 md:py-32 px-margin-mobile md:px-margin-desktop bg-black text-white border-y-4 border-black">
        <div className="max-w-max-width mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side: 2x2 Grid of Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {/* Card 1 */}
              <div className="flex flex-col items-center text-center p-8 border-4 border-white/10 hover:border-banana transition-colors duration-300">
                <div className="mb-6">
                  <svg className="w-16 h-16 text-banana" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.75 3.104v1.244c0 .892-.612 1.59-1.428 1.59h-.144c-.816 0-1.428-.698-1.428-1.59V3.104c0-.892.612-1.59 1.428-1.59h.144c.816 0 1.428.698 1.428 1.59zM17.25 16.226V15a2.25 2.25 0 00-2.25-2.25H9a2.25 2.25 0 00-2.25 2.25v1.226a4.49 4.49 0 00-1.135 2.452l-.215 1.287a1.125 1.125 0 001.111 1.31h10.978a1.125 1.125 0 001.111-1.31l-.215-1.287a4.49 4.49 0 00-1.135-2.452z" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M12 18.75v-3m0 0L10.5 17.25m1.5-1.5l1.5 1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <h4 className="font-headline-lg text-xl font-black uppercase tracking-[-0.04em]">Амбициозен труд</h4>
              </div>
              {/* Card 2 */}
              <div className="flex flex-col items-center text-center p-8 border-4 border-white/10 hover:border-banana transition-colors duration-300">
                <div className="mb-6">
                  <svg className="w-16 h-16 text-banana" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 15L17.5 17.625 14.875 18.375 17.5 19.125 18.25 21.75 19 19.125 21.625 18.375 19 17.625 18.25 15zM14.25 3L13.5 5.625 10.875 6.375 13.5 7.125 14.25 9.75 15 7.125 17.625 6.375 15 5.625 14.25 3z" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <h4 className="font-headline-lg text-xl font-black uppercase tracking-[-0.04em]">Креативен тим</h4>
              </div>
              {/* Card 3 */}
              <div className="flex flex-col items-center text-center p-8 border-4 border-white/10 hover:border-banana transition-colors duration-300">
                <div className="mb-6">
                  <svg className="w-16 h-16 text-banana" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 18v3m0 0l.75-.75M12 21l-.75-.75M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h3m16 0h3M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 7a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5z" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <h4 className="font-headline-lg text-xl font-black uppercase tracking-[-0.04em]">Напредни решенија</h4>
              </div>
              {/* Card 4 */}
              <div className="flex flex-col items-center text-center p-8 border-4 border-white/10 hover:border-banana transition-colors duration-300">
                <div className="mb-6">
                  <svg className="w-16 h-16 text-banana" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <h4 className="font-headline-lg text-xl font-black uppercase tracking-[-0.04em]">Среќни клиенти</h4>
              </div>
            </div>
            {/* Right Side: Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-banana translate-x-4 translate-y-4 border-4 border-white/10"></div>
              <div className="relative border-4 border-white shadow-[8px_8px_0_0_rgba(255,225,53,1)] overflow-hidden h-[600px] flex items-center justify-center">
                 <img src="https://lh3.googleusercontent.com/aida/AP1WRLsi0E8YaLU9ZoQCJvNBbNZ2hGbSUwBFjMSP-HrmjQcB9bEIlfPBgwYpwY_17osCXYcM4yGv2ExlXwLa2WO_bLL4FiLwvlytYznzoMY7fYrreW6Z_vKzNfvxnIHEyiKFf3er6Tdjq6H1qLVYy6RkTjcbGMbSG3SNuiqSEbRKfIRBX50-jlYb5c1wLcB48CWdJ0-hjq-t-AH364VG-da9nybBrdZdCvduVjPGgStwSqMOm7qFILRrzNDC2oi3" alt="Abstract modern visual" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-24 md:py-32 px-margin-mobile md:px-margin-desktop bg-white border-t-4 border-black" id="testimonials">
        <div className="max-w-max-width mx-auto">
          <div className="text-center mb-16">
            <p className="font-label-bold text-label-bold text-banana uppercase tracking-widest mb-4">ВЕБ ДИЗАЈН МАКЕДОНИЈА</p>
            <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-lg font-black text-on-background uppercase tracking-tighter max-w-4xl mx-auto">
              Успешни приказни од соработката со BANANA STUDIO
            </h2>
          </div>
          <div className="max-w-4xl mx-auto relative bg-white border-4 border-black p-8 md:p-12">
            {/* Giant Quote Mark Background */}
            <div className="absolute right-8 top-8 opacity-5 pointer-events-none">
              <svg className="w-32 md:w-48 h-auto text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"></path>
              </svg>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <img alt="Даниел Шулер" loading="lazy" decoding="async" className="w-24 h-24 rounded-full border-2 border-black object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1MrRlaNYFcwISxDZ8kON_N35TSSkj5i3C3J668MYoCsC5LeJ05hEKakdDjWA5TeP-kHxFMbW335_V5f1xmk3MDcs968XIV2MkLRSOHPaGayiZhzb6F5-inbBEYJ3eX-5cAvMaHy4nmfPalfPuffB95wLMcj4mDjkeA1dxfFBcizhN2dcdLzOZyKLeWzcIf4LW0iCTOwPOCtWKR6uMdxSky_UIO8xc7WLuG-RxUHoX1yqhNgshlanshhBff0l3dvyGJn0n7laNWDr8" />
              </div>
              <div className="flex-col">
                <h3 className="font-headline-lg text-2xl font-black uppercase tracking-[-0.04em] mb-2 text-on-background">ПРЕКРАСНА ВЕБ СТРАНА!</h3>
                <div className="flex text-banana mb-2">
                  <span className="material-symbols-outlined text-2xl">star</span>
                  <span className="material-symbols-outlined text-2xl">star</span>
                  <span className="material-symbols-outlined text-2xl">star</span>
                  <span className="material-symbols-outlined text-2xl">star</span>
                  <span className="material-symbols-outlined text-2xl">star</span>
                </div>
                <p className="font-label-bold text-sm text-on-surface-variant uppercase tracking-wider mb-6">ДАНИЕЛ ШУЛЕР DJ - ЦИРИХ ШВАЈЦАРИЈА</p>
                <p className="font-body-lg text-on-surface-variant leading-relaxed">
                  BANANA STUDIO дизајнираше прекрасна веб страна за мене. Страницата не само што изгледа добро, туку е и многу брза и ги исполнува сите барања за оптимизација. Морам да споменам дека поддршката од BANANA STUDIO е многу брза, секогаш се тука за мене кога и да имам потреба. Апсолутно ги препорачувам!
                </p>
              </div>
            </div>
            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 mt-12">
              <button className="w-3 h-3 rounded-full bg-black hover:bg-banana transition-colors"></button>
              <button className="w-3 h-3 rounded-full bg-banana border-2 border-black"></button>
              <button className="w-3 h-3 rounded-full bg-black hover:bg-banana transition-colors"></button>
              <button className="w-3 h-3 rounded-full bg-black hover:bg-banana transition-colors"></button>
              <button className="w-3 h-3 rounded-full bg-black hover:bg-banana transition-colors"></button>
            </div>
          </div>
        </div>
      </section>

      {/* Work / Portfolio Section */}
      <section className="w-full py-24 md:py-32 px-margin-mobile md:px-margin-desktop bg-surface-container-low border-t-4 border-black" id="work">
        <div className="max-w-max-width mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="bg-banana text-black px-4 py-1 font-label-bold text-label-bold uppercase tracking-widest border-2 border-black mb-4 inline-block">
              Selected Works
            </span>
            <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-lg font-black text-on-background uppercase tracking-tighter">
              RECENT PROJECTS
            </h2>
          </div>
          {/* Bento Grid Portfolio */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {/* Item 1 (Spans 2 columns on desktop) */}
            <div className="group relative col-span-1 md:col-span-2 aspect-[16/9] bg-white border-4 border-black overflow-hidden shadow-[8px_8px_0_0_rgba(0,0,0,1)] cursor-pointer">
              <img alt="Gynaecology Clinic Website" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0" src="https://lh3.googleusercontent.com/aida/AP1WRLuPU8y8nI-vSitqYbbg6iu_nxjYgceaGBYxu3mZ45IBo4byT5i26X4XwgcUDCefY1OZDbUK-6-e8i-dPBryQbVedCI4sfJEKBCyntjK6U9hcoLklwwmj2lEkcpqUa9J0AnYjSw9MbX2E_q3UrjZxHKL1ZP4CKzJxBTcE3lT4hIHEiGrdmcdUAQnzF5O3ELt7V_MPKz6_fgShPNWv-8qhxM1bEEttc_ZlgT-ObK1zcwOD_ZgC-zGFZ4tx6rQ" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <h4 className="font-headline-lg text-3xl font-black text-white uppercase tracking-tight mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">MedClinic Pro</h4>
                <p className="font-body-md text-banana uppercase tracking-widest font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">Web Design / Dev</p>
              </div>
            </div>
            {/* Item 2 */}
            <div className="group relative col-span-1 aspect-square md:aspect-auto bg-black border-4 border-black overflow-hidden shadow-[8px_8px_0_0_rgba(255,225,53,1)] cursor-pointer">
              <img loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" alt="A dynamic screenshot of a sports apparel e-commerce website interface, featuring a runner in motion against a rugged landscape. Bold yellow typography 'СПРЕМНИ ЗА ТРЧАЊЕ?' overlaid. High contrast, energetic design style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMs0T2mmYqpV3v8kkyo-QyXXd6YW6TIhvLKb2l3an1QOCqD7XmOviKz2xuMDvMAXqZdcikr34dGohpoLSGWGbQJCn7MFAB6zq-dwrtR8GoyUJ7Nz_6qwsc-rnj02oPVahN5v_jhf0SXpy1kAIrU6gAiGowvny1eB8rMYEhQdlOtpjRRyXwM-tNzGnlLcppqULvf1Bhof24ps4H9oEIcsYL2Y3WijQDsS4_eqNdYfkJfRwJDR0fsdaPqvaetjhEdcEeMRbBDuvbTiIU" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h4 className="font-headline-lg text-2xl font-black text-white uppercase tracking-tight mb-1">Sport Lab Shop</h4>
                <p className="font-body-md text-banana uppercase tracking-widest font-bold text-sm">E-Commerce</p>
              </div>
            </div>
            {/* Item 3 */}
            <div className="group relative col-span-1 aspect-square bg-white border-4 border-black overflow-hidden shadow-[8px_8px_0_0_rgba(0,0,0,1)] cursor-pointer">
              <img loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0" alt="Dark themed website interface for a truck repair service 'Nova Repair'. Minimalist layout, stark white typography on deep black background, industrial and professional aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq5v2bjARoeQJP3Wsl8LUlNUNlBfDnsJKsCtULFuoSbw_WQxOPjcEKs6IA4G_JrKedW2gemNJDOwbL1gQCjQuvvtRNk_8Sc_Tvl-LPtXlOn912RdHIstxt8ONR39oetoj_hwDZUNW_P1Pi95VZZ13Wb8Gzq6I6a4dS5ROKnPT_Ctv07rYxA3lOCFEAI6xCiygEHr_8qloBC9csDVRXwCqWIJnZfWfvxR84vUtOesfULZM5DM_T7B05Is6KC61DUVXuyx4j6h0hOJZ_" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h4 className="font-headline-lg text-2xl font-black text-white uppercase tracking-tight mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Nova Repair</h4>
                <p className="font-body-md text-banana uppercase tracking-widest font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">Corporate Site</p>
              </div>
            </div>
            {/* Item 4 (Spans 2 columns on desktop) */}
            <div className="group relative col-span-1 md:col-span-2 aspect-[16/9] md:aspect-[21/9] bg-banana border-4 border-black overflow-hidden shadow-[8px_8px_0_0_rgba(0,0,0,1)] flex items-center justify-center p-12 text-center">
              <div className="relative z-10">
                <h3 className="font-headline-xl text-headline-lg-mobile md:text-headline-lg font-black text-black uppercase tracking-tighter mb-6">
                  WANT TO SEE MORE?
                </h3>
                <a className="inline-flex items-center justify-center bg-black text-banana font-label-bold text-label-bold uppercase tracking-tighter px-8 py-4 hover:bg-white hover:text-black border-2 border-transparent hover:border-black transition-all duration-200" href="#">
                  VIEW FULL PORTFOLIO
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-on-background dark:bg-surface-container-lowest w-full full-width bottom-0 border-t-8 border-primary">
        <div className="flex flex-col md:flex-row justify-between items-center py-12 px-margin-mobile md:px-margin-desktop w-full max-w-max-width mx-auto">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <span className="font-headline-lg text-headline-lg font-black text-primary uppercase tracking-tighter block mb-2">
              BANANA STUDIO
            </span>
            <p className="font-body-md text-body-md text-surface-variant opacity-70">
              © 2024 BANANA STUDIO. BUILT FOR SPEED.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 font-body-md text-body-md">
            <a className="text-surface-variant opacity-70 hover:opacity-100 hover:text-primary transition-opacity uppercase font-bold tracking-wider text-sm" href="#">Privacy</a>
            <a className="text-surface-variant opacity-70 hover:opacity-100 hover:text-primary transition-opacity uppercase font-bold tracking-wider text-sm" href="#">Terms</a>
            <a className="text-surface-variant opacity-70 hover:opacity-100 hover:text-primary transition-opacity uppercase font-bold tracking-wider text-sm" href="#">Careers</a>
            <a className="text-primary font-bold hover:text-primary transition-opacity uppercase tracking-wider text-sm" href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
