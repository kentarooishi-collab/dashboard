import { Check } from 'lucide-react';
import { Section } from '../components/Section';
import { drivers, investment, plan2027, roadmap, segments } from './data';
import { G, t } from './glossary';

export function Plan() {
  const maxProfit = Math.max(...roadmap.map((r) => r.profit));
  const segPlan = [...segments].sort((a, b) => b.profit2030 - a.profit2030);
  const maxSeg = Math.max(...segPlan.map((s) => s.profit2030));
  const invTotal = investment.reduce((a, i) => a + i.amount, 0);
  const base = roadmap[0].profit;
  const wf = drivers.reduce<{ label: string; from: number; to: number; desc: string }[]>((acc, d) => {
    const from = acc.length ? acc[acc.length - 1].to : base;
    return [...acc, { label: d.label, from, to: from + d.amount, desc: d.desc }];
  }, []);
  const wfMax = 2100;

  return (
    <Section
      id="plan"
      index="05"
      eyebrow="中期経営計画"
      title="2030年度に純利益2,000億円。その先の2035年度は4,000億円"
      lead="2026年5月に「長期ビジョン2035」と「中期経営計画2030 〜Shaping Our Blue Planet〜」を公表しました。前の計画（中計2027）は、財務目標を2年前倒しで達成しています。"
    >
      <div className="plan-top">
        <div className="card plan27">
          <h3>前計画「中計2027」の達成状況</h3>
          <p className="note-sm">目標（2027年度） vs 2025年度実績</p>
          {plan2027.map((p) => (
            <div key={p.label} className="plan27__row">
              <span className="plan27__label">{p.label === '純利益' ? <G k="純利益" /> : <G k={p.label} />}</span>
              <span className="plan27__track">
                <span className="plan27__fill" style={{ width: `${Math.min(100, (p.actual / p.target) * 100)}%` }} />
              </span>
              <span className="plan27__val num">{p.actual.toLocaleString()}<small>{p.unit}</small></span>
              <span className="plan27__tgt num">目標 {p.target.toLocaleString()}{p.unit}</span>
              <span className="plan27__ok"><Check size={14} />達成</span>
            </div>
          ))}
        </div>

        <div className="card roadmap">
          <h3>利益とROEのロードマップ</h3>
          <div className="roadmap__cols">
            {roadmap.map((r, i) => (
              <div key={r.year} className={`roadmap__col ${i === 0 ? 'is-actual' : ''}`}>
                <span className="roadmap__val num">{r.profit.toLocaleString()}<small>億円</small></span>
                <span className="bar-area"><span className="roadmap__bar" style={{ height: `${(r.profit / maxProfit) * 100}%` }} /></span>
                <span className="roadmap__year">{r.year}</span>
                <span className="roadmap__sub">{r.sub}</span>
                <span className="roadmap__roe num">ROE {r.roe}%{i > 0 && (i === 1 ? '以上' : '')}</span>
              </div>
            ))}
          </div>
          <p className="note-sm">2035年度は<G k="時価総額" />5兆円程度も目指す。前提為替レートは1ドル＝150円。</p>
        </div>
      </div>

      <h3 className="sub-title">2,000億円への道筋：3つの成長戦略（2025→2030年度の増益額）</h3>
      <div className="card wf">
        <div className="wf__chart">
          <div className="wf__col">
            <span className="wf__bar wf__bar--base" style={{ bottom: 0, height: `${(base / wfMax) * 100}%` }} />
            <span className="wf__num num" style={{ bottom: `${(base / wfMax) * 100}%` }}>{base.toLocaleString()}</span>
            <span className="wf__label">2025年度 実績</span>
          </div>
          {wf.map((w) => (
            <div key={w.label} className="wf__col">
              <span className="wf__bar" style={{ bottom: `${(w.from / wfMax) * 100}%`, height: `${((w.to - w.from) / wfMax) * 100}%` }} />
              <span className="wf__num num" style={{ bottom: `${(w.to / wfMax) * 100}%` }}>+約{(w.to - w.from).toLocaleString()}</span>
              <span className="wf__label">{t(w.label)}</span>
            </div>
          ))}
          <div className="wf__col">
            <span className="wf__bar wf__bar--goal" style={{ bottom: 0, height: `${(2000 / wfMax) * 100}%` }} />
            <span className="wf__num num" style={{ bottom: `${(2000 / wfMax) * 100}%` }}>2,000</span>
            <span className="wf__label">2030年度 目標</span>
          </div>
        </div>
        <ul className="wf__desc">
          {drivers.map((d) => (
            <li key={d.label}><b>{t(d.label)}（+約{d.amount}億円）</b>{t(d.desc)}</li>
          ))}
        </ul>
        <p className="note-sm">単位：億円。各戦略の増益額は会社資料の概算で、積み上げ（+約900億円）は計画上の増益額+887億円とほぼ一致します。</p>
      </div>

      <div className="plan-grid">
        <div className="card plan-seg">
          <h3>部門別の2030年度純利益計画</h3>
          {segPlan.map((s) => (
            <div key={s.name} className="plan-seg__row">
              <span>{s.name}</span>
              <span className="plan-seg__track"><span style={{ width: `${(s.profit2030 / maxSeg) * 100}%` }} /></span>
              <b className="num">{s.profit2030}</b>
            </div>
          ))}
          <p className="note-sm">単位：億円。このほか「その他」が△110億円。</p>
        </div>

        <div className="card plan-inv">
          <h3>成長投資は2兆円超</h3>
          <div className="own-bar" role="img" aria-label={investment.map((i) => `${i.label} 約${i.amount.toLocaleString()}億円`).join('、')}>
            {investment.map((i) => <span key={i.label} style={{ flexGrow: i.amount, background: i.color }} />)}
          </div>
          <ul className="own-list">
            {investment.map((i) => (
              <li key={i.label}><i style={{ background: i.color }} />{i.label}<b className="num">約{(i.amount / 10000).toFixed(1)}兆円</b><span className="num own-list__pct">{Math.round((i.amount / invTotal) * 100)}%</span></li>
            ))}
          </ul>
          <h4>2031年3月末の想定バランスシート</h4>
          <div className="bs-compare">
            <div><span>総資産</span><b className="num">7.21 → 約8.2</b><small>兆円</small></div>
            <div><span><G k="自己資本" /></span><b className="num">1.12 → 約1.6</b><small>兆円</small></div>
            <div><span><G k="自己資本比率" /></span><b className="num">15.5 → 約19</b><small>%</small></div>
          </div>
          <p className="note-sm">{t('利益に占める成長・戦略事業の比率を約40%から約60%へ。金融色の強い低収益事業は縮小する。')}</p>
        </div>

        <div className="card plan-vision">
          <h3>目指す姿</h3>
          <p className="vision__label">Purpose</p>
          <p className="vision__quote">青い地球の未来をつくる</p>
          <p className="vision__label">Vision</p>
          <p className="vision__quote">地球規模の社会課題を解決に導く「永遠のベンチャー企業」</p>
          <p className="vision__label">重点を置く社会課題</p>
          <div className="chips">
            {['サーキュラーエコノミー', 'エネルギー', '社会インフラ', 'AI・テクノロジー'].map((c) => <span key={c} className="chip">{c}</span>)}
          </div>
        </div>
      </div>

      <div className="card progress">
        <div>
          <h3>最新の進捗（2027年3月期 第1四半期）</h3>
          <p className="note-sm">2026年8月3日公表。通期予想は据え置き。</p>
        </div>
        <div className="progress__body">
          <div className="progress__nums">
            <span><G k="純利益" /> <b className="num">351</b>億円<small>（前年同期比 +59.1%）</small></span>
            <span>通期予想 <b className="num">1,230</b>億円</span>
          </div>
          <div className="progress__track" aria-label="通期予想に対する進捗率 約28.6%">
            <span style={{ width: '28.6%' }} />
            <i style={{ left: '25%' }} title="4分の1（25%）の目安" />
          </div>
          <p className="note-sm">進捗率は約28.6%（筆者計算）。縦線は1年の4分の1（25%）の目安。</p>
        </div>
      </div>
    </Section>
  );
}
