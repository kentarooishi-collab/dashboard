import { useState } from 'react';
import { Section } from '../components/Section';
import { eras, events, type EventKind } from './data';
import { t } from './glossary';

const kindColor: Record<EventKind, string> = {
  設立: 'var(--c-tc)', 上場: 'var(--c-mhc)', 合併: 'var(--c-smfl)', 'M&A': 'var(--c-orix)',
  提携: 'var(--c-fgl)', 組織: 'var(--muted)', 計画: 'var(--accent)',
};
const kinds = Object.keys(kindColor) as EventKind[];

export function History() {
  const [era, setEra] = useState<string>('all');
  const [kind, setKind] = useState<EventKind | 'all'>('all');
  const list = events.filter((e) => (era === 'all' || e.era === era) && (kind === 'all' || e.kind === kind));

  return (
    <Section
      id="history"
      index="01"
      eyebrow="沿革"
      title="2つのリース会社から、M&Aと提携で広がったグループへ"
      lead="時代を選ぶと、その時期の出来事に絞り込めます。種類（M&A・提携など）でも絞り込めます。"
    >
      <div className="eras" role="tablist" aria-label="時代">
        <button type="button" role="tab" aria-selected={era === 'all'} className={`era ${era === 'all' ? 'is-on' : ''}`} onClick={() => setEra('all')}>
          <span className="era__label">すべて</span>
          <span className="era__period num">1964–2026</span>
        </button>
        {eras.map((e, i) => (
          <button key={e.id} type="button" role="tab" aria-selected={era === e.id} className={`era ${era === e.id ? 'is-on' : ''}`} onClick={() => setEra(e.id)}>
            <span className="era__label"><span className="num era__no">{i + 1}</span>{e.label}</span>
            <span className="era__period num">{e.period}</span>
          </button>
        ))}
      </div>
      {era !== 'all' && <p className="era__summary">{eras.find((e) => e.id === era)?.summary}</p>}

      <div className="kind-filter" role="group" aria-label="種類">
        <button type="button" className={`chip-btn ${kind === 'all' ? 'is-on' : ''}`} onClick={() => setKind('all')}>すべての種類</button>
        {kinds.map((k) => (
          <button key={k} type="button" className={`chip-btn ${kind === k ? 'is-on' : ''}`} onClick={() => setKind(k)}>
            <i className="kind-dot" style={{ background: kindColor[k] }} />{k}
          </button>
        ))}
        <span className="kind-filter__count">{list.length} 件</span>
      </div>

      <ol className="timeline">
        {list.map((e) => (
          <li key={e.date + e.title} className="timeline__item">
            <span className="timeline__date num">{e.date}</span>
            <span className="timeline__dot" style={{ background: kindColor[e.kind] }} />
            <div className="card timeline__card">
              <div className="timeline__title">
                <span className="timeline__kind" style={{ color: kindColor[e.kind] }}>{e.kind}</span>
                <h3>{e.title}</h3>
              </div>
              <p>{t(e.body)}</p>
            </div>
          </li>
        ))}
        {!list.length && <li className="timeline__empty">この条件の出来事はありません。</li>}
      </ol>
    </Section>
  );
}
