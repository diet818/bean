import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const duoRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const lineupRef = useRef<HTMLDivElement>(null);
  const careRef = useRef<HTMLDivElement>(null);
  const lifestyleRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Hero load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline({ delay: 0.2 });
      
      // Cloud ellipse
      loadTl.fromTo('.hero-cloud', 
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
        0
      );
      
      // Bean character
      loadTl.fromTo('.hero-character',
        { x: '-12vw', y: '10vh', rotation: -8, opacity: 0 },
        { x: 0, y: 0, rotation: 0, opacity: 1, duration: 1.1, ease: 'power2.out' },
        0.1
      );
      
      // Headline lines
      loadTl.fromTo('.hero-title-line',
        { x: '10vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out', stagger: 0.08 },
        0.2
      );
      
      // CTA and micro copy
      loadTl.fromTo('.hero-cta, .hero-micro',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.1 },
        0.5
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Section 1: Hero - EXIT only (entrance handled by load)
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all hero elements to visible when scrolling back
            gsap.set('.hero-character', { x: 0, rotation: 0, opacity: 1 });
            gsap.set('.hero-title-line', { x: 0, opacity: 1 });
            gsap.set('.hero-cta, .hero-micro', { y: 0, opacity: 1 });
            gsap.set('.hero-cloud', { scale: 1, opacity: 1 });
          }
        }
      });

      // EXIT phase (70%-100%)
      heroTl.fromTo('.hero-character',
        { x: 0, rotation: 0, opacity: 1 },
        { x: '-28vw', rotation: -12, opacity: 0, ease: 'power2.in' },
        0.7
      );
      heroTl.fromTo('.hero-title-line',
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in', stagger: 0.02 },
        0.7
      );
      heroTl.fromTo('.hero-cta, .hero-micro',
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.75
      );
      heroTl.fromTo('.hero-cloud',
        { scale: 1, opacity: 1 },
        { scale: 1.08, opacity: 0.6, ease: 'power2.in' },
        0.7
      );

      // Section 2: The Duo
      const duoTl = gsap.timeline({
        scrollTrigger: {
          trigger: duoRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Left Can
      duoTl.fromTo('.duo-can-left',
        { x: '-60vw', y: '40vh', rotation: -25, scale: 0.85, opacity: 0 },
        { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );
      duoTl.fromTo('.duo-can-left',
        { x: 0, y: 0, rotation: 0, opacity: 1 },
        { x: '-35vw', y: '-18vh', rotation: -18, opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Right Can
      duoTl.fromTo('.duo-can-right',
        { x: '60vw', y: '40vh', rotation: 25, scale: 0.85, opacity: 0 },
        { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, ease: 'none' },
        0.05
      );
      duoTl.fromTo('.duo-can-right',
        { x: 0, y: 0, rotation: 0, opacity: 1 },
        { x: '35vw', y: '-18vh', rotation: 18, opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Headline
      duoTl.fromTo('.duo-headline',
        { y: '-35vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );
      duoTl.fromTo('.duo-headline',
        { y: 0, opacity: 1 },
        { y: '-20vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Caption
      duoTl.fromTo('.duo-caption',
        { y: '12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );
      duoTl.fromTo('.duo-caption',
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Section 3: Red Can Spotlight
      const spotlightTl = gsap.timeline({
        scrollTrigger: {
          trigger: spotlightRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Text block
      spotlightTl.fromTo('.spotlight-text',
        { x: '-55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      spotlightTl.fromTo('.spotlight-text',
        { x: 0, opacity: 1 },
        { x: '-20vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Red can
      spotlightTl.fromTo('.spotlight-can',
        { x: '55vw', y: '10vh', rotation: 12, scale: 0.9, opacity: 0 },
        { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );
      spotlightTl.fromTo('.spotlight-can',
        { x: 0, y: 0, rotation: 0, opacity: 1 },
        { x: '20vw', y: '-10vh', rotation: 10, opacity: 0, ease: 'power2.in' },
        0.7
      );

      // CTA
      spotlightTl.fromTo('.spotlight-cta',
        { y: '6vh', scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'none' },
        0.15
      );
      spotlightTl.fromTo('.spotlight-cta',
        { y: 0, opacity: 1 },
        { y: '4vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Section 4: Three-Can Lineup
      const lineupTl = gsap.timeline({
        scrollTrigger: {
          trigger: lineupRef.current,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Title
      lineupTl.fromTo('.lineup-title',
        { y: '-30vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );
      lineupTl.fromTo('.lineup-title',
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Left can
      lineupTl.fromTo('.lineup-can-left',
        { x: '-60vw', rotation: -18, opacity: 0 },
        { x: 0, rotation: 0, opacity: 1, ease: 'none' },
        0
      );
      lineupTl.fromTo('.lineup-can-left',
        { x: 0, opacity: 1 },
        { x: '-25vw', y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Center can
      lineupTl.fromTo('.lineup-can-center',
        { y: '60vh', scale: 0.9, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'none' },
        0.05
      );
      lineupTl.fromTo('.lineup-can-center',
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Right can
      lineupTl.fromTo('.lineup-can-right',
        { x: '60vw', rotation: 18, opacity: 0 },
        { x: 0, rotation: 0, opacity: 1, ease: 'none' },
        0.1
      );
      lineupTl.fromTo('.lineup-can-right',
        { x: 0, opacity: 1 },
        { x: '25vw', y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Caption
      lineupTl.fromTo('.lineup-caption',
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );
      lineupTl.fromTo('.lineup-caption',
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Section 5: Made With Care
      const careTl = gsap.timeline({
        scrollTrigger: {
          trigger: careRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Title
      careTl.fromTo('.care-title',
        { y: '-30vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );
      careTl.fromTo('.care-title',
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Center can
      careTl.fromTo('.care-can',
        { y: '70vh', scale: 0.85, rotation: -6, opacity: 0 },
        { y: 0, scale: 1, rotation: 0, opacity: 1, ease: 'none' },
        0
      );
      careTl.fromTo('.care-can',
        { y: 0, opacity: 1 },
        { y: '-22vh', scale: 0.96, opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Paragraph
      careTl.fromTo('.care-paragraph',
        { y: '12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );
      careTl.fromTo('.care-paragraph',
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Section 6: Lifestyle
      const lifestyleTl = gsap.timeline({
        scrollTrigger: {
          trigger: lifestyleRef.current,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Background image
      lifestyleTl.fromTo('.lifestyle-bg',
        { scale: 1.12, y: '6vh', opacity: 0 },
        { scale: 1, y: 0, opacity: 1, ease: 'none' },
        0
      );
      lifestyleTl.fromTo('.lifestyle-bg',
        { scale: 1, opacity: 1 },
        { scale: 1.06, y: '-4vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Title
      lifestyleTl.fromTo('.lifestyle-title',
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );
      lifestyleTl.fromTo('.lifestyle-title',
        { y: 0, opacity: 1 },
        { y: '14vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Badge
      lifestyleTl.fromTo('.lifestyle-badge',
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );
      lifestyleTl.fromTo('.lifestyle-badge',
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Section 7: Contact (flowing - no pin)
      gsap.fromTo('.contact-headline',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-headline',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.contact-card',
        { x: 80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-card',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.stockist-col',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: {
            trigger: '.stockists-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.newsletter-section',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: {
            trigger: '.newsletter-section',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Global snap for pinned sections
      ScrollTrigger.refresh();
      const pinned = ScrollTrigger.getAll().filter(st => st.vars.pin).sort((a, b) => a.start - b.start);
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (maxScroll && pinned.length > 0) {
        const pinnedRanges = pinned.map(st => ({
          start: st.start / maxScroll,
          end: (st.end ?? st.start) / maxScroll,
          center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
        }));

        ScrollTrigger.create({
          snap: {
            snapTo: (value: number) => {
              const inPinned = pinnedRanges.some(r => value >= r.start - 0.08 && value <= r.end + 0.08);
              if (!inPinned) return value;
              
              const target = pinnedRanges.reduce((closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
                pinnedRanges[0]?.center ?? 0
              );
              return target;
            },
            duration: { min: 0.15, max: 0.35 },
            delay: 0,
            ease: 'power2.out'
          }
        });
      }
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-5 flex justify-between items-center">
        <div className="font-display text-xl text-charcoal">BeanCraft</div>
        <div className="hidden md:flex gap-8">
          <a href="#products" className="text-sm font-medium text-charcoal hover:opacity-70 transition-opacity">Products</a>
          <a href="#story" className="text-sm font-medium text-charcoal hover:opacity-70 transition-opacity">Story</a>
          <a href="#stockists" className="text-sm font-medium text-charcoal hover:opacity-70 transition-opacity">Stockists</a>
          <a href="#contact" className="text-sm font-medium text-charcoal hover:opacity-70 transition-opacity">Contact</a>
        </div>
      </nav>

      {/* Section 1: Hero */}
      <section ref={heroRef} className="section-pinned bg-sky z-10">
        {/* Cloud ellipse */}
        <div className="hero-cloud absolute left-[18vw] top-[10vh] w-[64vw] h-[80vh] rounded-full bg-white/35" />
        
        {/* Bean character */}
        <img 
          src="/bean-mascot.png" 
          alt="Bean mascot" 
          className="hero-character absolute left-[18vw] top-[18vh] w-[34vw] h-auto max-h-[64vh] object-contain z-[3]"
        />
        
        {/* Hero title */}
        <div className="absolute left-[56vw] top-[26vh] w-[40vw] z-[4]">
          <h1 className="font-display text-charcoal" style={{ fontSize: 'clamp(64px, 10vw, 132px)' }}>
            <span className="hero-title-line block">BEANS</span>
            <span className="hero-title-line block">DONE</span>
            <span className="hero-title-line block">RIGHT</span>
          </h1>
        </div>
        
        {/* Micro copy */}
        <p className="hero-micro absolute left-[6vw] bottom-[9vh] w-[26vw] text-sm text-medium z-[5]">
          Premium canned beans and ready-to-eat meals.
        </p>
        
        {/* CTA */}
        <button className="hero-cta btn-pill-primary absolute right-[6vw] bottom-[8vh] z-[5]">
          Explore the lineup
        </button>
      </section>

      {/* Section 2: The Duo */}
      <section ref={duoRef} id="products" className="section-pinned bg-sky z-20">
        {/* Headline */}
        <h2 className="duo-headline font-display text-charcoal absolute top-[10vh] left-1/2 -translate-x-1/2 w-[90vw] text-center z-[2]" style={{ fontSize: 'clamp(48px, 8vw, 100px)' }}>
          YOU'VE GOT TASTE
        </h2>
        
        {/* Left can */}
        <img 
          src="/can-black.png" 
          alt="Black label can" 
          className="duo-can-left absolute left-[26vw] top-[34vh] w-[26vw] h-auto max-h-[62vh] object-contain z-[3] can-shadow"
        />
        
        {/* Right can */}
        <img 
          src="/can-white.png" 
          alt="White label can" 
          className="duo-can-right absolute left-[50vw] top-[34vh] w-[26vw] h-auto max-h-[62vh] object-contain z-[4] can-shadow"
        />
        
        {/* Caption */}
        <p className="duo-caption absolute bottom-[7vh] left-1/2 -translate-x-1/2 w-[70vw] text-center text-base text-medium z-[5]">
          From pantry staples to bold new flavors—our beans are cooked to keep their bite.
        </p>
      </section>

      {/* Section 3: Red Can Spotlight */}
      <section ref={spotlightRef} className="section-pinned bg-coral z-30">
        {/* Text block */}
        <div className="spotlight-text absolute left-[7vw] top-[18vh] w-[40vw] z-[3]">
          <h2 className="font-display text-white mb-8" style={{ fontSize: 'clamp(42px, 7vw, 90px)' }}>
            <span className="block">SIMPLY</span>
            <span className="block">THE BEST</span>
            <span className="block">BEANS</span>
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-[32vw]">
            Slow-cooked in seasoned broth, sealed at peak flavor. Open, heat, eat—no compromises.
          </p>
          <button className="spotlight-cta btn-pill bg-white text-[var(--coral-red)] border-white hover:bg-transparent hover:text-white transition-all">
            Shop the red can
          </button>
        </div>
        
        {/* Red can */}
        <img 
          src="/can-red.png" 
          alt="Red label can" 
          className="spotlight-can absolute left-[54vw] top-[16vh] w-[38vw] h-auto max-h-[72vh] object-contain z-[4] can-shadow"
        />
      </section>

      {/* Section 4: Three-Can Lineup */}
      <section ref={lineupRef} className="section-pinned bg-sky z-40">
        {/* Title */}
        <h2 className="lineup-title font-display text-charcoal absolute top-[10vh] left-1/2 -translate-x-1/2 w-[90vw] text-center z-[2]" style={{ fontSize: 'clamp(48px, 8vw, 100px)' }}>
          WHICH ONE ARE YOU?
        </h2>
        
        {/* Left can */}
        <img 
          src="/can-black.png" 
          alt="Black label can" 
          className="lineup-can-left absolute left-[12vw] top-[36vh] w-[22vw] h-auto max-h-[54vh] object-contain z-[3] can-shadow"
        />
        
        {/* Center can */}
        <img 
          src="/can-red.png" 
          alt="Red label can" 
          className="lineup-can-center absolute left-[39vw] top-[36vh] w-[22vw] h-auto max-h-[54vh] object-contain z-[4] can-shadow"
        />
        
        {/* Right can */}
        <img 
          src="/can-white.png" 
          alt="White label can" 
          className="lineup-can-right absolute left-[66vw] top-[36vh] w-[22vw] h-auto max-h-[54vh] object-contain z-[3] can-shadow"
        />
        
        {/* Caption */}
        <p className="lineup-caption absolute bottom-[7vh] left-1/2 -translate-x-1/2 w-[72vw] text-center text-base text-medium z-[5]">
          Classic, spicy, or smoky—there's a can for every craving.
        </p>
      </section>

      {/* Section 5: Made With Care */}
      <section ref={careRef} id="story" className="section-pinned bg-sky z-50">
        {/* Title */}
        <h2 className="care-title font-display text-charcoal absolute top-[10vh] left-1/2 -translate-x-1/2 w-[90vw] text-center z-[2]" style={{ fontSize: 'clamp(48px, 8vw, 100px)' }}>
          MADE WITH CARE
        </h2>
        
        {/* Center can */}
        <img 
          src="/can-black.png" 
          alt="Black label can" 
          className="care-can absolute left-1/2 top-[30vh] -translate-x-1/2 w-[26vw] h-auto max-h-[64vh] object-contain z-[3] can-shadow"
        />
        
        {/* Paragraph */}
        <p className="care-paragraph absolute bottom-[10vh] left-1/2 -translate-x-1/2 w-[64vw] text-center text-lg text-medium z-[4]">
          We source beans from farms we know, cook them in small batches, and season them like you would at home—just a lot more of them.
        </p>
      </section>

      {/* Section 6: Lifestyle */}
      <section ref={lifestyleRef} className="section-pinned z-[60]">
        {/* Background image */}
        <img 
          src="/lifestyle-bowl.jpg" 
          alt="Beans in a bowl" 
          className="lifestyle-bg absolute inset-0 w-full h-full object-cover z-[1]"
        />
        
        {/* Badge */}
        <div className="lifestyle-badge absolute right-[6vw] top-[8vh] z-[4]">
          <span className="inline-block px-5 py-2 rounded-full border-2 border-[var(--charcoal)] bg-white/90 text-sm font-medium text-charcoal">
            Plant-forward
          </span>
        </div>
        
        {/* Title */}
        <div className="lifestyle-title absolute left-[6vw] bottom-[6vh] w-[88vw] z-[3]">
          <h2 className="font-display text-charcoal" style={{ fontSize: 'clamp(56px, 10vw, 140px)' }}>
            <span className="block">EAT MORE</span>
            <span className="block">BEANS</span>
          </h2>
        </div>
      </section>

      {/* Section 7: Contact */}
      <section ref={contactRef} id="contact" className="relative bg-light z-[70] min-h-screen py-[10vh]">
        <div className="px-[6vw]">
          {/* Header area */}
          <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
            {/* Left: Headline */}
            <div className="contact-headline lg:w-[46vw]">
              <h2 id="stockists" className="font-display text-charcoal mb-6" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
                Find BeanCraft near you.
              </h2>
              <p className="text-lg text-medium">
                Available at independent grocers, delis, and online. Want to stock us? Let's talk.
              </p>
            </div>
            
            {/* Right: Contact card */}
            <div className="contact-card lg:w-[34vw] bg-white border-2 border-[var(--charcoal)] rounded-[28px] p-7 animate-float">
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-medium mb-1">General</p>
                  <p className="text-charcoal font-medium">hello@beancraft.kitchen</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-medium mb-1">Sales</p>
                  <p className="text-charcoal font-medium">stockists@beancraft.kitchen</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-medium mb-1">Phone</p>
                  <p className="text-charcoal font-medium">+1 (555) 014-2233</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-medium mb-1">Hours</p>
                  <p className="text-charcoal font-medium">Mon–Fri, 9am–5pm EST</p>
                </div>
                <button className="btn-pill-primary w-full mt-4">
                  Open map
                </button>
              </div>
            </div>
          </div>
          
          {/* Stockists grid */}
          <div className="stockists-grid grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="stockist-col">
              <p className="text-xs uppercase tracking-widest text-medium mb-3">North</p>
              <p className="text-charcoal font-medium text-lg">The Pantry Co-op</p>
            </div>
            <div className="stockist-col">
              <p className="text-xs uppercase tracking-widest text-medium mb-3">South</p>
              <p className="text-charcoal font-medium text-lg">Sunny Market</p>
            </div>
            <div className="stockist-col">
              <p className="text-xs uppercase tracking-widest text-medium mb-3">Online</p>
              <p className="text-charcoal font-medium text-lg">BeanCraft Shop</p>
            </div>
          </div>
          
          {/* Newsletter */}
          <div className="newsletter-section border-t-2 border-[var(--charcoal)]/10 pt-10">
            <p className="text-charcoal font-medium text-xl mb-4">Get recipes & restock alerts.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-1 max-w-md px-6 py-4 rounded-full border-2 border-[var(--charcoal)] bg-white text-charcoal placeholder:text-medium focus:outline-none focus:ring-2 focus:ring-[var(--coral-red)]"
              />
              <button className="btn-pill-primary">
                Subscribe
              </button>
            </div>
          </div>
          
          {/* Footer */}
          <footer className="mt-20 pt-8 border-t border-[var(--charcoal)]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-medium">© 2026 BeanCraft. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-medium hover:text-charcoal transition-colors">Privacy</a>
              <a href="#" className="text-sm text-medium hover:text-charcoal transition-colors">Terms</a>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}

export default App;
