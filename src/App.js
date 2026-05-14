mport { useState } from "react";

// ─── Google Sheets endpoint ───────────────────────────────────────────────────
const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbyEL7OxKrqIaDuMamxAISaxB-d3SPeQH1Prub71ya_KOdnYQtU9TLSNGZMPuSPxAYJ_/exec";

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  bg: "#F7F4EF",
  bgCard: "#EFECE6",
  border: "#D8D2C8",
  borderStrong: "#B0A898",
  ink: "#1C1A17",
  inkMid: "#4A4540",
  inkLight: "#8A837A",
  accent: "#2C2420",
  accentHover: "#403830",
  colorA: "#7A5C3A",
  colorB: "#3A5A4A",
  colorC: "#3A3A5A",
  colorWarn: "#7A3A2A",
};

// ─── Perguntas ────────────────────────────────────────────────────────────────
const questions = [
  {
    section: "1. Sobre o Momento da Sua Marca",
    items: [
      {
        id: "q1",
        text: "Hoje, qual é o maior desafio da sua marca?",
        options: [
          { label: "Acompanhar o que está surgindo agora e não ficar para trás", score: "A" },
          { label: "Planejar melhor as próximas coleções e reduzir erros", score: "B" },
          { label: "Entender para onde o mercado está indo e como a marca deve se posicionar no futuro", score: "C" },
        ],
      },
      {
        id: "q2",
        text: "Em geral, as decisões mais importantes da marca precisam funcionar em:",
        options: [
          { label: "Poucos meses (lançamentos rápidos, cápsulas, hype)", score: "A" },
          { label: "1 a 2 anos (coleções, crescimento, posicionamento)", score: "B" },
          { label: "3 anos ou mais (modelo de negócio, propósito, sustentabilidade, inovação)", score: "C" },
        ],
      },
    ],
  },
  {
    section: "2. Como a Marca Observa o Mundo",
    items: [
      {
        id: "q3",
        text: "Quando sua equipe pensa em novas ideias, de onde vêm principalmente as referências?",
        options: [
          { label: "Rua, redes sociais, comportamento das pessoas, estética emergente", score: "A" },
          { label: "Relatórios, dados de mercado, histórico de vendas e consumo", score: "B" },
          { label: "Discussões internas sobre mudanças sociais, tecnologia, meio ambiente e novos hábitos", score: "C" },
        ],
      },
      {
        id: "q4",
        text: "Sua marca acompanha comportamento e cultura de consumo?",
        options: [
          { label: "De forma intuitiva e informal", score: "A" },
          { label: "De forma estruturada, com pesquisa e análise", score: "B" },
          { label: "De forma estratégica, conectando isso a decisões de longo prazo", score: "C" },
        ],
      },
    ],
  },
  {
    section: "3. Dados, Experiência e Intuição",
    items: [
      {
        id: "q5",
        text: "A empresa utiliza dados para tomar decisões?",
        options: [
          { label: "Pouco — a decisão é mais criativa e intuitiva", score: "A" },
          { label: "Sim — combinamos dados com sensibilidade criativa", score: "B" },
          { label: "Sim — dados e análises orientam decisões estratégicas", score: "C" },
        ],
      },
      {
        id: "q6",
        text: "Quando um produto dá errado, normalmente a empresa:",
        options: [
          { label: "Ajusta rápido e testa outra coisa", score: "A" },
          { label: "Analisa padrões para evitar o erro no próximo ciclo", score: "B" },
          { label: "Questiona se o problema é mais profundo (estratégia, contexto, proposta)", score: "C" },
        ],
      },
    ],
  },
  {
    section: "4. Inovação e Mudança",
    items: [
      {
        id: "q7",
        text: "A marca costuma inovar de que forma?",
        options: [
          { label: "Responde rápido ao que está em alta", score: "A" },
          { label: "Planeja novidades com base em sinais consistentes", score: "B" },
          { label: "Busca criar algo novo antes do mercado", score: "C" },
        ],
      },
      {
        id: "q8",
        text: "Temas como sustentabilidade, tecnologia, novos materiais ou novos modos de consumo:",
        options: [
          { label: "Ainda não estruturam decisões", score: "A" },
          { label: "Já influenciam parte do planejamento", score: "B" },
          { label: "São centrais para o futuro da marca", score: "C" },
        ],
      },
      {
        id: "q9",
        text: "A empresa costuma se fazer perguntas como: \"E se o comportamento do consumidor mudar?\" \"E se esse modelo não existir mais daqui a alguns anos?\"",
        options: [
          { label: "Raramente", score: "A" },
          { label: "Às vezes", score: "B" },
          { label: "Frequentemente", score: "C" },
        ],
      },
    ],
  },
  {
    section: "5. O Que a Marca Mais Precisa Agora",
    items: [
      {
        id: "q10",
        text: "Hoje, sua marca precisa mais de:",
        options: [
          { label: "Inspiração e leitura cultural", score: "A" },
          { label: "Segurança para planejar e investir", score: "B" },
          { label: "Clareza de direção e visão de futuro", score: "C" },
        ],
      },
      {
        id: "q11",
        text: "O maior risco para sua empresa hoje é:",
        options: [
          { label: "Não perceber mudanças a tempo", score: "A" },
          { label: "Apostar errado e perder recursos", score: "B" },
          { label: "Ficar relevante apenas no curto prazo", score: "C" },
        ],
      },
    ],
  },
];

