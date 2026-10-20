import { useMemo, useState } from 'react';
import { Section } from './Section';
import { companies, metricKeys, metrics, rankLabel, rankOf, type MetricKey } from '../data';
import { linear, mean, niceDomain } from '../../shared/scale';

interface Props { selected: string; onSelect: (id: string) => void }

const presets: { label: string; x: MetricKey; y: MetricKey; size: MetricKey; note: string }[] = [
  { label: '規模 × 資本効率', x: 'assets', y: 'roe', size: 'profit', note: '大きいほど効率が落ちる？ 規模とROEの関係を見る' },
  { label: '財務の厚み × 資本効率', x: 'equity', y: 'roe', size: 'assets', note: '自己資本が厚いとROEは出にくい。その中で誰が稼いでいるか' },
  { label: '規模 × 資産効率', x: 'assets', y: 'roa', size: 'profit', note: '資産1単位あたりでどれだけ利益を出せているか' },
];

const tickFmt = (t: number) => t.toLocaleString('ja-JP', { maximumFractionDigits: 2 });

const W = 900, H = 420, M = { l: 64, r: 24, t: 24, b: 56 };

export function CompetitorMap({ selected, onSelect }: Props) {
  const [view, setView] = useState<'scatter' | 'rank'>('scatter');
  const [x, setX] = useState<MetricKey>('assets');
  const [y, setY] = useState<MetricKey>('roe');
  const [size, setSize] = useState<MetricKey>('profit');
  const [hover, setHover] = useState<string | null>(null);

  const preset = presets.find((p) => p.x === x && p.y === y && p.size === size);

  return (
    <Section
      id="map"
      index="03"
      eyebrow="競合マップ"
      title="主要リース5社の中で、東京センチュリーはどこにいる？"
      lead="軸を切り替えて、規模・効率・財務の厚みの違いを見比べてください。円をクリックすると、下の「会社比較」も連動します。"
    >
      <div className="card map">
        <div className="map__toolbar">
          <div className="segmented" role="group" aria-label="表示">
            <button type="button" aria-pressed={view === 'scatter'} onClick={() => setView('scatter')}>ポジションマップ</button>
            <button type="button" aria-pressed={view === 'rank'} onClick={() => setView('rank')}>指標別ランキング</button>
          </div>
          {view === 'scatter' && (
            <div className="map__presets" role="group" aria-label="見方のプリセット">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className={`chip-btn ${preset === p ? 'is-on' : ''}`}
                  onClick={() => { setX(p.x); setY(p.y); setSize(p.size); }}
                >{p.label}</button>
              ))}
            </div>
          )}
        </div>

        {view === 'scatter' ? (
          <>
            <div className="map__axes">
              <AxisSelect label="横軸" value={x} onChange={setX} />
              <AxisSelect label="縦軸" value={y} onChange={setY} />
              <AxisSelect label="円の大きさ" value={size} onChange={setSize} />
            </div>
            {preset && <p className="map__note">{preset.note}</p>}
            <Scatter x={x} y={y} size={size} selected={selected} hover={hover} onHover={setHover} onSelect={onSelect} />
            <Reading id={selected} keys={[x, y]} />
          </>
        ) : (
          <Ranking selected={selected} onSelect={onSelect} />
        )}

        <Legend selected={selected} onSelect={onSelect} />
        <p className="map__caveat">
          ※ 各社の事業構成・会計基準は完全には同一ではありません。オリックスは銀行・保険等も含むため、純粋なリース会社比較というより「リースから多角化した企業」の参照点です。
        </p>
      </div>
    </Section>
  );
}

function AxisSelect({ label, value, onChange }: { label: string; value: MetricKey; onChange: (k: MetricKey) => void }) {
  return (
    <label className="axis-select">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value as MetricKey)}>
        {metricKeys.map((k) => <option key={k} value={k}>{metrics[k].label}（{metrics[k].unit}）</option>)}
      </select>
    </label>
  );
}

interface ScatterProps {
  x: MetricKey; y: MetricKey; size: MetricKey;
  selected: string; hover: string | null;
  onHover: (id: string | null) => void; onSelect: (id: string) => void;
}

