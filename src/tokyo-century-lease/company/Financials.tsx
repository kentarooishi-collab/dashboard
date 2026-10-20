import { useState } from 'react';
import { Section } from '../components/Section';
import { assetParts, bs, fundingParts, type Part } from './data';
import { G, t } from './glossary';

const toCho = (v: number) => v / 1_000_000; // 百万円 → 兆円
const toOku = (v: number) => v / 100; // 百万円 → 億円
const fmtCho = (v: number) => toCho(v).toFixed(2);

export function Financials() {
  const [side, setSide] = useState<'assets' | 'funding'>('assets');
  const [yi, setYi] = useState(bs.length - 1);
  const parts = side === 'assets' ? assetParts : fundingParts;
  const year = bs[yi];
  const first = bs[0], last = bs[bs.length - 1];
  const maxTotal = Math.max(...bs.map((y) => y.total));

  return (
    <Section
      id="financials"
      index="03"
      eyebrow="バランスシート"
      title="5年で総資産は約27%増。財務は厚く、稼ぐ力も回復"
      lead="連結・各年3月末。棒にマウスを乗せる（タップする）と、その年の内訳が右に出ます。「資産」と「調達（負債・純資産）」を切り替えられます。"
    >
      <div className="fin">
        <div className="card fin__chart">
          <div className="fin__toolbar">
            <div className="segmented" role="group" aria-label="表示">
              <button type="button" aria-pressed={side === 'assets'} onClick={() => setSide('assets')}>資産の内訳（何を持っているか）</button>
              <button type="button" aria-pressed={side === 'funding'} onClick={() => setSide('funding')}>調達の内訳（どうお金を集めたか）</button>
            </div>
          </div>
          <div className="stack" role="list">
            {bs.map((y, i) => (
              <button
                key={y.fy}
                type="button"
                role="listitem"
                className={`stack__col ${i === yi ? 'is-on' : ''}`}
                onMouseEnter={() => setYi(i)}
                onFocus={() => setYi(i)}
                onClick={() => setYi(i)}
                aria-label={`${y.label} 総資産 ${fmtCho(y.total)}兆円`}
              >
                <span className="stack__total num">{fmtCho(y.total)}</span>
                <span className="bar-area">
                  <span className="stack__bar" style={{ height: `${(y.total / maxTotal) * 100}%` }}>
                    {[...parts].reverse().map((p) => (
                      <span key={p.key} style={{ flexGrow: p.value(y), background: p.color }} />
                    ))}
                  </span>
                </span>
                <span className="stack__label num">{y.label}</span>
              </button>
            ))}
          </div>
          <div className="legend-row">
            {parts.map((p) => (
              <span key={p.key}><i style={{ background: p.color }} />{p.term ? <G k={p.term}>{p.label}</G> : p.label}</span>
            ))}
            <span className="legend-row__unit">単位：兆円</span>
          </div>
        </div>

        <aside className="card fin__detail" aria-live="polite">
          <p className="fin__year num">{year.label}<small>（{year.fy}）</small></p>
          <p className="fin__total">総資産 <b className="num">{fmtCho(year.total)}</b> 兆円</p>
          <ul className="fin__parts">
            {parts.map((p: Part) => {
              const v = p.value(year);
              return (
                <li key={p.key}>
                  <i style={{ background: p.color }} />
                  <span>{p.term ? <G k={p.term}>{p.label}</G> : p.label}</span>
                  <b className="num">{Math.round(toOku(v)).toLocaleString()}<small>億円</small></b>
                  <span className="fin__pct num">{((v / year.total) * 100).toFixed(0)}%</span>
                </li>
              );
            })}
          </ul>
          <div className="fin__kpis">
            <div><span><G k="自己資本比率" /></span><b className="num">{year.equityRatio.toFixed(1)}%</b></div>
            <div><span><G k="ROE" /></span><b className="num">{year.roe.toFixed(1)}%</b></div>
            <div><span><G k="純利益" /></span><b className="num">{Math.round(toOku(year.profit)).toLocaleString()}<small>億円</small></b></div>
          </div>
        </aside>
      </div>

      <div className="fin-trends">
        <TrendCard title={<G k="純利益" />} unit="億円" values={bs.map((y) => toOku(y.profit))} labels={bs.map((y) => y.label)} fmt={(v) => Math.round(v).toLocaleString()} kind="bar" active={yi} note="2023年3月期は特別損失で大きく落ち込んだ" />
        <TrendCard title={<G k="ROE" />} unit="%" values={bs.map((y) => y.roe)} labels={bs.map((y) => y.label)} fmt={(v) => v.toFixed(1)} kind="line" active={yi} note="中計2027の目標10%を2年前倒しで超えた" />
        <TrendCard title={<G k="自己資本比率" />} unit="%" values={bs.map((y) => y.equityRatio)} labels={bs.map((y) => y.label)} fmt={(v) => v.toFixed(1)} kind="line" active={yi} note="11.9% → 15.5%。借入に対する自前のお金が厚くなった" />
        <TrendCard title={<>有利子負債 ÷ 自己資本</>} unit="倍" values={bs.map((y) => y.debt / y.equity)} labels={bs.map((y) => y.label)} fmt={(v) => v.toFixed(1)} kind="line" active={yi} note="約6.3倍 → 約4.6倍（筆者計算）。借入への依存度が下がった" />
      </div>

      <div className="insights">
        <h3 className="sub-title">読み取れること</h3>
        <ol>
          <li><b>資産は着実に拡大。</b>{t(`総資産は${fmtCho(first.total)}兆円から${fmtCho(last.total)}兆円へ約${Math.round((last.total / first.total - 1) * 100)}%増。伸びを支えたのは賃貸資産（オペレーティングリース型）で約${Math.round((last.rental / first.rental - 1) * 100)}%増えた。`)}</li>
          <li><b>財務が厚くなった。</b>{t('自己資本比率は11.9%から15.5%へ。有利子負債に頼る度合いが下がった。')}</li>
          <li><b>利益は回復し、資本効率も上がった。</b>{t('2023年3月期は特別損失で純利益が48億円まで落ち込んだが、その後は3期連続で増益。2026年3月期のROEは10.4%。')}</li>
          <li><b>2026年3月期には大きな一過性の損益。</b>{t('ロシア関連の保険金650億円（益）と、バイオマス混焼発電事業の減損468億円（損）があった。')}</li>
          <li><b>航空機リースのACGが連結から外れる予定。</b>{t('伊藤忠との共同経営に移ると、航空機資産がバランスシートから外れ、持分法適用会社への投資に置き換わる見込み。')}</li>
        </ol>
      </div>
    </Section>
  );
}