// ─── Perfis ───────────────────────────────────────────────────────────────────
const profileData = {
  A: {
    label: "Agilidade e Leitura do Presente",
    subtitle: "Marcas emergentes · Coleções cápsula · Branding em construção",
    color: T.colorA,
    tag: "Perfil 1",
    indication: "Sua marca precisa ler melhor o que está surgindo agora e transformar essas referências em produto, comunicação e experiência com mais velocidade. O principal ativo da empresa é a sensibilidade cultural, não a previsão de longo prazo.",
    actions: [
      {
        title: "O que a empresa precisa fazer agora",
        items: [
          "Criar um processo contínuo de observação de comportamento e estética",
          "Acompanhar rua, redes sociais, nichos culturais e comunidades emergentes",
          "Registrar referências visuais e comportamentais de forma sistemática",
          "Traduzir rapidamente sinais observados em cápsulas, ajustes de coleção e colaborações",
          "Testar pequeno, aprender rápido e ajustar sem medo",
        ],
      },
      {
        title: "Como estruturar isso na prática",
        items: [
          "Definir quem observa (e onde)",
          "Criar rotina semanal ou quinzenal de troca de insights",
          "Trabalhar mais com experimentação do que com grandes apostas",
          "Documentar aprendizados, mesmo os que \"não deram certo\"",
        ],
      },
    ],
    when: "Marcas pequenas ou autorais · Fases de branding e construção de identidade · Mercados instáveis ou altamente sensíveis à novidade",
  },
  B: {
    label: "Planejamento e Redução de Risco",
    subtitle: "Empresas em crescimento · Marcas em consolidação",
    color: T.colorB,
    tag: "Perfil 2",
    indication: "Sua marca precisa tomar decisões mais seguras, equilibrando criatividade com planejamento. O desafio não é falta de ideias, mas priorizar melhor onde investir tempo e recursos.",
    actions: [
      {
        title: "O que a empresa precisa fazer agora",
        items: [
          "Organizar informações históricas (vendas, desempenho, público)",
          "Cruzar dados internos com sinais de mercado e consumo",
          "Identificar padrões que se repetem de forma consistente",
          "Transformar esses padrões em diretrizes claras para desenvolvimento de coleção, mix de produtos e comunicação",
          "Planejar ciclos com mais previsibilidade",
        ],
      },
      {
        title: "Como estruturar isso na prática",
        items: [
          "Criar momentos formais de análise (antes de cada coleção)",
          "Reduzir decisões baseadas apenas em feeling isolado",
          "Usar dados como apoio à decisão criativa, não como trava",
          "Trabalhar com janelas de planejamento de 6 a 24 meses",
        ],
      },
    ],
    when: "Empresas em crescimento · Marcas que precisam ganhar eficiência · Operações com maior impacto financeiro por decisão",
  },
  C: {
    label: "Direção e Futuro da Marca",
    subtitle: "Marcas maduras · Empresas em transformação ou reposicionamento",
    color: T.colorC,
    tag: "Perfil 3",
    indication: "Sua empresa não precisa apenas acertar o próximo lançamento — ela precisa entender para onde o mercado está indo e qual papel quer ocupar nesse futuro. O risco maior é pensar só no curto prazo.",
    actions: [
      {
        title: "O que a empresa precisa fazer agora",
        items: [
          "Questionar premissas atuais do negócio",
          "Identificar mudanças estruturais em consumo, tecnologia, sustentabilidade e comportamento",
          "Explorar diferentes caminhos possíveis para o setor",
          "Definir quais futuros fazem sentido para a marca — e quais não",
          "Tomar decisões no presente alinhadas a uma visão clara de longo prazo",
        ],
      },
      {
        title: "Como estruturar isso na prática",
        items: [
          "Promover conversas estratégicas sobre o futuro da marca",
          "Criar cenários (\"se isso acontecer, como respondemos?\")",
          "Envolver diferentes áreas e pontos de vista",
          "Traduzir visão de futuro em decisões concretas hoje",
        ],
      },
    ],
    when: "Marcas maduras · Empresas em transformação ou reposicionamento · Negócios orientados por inovação e propósito",
  },
};

