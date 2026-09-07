// Sponsor landing — Tech vertical
// Expects window.VERTICAL = { key, label, preTitle, tierLabel, tierNames, tiers }

const { useState, useEffect, useMemo, useRef, useCallback } = React;

// ---------- Scroll-reveal hook ----------
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ---------- Animated counter hook ----------
function useCounter(target, active, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = Date.now();
    const tick = () => {
      const t = Math.min(1, (Date.now() - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
}

// ---------- Icons ----------
const IconCheck = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);
const IconX = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
const IconArrow = ({ size = 14 }) => (
  <svg className="arrow" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);
const IconClock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);
const IconGlobe = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

// ---------- Nav ----------
function Nav({ vertical }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <>
      <div className="urgency-strip">
        Plazas de participación muy limitadas · <strong>Edición inaugural · 20 de octubre</strong> · Auditorio El Beatriz, Madrid
      </div>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`} aria-label="Navegación principal">
        <div className="nav-inner">
          <a href="#" className="brand">
            <span className="brand-dot"></span>
            <span>IA Agéntica</span>
            <span className="brand-vertical">Sponsors · {vertical.label}</span>
          </a>
          <div className="nav-links">
            <a href="#foro">El Foro</a>
            <a href="#verticales">Programa</a>
            <a href="#agenda">Agenda</a>
            <a href="#paquetes">Paquetes</a>
            <a href="#reservar" className="btn btn-ghost btn-sm">Hablar con el equipo <IconArrow /></a>
          </div>
        </div>
      </nav>
    </>
  );
}

// ---------- Hero ----------
function Hero({ vertical }) {
  const diff = useCountdown('2026-10-20T09:00:00+02:00');
  return (
    <section className="hero" id="top">
      <div className="hero-grid"></div>
      <div className="hero-glow g1"></div>
      <div className="hero-glow g2"></div>
      <div className="container">
        <div className="hero-inner">
          <div className="fade-up">
            <span className="hero-mono">{vertical.preTitle}</span>
            <h1 className="hero-title">
              {vertical.heroTitle}
            </h1>
            <p className="lead" style={{ marginTop: 28, maxWidth: 560 }}>
              {vertical.heroSub}
            </p>
            <div className="hero-meta">
              <div>
                <span className="label">Fecha</span>
                <span className="value">20 Octubre 2026</span>
              </div>
              <div>
                <span className="label">Lugar</span>
                <span className="value">Auditorio El Beatriz · Madrid</span>
              </div>
              <div>
                <span className="label">Aforo</span>
                <span className="value">150 C-level</span>
              </div>
              <div>
                <span className="label">Formato</span>
                <span className="value">Presencial · Chatham House</span>
              </div>
              <div>
                <span className="label">Audiencia</span>
                <span className="value">Aseguradoras · Brokers · Ecosistema</span>
              </div>
            </div>
            <div className="hero-cta">
              <a href="#reservar" className="btn btn-primary">
                Hablar con el equipo <IconArrow />
              </a>
              <a href="#paquetes" className="btn btn-ghost">Ver paquetes</a>
            </div>
          </div>

          <div className="ticker fade-up fade-up-2">
            <div className="ticker-header">
              <span className="ticker-status"><span className="live-dot"></span> Disponibilidad en vivo</span>
              <span className="mono">{vertical.tierLabel.toUpperCase()}</span>
            </div>
            {vertical.tiers.map((t, i) => (
              <div className={`ticker-row ${t.remaining <= 2 ? 'low' : ''}`} key={i}>
                <span className="name">{t.name}</span>
                <span className="remaining">
                  <strong>{t.remaining}</strong> / {t.total} plaza{t.total !== 1 ? 's' : ''}
                </span>
              </div>
            ))}
            <div className="countdown">
              <Cell num={diff.d} unit="Días" />
              <Cell num={diff.h} unit="Horas" />
              <Cell num={diff.m} unit="Min" />
              <Cell num={diff.s} unit="Seg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function Cell({ num, unit }) {
  return (
    <div className="countdown-cell">
      <div className="num">{String(num).padStart(2, '0')}</div>
      <span className="unit">{unit}</span>
    </div>
  );
}
function useCountdown(isoTarget) {
  const target = useMemo(() => new Date(isoTarget).getTime(), [isoTarget]);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const delta = Math.max(0, target - now);
  return {
    d: Math.floor(delta / 86400000),
    h: Math.floor((delta % 86400000) / 3600000),
    m: Math.floor((delta % 3600000) / 60000),
    s: Math.floor((delta % 60000) / 1000),
  };
}

// ---------- Stats ----------
function Stats() {
  const [ref, inView] = useInView(0.4);
  const c150 = useCounter(150, inView, 1200);
  const c100 = useCounter(100, inView, 1400);
  const c3000 = useCounter(3000, inView, 1600);
  return (
    <div className="stats-bar" ref={ref}>
      <div className="stats-bar-item">
        <div className="stats-bar-num">{inView ? c150 : 0}</div>
        <div className="stats-bar-label">Directivos C-Level</div>
      </div>
      <div className="stats-bar-item">
        <div className="stats-bar-num">{inView ? c100 : 0}%</div>
        <div className="stats-bar-label">Decisores con presupuesto</div>
      </div>
      <div className="stats-bar-item">
        <div className="stats-bar-num">{inView ? c3000.toLocaleString('es-ES') : 0}+</div>
        <div className="stats-bar-label">Alumni IIA</div>
      </div>
      <div className="stats-bar-item">
        <div className="stats-bar-num">1ª</div>
        <div className="stats-bar-label">Edición en España</div>
      </div>
    </div>
  );
}

// ---------- Sobre el Foro ----------
function AboutForo() {
  const [ref, inView] = useInView();
  return (
    <section className="section" id="foro" ref={ref}>
      <div className={`container reveal ${inView ? 'in-view' : ''}`}>
        <div className="section-header">
          <span className="eyebrow">El Foro</span>
          <h2>El primer foro en España donde la <em style={{ fontStyle: 'italic' }}>IA Agéntica</em> deja de venderse y empieza a adoptarse.</h2>
          <p className="lead">Un encuentro institucional diseñado para que los proveedores tecnológicos serios entren en conversación directa con los compradores reales del ecosistema asegurador y asegurador. Sin stands, sin pitches, sin ferias. Y precisamente por eso, la audiencia está aquí.</p>
        </div>

        <div className="reasons-grid">
          {[
            ['01', 'Liderazgo de criterio, no de caseta', 'La única plataforma en España donde el equipo técnico de vuestra compañía aporta criterio en mesa editorial — no en una charla comercial. La audiencia se lo toma en serio precisamente por la regla de la casa: nada de pitches.'],
            ['02', 'Conversación con los compradores reales', '150 profesionales del ecosistema asegurador con presupuesto IA en 2026. Mesa, roundtable y networking, no stand. Cinco a diez conversaciones reales con quienes deciden valen más que cien leads sin cualificar.'],
            ['03', 'Aportación editorial al programa', 'Un perfil técnico de vuestra compañía interviene en mesa o panel del foro, validado por el comité de programa. Reconocimiento como referente, no como sponsor. (Nivel Impulsora.)'],
            ['04', 'Inteligencia de mercado fuera de RFP', 'Lo que se escucha en una roundtable Chatham House con CIOs y Directores de Suscripción no aparece en ningún RFP. Feedback real sobre fricciones de adopción, exigencias del regulador y prioridades del comité de inversión.'],
            ['05', 'Co-posicionamiento en contexto editorial', 'Vuestra marca aparece junto a las tecnologías que el sector toma en serio. La diferenciación no se construye en una caseta: se construye en el contexto editorial donde se debate qué adopta el sector en 2026–2027.'],
            ['06', 'Marco regulatorio compartido', 'AI Act (sistemas de alto riesgo), DORA, IDD y Solvency II también os afectan: vuestro producto vive dentro de esa regulación. El programa integra el marco legal desde el diseño, lo que se traduce en ventaja para vendor briefings posteriores.'],
          ].map(([num, title, desc], i) => (
            <div className={`reason reveal reveal-delay-${i + 1} ${inView ? 'in-view' : ''}`} key={num}>
              <div className="reason-num">{num}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Quiénes Somos ----------
function About() {
  const [ref, inView] = useInView();
  return (
    <section className="section" id="quienes-somos" ref={ref}>
      <div className={`container reveal ${inView ? 'in-view' : ''}`}>
        <div className="section-header">
          <span className="eyebrow">Quiénes Somos</span>
          <h2>Organizado por SegurosIA en colaboración con el <em style={{ fontStyle: 'italic' }}>IIA</em>.</h2>
        </div>
        <div className="about-grid">
          <div className="about-card">
            <div className="role">Organizador</div>
            <h3>SegurosIA</h3>
            <p>Consultora tecnológica especializada en IA aplicada al sector asegurador y financiero. Nacida del ecosistema insurtech español, actúa como puente entre innovación tecnológica y necesidades reales de la industria.</p>
            <p>Promueve el único proyecto con luz verde en 2025/26 por parte de AEPD, DGSFP y resto de organismos reguladores del Sandbox Financiero Español.</p>
            <div className="about-badges">
              <span className="about-badge">AEPD</span>
              <span className="about-badge">DGSFP</span>
              <span className="about-badge">Sandbox Financiero</span>
            </div>
          </div>
          <div className="about-card">
            <div className="role">Partner Estratégico</div>
            <h3>Instituto de Inteligencia Artificial</h3>
            <p>Institución académica de referencia en IA en España, con una red de más de 3.000 alumni formados en programas especializados.</p>
            <p>El IIA co-diseña el programa, propone ponentes de primer nivel y moviliza su red de directivos formados en IA, garantizando una audiencia cualificada y un enfoque técnico riguroso.</p>
            <div className="about-badges">
              <span className="about-badge">3.000+ Alumni</span>
              <span className="about-badge">Rigor académico</span>
              <span className="about-badge">Red C-Level</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- El Momento ----------
function Moment() {
  const [ref, inView] = useInView();
  return (
    <section className="section" ref={ref}>
      <div className={`container-narrow reveal ${inView ? 'in-view' : ''}`}>
        <div className="moment-block">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>2026–2027 · Punto de inflexión</span>
          <h2 style={{ marginTop: 24 }}>El momento de la <em style={{ fontStyle: 'italic' }}>adopción</em>.</h2>
          <p>En 2026–2027 se decide qué stack de IA Agéntica entra en producción en el sector asegurador español. Las tecnologías que entren en conversación directa con los decisores ahora fijarán el estándar. Las que se queden en ferias, competirán con las elegidas a posteriori.</p>
          <div className="highlight">Ser referente no es estar presente — es estar en mesa</div>
        </div>
      </div>
    </section>
  );
}

// ---------- Renuncias vs Recibes ----------
function ContrastBlock() {
  const [ref, inView] = useInView();
  return (
    <section className="section" ref={ref}>
      <div className={`container reveal ${inView ? 'in-view' : ''}`}>
        <div className="section-header">
          <span className="eyebrow">La promesa de marca</span>
          <h2>El sponsorship más exigente. Y por eso, <em style={{ fontStyle: 'italic' }}>el más eficaz</em>.</h2>
          <p className="lead">El acceso lo paga la coherencia. Renunciar al pitch es lo que activa la conversación.</p>
        </div>
        <div className="threat-block">
          <div className="threat-col">
            <h4 style={{ fontFamily: 'var(--ff-body)', fontWeight: 600, fontSize: 15, color: 'var(--ink-2)', marginBottom: 24, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Lo que renuncias a hacer</h4>
            <ul className="threat-list">
              <li>Charlas comerciales o demos de producto en sala</li>
              <li>Stand físico o material promocional desplegado</li>
              <li>Reparto masivo de leads sin cualificar</li>
              <li>Vender en pasillos como reemplazo de la mesa</li>
              <li>Métricas vanity (escaneos QR, leads en frío)</li>
              <li>Repetir lo que ya funcionó hace cinco ferias</li>
            </ul>
          </div>
          <div className="threat-col opportunity">
            <h4 style={{ fontFamily: 'var(--ff-body)', fontWeight: 600, fontSize: 15, color: 'var(--accent)', marginBottom: 24, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Lo que recibes a cambio</h4>
            <ul className="threat-list pro">
              <li>Mesa o panel editorial validado por el comité técnico</li>
              <li>150 C-level con presupuesto IA 2026 confirmado</li>
              <li>Roundtable privada con 8–12 buyers + peers</li>
              <li>Introducciones 1:1 facilitadas según ICP (post-evento, opt-in)</li>
              <li>Inteligencia de mercado fuera de RFP</li>
              <li>Posicionamiento junto a las tecnologías que el sector toma en serio</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Video ----------
function Video() {
  const [ref, inView] = useInView();
  return (
    <section className="section" id="video" ref={ref}>
      <div className={`container-narrow reveal ${inView ? 'in-view' : ''}`}>
        <div className="section-header center">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>El Auditorio · Madrid</span>
          <h2>El mejor lugar para <em style={{ fontStyle: 'italic' }}>celebrar este foro</em>.</h2>
          <p className="lead" style={{ margin: '0 auto' }}>Un recorrido por El Beatriz, el auditorio que hemos elegido para acoger esta primera edición. El espacio también forma parte del mensaje.</p>
        </div>
        <div className="video-frame">
          <iframe
            src="https://www.youtube-nocookie.com/embed/cWJGKpGkvh4?rel=0&modestbranding=1"
            title="I Foro IA Agéntica en Seguros"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

// ---------- Programa (bloques) ----------
function Verticals() {
  const [ref, inView] = useInView();
  const blocks = [
    {
      num: '01',
      label: 'BLOQUE I · SABER',
      sub: 'Ecosistema formativo',
      color: '#06D6A0',
      desc: 'El conocimiento como punto de partida. Tres voces del mundo académico e institucional presentan el estado real de la formación en IA Agéntica para el sector asegurador.',
      sessions: [
        'Observatorio de IA Agéntica en Seguros',
        'Democratizando la Formación y Capacitación en IA',
        'Creando itinerarios avanzados para Dptos. de IA a la vanguardia',
      ],
    },
    {
      num: '02',
      label: 'BLOQUE II · HACER',
      sub: 'Tecnológicas y consultoras',
      color: '#6366F1',
      desc: 'La implementación como diferencial. Tres casos desde dentro: lo que no aparece en el RFP, lo que ocurre cuando una startup y una corporación trabajan juntas, y lo que ha superado el filtro regulatorio.',
      sessions: [
        'Consultoría en IA Agéntica — Lo que no sale en ningún RFP',
        'Caso de éxito: colaboración Startup de IA con Gran Corporación',
        'Caso de éxito en el Sandbox Financiero Español',
      ],
    },
    {
      num: '03',
      label: 'BLOQUE III · LIDERAR',
      sub: 'Casos en producción',
      color: '#F59E0B',
      desc: 'El liderazgo como resultado. Dos perspectivas sobre lo que cambia de verdad cuando los agentes autónomos ya no son un proyecto piloto sino parte del trabajo diario.',
      sessions: [
        'Cambio Cultural en la Nueva Era del trabajo híbrido humano-máquina',
        'Convivencia con las nuevas especies de esta Nueva Era de IA Agéntica',
      ],
    },
  ];
  return (
    <section className="section" id="verticales" ref={ref}>
      <div className={`container reveal ${inView ? 'in-view' : ''}`}>
        <div className="section-header">
          <span className="eyebrow">Programa</span>
          <h2>Tres bloques. Ocho sesiones.</h2>
          <p className="lead">El programa articula el ecosistema completo de la IA Agéntica en tres ejes: quién forma, quién implementa y quién lidera en producción. Cada bloque cierra con Fireside Talk de micrófono abierto bajo Chatham House.</p>
        </div>
        <div className="verticals-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {blocks.map((block, i) => (
            <div className="vertical-card" key={i} style={{ borderTop: `3px solid ${block.color}`, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
                  <span className="vertical-num">{block.num}</span>
                  <span style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: block.color }}>{block.label}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', fontStyle: 'italic', marginBottom: 10 }}>{block.sub}</div>
                <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6, margin: 0 }}>{block.desc}</p>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
                {block.sessions.map((s, j) => (
                  <li key={j} style={{ fontSize: 13, color: 'var(--ink-1)', padding: '8px 0', borderBottom: '1px solid var(--line)', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: block.color, flexShrink: 0 }}>›</span>
                    {s}
                  </li>
                ))}
              </ul>
              <div style={{ fontSize: 12, color: block.color, fontStyle: 'italic' }}>🔥 Fireside Talk · Micrófono Abierto · Chatham House</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Agenda ----------
function Agenda() {
  const [ref, inView] = useInView();
  const rows = [
    { type: 'row',   data: ['09:00', 'Acreditaciones', 'Apertura'] },
    { type: 'row',   data: ['09:30', 'Bienvenida institucional', 'Bienvenida · 15 min'] },
    { type: 'block', label: 'BLOQUE I · SABER', sub: 'Ecosistema formativo', color: '#06D6A0' },
    { type: 'row',   data: ['09:45', 'Observatorio de IA Agéntica en Seguros', 'Sesión · 15 min'] },
    { type: 'row',   data: ['10:00', 'Democratizando la Formación y Capacitación en IA', 'Sesión · 15 min'] },
    { type: 'row',   data: ['10:15', 'Creando itinerarios avanzados para Dptos. de IA a la vanguardia', 'Sesión · 15 min'] },
    { type: 'row',   data: ['10:30', '🔥 Fireside Talk Bloque I · Micrófono Abierto · Chatham House', 'Fireside Talk', true] },
    { type: 'row',   data: ['11:00', 'Pausa café networking', 'Pausa · 30 min'] },
    { type: 'block', label: 'BLOQUE II · HACER', sub: 'Tecnológicas y consultoras', color: '#6366F1' },
    { type: 'row',   data: ['11:30', 'Consultoría en IA Agéntica — Lo que no sale en ningún RFP', 'Sesión · 15 min'] },
    { type: 'row',   data: ['11:45', 'Caso de éxito: colaboración Startup de IA con Gran Corporación', 'Sesión · 15 min'] },
    { type: 'row',   data: ['12:00', 'Caso de éxito en el Sandbox Financiero Español', 'Sesión · 15 min'] },
    { type: 'row',   data: ['12:15', '🔥 Fireside Talk Bloque II · Micrófono Abierto · Chatham House', 'Fireside Talk', true] },
    { type: 'block', label: 'BLOQUE III · LIDERAR', sub: 'Casos en producción', color: '#F59E0B' },
    { type: 'row',   data: ['12:45', 'Cambio Cultural en la Nueva Era del trabajo híbrido humano-máquina', 'Sesión · 15 min'] },
    { type: 'row',   data: ['13:00', 'Convivencia con las nuevas especies de esta Nueva Era de IA Agéntica', 'Sesión · 15 min'] },
    { type: 'row',   data: ['13:15', '🔥 Fireside Talk Bloque III · Micrófono Abierto · Chatham House', 'Fireside Talk', true] },
    { type: 'row',   data: ['13:45', 'Conclusiones + presentación del Informe Post-Foro', 'Cierre · 15 min'] },
    { type: 'row',   data: ['14:00', '🍷 Vino español · Networking de cierre', 'Networking', true] },
    { type: 'row',   data: ['15:00', '☕ Café de Despedida', 'Networking · hasta las 15:30'] },
  ];
  return (
    <section className="section" id="agenda" ref={ref}>
      <div className={`container reveal ${inView ? 'in-view' : ''}`}>
        <div className="section-header">
          <span className="eyebrow">Agenda · 20 de octubre · 09:00–15:30</span>
          <h2>Tres bloques. Tres perspectivas. Un ecosistema.</h2>
          <p className="lead">Presentaciones de 15 minutos seguidas de Fireside Talk con micrófono abierto y Chatham House tras cada bloque. Sin pitches, sin slides de ventas — solo conversación real entre quienes deciden.</p>
        </div>
        <div className="agenda-table">
          {rows.map((item, i) => {
            if (item.type === 'block') {
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 16px', margin: '20px 0 6px',
                  borderLeft: `3px solid ${item.color}`,
                  background: `${item.color}18`,
                  borderRadius: '0 8px 8px 0'
                }}>
                  <span style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: item.color }}>{item.label}</span>
                  <span style={{ fontSize: 12, color: 'var(--ink-3)', fontStyle: 'italic' }}>{item.sub}</span>
                </div>
              );
            }
            const [time, title, tag, highlight] = item.data;
            return (
              <div className={`agenda-row ${highlight ? 'highlight' : ''}`} key={i}>
                <div className="agenda-time">{time}</div>
                <div className="agenda-title">{title}</div>
                <div className="agenda-tag">{tag}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------- Audiencia ----------
function Audience() {
  const [ref, inView] = useInView();
  return (
    <section className="section" id="audiencia" ref={ref}>
      <div className={`container reveal ${inView ? 'in-view' : ''}`}>
        <div className="section-header">
          <span className="eyebrow">Perfil de la Audiencia</span>
          <h2>150 decisores. <em style={{ fontStyle: 'italic' }}>100%</em> compradores reales.</h2>
          <p className="lead">Si vendes IA Agéntica al sector asegurador, mediación o agencias de suscripción en España, esta es la sala donde están tus compradores. Cada inscripción está validada por el equipo de programa. Aforo limitado para garantizar networking real.</p>
        </div>
        <div className="audience-grid">
          <div className="audience-card">
            <h3>Compradores en sala</h3>
            <ul className="audience-list" role="list">
              <li>CEOs y Directores Generales</li>
              <li>CIOs, CTOs y Chief AI Officers</li>
              <li>Directores de Innovación y Transformación Digital</li>
              <li>Directores de Suscripción, Siniestros, Operaciones y Comercial</li>
              <li>Responsables de Compliance, Riesgos y Regulación</li>
              <li>Comités de inversión y arquitectura tecnológica</li>
            </ul>
          </div>
          <div className="audience-card">
            <h3>Sectores con presupuesto IA 2026</h3>
            <ul className="audience-list" role="list">
              <li>Bancos con actividad aseguradora (filiales, OBSV, neobancos)</li>
              <li>Compañías aseguradoras de vida y no vida</li>
              <li>Mutuas y reaseguradoras con actividad en España</li>
              <li>Grandes corredurías y redes de distribución</li>
              <li>MGA y agencias de suscripción delegada</li>
              <li>Reguladores e instituciones (BdE, DGSFP, AEPD, CNMC)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Paquetes ----------
function Packages({ vertical }) {
  const tierNames = vertical.tierNames;
  const [ref, inView] = useInView(0.05);
  return (
    <section className="section" id="paquetes" ref={ref}>
      <div className={`container reveal ${inView ? 'in-view' : ''}`}>
        <div className="section-header">
          <span className="eyebrow">Modalidades de Participación · {vertical.tierLabel}</span>
          <h2>Tres formas de contribuir. Plazas limitadas.</h2>
          <p className="lead">Cada modalidad define el nivel de contribución editorial, acceso a roundtables y posicionamiento institucional. Sin stands, sin pitches, sin intervenciones comerciales.</p>
        </div>

        <div className="tiers-intro">
          {vertical.tiers.map((t, i) => (
            <div className={`tier-headcard ${['gold','silver','bronze'][i]}`} key={i}>
              <div className="tier-seats">{t.total} plaza{t.total !== 1 ? 's' : ''} · quedan {t.remaining}</div>
              <div className="tier-name">{tierNames[i]}</div>
              <div className="tier-availability">
                <div className="dots">
                  {Array.from({ length: t.total }).map((_, idx) => (
                    <span
                      key={idx}
                      className={`dot ${idx < t.remaining ? ['gold-full','silver-full','bronze-full'][i] : ''}`}
                    ></span>
                  ))}
                </div>
              </div>
              <div className="tier-price">
                {t.price > 0 ? (
                  <>
                    <span className="amount">{t.price.toLocaleString('es-ES')}</span>
                    <span className="cur">€</span>
                    <span className="vat">+ IVA</span>
                  </>
                ) : (
                  <span className="amount" style={{ fontSize: 22, color: 'var(--ink-2)', fontFamily: 'var(--ff-body)' }}>Por invitación</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="compare-table-wrap">
          <CompareTable tierNames={tierNames} tiers={vertical.tiers} />
        </div>

        {vertical.tiers.map((t, i) => (
          <TierDetail key={i} tier={t} name={tierNames[i]} level={['gold','silver','bronze'][i]} />
        ))}
      </div>
    </section>
  );
}

function CompareTable({ tierNames, tiers }) {
  const yes = <span className="check"><IconCheck size={16} /></span>;
  const no = <span className="cross"><IconX size={14} /></span>;
  return (
    <table className="compare-table">
      <thead>
        <tr>
          <th style={{ textAlign: 'left' }}>Prestación</th>
          <th className="tier-gold">{tierNames[0]}</th>
          <th className="tier-silver">{tierNames[1]}</th>
          <th className="tier-bronze">{tierNames[2]}</th>
        </tr>
      </thead>
      <tbody>
        <tr className="section-row"><td colSpan="4">Contribución al Programa</td></tr>
        <tr><td className="feature">Mesa o panel técnico (validado por el comité)</td><td>{yes}</td><td className="highlight">Opcional</td><td>{no}</td></tr>
        <tr><td className="feature">Propuesta de reto técnico al programa</td><td>{yes}</td><td>{no}</td><td>{no}</td></tr>
        <tr><td className="feature">Mención institucional en apertura y cierre</td><td>{yes}</td><td>{yes}</td><td>{no}</td></tr>
        <tr><td className="feature">Roundtable privada (8–12 buyers + peers)</td><td>{yes}</td><td>{no}</td><td>{no}</td></tr>

        <tr className="section-row"><td colSpan="4">Visibilidad Institucional</td></tr>
        <tr><td className="feature">Logo en materiales del foro</td><td className="highlight">Impulsora</td><td>Colaboradora</td><td>{no}</td></tr>
        <tr><td className="feature">Presencia en acreditaciones</td><td>{yes}</td><td>{yes}</td><td>{no}</td></tr>
        <tr><td className="feature">Cobranding en informe ejecutivo del sector</td><td>{yes}</td><td>{no}</td><td>{no}</td></tr>
        <tr><td className="feature">Menciones en RRSS + Newsletter IIA</td><td className="highlight">Periódica + destacada</td><td>{yes}</td><td>{no}</td></tr>
        <tr><td className="feature">Nota de prensa oficial</td><td>{yes}</td><td>{yes}</td><td>{no}</td></tr>

        <tr className="section-row"><td colSpan="4">Acceso y Networking</td></tr>
        <tr><td className="feature">Pases de equipo incluidos</td><td className="highlight">12</td><td>6</td><td>1–3</td></tr>
        <tr><td className="feature">Introducciones 1:1 facilitadas (opt-in)</td><td className="highlight">5+</td><td>2–3</td><td>{no}</td></tr>
        <tr><td className="feature">Acceso a roundtables editoriales</td><td>{yes}</td><td>{no}</td><td>{no}</td></tr>
        <tr><td className="feature">Mesa reservada en networking y cóctel</td><td>{yes}</td><td>{no}</td><td>{no}</td></tr>

        <tr className="section-row"><td colSpan="4">Activos Post-Evento</td></tr>
        <tr><td className="feature">Informe ejecutivo del sector</td><td className="highlight">Personalizado</td><td>Estándar</td><td>{no}</td></tr>
        <tr><td className="feature">Síntesis de retos técnicos por sector</td><td>{yes}</td><td>{yes}</td><td>{no}</td></tr>
        <tr><td className="feature">Mapa de proveedores y casos de uso</td><td>{yes}</td><td>{yes}</td><td>{no}</td></tr>
        <tr><td className="feature">Acceso a grabaciones de sesiones</td><td>{yes}</td><td>{yes}</td><td>{no}</td></tr>

        <tr className="section-row"><td colSpan="4">Participación</td></tr>
        <tr>
          <td className="feature">Inversión (+ IVA)</td>
          <td className="highlight">{tiers[0].price.toLocaleString('es-ES')} €</td>
          <td className="highlight">{tiers[1].price.toLocaleString('es-ES')} €</td>
          <td className="highlight">Por invitación</td>
        </tr>
      </tbody>
    </table>
  );
}

function TierDetail({ tier, name, level }) {
  const areas = [
    {
      title: 'Contribución al Programa',
      items: level === 'gold'
        ? [['Mesa o panel técnico', <><strong>Un perfil técnico de vuestra compañía</strong> en mesa editorial validada</>], ['Propuesta de reto técnico al comité de programa', true], ['Mención institucional en apertura y cierre del foro', true], ['Roundtable privada con 8–12 buyers + peers', true]]
        : level === 'silver'
        ? [['Mesa o panel técnico', <>Participación <strong>opcional</strong> si aporta contenido editorial real</>], ['Propuesta de reto técnico', false], ['Mención en materiales del programa', true], ['Roundtable privada', false]]
        : [['Mesa o panel técnico', false], ['Propuesta de reto técnico', false], ['Mención institucional', false], ['Asistencia como entidad invitada', true]]
    },
    {
      title: 'Visibilidad Institucional',
      items: level === 'gold'
        ? [['Logo', <><strong>Entidad Impulsora</strong> — posición principal en materiales</>], ['Cobranding en informe ejecutivo del sector', true], ['Menciones en RRSS', <><strong>Periódicas y destacadas</strong></>], ['Newsletter IIA (3.000+ alumni)', true], ['Nota de prensa oficial', true], ['Presencia en acreditaciones y señalización', true]]
        : level === 'silver'
        ? [['Logo', <><strong>Entidad Colaboradora</strong> en materiales del foro</>], ['Cobranding en informe ejecutivo', false], ['Menciones en RRSS', true], ['Newsletter IIA (3.000+ alumni)', true], ['Nota de prensa oficial', true], ['Presencia en acreditaciones', true]]
        : [['Logo en materiales', false], ['Cobranding', false], ['Menciones en RRSS', false], ['Newsletter IIA', false], ['Nota de prensa', false], ['Acreditaciones de entidad', false]]
    },
    {
      title: 'Acceso y Networking',
      items: level === 'gold'
        ? [['Pases de equipo', <><strong>12 pases</strong> (técnico, comercial, dirección)</>], ['Introducciones 1:1 facilitadas según ICP', <><strong>5+</strong> introducciones cualificadas (post-evento, opt-in)</>], ['Acceso a roundtables editoriales del comité', true], ['Mesa reservada en networking y cóctel', true]]
        : level === 'silver'
        ? [['Pases de equipo', <><strong>6 pases</strong> incluidos</>], ['Introducciones 1:1 facilitadas', <><strong>2–3</strong> introducciones cualificadas</>], ['Acceso a roundtables editoriales', false], ['Mesa reservada en networking', false]]
        : [['Pases institucionales', <><strong>1–3 pases</strong> por invitación</>], ['Introducciones 1:1', false], ['Roundtables editoriales', false], ['Mesa reservada', false]]
    },
    {
      title: 'Activos Post-Evento',
      items: level === 'gold'
        ? [['Informe ejecutivo del sector', <><strong>Personalizado</strong> — incluye benchmark + posicionamiento competitivo</>], ['Síntesis de retos técnicos por sector', true], ['Mapa de proveedores y casos de uso', true], ['Acceso completo a grabaciones de sesiones', true]]
        : level === 'silver'
        ? [['Informe ejecutivo del sector', <>Edición <strong>estándar</strong></>], ['Síntesis de retos técnicos por sector', true], ['Mapa de proveedores', true], ['Acceso a grabaciones de sesiones', true]]
        : [['Informe ejecutivo', false], ['Síntesis técnica', false], ['Mapa de proveedores', false], ['Acceso a grabaciones', false]]
    }
  ];

  return (
    <div className={`tier-detail ${level}`}>
      <div className="tier-detail-aside">
        <div className="tag">Desglose · {tier.total} plaza{tier.total !== 1 ? 's' : ''}</div>
        <h3>{name}</h3>
        <div className="price-line">
          {tier.price > 0
            ? <>Inversión: <strong>{tier.price.toLocaleString('es-ES')} €</strong> + IVA<br />Quedan <strong>{tier.remaining}</strong> de {tier.total}</>
            : <>Acceso <strong>por invitación institucional</strong><br />{tier.remaining} plazas disponibles</>
          }
        </div>
        <a href="#reservar" className="btn btn-ghost btn-sm">Solicitar información <IconArrow /></a>
      </div>
      <div className="tier-detail-areas">
        {areas.map((area, i) => (
          <div className="tier-area" key={i}>
            <h4>{area.title}</h4>
            <ul>
              {area.items.map(([label, val], j) => {
                const active = val !== false;
                return (
                  <li key={j} className={active ? '' : 'off'}>
                    <span className="ic">{active ? <IconCheck /> : <IconX />}</span>
                    <span>
                      {label}
                      {typeof val !== 'boolean' && val !== undefined && <>: {val}</>}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Reservar llamada (Cal.com embed) ----------
function BookCall({ vertical }) {
  const [ref, inView] = useInView();
  return (
    <section className="section" id="reservar" ref={ref}>
      <div className={`container reveal ${inView ? 'in-view' : ''}`}>
        <div className="section-header center">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Próximo paso</span>
          <h2>Habla con el equipo antes de decidir.</h2>
          <p className="lead" style={{ margin: '0 auto' }}>60 minutos para entender los detalles, alinear ICP y diseñar la modalidad que mejor encaja con vuestros objetivos. Sin compromiso.</p>
        </div>
        <div style={{ maxWidth: 1100, margin: '0 auto', background: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: 'var(--r-xl)', overflow: 'hidden' }}>
          <iframe
            src="https://cal.com/segurosia/prioritaria?duration=60"
            title="Reservar llamada"
            style={{ width: '100%', height: 780, border: 0, display: 'block', background: 'transparent' }}
            loading="lazy"
          />
        </div>
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--ink-3)' }}>
          ¿Prefieres escribir? <a href="mailto:hola@inteligenciaartificialagentica.com" style={{ color: 'var(--accent)' }}>hola@inteligenciaartificialagentica.com</a>
        </p>
      </div>
    </section>
  );
}

// ---------- Formulario de adhesión (Tally embed) ----------
function Adhesion({ vertical }) {
  const iframeRef = useRef(null);
  useEffect(() => {
    const onMsg = (e) => {
      if (e.origin !== 'https://tally.so') return;
      try {
        const d = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (d && d.event === 'Tally.FormHeightChanged' && iframeRef.current) {
          iframeRef.current.style.height = d.payload.height + 'px';
        }
      } catch (_) {}
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);
  return (
    <section className="section" id="adhesion">
      <div className="container">
        <div className="section-header center">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Formulario de Adhesión</span>
          <h2>¿Ya tenéis claro lo que queréis? Formalizadlo aquí.</h2>
          <p className="lead" style={{ margin: '0 auto' }}>Rellena el formulario y nuestro equipo os enviará el acuerdo de participación y la factura en menos de 24 horas.</p>
        </div>
        <div style={{ maxWidth: 780, margin: '0 auto', background: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: 'var(--r-xl)', padding: 32 }}>
          <iframe
            ref={iframeRef}
            src="https://tally.so/embed/obVl7N?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            width="100%"
            height="480"
            frameBorder="0"
            title="Formulario de Adhesión"
            style={{ border: 0, display: 'block', background: 'transparent' }}
          />
        </div>
        <p style={{ fontSize: 12, color: 'var(--ink-3)', textAlign: 'center', marginTop: 20, marginBottom: 0 }}>
          Forma de pago: envío de factura a la firma del acuerdo. A todos los precios se suma IVA.
        </p>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer({ vertical }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a href="#" className="brand">
              <span className="brand-dot"></span>
              <span>IA Agéntica</span>
            </a>
            <p style={{ fontSize: 13, color: 'var(--ink-3)', maxWidth: 320, marginTop: 16 }}>
              El primer foro de IA Agéntica para proveedores tecnológicos del sector asegurador en España. 20 de octubre de 2026, Auditorio El Beatriz Madrid.
            </p>
          </div>
          <div>
            <h5>Participación</h5>
            <ul>
              <li><a href="#paquetes">Modalidades</a></li>
              <li><a href="#reservar">Hablar con el equipo</a></li>
              <li><a href="#adhesion">Formulario</a></li>
            </ul>
          </div>
          <div>
            <h5>Foro</h5>
            <ul>
              <li><a href="#foro">El Foro</a></li>
              <li><a href="#agenda">Agenda</a></li>
              <li><a href="#verticales">Programa</a></li>
            </ul>
          </div>
          <div>
            <h5>Contacto</h5>
            <ul>
              <li><a href="mailto:hola@inteligenciaartificialagentica.com">hola@inteligenciaartificialagentica.com</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 COBERIO, S.L. · SegurosIA · Todos los derechos reservados</div>
          <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
            Sponsorship {vertical.label} · Edición I · 2026
          </div>
        </div>
      </div>
    </footer>
  );
}

// ---------- Page ----------
function Page({ vertical }) {
  return (
    <>
      <Nav vertical={vertical} />
      <main id="main-content">
        <Hero vertical={vertical} />
        <Stats />
        <AboutForo />
        <Moment />
        <ContrastBlock />
        <Video />
        <About />
        <Verticals />
        <Agenda />
        <Audience />
        <Packages vertical={vertical} />
        <BookCall vertical={vertical} />
        <Adhesion vertical={vertical} />
        <Footer vertical={vertical} />
      </main>
    </>
  );
}

// Expose globally
Object.assign(window, { Page });