function Scatter({ x, y, size, selected, hover, onHover, onSelect }: ScatterProps) {
  const geo = useMemo(() => {
    const xd = niceDomain(companies.map((c) => c[x]));
    const yd = niceDomain(companies.map((c) => c[y]));
    const sx = linear(xd.min, xd.max, M.l, W - M.r);
    const sy = linear(yd.min, yd.max, H - M.b, M.t);
    const smax = Math.max(...companies.map((c) => c[size]));
    const r = (v: number) => 12 + Math.sqrt(Math.max(v, 0) / smax) * 34;
    return { xd, yd, sx, sy, r, xAvg: mean(companies.map((c) => c[x])), yAvg: mean(companies.map((c) => c[y])) };
  }, [x, y, size]);

  const { xd, yd, sx, sy, r } = geo;
  const focus = hover ?? null;
  const hovered = companies.find((c) => c.id === hover);
  // 大きい円を先に描いて、小さい円が隠れないようにする
  const order = [...companies].sort((a, b) => b[size] - a[size]);

  return (
    <div className="scatter">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${metrics[x].label}と${metrics[y].label}の散布図`}>
        {yd.ticks.map((t) => (
          <g key={`y${t}`}>
            <line className="grid" x1={M.l} x2={W - M.r} y1={sy(t)} y2={sy(t)} />
            <text className="tick" x={M.l - 10} y={sy(t)} dy="4" textAnchor="end">{tickFmt(t)}</text>
          </g>
        ))}
        {xd.ticks.map((t) => (
          <text key={`x${t}`} className="tick" x={sx(t)} y={H - M.b + 20} textAnchor="middle">{tickFmt(t)}</text>
        ))}
        <line className="axis" x1={M.l} x2={W - M.r} y1={H - M.b} y2={H - M.b} />

        <line className="avg" x1={sx(geo.xAvg)} x2={sx(geo.xAvg)} y1={M.t} y2={H - M.b} />
        <line className="avg" x1={M.l} x2={W - M.r} y1={sy(geo.yAvg)} y2={sy(geo.yAvg)} />
        <text className="avg-label" x={W - M.r - 4} y={sy(geo.yAvg) - 6} textAnchor="end">5社平均</text>

        <text className="axis-title" x={(M.l + W - M.r) / 2} y={H - 12} textAnchor="middle">{metrics[x].label}（{metrics[x].unit}） →</text>
        <text className="axis-title" x={16} y={(M.t + H - M.b) / 2} textAnchor="middle" transform={`rotate(-90 16 ${(M.t + H - M.b) / 2})`}>{metrics[y].label}（{metrics[y].unit}） →</text>

        {order.map((c) => {
          const cx = sx(c[x]), cy = sy(c[y]), rr = r(c[size]);
          const isSel = c.id === selected;
          const dim = focus && focus !== c.id;
          return (
            <g
              key={c.id}
              className={`bubble ${isSel ? 'is-sel' : ''} ${dim ? 'is-dim' : ''}`}
              style={{ ['--c' as string]: c.color, transform: `translate(${cx}px, ${cy}px)` }}
              tabIndex={0}
              role="button"
              aria-label={`${c.name}：${metrics[x].label} ${metrics[x].fmt(c[x])}${metrics[x].unit}、${metrics[y].label} ${metrics[y].fmt(c[y])}${metrics[y].unit}`}
              aria-pressed={isSel}
              onMouseEnter={() => onHover(c.id)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(c.id)}
              onBlur={() => onHover(null)}
              onClick={() => onSelect(c.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(c.id); } }}
            >
              <circle r={rr} className="bubble__circle" />
              <text className="bubble__short" dy="4" textAnchor="middle">{c.short}</text>
              {(isSel || hover === c.id) && <text className="bubble__name" y={-rr - 8} textAnchor="middle">{c.name}</text>}
            </g>
          );
        })}
      </svg>
      {hovered && (
        <div
          className="tooltip"
          style={{ left: `${(sx(hovered[x]) / W) * 100}%`, top: `${(sy(hovered[y]) / H) * 100}%` }}
          role="status"
        >
          <strong><i style={{ background: hovered.color }} />{hovered.name}</strong>
          {[x, y, size].filter((k, i, a) => a.indexOf(k) === i).map((k) => (
            <div key={k} className="tooltip__row">
              <span>{metrics[k].label}</span>
              <span className="num">{metrics[k].fmt(hovered[k])}{metrics[k].unit}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Reading({ id, keys }: { id: string; keys: MetricKey[] }) {
  const c = companies.find((x) => x.id === id)!;
  const uniq = keys.filter((k, i) => keys.indexOf(k) === i);
  return (
    <div className="reading">
      <span className="reading__who"><i style={{ background: c.color }} />{c.name}</span>
      {uniq.map((k) => (
        <span key={k} className="reading__item">
          {metrics[k].label} <b className="num">{metrics[k].fmt(c[k])}{metrics[k].unit}</b>
          <span className="reading__rank">{rankLabel(id, k)}</span>
        </span>
      ))}
    </div>
  );
}

function Ranking({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  return (
    <div className="ranking">
      {metricKeys.map((k) => {
        const m = metrics[k];
        const sorted = [...companies].sort((a, b) => b[k] - a[k]);
        const max = sorted[0][k];
        return (
          <div key={k} className="ranking__block">
            <div className="ranking__head">
              <h4>{m.label}<small>（{m.unit}）</small></h4>
              <p>{m.hint}</p>
            </div>
            <ul>
              {sorted.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    className={`bar-row ${c.id === selected ? 'is-sel' : ''}`}
                    onClick={() => onSelect(c.id)}
                  >
                    <span className="bar-row__rank num">{rankOf(c.id, k)}</span>
                    <span className="bar-row__name">{c.name}</span>
                    <span className="bar-row__track">
                      <span className="bar-row__fill" style={{ width: `${(c[k] / max) * 100}%`, background: c.color }} />
                    </span>
                    <span className="bar-row__val num">{m.fmt(c[k])}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function Legend({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  return (
    <div className="legend" role="group" aria-label="会社を選択">
      {companies.map((c) => (
        <button
          key={c.id}
          type="button"
          className={`legend__item ${c.id === selected ? 'is-sel' : ''}`}
          aria-pressed={c.id === selected}
          onClick={() => onSelect(c.id)}
        >
          <i style={{ background: c.color }} />{c.name}
        </button>
      ))}
    </div>
  );
}
