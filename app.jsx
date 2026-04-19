// Shared page components for all 3 sponsor landings
// Expects window.VERTICAL = { key, label, accent, accentGlow, accentInk, tiers: {gold, silver, bronze}, title, subtitle, tierLabel }

const { useState, useEffect, useMemo } = React;

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
const IconCam = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7"></polygon>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
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
        <strong>Descuento 20%</strong> para sponsors confirmados antes del 30 de abril · Plazas muy limitadas
      </div>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#" className="brand">
            <span className="brand-dot"></span>
            <span>IA Agéntica</span>
            <span className="brand-vertical">Sponsors · {vertical.label}</span>
          </a>
          <div className="nav-links">
            <a href="#foro">El Foro</a>
            <a href="#verticales">Verticales</a>
            <a href="#agenda">Agenda</a>
            <a href="#paquetes">Paquetes</a>
            <a href="#reservar" className="btn btn-ghost btn-sm">Reservar llamada <IconArrow /></a>
          </div>
        </div>
      </nav>
    </>
  );
}

// ---------- Hero ----------
function Hero({ vertical }) {
  const diff = useCountdown('2026-06-16T09:00:00+02:00');
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
                <span className="value">16 Junio 2026</span>
              </div>
              <div>
                <span className="label">Lugar</span>
                <span className="value">Auditorio Beatriz · Madrid</span>
              </div>
              <div>
                <span className="label">Aforo</span>
                <span className="value">150 C-level</span>
              </div>
              <div>
                <span className="label">Formato</span>
                <span className="value">Presencial · Chatham House</span>
              </div>
            </div>
            <div className="hero-cta">
              <a href="#reservar" className="btn btn-primary">
                Reservar llamada con el equipo <IconArrow />
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
  return (
    <section className="stats-row">
      <div className="stat"><div className="num">150</div><div className="label">Directivos C-Level</div></div>
      <div className="stat"><div className="num">6</div><div className="label">Verticales Temáticas</div></div>
      <div className="stat"><div className="num">3.000+</div><div className="label">Alumni IIA Movilizados</div></div>
      <div className="stat"><div className="num">1ª</div><div className="label">Edición en España</div></div>
    </section>
  );
}

