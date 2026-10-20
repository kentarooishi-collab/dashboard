import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, ExternalLink } from 'lucide-react';
import { Section } from './Section';
import { byId, companies, metricKeys, metrics, rankLabel, type MetricKey } from '../data';
import { mean } from '../../shared/scale';
import { MetricTerm, t } from '../glossary';

interface Props { selected: string; onSelect: (id: string) => void }

export function Compare({ selected, onSelect }: Props) {
  const c = byId(selected);
  const base = selected === 'tc' ? null : byId('tc');

  return (
    <Section
      id="compare"
      index="04"
      eyebrow="会社比較"
      title="会社を選んで、位置づけを見る"
      lead={base ? `${c.name}を東京センチュリーと比べています。` : '東京センチュリーを5社平均と比べています。他の会社を選ぶと、東京センチュリーとの差が出ます。'}
    >
      <div className="company-tabs" role="tablist" aria-label="会社">
        {companies.map((x) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={x.id === selected}
            className={`company-tab ${x.id === selected ? 'is-on' : ''}`}
            style={{ ['--c' as string]: x.color }}
            onClick={() => onSelect(x.id)}
          >
            <i />
            <span className="company-tab__name">{x.name}</span>
            <span className="company-tab__sub num">総資産 {x.assets.toFixed(2)}兆円</span>
          </button>
        ))}
      </div>

      <div className="compare">
        <article className="card profile" style={{ ['--c' as string]: c.color }}>
          <span className="profile__short num">{c.short}</span>
          <h3>{c.name}</h3>
          <p>{t(c.summary)}</p>
          <div className="chips">{c.focus.map((f) => <span key={f} className="chip">{f}</span>)}</div>
          <div className="profile__links">
            <a href={c.financial} target="_blank" rel="noreferrer">財務ソース <ExternalLink size={13} /></a>
            <a href={c.business} target="_blank" rel="noreferrer">事業ソース <ExternalLink size={13} /></a>
          </div>
        </article>

        <div className="card metrics">
          {metricKeys.map((k) => <MetricStrip key={k} k={k} id={selected} baseId={base?.id} />)}
          <p className="metrics__legend">
            <span><i className="dot dot--sel" style={{ background: c.color }} />{c.name}</span>
            {base ? <span><i className="dot dot--base" />東京センチュリー</span> : <span><i className="avg-tick" />5社平均</span>}
            <span><i className="dot dot--other" />その他</span>
          </p>
        </div>
      </div>

      <CompareTable selected={selected} onSelect={onSelect} />
    </Section>
  );
}

function MetricStrip({ k, id, baseId }: { k: MetricKey; id: string; baseId?: string }) {
  const m = metrics[k];
  const c = byId(id);
  const vals = companies.map((x) => x[k]);
  const min = Math.min(...vals), max = Math.max(...vals);
  const pos = (v: number) => 4 + ((v - min) / (max - min || 1)) * 92;
  const ref = baseId ? byId(baseId)[k] : mean(vals);
  const diff = c[k] - ref;
  const pct = k === 'roe' || k === 'equity' || k === 'roa';
  const diffText = pct ? `${diff >= 0 ? '+' : ''}${diff.toFixed(k === 'roa' ? 2 : 1)}pt` : `${diff >= 0 ? '+' : ''}${m.fmt(diff)}${m.unit}`;

  return (
    <div className="strip">
      <div className="strip__head">
        <span className="strip__label"><MetricTerm k={k} /></span>
        <span className="strip__value num">{m.fmt(c[k])}<small>{m.unit}</small></span>
        <span className={`strip__diff num ${diff >= 0 ? 'up' : 'down'}`}>
          {Math.abs(diff) < 1e-9 ? '±0' : <>{diff >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}{diffText}</>}
          <small>{baseId ? 'vs TC' : 'vs 平均'}</small>
        </span>
        <span className="strip__rank">{rankLabel(id, k)}</span>
      </div>
      <div className="strip__track" aria-hidden>
        {!baseId && <span className="avg-tick" style={{ left: `${pos(ref)}%` }} />}
        {companies.map((x) => {
          const cls = x.id === id ? 'dot--sel' : x.id === baseId ? 'dot--base' : 'dot--other';
          return (
            <span
              key={x.id}
              className={`dot ${cls}`}
              title={`${x.name} ${m.fmt(x[k])}${m.unit}`}
              style={{ left: `${pos(x[k])}%`, ...(x.id === id ? { background: x.color } : {}) }}
            />
          );
        })}
      </div>
    </div>
  );
}

type SortKey = MetricKey | 'name';

function CompareTable({ selected, onSelect }: Props) {
  const [sort, setSort] = useState<{ key: SortKey; desc: boolean }>({ key: 'assets', desc: true });
  const rows = useMemo(() => {
    const r = [...companies];
    r.sort((a, b) => {
      const v = sort.key === 'name' ? a.name.localeCompare(b.name, 'ja') : a[sort.key] - b[sort.key];
      return sort.desc ? -v : v;
    });
    return r;
  }, [sort]);

  const maxOf = (k: MetricKey) => Math.max(...companies.map((c) => c[k]));
  const toggle = (key: SortKey) => setSort((s) => ({ key, desc: s.key === key ? !s.desc : key !== 'name' }));
  const arrow = (key: SortKey) => (sort.key === key ? (sort.desc ? '↓' : '↑') : '');

  return (
    <div className="card table-card">
      <div className="table-card__head">
        <h3>比較表</h3>
        <span>見出しをクリックで並べ替え／行をクリックで選択</span>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col"><button type="button" onClick={() => toggle('name')}>会社 {arrow('name')}</button></th>
              {metricKeys.map((k) => (
                <th key={k} scope="col" className="r" aria-sort={sort.key === k ? (sort.desc ? 'descending' : 'ascending') : 'none'}>
                  <button type="button" onClick={() => toggle(k)}><MetricTerm k={k} focusable={false} /><small>{metrics[k].unit}</small> {arrow(k)}</button>
                </th>
              ))}
              <th scope="col">ざっくり位置づけ</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className={c.id === selected ? 'is-sel' : ''} onClick={() => onSelect(c.id)}>
                <th scope="row"><i style={{ background: c.color }} />{c.name}</th>
                {metricKeys.map((k) => (
                  <td key={k} className="r">
                    <span className="cell-bar" style={{ width: `${(c[k] / maxOf(k)) * 100}%` }} />
                    <span className="num">{metrics[k].fmt(c[k])}</span>
                  </td>
                ))}
                <td className="summary">{t(c.summary)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
