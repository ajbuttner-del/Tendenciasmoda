import { useState } from "react";

const BDX = "#8B1F2A";

const questions = [
  {
    section: "1. Sobre o Momento da Sua Marca",
    items: [
      { id: "q1", text: "Hoje, qual é o maior desafio da sua marca?", options: [
        { label: "Acompanhar o que está surgindo agora e não ficar para trás", score: "A" },
        { label: "Planejar melhor as próximas coleções e reduzir erros", score: "B" },
        { label: "Entender para onde o mercado está indo e como a marca deve se posicionar no futuro", score: "C" },
      ]},
      { id: "q2", text: "Em geral, as decisões mais importantes da marca precisam funcionar em:", options: [
        { label: "Poucos meses (lançamentos rápidos, cápsulas, hype)", score: "A" },
        { label: "1 a 2 anos (coleções, crescimento, posicionamento)", score: "B" },
        { label: "3 anos ou mais (modelo de negócio, propósito, sustentabilidade, inovação)", score: "C" },
      ]},
    ],
  },
  {
    section: "2. Como a Marca Observa o Mundo",
    items: [
      { id: "q3", text: "Quando sua equipe pensa em novas ideias, de onde vêm principalmente as referências?", options: [
        { label: "Rua, redes sociais, comportamento das pessoas, estética emergente", score: "A" },
        { label: "Relatórios, dados de mercado, histórico de vendas e consumo", score: "B" },
        { label: "Discussões internas sobre mudanças sociais, tecnologia, meio ambiente e novos hábitos", score: "C" },
      ]},
      { id: "q4", text: "Sua marca acompanha comportamento e cultura de consumo?", options: [
        { label: "De forma intuitiva e informal", score: "A" },
        { label: "De forma estruturada, com pesquisa e análise", score: "B" },
        { label: "De forma estratégica, conectando isso a decisões de longo prazo", score: "C" },
      ]},
    ],
  },
  {
    section: "3. Dados, Experiência e Intuição",
    items: [
      { id: "q5", text: "A empresa utiliza dados para tomar decisões?", options: [
        { label: "Pouco — a decisão é mais criativa e intuitiva", score: "A" },
        { label: "Sim — combinamos dados com sensibilidade criativa", score: "B" },
        { label: "Sim — dados e análises orientam decisões estratégicas", score: "C" },
      ]},
      { id: "q6", text: "Quando um produto dá errado, normalmente a empresa:", options: [
        { label: "Ajusta rápido e testa outra coisa", score: "A" },
        { label: "Analisa padrões para evitar o erro no próximo ciclo", score: "B" },
        { label: "Questiona se o problema é mais profundo (estratégia, contexto, proposta)", score: "C" },
      ]},
    ],
  },
  {
    section: "4. Inovação e Mudança",
    items: [
      { id: "q7", text: "A marca costuma inovar de que forma?", options: [
        { label: "Responde rápido ao que está em alta", score: "A" },
        { label: "Planeja novidades com base em sinais consistentes", score: "B" },
        { label: "Busca criar algo novo antes do mercado", score: "C" },
      ]},
      { id: "q8", text: "Temas como sustentabilidade, tecnologia, novos materiais ou novos modos de consumo:", options: [
        { label: "Ainda não estruturam decisões", score: "A" },
        { label: "Já influenciam parte do planejamento", score: "B" },
        { label: "São centrais para o futuro da marca", score: "C" },
      ]},
      { id: "q9", text: "A empresa costuma se fazer perguntas como: \"E se o comportamento do consumidor mudar?\" \"E se esse modelo não existir mais daqui a alguns anos?\"", options: [
        { label: "Raramente", score: "A" },
        { label: "Às vezes", score: "B" },
        { label: "Frequentemente", score: "C" },
      ]},
    ],
  },
  {
    section: "5. O Que a Marca Mais Precisa Agora",
    items: [
      { id: "q10", text: "Hoje, sua marca precisa mais de:", options: [
        { label: "Inspiração e leitura cultural", score: "A" },
        { label: "Segurança para planejar e investir", score: "B" },
        { label: "Clareza de direção e visão de futuro", score: "C" },
      ]},
      { id: "q11", text: "O maior risco para sua empresa hoje é:", options: [
        { label: "Não perceber mudanças a tempo", score: "A" },
        { label: "Apostar errado e perder recursos", score: "B" },
        { label: "Ficar relevante apenas no curto prazo", score: "C" },
      ]},
    ],
  },
];