// ---------- Sobre el Foro ----------
function AboutForo() {
  return (
    <section className="section" id="foro">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">El Foro</span>
          <h2>El primer foro en España dedicado a la <em style={{ fontStyle: 'italic' }}>IA Agéntica</em> para banca y seguros.</h2>
          <p className="lead">Un encuentro único diseñado para reunir a los máximos responsables de la industria en un espacio de diálogo estratégico de alto nivel. Sin intermediarios, sin comerciales.</p>
        </div>

        <div className="reasons-grid">
          <div className="reason">
            <div className="reason-num">01</div>
            <h3>Acceso directo a decisores</h3>
            <p>150 directivos C-level de banca y seguros en un único espacio. El formato reducido garantiza acceso de calidad, no cantidad.</p>
          </div>
          <div className="reason">
            <div className="reason-num">02</div>
            <h3>Posicionamiento pionero</h3>
            <p>Estar presente desde la primera edición posiciona a tu marca como referente visionario en IA Agéntica aplicada al sector.</p>
          </div>
          <div className="reason">
            <div className="reason-num">03</div>
            <h3>Thought Leadership</h3>
            <p>Comparte tu visión ante la audiencia más cualificada del sector. Elige el tema, enfoque y formato de tu intervención.</p>
          </div>
          <div className="reason">
            <div className="reason-num">04</div>
            <h3>Networking estratégico</h3>
            <p>Cóctel networking exclusivo, coffee break y formato diseñado para conexiones reales. No es un evento masivo.</p>
          </div>
          <div className="reason">
            <div className="reason-num">05</div>
            <h3>Visibilidad multicanal</h3>
            <p>Difusión previa, durante y posterior en RRSS, newsletters del IIA, comunicaciones y medios sectoriales.</p>
          </div>
          <div className="reason">
            <div className="reason-num">06</div>
            <h3>Respaldo institucional</h3>
            <p>Evento avalado por AEPD y DGSFP, con el IIA como partner académico. Credibilidad y seriedad reforzadas.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Quiénes Somos ----------
function About() {
  return (
    <section className="section" id="quienes-somos">
      <div className="container">
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
  return (
    <section className="section">
      <div className="container-narrow">
        <div className="moment-block">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>2026 · Punto de inflexión</span>
          <h2 style={{ marginTop: 24 }}>El momento de la <em style={{ fontStyle: 'italic' }}>IA Agéntica</em>.</h2>
          <p>Este foro nace cuando las entidades financieras necesitan entender no solo qué puede hacer la IA Agéntica, sino cómo implementarla de forma segura, ética y conforme a los nuevos marcos regulatorios europeos.</p>
          <div className="highlight">Patrocinar = posicionarse en la vanguardia</div>
        </div>
      </div>
    </section>
  );
}

// ---------- Verticales ----------
function Verticals() {
  const items = [
    ['Estado del Arte de la IA Agéntica', 'Panorama global de los agentes de IA: dónde estamos, hacia dónde vamos y qué impacto real están teniendo en banca y seguros. Casos en producción y lecciones aprendidas.'],
    ['Guardrails, Compliance y Regulación', 'Cómo diseñar sistemas de IA Agéntica que cumplan con DORA, AI Act y normativa sectorial. Frameworks de gobernanza, auditoría algorítmica y control humano.'],
    ['Federated Learning y Privacidad', 'Entrenamiento colaborativo de modelos sin compartir datos sensibles. IA Agéntica respetando privacidad y protección de datos.'],
    ['Arquitecturas del Conocimiento', 'RAG, grafos de conocimiento y sistemas multiagente: las arquitecturas técnicas detrás de los agentes más avanzados del sector financiero.'],
    ['Futuro de los Servicios de Software', 'Cómo la IA Agéntica redefine los modelos de negocio SaaS, la relación proveedor-cliente y la cadena de valor tecnológica.'],
    ['Ciberseguridad e IA Agéntica', 'Nuevos vectores de amenaza que introducen los agentes autónomos y estrategias de defensa. Seguridad ofensiva y defensiva.'],
  ];
  return (
    <section className="section" id="verticales">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Programa</span>
          <h2>Seis verticales temáticas.</h2>
          <p className="lead">El programa se estructura en torno a seis verticales que cubren los aspectos más críticos de la IA Agéntica aplicada al sector. Los sponsors tendrán prioridad en la selección de bloques.</p>
        </div>
        <div className="verticals-grid">
          {items.map(([title, desc], i) => (
            <div className="vertical-card" key={i}>
              <div className="vertical-num">0{i + 1}</div>
              <div className="vertical-content">
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Agenda ----------
function Agenda() {
  const rows = [
    ['09:00 – 09:30', 'Registro y acreditación', 'Networking'],
    ['09:30 – 09:45', 'Apertura institucional', 'Apertura'],
    ['09:45 – 10:30', 'Keynote: Estado del Arte de la IA Agéntica', 'Keynote', true],
    ['10:30 – 11:15', 'Sesión: Guardrails, Compliance y Regulación', 'Sesión'],
    ['11:15 – 11:45', 'Networking Coffee', 'Pausa'],
    ['11:45 – 12:30', 'Sesión: Federated Learning y Privacidad de Datos', 'Sesión'],
    ['12:30 – 13:15', 'Sesión: Arquitecturas del Conocimiento', 'Sesión'],
    ['13:15 – 14:00', 'Panel: Futuro de los Servicios de Software + Ciberseguridad', 'Panel'],
    ['14:00 – 16:00', 'Cóctel y Networking', 'Networking', true],
  ];
  return (
    <section className="section" id="agenda">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Agenda Provisional</span>
          <h2>Una jornada densa, diseñada para máxima densidad de valor.</h2>
          <p className="lead">Ponencias de 30 minutos + 15 minutos de Q&amp;A. Los sponsors tendrán prioridad en la selección de bloques temáticos.</p>
        </div>
        <div className="agenda-table">
          {rows.map(([time, title, tag, highlight], i) => (
            <div className={`agenda-row ${highlight ? 'highlight' : ''}`} key={i}>
              <div className="agenda-time">{time}</div>
              <div className="agenda-title">{title}</div>
              <div className="agenda-tag">{tag}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Audiencia ----------
function Audience() {
  return (
    <section className="section" id="audiencia">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Perfil de la Audiencia</span>
          <h2>150 decisores. Cada inscripción, validada.</h2>
          <p className="lead">Diseñado exclusivamente para directivos de primer nivel del sector financiero y asegurador. Aforo limitado para garantizar networking real.</p>
        </div>
        <div className="audience-grid">
          <div className="audience-card">
            <h3>Perfil de los asistentes</h3>
            <ul className="audience-list">
              <li>CEOs y Directores Generales</li>
              <li>CTOs y CIOs</li>
              <li>CDOs y Chief AI Officers</li>
              <li>Directores de Innovación</li>
              <li>Directores de Transformación Digital</li>
              <li>Responsables de Compliance y Regulación</li>
            </ul>
          </div>
          <div className="audience-card">
            <h3>Sectores representados</h3>
            <ul className="audience-list">
              <li>Compañías aseguradoras</li>
              <li>Entidades bancarias</li>
              <li>Gestoras de activos y fondos</li>
              <li>Insurtechs y fintechs</li>
              <li>Reguladores e instituciones públicas</li>
              <li>Proveedores tecnológicos especializados</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Paquetes ----------
function Packages({ vertical }) {
  const tierNames = vertical.tierNames; // ['GOLD','SILVER','BRONZE'] or ['ORO','PLATA','BRONCE']
  return (
    <section className="section" id="paquetes">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Paquetes de Sponsorship · {vertical.tierLabel}</span>
          <h2>Tres niveles. Disponibilidad limitada.</h2>
          <p className="lead">Cada nivel con prestaciones diferenciadas en cuatro áreas: Participación, Imagen de Marca, Comunicación y Entradas. La exclusividad garantiza máxima visibilidad.</p>
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
                <span className="amount">{t.price.toLocaleString('es-ES')}</span>
                <span className="cur">€</span>
                <span className="vat">+ IVA</span>
              </div>
            </div>
          ))}
        </div>

        <CompareTable tierNames={tierNames} tiers={vertical.tiers} />

        {/* Detailed per-tier */}
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
        <tr className="section-row"><td colSpan="4">Participación en el Programa</td></tr>
        <tr><td className="feature">Ponencia o panel en auditorio</td><td className="highlight">Keynote + Panel</td><td>1 Panel</td><td>{no}</td></tr>
        <tr><td className="feature">Elección de bloque temático</td><td>{yes}</td><td>{yes}</td><td>{no}</td></tr>
        <tr><td className="feature">Moderación de mesa</td><td>{yes}</td><td>{no}</td><td>{no}</td></tr>
        <tr><td className="feature">Entrevista en vídeo (post-evento)</td><td>{yes}</td><td>{yes}</td><td>{no}</td></tr>
        <tr><td className="feature">Q&amp;A exclusivo</td><td>{yes}</td><td>{yes}</td><td>{yes}</td></tr>

        <tr className="section-row"><td colSpan="4">Imagen de Marca y Visibilidad</td></tr>
        <tr><td className="feature">Logo en cartel principal</td><td className="highlight">Destacado</td><td>Visible</td><td>Presente</td></tr>
        <tr><td className="feature">Material en welcome pack</td><td>{yes}</td><td>{yes}</td><td>{yes}</td></tr>
        <tr><td className="feature">Vídeo corporativo en pantallas</td><td className="highlight">Hasta 1 min</td><td>Hasta 30 s</td><td>{no}</td></tr>
        <tr><td className="feature">Roll-up en zona auditorio</td><td>{yes}</td><td>{yes}</td><td>{no}</td></tr>
        <tr><td className="feature">Cobranding en materiales</td><td>{yes}</td><td>{no}</td><td>{no}</td></tr>
        <tr><td className="feature">Logo en acreditaciones</td><td>{yes}</td><td>{yes}</td><td>{yes}</td></tr>

        <tr className="section-row"><td colSpan="4">Comunicación y Difusión</td></tr>
        <tr><td className="feature">Difusión en RRSS</td><td className="highlight">Periódica + destacada</td><td>{yes}</td><td>{yes}</td></tr>
        <tr><td className="feature">Mención newsletters IIA (3.000+)</td><td>{yes}</td><td>{yes}</td><td>{yes}</td></tr>
        <tr><td className="feature">Artículo/entrevista en medios</td><td>{yes}</td><td>{yes}</td><td>{no}</td></tr>
        <tr><td className="feature">Nota de prensa oficial</td><td>{yes}</td><td>{yes}</td><td>{no}</td></tr>
        <tr><td className="feature">Email marketing dedicado</td><td>{yes}</td><td>Coste adicional</td><td>{no}</td></tr>
        <tr><td className="feature">BBDD de asistentes post-evento</td><td>{yes}</td><td>Coste adicional</td><td>{no}</td></tr>
        <tr><td className="feature">Logo + bio speaker en web</td><td>{yes}</td><td>{yes}</td><td>{yes}</td></tr>

        <tr className="section-row"><td colSpan="4">Entradas e Invitaciones</td></tr>
        <tr><td className="feature">Entradas presenciales incluidas</td><td className="highlight">15</td><td>8</td><td>4</td></tr>
        <tr><td className="feature">Entradas adicionales (precio preferente)</td><td>{yes}</td><td>{yes}</td><td>{no}</td></tr>
        <tr><td className="feature">Mesa reservada zona networking</td><td>{yes}</td><td>{no}</td><td>{no}</td></tr>

        <tr className="section-row"><td colSpan="4">Tarifa</td></tr>
        <tr>
          <td className="feature">Precio (+ IVA)</td>
          <td className="highlight">{tiers[0].price.toLocaleString('es-ES')} €</td>
          <td className="highlight">{tiers[1].price.toLocaleString('es-ES')} €</td>
          <td className="highlight">{tiers[2].price.toLocaleString('es-ES')} €</td>
        </tr>
      </tbody>
    </table>
  );
}

function TierDetail({ tier, name, level }) {
  const areas = [
    {
      title: 'Participación en el Programa',
      items: level === 'gold'
        ? [['Ponencia', <><strong>Keynote + Panel</strong> en el auditorio</>], ['Elección prioritaria de bloque temático', true], ['Moderación de mesa redonda', true], ['Entrevista en vídeo post-evento', true], ['Q&A exclusivo', true]]
        : level === 'silver'
        ? [['Ponencia', <><strong>1 Panel</strong> en el auditorio</>], ['Elección de bloque temático', true], ['Moderación de mesa', false], ['Entrevista en vídeo post-evento', true], ['Q&A exclusivo', true]]
        : [['Ponencia o panel', false], ['Elección de bloque temático', false], ['Moderación de mesa', false], ['Entrevista en vídeo post-evento', false], ['Q&A exclusivo', true]]
    },
    {
      title: 'Imagen de Marca y Visibilidad',
      items: level === 'gold'
        ? [['Logo', <><strong>Destacado</strong> en cartel principal</>], ['Material corporativo en welcome pack', true], ['Vídeo corporativo', <><strong>hasta 1 minuto</strong> en pantallas</>], ['Roll-up en zona auditorio', true], ['Cobranding en materiales del evento', true], ['Logo en acreditaciones y check-in', true]]
        : level === 'silver'
        ? [['Logo', <><strong>Visible</strong> en cartel principal</>], ['Material corporativo en welcome pack', true], ['Vídeo corporativo', <>hasta <strong>30 segundos</strong></>], ['Roll-up en zona auditorio', true], ['Cobranding', false], ['Logo en acreditaciones y check-in', true]]
        : [['Logo', <><strong>Presente</strong> en cartel principal</>], ['Material corporativo en welcome pack', true], ['Vídeo corporativo en pantallas', false], ['Roll-up', false], ['Cobranding', false], ['Logo en acreditaciones y check-in', true]]
    },
    {
      title: 'Comunicación y Difusión',
      items: level === 'gold'
        ? [['Difusión RRSS', <><strong>Periódica + destacada</strong></>], ['Newsletter IIA (3.000+ alumni)', true], ['Artículo/entrevista en medios propios', true], ['Nota de prensa oficial', true], ['Email marketing dedicado', true], ['BBDD asistentes post-evento', true]]
        : level === 'silver'
        ? [['Difusión en RRSS', true], ['Newsletter IIA (3.000+ alumni)', true], ['Artículo/entrevista en medios propios', true], ['Nota de prensa oficial', true], ['Email marketing dedicado', <>coste adicional</>], ['BBDD asistentes post-evento', <>coste adicional</>]]
        : [['Difusión en RRSS', true], ['Newsletter IIA (3.000+ alumni)', true], ['Artículo/entrevista', false], ['Nota de prensa oficial', false], ['Email marketing dedicado', false], ['BBDD asistentes post-evento', false]]
    },
    {
      title: 'Entradas e Invitaciones',
      items: level === 'gold'
        ? [['Entradas presenciales', <><strong>15 entradas</strong> incluidas</>], ['Entradas adicionales a precio preferente', true], ['Mesa reservada en zona networking', true]]
        : level === 'silver'
        ? [['Entradas presenciales', <><strong>8 entradas</strong> incluidas</>], ['Entradas adicionales a precio preferente', true], ['Mesa reservada', false]]
        : [['Entradas presenciales', <><strong>4 entradas</strong> incluidas</>], ['Entradas adicionales', false], ['Mesa reservada', false]]
    }
  ];

  return (
    <div className={`tier-detail ${level}`}>
      <div className="tier-detail-aside">
        <div className="tag">Desglose · {tier.total} plaza{tier.total !== 1 ? 's' : ''}</div>
        <h3>{name}</h3>
        <div className="price-line">
          Tarifa: <strong>{tier.price.toLocaleString('es-ES')} €</strong> + IVA
          <br />Quedan <strong>{tier.remaining}</strong> de {tier.total}
        </div>
        <a href="#reservar" className="btn btn-ghost btn-sm">Reservar {name} <IconArrow /></a>
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
  return (
    <section className="section" id="reservar">
      <div className="container">
        <div className="section-header center">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Próximo paso</span>
          <h2>Reserva hasta 60 min. con el equipo.</h2>
          <p className="lead" style={{ margin: '0 auto' }}>Te contamos los detalles, resolvemos dudas y diseñamos el paquete que mejor se adapta a ti, idealmente en menos de 60 min. Sin compromiso.</p>
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
  useEffect(() => {
    const load = () => window.Tally && window.Tally.loadEmbeds && window.Tally.loadEmbeds();
    if (window.Tally) { load(); return; }
    const s = document.createElement('script');
    s.src = 'https://tally.so/widgets/embed.js';
    s.async = true;
    s.onload = load;
    document.body.appendChild(s);
  }, []);
  return (
    <section className="section" id="adhesion">
      <div className="container">
        <div className="section-header center">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Formulario de Adhesión</span>
          <h2>¿Lo tienes claro? Formalízalo aquí.</h2>
          <p className="lead" style={{ margin: '0 auto' }}>Rellena el formulario y nuestro equipo te enviará la factura y el acuerdo de sponsorship en menos de 24h.</p>
        </div>
        <div style={{ maxWidth: 780, margin: '0 auto', background: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: 'var(--r-xl)', padding: 32 }}>
          <iframe
            data-tally-src="https://tally.so/embed/obVl7N?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="480"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
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
              El primer foro de IA Agéntica para decisores de banca y seguros en España. 16 de junio de 2026, Auditorio Beatriz Madrid.
            </p>
          </div>
          <div>
            <h5>Sponsors</h5>
            <ul>
              <li><a href="#paquetes">Paquetes</a></li>
              <li><a href="#reservar">Reservar llamada</a></li>
              <li><a href="#adhesion">Formulario</a></li>
            </ul>
          </div>
          <div>
            <h5>Foro</h5>
            <ul>
              <li><a href="#foro">El Foro</a></li>
              <li><a href="#agenda">Agenda</a></li>
              <li><a href="#verticales">Verticales</a></li>
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
      <Hero vertical={vertical} />
      <Stats />
      <AboutForo />
      <Moment />
      <About />
      <Verticals />
      <Agenda />
      <Audience />
      <Packages vertical={vertical} />
      <BookCall vertical={vertical} />
      <Adhesion vertical={vertical} />
      <Footer vertical={vertical} />
    </>
  );
}

// Expose globally
Object.assign(window, { Page });
