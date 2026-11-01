/* Beit El Wadi — prototype interactions (GSAP + ScrollTrigger + Lenis) */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGsap = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  /* ---------- i18n (EN / AR) ---------- */
  const AR = {
    skip: "تخطي إلى المحتوى", nav_about: "من نحن", nav_services: "خدماتنا", nav_fac: "الفندق والمرافق", nav_faq: "أسئلة شائعة", nav_donate: "تبرع", nav_book: "احجز فعالية", nav_contact: "تواصل معنا", careers: "وظائف",
    hero_eyebrow: "وادي النطرون · منذ ١٩٩٩", hero_l1: "مكان", hero_l2: "للتجمّع.",
    hero_lead: "١٥٠ فداناً من الفندق والفلل والملاعب والسماء المفتوحة — على بُعد ساعة من القاهرة. معسكرات ولقاءات ومؤتمرات واحتفالات نستضيفها بعناية.",
    cta_book: "احجز فعالية", cta_explore: "اكتشف خدماتنا",
    st1: "فدان من الأراضي", st2: "ضيف كل عام", st3: "نستضيف منذ", st4: "من القاهرة",
    about_eyebrow: "ما هو بيت الوادي؟", about_h: "مكان تجمّع للناس في مصر وخارجها.",
    about_p: "منذ ١٩٩٩ نستقبل المعسكرات الرياضية للشباب واللقاءات الروحية ومؤتمرات الشركات والتجمعات العائلية. نواصل الاستثمار في المكان ليبقى بيتاً دائماً لمجتمعنا، اليوم وللأجيال القادمة.",
    about_link: "تعرّف على ما نستضيفه ←", clients: "موضع ثقة الأفضل",
    svc_eyebrow: "خدماتنا", svc_h: "كل شيء تحت سماء واحدة.",
    c1t: "الفندق والفلل", c1p: "غرف وفلل مريحة للعائلات والفرق والمجموعات.",
    c2t: "المعسكرات الرياضية", c2p: "ملاعب ومساحات تدريب لمعسكرات الشباب والأندية.",
    c3t: "بناء الفريق", c3p: "حبال وتحديات وسهرات حول النار تحوّل الزملاء إلى فريق.",
    c4t: "المؤتمرات واللقاءات", c4p: "قاعات اجتماعات بعيداً عن المدينة وكل شيء في مكان واحد.",
    c5t: "الفعاليات الكبرى", c5p: "مساحة وتجهيزات لآلاف الضيوف في وقت واحد.",
    fac_eyebrow: "الفندق والمرافق", fac_h: "مساحة للحركة وغرف للراحة.",
    ch1: "غرف الفندق", ch2: "الفلل", ch3: "ملاعب رياضية", ch4: "قاعات المؤتمرات", ch5: "المطاعم", ch6: "أماكن النار",
    mis_eyebrow: "رسالتنا", mis_p: "نجعل بيت الوادي في متناول الجميع وبأسعار مناسبة — مكاناً للتواصل والتعلّم والاستمتاع، ينمو باستدامة للأجيال القادمة.",
    faq_h: "معلومات مفيدة",
    q1: "ما موعد تسجيل الوصول في الفندق؟", a1: "تسجيل الوصول الساعة ٢:٠٠ ظهراً والمغادرة ١٠:٠٠ صباحاً. قد يتوفر وصول مبكر أو مغادرة متأخرة عند الطلب حسب التوفر.",
    q2: "كم تبعدون عن القاهرة؟", a2: "حوالي ساعة بالسيارة، في وادي النطرون.",
    q3: "هل يمكننا إقامة فعالية لشركة أو مدرسة؟", a3: "نعم — المؤتمرات وبناء الفريق والمعسكرات الرياضية واللقاءات هي صميم عملنا. أرسل لنا التفاصيل وسنرد عليك بالخيارات.",
    book_eyebrow: "احجز فعالية", book_h: "أخبرنا بما تخطط له.", book_p: "شاركنا بعض التفاصيل وسيتواصل معك فريقنا.",
    f_name: "الاسم", f_phone: "الهاتف / واتساب", f_type: "نوع الفعالية", f_msg: "التفاصيل", f_send: "إرسال الطلب",
    don_h: "ساعدنا ليبقى الوادي مفتوحاً للجميع.", don_btn: "تبرع"
  };
  const EN = {};
  $$("[data-i18n]").forEach(el => (EN[el.dataset.i18n] = el.innerHTML));
  let lang = "en";

  /* ---------- word-split reveal ---------- */
  const splitWords = el => {
    const txt = el.textContent.trim();
    el.setAttribute("aria-label", txt);
    el.innerHTML = txt.split(/\s+/).map(w => `<span class="word" aria-hidden="true"><span>${w}</span></span>`).join(" ");
  };
  const revealTweens = [];
  const buildReveals = () => {
    revealTweens.splice(0).forEach(t => { t.scrollTrigger && t.scrollTrigger.kill(); t.kill(); });
    $$(".reveal-words").forEach(el => {
      splitWords(el);
      if (!hasGsap || reduce) return;
      revealTweens.push(gsap.from($$(".word > span", el), {
        yPercent: 110, duration: 0.9, ease: "power4.out", stagger: 0.035,
        scrollTrigger: { trigger: el, start: "top 85%", once: true }
      }));
    });
  };

  const setLang = l => {
    lang = l;
    const dict = l === "ar" ? AR : EN;
    $$("[data-i18n]").forEach(el => { const v = dict[el.dataset.i18n]; if (v != null) el.innerHTML = v; });
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
    $("#lang").textContent = l === "ar" ? "EN" : "عربي";
    buildReveals();
    hasGsap && ScrollTrigger.refresh();
    try { localStorage.setItem("lang", l); } catch (e) {}
  };

  /* ---------- nav ---------- */
  const nav = $("#nav"), menu = $("#menu"), burger = $("#burger");
  const onScroll = () => nav.classList.toggle("is-solid", scrollY > 60);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const closeMenu = () => { menu.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); document.body.classList.remove("menu-open"); };
  burger.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open);
    document.body.classList.toggle("menu-open", open);
  });
  menu.addEventListener("click", e => e.target.closest("a") && closeMenu());
  $("#lang").addEventListener("click", () => setLang(lang === "en" ? "ar" : "en"));

  /* ---------- form (prototype) ---------- */
  $("#form").addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target;
    if (!f.name.value.trim() || !f.phone.value.trim()) { (f.name.value.trim() ? f.phone : f.name).focus(); return; }
    $("#formOk").hidden = false; f.reset();
  });

  /* ---------- accordion ---------- */
  $$(".acc__q").forEach(btn => {
    const panel = btn.nextElementSibling;
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", !open);
      if (hasGsap && !reduce) {
        gsap.to(panel, { height: open ? 0 : "auto", duration: 0.45, ease: "power3.inOut", onComplete: () => ScrollTrigger.refresh() });
      } else { panel.style.height = open ? "0" : "auto"; }
    });
  });

  if (!hasGsap) { buildReveals(); document.querySelector(".loader").remove(); return; }

  /* ---------- smooth scroll ---------- */
  let lenis;
  if (!reduce && typeof Lenis !== "undefined") {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
      const id = a.getAttribute("href");
      if (id.length > 1 && $(id)) { e.preventDefault(); lenis.scrollTo(id, { offset: -10 }); }
    }));
  }

  /* ---------- intro ---------- */
  const intro = () => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.to(".loader__bar i", { scaleX: 1, duration: reduce ? 0.1 : 0.9, ease: "power2.inOut" })
      .to(".loader", { yPercent: -100, duration: reduce ? 0.1 : 0.9, ease: "power4.inOut" })
      .set(".loader", { display: "none" });
    if (reduce) return;
    tl.from(".hero__img", { scale: 1.25, duration: 2, ease: "power3.out" }, "-=0.7")
      .from(".hero .line > span", { yPercent: 110, duration: 1.1, stagger: 0.12 }, "-=1.5")
      .from(".hero .eyebrow, .hero__lead, .hero__cta > *", { y: 24, opacity: 0, duration: 0.9, stagger: 0.1 }, "-=0.8")
      .from(".nav", { yPercent: -100, duration: 0.8 }, "-=0.8");
  };

  /* ---------- scroll animations ---------- */
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    // hero parallax
    gsap.to(".hero__img", { yPercent: -10, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".hero__content", { yPercent: -18, opacity: 0.2, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom 30%", scrub: true } });

    // counters
    $$("[data-count]").forEach(el => {
      const end = +el.dataset.count, o = { v: 0 };
      const fmt = v => {
        const n = Math.round(v);
        const s = el.hasAttribute("data-plain") ? String(n) : n.toLocaleString("en-US");
        return s + (el.hasAttribute("data-plus") ? "+" : "") + (el.dataset.suffix || "");
      };
      ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () =>
        gsap.to(o, { v: end, duration: 1.8, ease: "power2.out", onUpdate: () => (el.textContent = fmt(o.v)), onComplete: () => (el.textContent = fmt(end)) }) });
    });

    // fades
    gsap.utils.toArray(".fade, .eyebrow:not(.hero .eyebrow)").forEach(el =>
      gsap.from(el, { y: 28, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } }));

    // image parallax
    gsap.utils.toArray(".parallax").forEach(img => {
      const s = +img.dataset.speed || 10;
      gsap.fromTo(img, { yPercent: -s / 2 }, { yPercent: s / 2, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });
    gsap.utils.toArray(".frame, .g").forEach(el =>
      gsap.from(el, { clipPath: "inset(12% 12% 12% 12% round 20px)", duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } }));
    gsap.from(".chips li", { y: 20, opacity: 0, stagger: 0.07, duration: 0.7, scrollTrigger: { trigger: ".chips", start: "top 90%", once: true } });

    // services: pinned horizontal scroll
    const track = $(".services__track"), pin = $(".services__pin");
    const dist = () => track.scrollWidth - innerWidth + 0;
    const rtl = () => document.documentElement.dir === "rtl";
    gsap.to(track, {
      x: () => -dist(), ease: "none",
      scrollTrigger: { trigger: pin, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 }
    });
    gsap.from(".card", { y: 60, opacity: 0, stagger: 0.1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".services", start: "top 60%", once: true } });

    // magnetic buttons (pointer devices only)
    if (matchMedia("(hover:hover)").matches) {
      $$(".btn").forEach(b => {
        const x = gsap.quickTo(b, "x", { duration: 0.4, ease: "power3" }), y = gsap.quickTo(b, "y", { duration: 0.4, ease: "power3" });
        b.addEventListener("pointermove", e => { const r = b.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * 0.25); y((e.clientY - r.top - r.height / 2) * 0.35); });
        b.addEventListener("pointerleave", () => { x(0); y(0); });
      });
    }
  });

  /* ---------- boot ---------- */
  try { const saved = localStorage.getItem("lang"); if (saved === "ar") { setLang("ar"); } else { buildReveals(); } } catch (e) { buildReveals(); }
  if (reduce) { $(".loader").remove(); } else { addEventListener("load", intro); if (document.readyState === "complete") intro(); }
})();