const combinedTexts = {
  indication: "Sua marca apresenta sinais de maturidade crescente. Ela pode (e deve) trabalhar em mais de um nível ao mesmo tempo, desde que saiba o que priorizar agora.",
  path: [
    "Usar leitura de comportamento para captar sinais do presente",
    "Estruturar planejamento para decisões de médio prazo",
    "Manter reflexão estratégica ativa sobre o futuro da marca",
  ],
  attention: [
    "Não tentar fazer tudo ao mesmo tempo sem foco",
    "Ajustar o nível de sofisticação de acordo com recursos e momento",
    "Entender que cada fase da empresa pede um tipo de decisão",
  ],
};

// ─── Lógica ───────────────────────────────────────────────────────────────────
function getCounts(answers) {
  const c = { A: 0, B: 0, C: 0 };
  Object.values(answers).forEach((s) => c[s]++);
  return c;
}
function getPrimary(counts) {
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}
function getSecondary(counts, primary) {
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const s = sorted[1];
  return s && s[1] > 0 && s[0] !== primary ? s[0] : null;
}
function isCombined(counts) {
  const vals = Object.values(counts).sort((a, b) => b - a);
  return vals[0] - vals[1] <= 1 && vals[1] >= 2;
}
function detectInconsistencies(answers) {
  const notes = [];
  if ((answers.q1 === "C" || answers.q2 === "C") && (answers.q3 === "A" || answers.q4 === "A"))
    notes.push("A marca declara querer pensar o longo prazo, mas ainda usa fontes de referência predominantemente de curto prazo. Para construir visão de futuro, é necessário ampliar as fontes de observação.");
  if ((answers.q7 === "C" || answers.q8 === "C") && answers.q5 === "A")
    notes.push("Há ambição de inovar e liderar mudanças, mas as decisões ainda são tomadas de forma intuitiva, sem base em dados. Inovação consistente exige ao menos algum nível de análise estruturada.");
  if (answers.q10 === "C" && (answers.q1 === "A" || answers.q2 === "A"))
    notes.push("Existe tensão entre a necessidade de clareza de direção e o foco operacional no curto prazo. A marca pode estar crescendo sem saber exatamente para onde.");
  if (answers.q11 === "C" && answers.q9 === "A")
    notes.push("O risco de perder relevância no longo prazo preocupa — mas a marca raramente faz perguntas sobre o futuro. Há distância entre o que se teme e o que se pratica.");
  return notes;
}

const allQs = questions.flatMap((s) => s.items.map((q) => ({ ...q, section: s.section })));
const TOTAL = allQs.length;

