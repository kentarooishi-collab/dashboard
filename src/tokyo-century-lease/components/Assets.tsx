import { useState } from 'react';
import { Section } from './Section';
import { assets } from '../content';

export function Assets() {
  const [activeId, setActiveId] = useState(assets[0].id);
  const a = assets.find((x) => x.id === activeId) ?? assets[0];
  const Icon = a.icon;

  return (
    <Section
      id="assets"
      index="02"
      eyebrow="アセット"
      title="アセット ＝ お金を生む「価値あるもの」"
      lead="会計上は現金や債権も資産ですが、東京センチュリーを理解するときは「将来キャッシュを生む商売道具」と考えると分かりやすくなります。種類を選ぶと詳細が出ます。"
    >
      <div className="assets">
        <div className="asset-grid" role="tablist" aria-label="アセットの種類">
          {assets.map((x) => {
            const I = x.icon;
            const on = x.id === activeId;
            return (
              <button
                key={x.id}
                type="button"
                role="tab"
                aria-selected={on}
                className={`card asset-tile ${on ? 'is-on' : ''}`}
                onClick={() => setActiveId(x.id)}
              >
                <span className="asset-tile__icon"><I size={22} /></span>
                <span className="asset-tile__name">{x.name}</span>
                <span className="asset-tile__type">{x.type}</span>
              </button>
            );
          })}
        </div>

        <article className="card asset-detail" role="tabpanel" aria-live="polite">
          <div className="asset-detail__head">
            <span className="asset-detail__icon"><Icon size={28} /></span>
            <div>
              <span className="tag">{a.type}</span>
              <h3>{a.name}</h3>
            </div>
          </div>
          <p className="asset-detail__desc">{a.desc}</p>
          <dl className="asset-detail__list">
            <div><dt>具体例</dt><dd className="chips">{a.examples.map((e) => <span key={e} className="chip">{e}</span>)}</dd></div>
            <div><dt>どう稼ぐか</dt><dd>{a.earn}</dd></div>
            <div><dt>何を読むか</dt><dd>{a.watch}</dd></div>
          </dl>
        </article>
      </div>
    </Section>
  );
}