const profileData = {
  A: {
    label: "Agilidade e Leitura do Presente",
    subtitle: "Marcas emergentes · Coleções cápsula · Branding em construção",
    tag: "Perfil 1",
    indication: "Sua marca precisa ler melhor o que está surgindo agora e transformar essas referências em produto, comunicação e experiência com mais velocidade. O principal ativo da empresa é a sensibilidade cultural, não a previsão de longo prazo.",
    actions: [
      { title: "O que a empresa precisa fazer agora", items: [
        "Criar um processo contínuo de observação de comportamento e estética",
        "Acompanhar rua, redes sociais, nichos culturais e comunidades emergentes",
        "Registrar referências visuais e comportamentais de forma sistemática",
        "Traduzir rapidamente sinais observados em cápsulas, ajustes de coleção e colaborações",
        "Testar pequeno, aprender rápido e ajustar sem medo",
      ]},
      { title: "Como estruturar isso na prática", items: [
        "Definir quem observa (e onde)",
        "Criar rotina semanal ou quinzenal de troca de insights",
        "Trabalhar mais com experimentação do que com grandes apostas",
        "Documentar aprendizados, mesmo os que \"não deram certo\"",
      ]},
    ],
    when: "Marcas pequenas ou autorais · Fases de branding e construção de identidade · Mercados instáveis ou altamente sensíveis à novidade",
  },
  B: {
    label: "Planejamento e Redução de Risco",
    subtitle: "Empresas em crescimento · Marcas em consolidação",
    tag: "Perfil 2",
    indication: "Sua marca precisa tomar decisões mais seguras, equilibrando criatividade com planejamento. O desafio não é falta de ideias, mas priorizar melhor onde investir tempo e recursos.",
    actions: [
      { title: "O que a empresa precisa fazer agora", items: [
        "Organizar informações históricas (vendas, desempenho, público)",
        "Cruzar dados internos com sinais de mercado e consumo",
        "Identificar padrões que se repetem de forma consistente",
        "Transformar esses padrões em diretrizes claras para desenvolvimento de coleção, mix de produtos e comunicação",
        "Planejar ciclos com mais previsibilidade",
      ]},
      { title: "Como estruturar isso na prática", items: [
        "Criar momentos formais de análise (antes de cada coleção)",
        "Reduzir decisões baseadas apenas em feeling isolado",
        "Usar dados como apoio à decisão criativa, não como trava",
        "Trabalhar com janelas de planejamento de 6 a 24 meses",
      ]},
    ],
    when: "Empresas em crescimento · Marcas que precisam ganhar eficiência · Operações com maior impacto financeiro por decisão",
  },
  C: {
    label: "Direção e Futuro da Marca",
    subtitle: "Marcas maduras · Empresas em transformação ou reposicionamento",
    tag: "Perfil 3",
    indication: "Sua empresa não precisa apenas acertar o próximo lançamento — ela precisa entender para onde o mercado está indo e qual papel quer ocupar nesse futuro. O risco maior é pensar só no curto prazo.",
    actions: [
      { title: "O que a empresa precisa fazer agora", items: [
        "Questionar premissas atuais do negócio",
        "Identificar mudanças estruturais em consumo, tecnologia, sustentabilidade e comportamento",
        "Explorar diferentes caminhos possíveis para o setor",
        "Definir quais futuros fazem sentido para a marca — e quais não",
        "Tomar decisões no presente alinhadas a uma visão clara de longo prazo",
      ]},
      { title: "Como estruturar isso na prática", items: [
        "Promover conversas estratégicas sobre o futuro da marca",
        "Criar cenários (\"se isso acontecer, como respondemos?\")",
        "Envolver diferentes áreas e pontos de vista",
        "Traduzir visão de futuro em decisões concretas hoje",
      ]},
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

function getCounts(a) { const c={A:0,B:0,C:0}; Object.values(a).forEach(s=>c[s]++); return c; }
function getPrimary(c) { return Object.entries(c).sort((a,b)=>b[1]-a[1])[0][0]; }
function getSecondary(c,p) { const s=Object.entries(c).sort((a,b)=>b[1]-a[1])[1]; return s&&s[1]>0&&s[0]!==p?s[0]:null; }
function isCombined(c) { const v=Object.values(c).sort((a,b)=>b-a); return v[0]-v[1]<=1&&v[1]>=2; }
function detectInconsistencies(a) {
  const n=[];
  if((a.q1==="C"||a.q2==="C")&&(a.q3==="A"||a.q4==="A")) n.push("A marca declara querer pensar o longo prazo, mas ainda usa fontes de referência predominantemente de curto prazo.");
  if((a.q7==="C"||a.q8==="C")&&a.q5==="A") n.push("Há ambição de inovar e liderar mudanças, mas as decisões ainda são tomadas de forma intuitiva, sem base em dados.");
  if(a.q10==="C"&&(a.q1==="A"||a.q2==="A")) n.push("Existe tensão entre a necessidade de clareza de direção e o foco operacional no curto prazo.");
  if(a.q11==="C"&&a.q9==="A") n.push("O risco de perder relevância no longo prazo preocupa — mas a marca raramente faz perguntas sobre o futuro.");
  return n;
}

const allQs = questions.flatMap(s => s.items.map(q => ({ ...q, section: s.section })));
const TOTAL = allQs.length;

// ── Atoms ──────────────────────────────────────────────────────────────────────
const Shell = ({ children }) => (
  <div style={{ minHeight:"100vh", background:"#FAFAFA", color:"#111", fontFamily:"'Inter','Helvetica Neue',Arial,sans-serif", display:"flex", flexDirection:"column", alignItems:"center" }}>
    <div style={{ width:"100%", borderBottom:"1px solid #E0E0E0", padding:"16px 40px", display:"flex", justifyContent:"space-between", boxSizing:"border-box", background:"#fff" }}>
      <span style={{ fontSize:10, letterSpacing:4, color:"#999", textTransform:"uppercase" }}>Diagnóstico Estratégico</span>
      <span style={{ fontSize:10, letterSpacing:3, color:"#ccc", textTransform:"uppercase" }}>Marca de Moda</span>
    </div>
    <div style={{ width:"100%", maxWidth:680, padding:"0 24px", boxSizing:"border-box" }}>{children}</div>
    <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} *{box-sizing:border-box} button:focus{outline:none}`}</style>
  </div>
);

const FadeIn = ({ children, style={} }) => (
  <div style={{ animation:"fadeUp 0.4s ease both", ...style }}>{children}</div>
);

const Cap = ({ children, color=BDX, style={} }) => (
  <div style={{ fontSize:10, letterSpacing:4, color, textTransform:"uppercase", fontWeight:600, ...style }}>{children}</div>
);

const Hr = ({ mt=36, mb=36 }) => (
  <div style={{ height:1, background:"#E8E8E8", margin:`${mt}px 0 ${mb}px` }} />
);

const BodyText = ({ children, style={} }) => (
  <div style={{ color:"#555", lineHeight:1.85, fontSize:15, ...style }}>{children}</div>
);

const BulletList = ({ items }) => (
  <ul style={{ margin:0, padding:0, listStyle:"none" }}>
    {items.map((item,i) => (
      <li key={i} style={{ display:"flex", gap:12, marginBottom:10 }}>
        <span style={{ color:BDX, flexShrink:0, marginTop:2, fontWeight:700 }}>—</span>
        <BodyText style={{ fontSize:14 }}>{item}</BodyText>
      </li>
    ))}
  </ul>
);

const PrimaryBtn = ({ children, onClick, disabled }) => (
  <button onClick={disabled?undefined:onClick} style={{
    background: disabled?"#E8E8E8":BDX, color: disabled?"#AAA":"#fff",
    border:"none", padding:"13px 44px", fontSize:10, letterSpacing:3,
    textTransform:"uppercase", cursor:disabled?"not-allowed":"pointer",
    fontFamily:"inherit", fontWeight:600, transition:"all 0.18s", opacity:disabled?0.5:1,
  }}
    onMouseEnter={e=>{if(!disabled)e.currentTarget.style.opacity="0.8";}}
    onMouseLeave={e=>{if(!disabled)e.currentTarget.style.opacity="1";}}>
    {children}
  </button>
);

const GhostBtn = ({ children, onClick }) => (
  <button onClick={onClick} style={{
    background:"transparent", border:"1px solid #CCC", color:"#777",
    padding:"12px 36px", fontSize:10, letterSpacing:3, textTransform:"uppercase",
    cursor:"pointer", fontFamily:"inherit", fontWeight:600, transition:"all 0.18s",
  }}
    onMouseEnter={e=>{e.currentTarget.style.borderColor=BDX;e.currentTarget.style.color=BDX;}}
    onMouseLeave={e=>{e.currentTarget.style.borderColor="#CCC";e.currentTarget.style.color="#777";}}>
    {children}
  </button>
);

// ── Main ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState("intro");
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [report, setReport] = useState(null);

  const current = allQs[qIdx];
  const progress = (qIdx / TOTAL) * 100;

  function handleNext() {
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
      setReport({ primary, secondary, combined, inconsistencies: detectInconsistencies(next), counts });
      setStep("report");
    }
  }

  function restart() { setStep("intro"); setQIdx(0); setAnswers({}); setSelected(null); setReport(null); }

  // INTRO
  if (step === "intro") return (
    <Shell>
      <FadeIn style={{ padding:"80px 0 60px" }}>
        <div style={{ width:40, height:2, background:BDX, marginBottom:32 }} />
        <Cap style={{ marginBottom:20 }}>Como sua marca toma decisões sobre o futuro?</Cap>
        <h1 style={{ fontSize:"clamp(32px,6vw,52px)", fontWeight:300, lineHeight:1.2, margin:"0 0 28px", color:"#111", letterSpacing:-1 }}>
          Diagnóstico<br />Estratégico<br /><span style={{ color:BDX, fontWeight:600 }}>de Marca</span>
        </h1>
        <p style={{ color:"#888", lineHeight:1.8, fontSize:15, margin:"0 0 48px", maxWidth:440 }}>
          11 perguntas para entender em que estágio sua marca está e quais decisões fazem mais sentido para ela agora.
        </p>
        <PrimaryBtn onClick={() => setStep("quiz")}>Iniciar Diagnóstico</PrimaryBtn>
      </FadeIn>
    </Shell>
  );

  // QUIZ
  if (step === "quiz") return (
    <Shell>
      <FadeIn key={qIdx} style={{ padding:"48px 0" }}>
        <div style={{ marginBottom:40 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
            <span style={{ fontSize:10, letterSpacing:3, color:"#AAA", textTransform:"uppercase" }}>{current.section}</span>
            <span style={{ fontSize:11, color:"#BBB", fontWeight:600 }}>{qIdx + 1} / {TOTAL}</span>
          </div>
          <div style={{ height:2, background:"#EBEBEB", borderRadius:2 }}>
            <div style={{ height:2, width:`${progress}%`, background:BDX, transition:"width 0.4s ease", borderRadius:2 }} />
          </div>
        </div>

        <h2 style={{ fontSize:"clamp(17px,3vw,22px)", fontWeight:400, lineHeight:1.6, margin:"0 0 32px", color:"#111" }}>
          {current.text}
        </h2>

        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:36 }}>
          {current.options.map((opt, i) => {
            const active = selected === opt.score;
            return (
              <button key={i} onClick={() => setSelected(opt.score)} style={{
                background: active ? "#FDF7F7" : "#fff",
                border: `1.5px solid ${active ? BDX : "#E0E0E0"}`,
                color: active ? "#111" : "#555",
                padding:"16px 20px", textAlign:"left", fontSize:15, lineHeight:1.6,
                cursor:"pointer", fontFamily:"inherit", transition:"all 0.18s",
              }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor="#BBB"; e.currentTarget.style.color="#222"; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor="#E0E0E0"; e.currentTarget.style.color="#555"; } }}
              >
                <span style={{ display:"block", fontSize:9, letterSpacing:3, color: active ? BDX : "#BBB", textTransform:"uppercase", marginBottom:6, fontWeight:700 }}>
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

  // REPORT
  if (step === "report" && report) {
    const P = profileData[report.primary];
    const S = report.secondary ? profileData[report.secondary] : null;
    const combined = report.combined;

    return (
      <Shell>
        <FadeIn style={{ padding:"56px 0 80px" }}>

          {/* Cabeçalho perfil */}
          <div style={{ marginBottom:36 }}>
            <div style={{ width:40, height:2, background:BDX, marginBottom:24 }} />
            <Cap style={{ marginBottom:14 }}>{P.tag} — Perfil Identificado</Cap>
            <h1 style={{ fontSize:"clamp(24px,5vw,38px)", fontWeight:300, margin:"0 0 6px", color:"#111", letterSpacing:-0.5 }}>{P.label}</h1>
            <p style={{ color:"#AAA", fontSize:13, margin:"0 0 24px" }}>{P.subtitle}</p>

            {/* Distribuição */}
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom: S ? 12 : 0 }}>
              {[["A","Perfil 1"],["B","Perfil 2"],["C","Perfil 3"]].map(([k,name]) => (
                <div key={k} style={{ border:`1.5px solid ${k===report.primary?BDX:"#E0E0E0"}`, color:k===report.primary?BDX:"#BBB", padding:"4px 14px", fontSize:11, letterSpacing:2, fontWeight:k===report.primary?700:400 }}>
                  {name}: {report.counts[k]}
                </div>
              ))}
            </div>

            {S && (
              <div style={{ border:`1.5px solid ${BDX}44`, color:BDX, display:"inline-block", padding:"4px 14px", fontSize:10, letterSpacing:2, textTransform:"uppercase", marginTop:8, fontWeight:600 }}>
                + traços de {S.label}
              </div>
            )}
          </div>

          <Hr />

          {/* O que este diagnóstico indica */}
          <div style={{ marginBottom:28 }}>
            <Cap style={{ marginBottom:14 }}>O que este diagnóstico indica</Cap>
            <BodyText>{combined ? combinedTexts.indication : P.indication}</BodyText>
          </div>

          <Hr mt={20} mb={20} />

          {combined && (
            <>
              <div style={{ marginBottom:28 }}>
                <Cap style={{ marginBottom:14 }}>Caminho recomendado</Cap>
                <BulletList items={combinedTexts.path} />
              </div>
              <Hr mt={8} mb={20} />
            </>
          )}

          {P.actions.map((block,i) => (
            <div key={i} style={{ marginBottom:24 }}>
              <Cap style={{ marginBottom:14 }}>{block.title}</Cap>
              <BulletList items={block.items} />
            </div>
          ))}

          {combined && S && (
            <>
              <Hr mt={8} mb={20} />
              <Cap style={{ marginBottom:20 }}>Complemento — {S.label}</Cap>
              {S.actions.map((block,i) => (
                <div key={i} style={{ marginBottom:24 }}>
                  <Cap style={{ marginBottom:14 }}>{block.title}</Cap>
                  <BulletList items={block.items} />
                </div>
              ))}
            </>
          )}

          {combined && (
            <>
              <Hr mt={8} mb={20} />
              <div style={{ marginBottom:28 }}>
                <Cap style={{ marginBottom:14 }}>Atenção</Cap>
                <BulletList items={combinedTexts.attention} />
              </div>
            </>
          )}

          <Hr />

          <div style={{ marginBottom:28 }}>
            <Cap style={{ marginBottom:14 }}>Quando esse foco é ideal</Cap>
            <BodyText style={{ fontSize:14, fontStyle:"italic", color:"#999" }}>{P.when}</BodyText>
          </div>

          {report.inconsistencies.length > 0 && (
            <>
              <Hr mt={8} mb={20} />
              <div style={{ border:`1.5px solid ${BDX}55`, background:"#FDF5F6", padding:"24px 28px" }}>
                <Cap style={{ marginBottom:14 }}>⚠ Desconexões Detectadas</Cap>
                <BulletList items={report.inconsistencies} />
              </div>
            </>
          )}

          <div style={{ borderTop:"1px solid #E8E8E8", paddingTop:40, marginTop:48 }}>
            <GhostBtn onClick={restart}>Novo Diagnóstico</GhostBtn>
          </div>

        </FadeIn>
      </Shell>
    );
  }

  return null;
}
