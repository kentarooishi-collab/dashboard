import { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { Section } from './Section';
import { flowSteps, risks, type NodeId } from '../content';
import { t } from '../glossary';

interface NodeDef { x: number; y: number; w: number; h: number; title: string; sub: string[] }

const nodes: Record<NodeId, NodeDef> = {
  client: { x: 20, y: 152, w: 160, h: 88, title: '利用企業', sub: ['使いたい。', 'でも持ちたくない'] },
  tc: { x: 240, y: 136, w: 180, h: 120, title: '東京センチュリー', sub: ['資金調達', 'アセット保有', '残価・運用リスク'] },
  market: { x: 470, y: 24, w: 160, h: 84, title: '資金市場', sub: ['銀行借入・社債など'] },
  asset: { x: 470, y: 284, w: 160, h: 84, title: 'アセット', sub: ['航空機・車・不動産…'] },
};

// 各ステップの矢印パスとラベル位置
const edges: Record<string, { d: string; lx: number; ly: number }> = {
  fund: { d: 'M470 72 C420 72 400 100 380 134', lx: 438, ly: 96 },
  own: { d: 'M382 258 C400 290 425 316 468 322', lx: 444, ly: 286 },
  use: { d: 'M500 370 C420 410 160 410 100 244', lx: 300, ly: 390 },
  fee: { d: 'M182 196 L236 196', lx: 210, ly: 184 },
  exit: { d: 'M600 282 L600 112', lx: 612, ly: 200 },
};

export function Mechanism() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const step = flowSteps[active];

  useEffect(() => {
    if (!playing) return;
    const t = window.setInterval(() => setActive((i) => (i + 1) % flowSteps.length), 2800);
    return () => window.clearInterval(t);
  }, [playing]);

  const pick = (i: number) => { setActive(i); setPlaying(false); };
  const isNodeOn = (id: NodeId) => step.from === id || step.to === id;

  return (
    <Section
      id="mechanism"
      index="01"
      eyebrow="仕組み"
      title="リースの本質は「所有」と「利用」を分けること"
      lead="東京センチュリーが引き受けているのは、ただの貸し付けではありません。ステップを順に押して、お金とモノの流れを追ってみてください。"
    >
      <div className="mech">
        <div className="card mech__diagram">
          <svg viewBox="0 0 650 420" role="img" aria-label={`リースの流れ図。現在のステップ：${step.title}`}>
            <defs>
              {['off', 'on'].map((k) => (
                <marker key={k} id={`arrow-${k}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" className={`arrow-head arrow-head--${k}`} />
                </marker>
              ))}
            </defs>
            {flowSteps.map((s, i) => {
              const e = edges[s.id];
              const on = i === active;
              return (
                <g key={s.id} className={`edge ${on ? 'is-on' : ''}`} onClick={() => pick(i)}>
                  <path d={e.d} className="edge__hit" />
                  <path d={e.d} className="edge__line" markerEnd={`url(#arrow-${on ? 'on' : 'off'})`} />
                  <g transform={`translate(${e.lx} ${e.ly})`}>
                    <rect className="edge__badge" x={-14} y={-11} width={28} height={22} rx={11} />
                    <text className="edge__num" textAnchor="middle" dy="4">{i + 1}</text>
                  </g>
                </g>
              );
            })}
            {(Object.keys(nodes) as NodeId[]).map((id) => {
              const n = nodes[id];
              return (
                <g key={id} className={`node node--${id} ${isNodeOn(id) ? 'is-on' : ''}`}>
                  <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={14} className="node__box" />
                  <text x={n.x + n.w / 2} y={n.y + 30} textAnchor="middle" className="node__title">{n.title}</text>
                  {n.sub.map((s, j) => (
                    <text key={s} x={n.x + n.w / 2} y={n.y + 52 + j * 19} textAnchor="middle" className="node__sub">{s}</text>
                  ))}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mech__side">
          <div className="mech__controls">
            <span className="mech__counter num">STEP {active + 1} / {flowSteps.length}</span>
            <button type="button" className="btn" onClick={() => setPlaying((p) => !p)}>
              {playing ? <Pause size={15} /> : <Play size={15} />}
              {playing ? '停止' : '自動再生'}
            </button>
          </div>
          <ol className="steps">
            {flowSteps.map((s, i) => (
              <li key={s.id}>
                <button type="button" className={`step ${i === active ? 'is-on' : ''}`} onClick={() => pick(i)} aria-current={i === active}>
                  <span className="step__num num">{i + 1}</span>
                  <span className="step__text">
                    <strong>{s.title}</strong>
                    {i === active && <span className="step__body">{t(s.body, false)}</span>}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <h3 className="sub-title">だから、事業に食い込むのが合理的</h3>
      <div className="risk-grid">
        {risks.map((r) => {
          const Icon = r.icon;
          const on = step.risk === r.id;
          return (
            <div key={r.id} className={`card risk ${on ? 'is-on' : ''}`}>
              <span className="risk__icon"><Icon size={20} /></span>
              <div>
                {on && <span className="risk__flag">このステップのリスク</span>}
                <h4>{t(r.title)}</h4>
                <p>{t(r.body)}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="contrast">
        <div className="contrast__col">
          <span className="contrast__label">一般的なコンサル</span>
          <p>アドバイスして終わり。自分では資産を持たない。</p>
        </div>
        <div className="contrast__vs">vs</div>
        <div className="contrast__col contrast__col--accent">
          <span className="contrast__label">東京センチュリー</span>
          <p>自分の{t('B/S')}で資産を持つ。だから、<strong>事業への関与が深くなりやすい</strong>。</p>
        </div>
      </div>
    </Section>
  );
}
