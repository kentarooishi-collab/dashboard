import { ArrowDown } from 'lucide-react';
import { byId, companies, metrics, rankLabel, rankOf, type MetricKey } from '../data';

const kpis: MetricKey[] = ['assets', 'profit', 'roe', 'equity'];

export function Hero() {
  const tc = byId('tc');
  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <div className="hero__tags">
            <span className="tag">東京センチュリー入門</span>
            <span className="tag">2026年3月期</span>
          </div>
          <h1>
            <span className="nobr">「リース会社」なのに、</span>
            <br />
            <span className="nobr">なぜ<em>事業の中</em>まで</span><span className="nobr">入れるのか？</span>
          </h1>
          <p className="hero__lead">
            答えは、<strong>アセット（資産）を自ら持ち、資金・残価・運用のリスクまで引き受ける</strong>から。
            仕組み → アセット → 競合の順に、触りながら理解できます。
          </p>
          <ol className="hero__path">
            <li><a href="#mechanism"><span className="num">01</span>お金とモノの流れ</a></li>
            <li><a href="#assets"><span className="num">02</span>何を持っているか</a></li>
            <li><a href="#map"><span className="num">03</span>競合との位置関係</a></li>
          </ol>
        </div>

        <div className="card hero__kpis">
          <div className="hero__kpis-head">
            <h2>東京センチュリーのサイズ感</h2>
            <span className="hero__kpis-sub">主要リース{companies.length}社中の順位</span>
          </div>
          <div className="kpi-grid">
            {kpis.map((k) => {
              const m = metrics[k];
              const rank = rankOf('tc', k);
              return (
                <div className="kpi" key={k}>
                  <span className="kpi__label">{m.label}</span>
                  <span className="kpi__value num">
                    {m.fmt(tc[k])}<small>{m.unit}</small>
                  </span>
                  <span className="kpi__rank">
                    <RankDots rank={rank} total={companies.length} />
                    {rankLabel('tc', k)} / {companies.length}社
                  </span>
                </div>
              );
            })}
          </div>
          <a className="hero__kpis-link" href="#compare">5社の比較を見る <ArrowDown size={14} /></a>
        </div>
      </div>
    </section>
  );
}

function RankDots({ rank, total }: { rank: number; total: number }) {
  return (
    <span className="rank-dots" aria-hidden>
      {Array.from({ length: total }, (_, i) => (
        <i key={i} className={i === rank - 1 ? 'on' : ''} />
      ))}
    </span>
  );
}