// ─── UI Atoms ─────────────────────────────────────────────────────────────────
function Shell({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.ink, fontFamily: "'Lora','Georgia',serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", borderBottom: `1px solid ${T.border}`, padding: "18px 40px", display: "flex", justifyContent: "space-between", boxSizing: "border-box" }}>
        <span style={{ fontSize: 11, letterSpacing: 3, color: T.inkLight, textTransform: "uppercase" }}>Diagnóstico Estratégico</span>
        <span style={{ fontSize: 11, letterSpacing: 2, color: T.inkLight, textTransform: "uppercase" }}>Marca de Moda</span>
      </div>
      <div style={{ width: "100%", maxWidth: 700, padding: "0 28px", boxSizing: "border-box" }}>{children}</div>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        * { box-sizing: border-box; }
        button:focus { outline: none; }
        input:focus, select:focus { outline: none; }
      `}</style>
    </div>
  );
}
function FadeIn({ children, style = {} }) {
  return <div style={{ animation: "fadeUp 0.45s ease both", ...style }}>{children}</div>;
}
function SectionLabel({ children, color, style = {} }) {
  return <div style={{ fontSize: 11, letterSpacing: 3, color: color || T.inkLight, textTransform: "uppercase", fontWeight: "600", marginBottom: 12, ...style }}>{children}</div>;
}
function Hr({ mt = 36, mb = 36 }) {
  return <div style={{ height: 1, background: T.border, margin: `${mt}px 0 ${mb}px` }} />;
}
function Block({ label, color, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <SectionLabel color={color}>{label}</SectionLabel>
      {children}
    </div>
  );
}
function BodyText({ children, style = {} }) {
  return <div style={{ color: T.inkMid, lineHeight: 1.85, fontSize: 16, ...style }}>{children}</div>;
}
function BulletList({ items, color }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", gap: 14, marginBottom: 12 }}>
          <span style={{ color: color || T.inkLight, flexShrink: 0, marginTop: 3, fontWeight: "bold" }}>—</span>
          <BodyText style={{ fontSize: 15 }}>{item}</BodyText>
        </li>
      ))}
    </ul>
  );
}
function PrimaryBtn({ children, onClick, disabled, loading }) {
  return (
    <button onClick={disabled || loading ? undefined : onClick} style={{
      background: disabled || loading ? T.border : T.accent,
      color: disabled || loading ? T.inkLight : T.bg,
      border: "none", padding: "14px 48px", fontSize: 11, letterSpacing: 3,
      textTransform: "uppercase", cursor: disabled || loading ? "not-allowed" : "pointer",
      fontFamily: "inherit", fontWeight: "600", transition: "all 0.18s",
      opacity: disabled || loading ? 0.6 : 1,
    }}
      onMouseEnter={e => { if (!disabled && !loading) e.currentTarget.style.background = T.accentHover; }}
      onMouseLeave={e => { if (!disabled && !loading) e.currentTarget.style.background = T.accent; }}>
      {loading ? "Aguarde..." : children}
    </button>
  );
}
function GhostBtn({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: "transparent", border: `1px solid ${T.borderStrong}`, color: T.inkMid,
      padding: "12px 36px", fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
      cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s",
    }}
      onMouseEnter={e => { e.currentTarget.style.background = T.bgCard; e.currentTarget.style.borderColor = T.ink; e.currentTarget.style.color = T.ink; }}
      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = T.borderStrong; e.currentTarget.style.color = T.inkMid; }}>
      {children}
    </button>
  );
}

function InputField({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: 11, letterSpacing: 2, color: T.inkLight, textTransform: "uppercase", fontWeight: "600", marginBottom: 8 }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "12px 16px", fontSize: 15,
          border: `1px solid ${T.border}`, background: T.bg, color: T.ink,
          fontFamily: "inherit", transition: "border 0.18s",
        }}
        onFocus={e => e.target.style.borderColor = T.borderStrong}
        onBlur={e => e.target.style.borderColor = T.border}
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: 11, letterSpacing: 2, color: T.inkLight, textTransform: "uppercase", fontWeight: "600", marginBottom: 8 }}>
        {label}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: "100%", padding: "12px 16px", fontSize: 15,
          border: `1px solid ${T.border}`, background: T.bg, color: value ? T.ink : T.inkLight,
          fontFamily: "inherit", transition: "border 0.18s", appearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238A837A' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center",
        }}
        onFocus={e => e.target.style.borderColor = T.borderStrong}
        onBlur={e => e.target.style.borderColor = T.border}
      >
        <option value="">Selecione...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState("intro");
  const [cadastro, setCadastro] = useState({ nome: "", email: "", marca: "", segmento: "", funcionarios: "", cnpj: "" });
  const [cadastroError, setCadastroError] = useState("");
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [report, setReport] = useState(null);
  const [sending, setSending] = useState(false);

  const current = allQs[qIdx];
  const progress = (qIdx / TOTAL) * 100;

  function handleCadastro() {
    const { nome, email, marca, segmento, funcionarios, cnpj } = cadastro;
    if (!nome || !email || !marca || !segmento || !funcionarios || !cnpj) {
      setCadastroError("Por favor, preencha todos os campos antes de continuar.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setCadastroError("Informe um e-mail válido.");
      return;
    }
    setCadastroError("");
    setStep("quiz");
  }

  async function handleNext() {
    if (!selected) return;
    const next = { ...answers, [current.id]: selected };
    setAnswers(next);
    setSelected(null);

    if (qIdx + 1 < TOTAL) {
      setQIdx(qIdx + 1);
    } else {
      const counts = getCounts(next);
      const primary = getPrimary(counts);
      const secondary = getSecondary(counts, primary);
      const combined = isCombined(counts);
      const inconsistencies = detectInconsistencies(next);
      const result = { primary, secondary, combined, inconsistencies, counts };
      setReport(result);
      setStep("report");
      await sendToSheets(next, result);
    }
  }

  async function sendToSheets(finalAnswers, result) {
    setSending(true);
    const payload = {
      ...cadastro,
      perfilPrincipal: profileData[result.primary].label,
      contagemA: result.counts.A,
      contagemB: result.counts.B,
      contagemC: result.counts.C,
      combinado: result.combined,
      inconsistencias: result.inconsistencies.length > 0 ? result.inconsistencies.join(" | ") : "Nenhuma",
    };
    try {
      // Build query string — most reliable way to send data to Apps Script
      const params = new URLSearchParams({ data: JSON.stringify(payload) });
      // Use an image request to avoid CORS — GET triggers doGet which we'll use to write data
      await new Promise((resolve) => {
        const img = new Image();
        img.onload = img.onerror = resolve;
        img.src = `${SHEETS_URL}?${params.toString()}`;
        setTimeout(resolve, 4000); // fallback timeout
      });
    } catch (e) {
      // silently fail
    }
    setSending(false);
  }

  function restart() {
    setStep("intro");
    setCadastro({ nome: "", email: "", marca: "", segmento: "", funcionarios: "", cnpj: "" });
    setCadastroError("");
    setQIdx(0);
    setAnswers({});
    setSelected(null);
    setReport(null);
  }

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (step === "intro") return (
    <Shell>
      <FadeIn style={{ padding: "80px 0 60px" }}>
        <SectionLabel color={T.inkLight}>Como sua marca toma decisões sobre o futuro?</SectionLabel>
        <h1 style={{ fontSize: "clamp(30px,6vw,50px)", fontWeight: 600, lineHeight: 1.2, margin: "24px 0 28px", color: T.ink }}>
          Diagnóstico<br />Estratégico<br /><em style={{ color: T.colorA, fontWeight: 400 }}>de Marca</em>
        </h1>
        <p style={{ color: T.inkMid, lineHeight: 1.8, fontSize: 16, margin: "0 0 48px", maxWidth: 460 }}>
          11 perguntas para entender em que estágio sua marca está e quais decisões fazem mais sentido para ela agora.
        </p>
        <PrimaryBtn onClick={() => setStep("cadastro")}>Iniciar Diagnóstico</PrimaryBtn>
      </FadeIn>
    </Shell>
  );

  // ── CADASTRO ───────────────────────────────────────────────────────────────
  if (step === "cadastro") return (
    <Shell>
      <FadeIn style={{ padding: "56px 0 60px" }}>
        <SectionLabel color={T.inkLight}>Antes de começar</SectionLabel>
        <h2 style={{ fontSize: "clamp(22px,4vw,32px)", fontWeight: 600, lineHeight: 1.3, margin: "16px 0 8px", color: T.ink }}>
          Dados da empresa
        </h2>
        <p style={{ color: T.inkMid, fontSize: 15, lineHeight: 1.7, margin: "0 0 40px", maxWidth: 460 }}>
          Preencha as informações abaixo para personalizar o diagnóstico e registrar sua participação.
        </p>

        <Hr mt={0} mb={32} />

        <InputField label="Nome" value={cadastro.nome} onChange={v => setCadastro(p => ({ ...p, nome: v }))} placeholder="Seu nome completo" />
        <InputField label="E-mail" type="email" value={cadastro.email} onChange={v => setCadastro(p => ({ ...p, email: v }))} placeholder="seu@email.com" />
        <InputField label="Nome da marca" value={cadastro.marca} onChange={v => setCadastro(p => ({ ...p, marca: v }))} placeholder="Nome da sua marca" />

        <SelectField
          label="Segmento"
          value={cadastro.segmento}
          onChange={v => setCadastro(p => ({ ...p, segmento: v }))}
          options={["Moda feminina", "Moda masculina", "Moda infantil", "Moda íntima", "Moda praia", "Streetwear", "Moda esportiva", "Moda sustentável", "Acessórios", "Calçados", "Luxo / Premium", "Outro"]}
        />

        <SelectField
          label="Número de funcionários"
          value={cadastro.funcionarios}
          onChange={v => setCadastro(p => ({ ...p, funcionarios: v }))}
          options={["1 a 5", "6 a 20", "21 a 50", "51 a 100", "101 a 300", "Acima de 300"]}
        />

        <InputField label="CNPJ" value={cadastro.cnpj} onChange={v => setCadastro(p => ({ ...p, cnpj: v }))} placeholder="00.000.000/0000-00" />

        {cadastroError && (
          <p style={{ color: T.colorWarn, fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>{cadastroError}</p>
        )}

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 8 }}>
          <PrimaryBtn onClick={handleCadastro}>Continuar</PrimaryBtn>
          <GhostBtn onClick={() => setStep("intro")}>Voltar</GhostBtn>
        </div>
      </FadeIn>
    </Shell>
  );

  // ── QUIZ ───────────────────────────────────────────────────────────────────
  if (step === "quiz") return (
    <Shell>
      <FadeIn key={qIdx} style={{ padding: "48px 0" }}>
        <div style={{ marginBottom: 44 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 11, letterSpacing: 2, color: T.inkLight, textTransform: "uppercase" }}>{current.section}</span>
            <span style={{ fontSize: 12, color: T.inkLight }}>{qIdx + 1} / {TOTAL}</span>
          </div>
          <div style={{ height: 1, background: T.border }}>
            <div style={{ height: 1, width: `${progress}%`, background: T.colorA, transition: "width 0.4s ease" }} />
          </div>
        </div>

        <h2 style={{ fontSize: "clamp(18px,3vw,23px)", fontWeight: 400, lineHeight: 1.6, margin: "0 0 36px", color: T.ink }}>
          {current.text}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 36 }}>
          {current.options.map((opt, i) => {
            const active = selected === opt.score;
            return (
              <button key={i} onClick={() => setSelected(opt.score)} style={{
                background: active ? T.bgCard : "transparent",
                border: `1px solid ${active ? T.colorA : T.border}`,
                color: active ? T.colorA : T.inkMid,
                padding: "16px 22px", textAlign: "left", fontSize: 15, lineHeight: 1.6,
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s",
              }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = T.borderStrong; e.currentTarget.style.color = T.ink; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.inkMid; } }}
              >
                <span style={{ display: "block", fontSize: 10, letterSpacing: 2, color: active ? T.colorA : T.inkLight, textTransform: "uppercase", marginBottom: 6, fontWeight: "600" }}>
                  Opção {String.fromCharCode(65 + i)}
                </span>
                {opt.label}
              </button>
            );
          })}
        </div>

        <PrimaryBtn onClick={handleNext} disabled={!selected}>
          {qIdx + 1 === TOTAL ? "Ver Diagnóstico" : "Próxima"}
        </PrimaryBtn>
      </FadeIn>
    </Shell>
  );

  // ── REPORT ─────────────────────────────────────────────────────────────────
  if (step === "report" && report) {
    const P = profileData[report.primary];
    const S = report.secondary ? profileData[report.secondary] : null;
    const combined = report.combined;

    return (
      <Shell>
        <FadeIn style={{ padding: "56px 0 80px" }}>

          {/* Saudação personalizada */}
          <p style={{ fontSize: 14, color: T.inkLight, marginBottom: 32, fontStyle: "italic" }}>
            Diagnóstico de <strong style={{ color: T.inkMid, fontStyle: "normal" }}>{cadastro.marca}</strong> · {cadastro.nome}
          </p>

          {/* Cabeçalho do perfil */}
          <div style={{ marginBottom: 40 }}>
            <SectionLabel color={P.color}>{P.tag} — Perfil Identificado</SectionLabel>
            <h1 style={{ fontSize: "clamp(24px,5vw,38px)", fontWeight: 600, margin: "20px 0 8px", color: T.ink }}>{P.label}</h1>
            <p style={{ color: T.inkLight, fontSize: 14, margin: "0 0 24px", fontStyle: "italic" }}>{P.subtitle}</p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: S ? 16 : 0 }}>
              {[["A", T.colorA, "Perfil 1"], ["B", T.colorB, "Perfil 2"], ["C", T.colorC, "Perfil 3"]].map(([k, col, name]) => (
                <div key={k} style={{ border: `1px solid ${k === report.primary ? col : T.border}`, color: k === report.primary ? col : T.inkLight, padding: "5px 14px", fontSize: 11, letterSpacing: 2, fontWeight: k === report.primary ? "600" : "400" }}>
                  {name}: {report.counts[k]}
                </div>
              ))}
            </div>

            {S && (
              <div style={{ border: `1px solid ${S.color}55`, color: S.color, display: "inline-block", padding: "5px 14px", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginTop: 8, fontWeight: "600" }}>
                + traços de {S.label}
              </div>
            )}
          </div>

          <Hr />

          <Block label="O que este diagnóstico indica" color={P.color}>
            <BodyText>{combined ? combinedTexts.indication : P.indication}</BodyText>
          </Block>

          <Hr mt={24} mb={24} />

          {combined && (
            <>
              <Block label="Caminho recomendado" color={T.colorA}>
                <BulletList items={combinedTexts.path} color={T.colorA} />
              </Block>
              <Hr mt={24} mb={24} />
            </>
          )}

          {P.actions.map((block, i) => (
            <Block key={i} label={block.title} color={P.color}>
              <BulletList items={block.items} color={P.color} />
            </Block>
          ))}

          {combined && S && (
            <>
              <Hr mt={8} mb={24} />
              <SectionLabel color={S.color} style={{ marginBottom: 20 }}>Complemento — {S.label}</SectionLabel>
              {S.actions.map((block, i) => (
                <Block key={i} label={block.title} color={S.color}>
                  <BulletList items={block.items} color={S.color} />
                </Block>
              ))}
            </>
          )}

          {combined && (
            <>
              <Hr mt={8} mb={24} />
              <Block label="Atenção" color={T.colorWarn}>
                <BulletList items={combinedTexts.attention} color={T.colorWarn} />
              </Block>
            </>
          )}

          <Hr />

          <Block label="Quando esse foco é ideal" color={P.color}>
            <BodyText style={{ fontSize: 14, color: T.inkLight, fontStyle: "italic" }}>{P.when}</BodyText>
          </Block>

          {report.inconsistencies.length > 0 && (
            <>
              <Hr mt={8} mb={24} />
              <div style={{ border: `1px solid ${T.colorWarn}44`, background: "#FDF8F4", padding: "24px 28px" }}>
                <SectionLabel color={T.colorWarn} style={{ marginBottom: 14 }}>⚠ Desconexões Detectadas</SectionLabel>
                <BulletList items={report.inconsistencies} color={T.colorWarn} />
              </div>
            </>
          )}

          {/* Status envio */}
          {sending && (
            <p style={{ fontSize: 13, color: T.inkLight, marginTop: 32, fontStyle: "italic" }}>
              Registrando respostas...
            </p>
          )}

          <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 40, marginTop: 48 }}>
            <GhostBtn onClick={restart}>Novo Diagnóstico</GhostBtn>
          </div>

        </FadeIn>
      </Shell>
    );
  }

  return null;
}
