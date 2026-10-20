import { Section } from '../components/Section';
import { dividends, holders, ownership } from './data';
import { G } from './glossary';

const kindLabel = { partner: '事業パートナー', finance: '金融機関・信託口', other: 'その他の法人' } as const;

export function Shareholders() {
  const max = holders[0].pct;
  const top3 = holders.slice(0, 3).reduce((a, h) => a + h.pct, 0);
  const maxDiv = Math.max(...dividends.map((d) => d.total));

  return (
    <Section
      id="shareholders"
      index="04"
      eyebrow="株主"
      title={`上位3社で約${Math.round(top3)}%。事業パートナーが支える株主構成`}
      lead="2026年3月31日現在。伊藤忠商事・中央日本土地建物・NTTの3社は、合弁や提携でも深くつながっています。"
    >
      <div className="sh">
        <div className="card sh__card">
          <h3>大株主上位10名（持株比率）</h3>
          <ol className="holders">
            {holders.map((h, i) => (
              <li key={h.name} className={`holder holder--${h.kind}`}>
                <span className="holder__rank num">{i + 1}</span>
                <span className="holder__name" title={h.name}>{h.name}</span>
                <span className="holder__track"><span style={{ width: `${(h.pct / max) * 100}%` }} /></span>
                <span className="holder__pct num">{h.pct.toFixed(2)}%</span>
              </li>
            ))}
          </ol>
          <p className="legend-row">
            {(Object.keys(kindLabel) as (keyof typeof kindLabel)[]).map((k) => (
              <span key={k}><i className={`holder-key holder-key--${k}`} />{kindLabel[k]}</span>
            ))}
          </p>
        </div>

        <div className="sh__side">
          <div className="card sh__card">
            <h3>所有者別の構成</h3>
            <div className="own-bar" role="img" aria-label={ownership.map((o) => `${o.label} ${o.pct}%`).join('、')}>
              {ownership.map((o) => <span key={o.label} style={{ flexGrow: o.pct, background: o.color }} />)}
            </div>
            <ul className="own-list">
              {ownership.map((o) => (
                <li key={o.label}><i style={{ background: o.color }} />{o.label}<b className="num">{o.pct.toFixed(1)}%</b></li>
              ))}
            </ul>
            <p className="note-sm">発行済株式数 492,113,280株／株主数 39,696名</p>
          </div>

          <div className="card sh__card">
            <h3>1株あたり配当</h3>
            <p className="note-sm">方針：<G k="累進配当" />、<G k="配当性向" />35%以上（株式分割後ベース）</p>
            <div className="divs">
              {dividends.map((d) => (
                <div key={d.label} className={`div ${d.forecast ? 'div--fc' : ''}`}>
                  <span className="div__val num">{d.total}<small>円</small></span>
                  <span className="bar-area"><span className="div__bar" style={{ height: `${(d.total / maxDiv) * 100}%` }} /></span>
                  <span className="div__label">{d.label}</span>
                  <span className="div__payout num">性向 {d.payout}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