interface TrendProps {
  title: React.ReactNode; unit: string; values: number[]; labels: string[];
  fmt: (v: number) => string; kind: 'bar' | 'line'; active: number; note: string;
}

function TrendCard({ title, unit, values, labels, fmt, kind, active, note }: TrendProps) {
  const W = 260, H = 96, P = 10;
  const max = Math.max(...values), min = kind === 'bar' ? 0 : Math.min(...values) * 0.9;
  const x = (i: number) => P + (i * (W - P * 2)) / (values.length - 1);
  const y = (v: number) => H - P - ((v - min) / (max - min || 1)) * (H - P * 2);
  const bw = (W - P * 2) / values.length - 10;
  return (
    <div className="card trend">
      <div className="trend__head">
        <span className="trend__title">{title}</span>
        <span className="trend__val num">{fmt(values[active])}<small>{unit}</small></span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={labels.map((l, i) => `${l} ${fmt(values[i])}${unit}`).join('、')}>
        {kind === 'bar'
          ? values.map((v, i) => (
            <rect key={i} x={x(i) - bw / 2} y={y(v)} width={bw} height={H - P - y(v)} rx={3} className={i === active ? 'trend__mark is-on' : 'trend__mark'} />
          ))
          : (
            <>
              <polyline points={values.map((v, i) => `${x(i)},${y(v)}`).join(' ')} className="trend__line" />
              {values.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r={i === active ? 5 : 3} className={i === active ? 'trend__mark is-on' : 'trend__mark'} />)}
            </>
          )}
      </svg>
      <div className="trend__axis num"><span>{labels[0]}</span><span>{labels[labels.length - 1]}</span></div>
      <p className="trend__note">{note}</p>
    </div>
  );
}
