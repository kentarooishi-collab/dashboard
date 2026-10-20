import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Section } from '../components/Section';
import { affiliates, partners, segments, type AffiliateType } from './data';
import { G, t } from './glossary';

export function Group() {
  const [type, setType] = useState<AffiliateType | 'all'>('all');
  const [region, setRegion] = useState<'all' | 'jp' | 'overseas'>('all');
  const [q, setQ] = useState('');
  const maxAssets = Math.max(...segments.map((s) => s.assets));
  const totalAssets = segments.reduce((a, s) => a + s.assets, 0);

  const list = useMemo(() => affiliates.filter((a) =>
    (type === 'all' || a.type === type) &&
    (region === 'all' || (region === 'overseas' ? a.overseas : !a.overseas)) &&
    (!q.trim() || [a.name, a.business, a.partner ?? '', a.note ?? ''].join(' ').includes(q.trim())),
  ), [type, region, q]);

  return (
    <Section
      id="group"
      index="02"
      eyebrow="グループ構造"
      title="「窓口2部門 × 商材4部門」と、パートナーとの合弁網"
      lead={<>2026年4月に組織を6部門に再編しました。主な子会社・関連会社には、伊藤忠やNTTなど株主・パートナーとの<G k="合弁" />が多いのが特徴です。</>}
    >
      <div className="seg">
        <div className="card seg__card">
          <div className="seg__head">
            <h3>6部門の資産残高</h3>
            <span>2026年6月末・億円／6部門計 <b className="num">{totalAssets.toLocaleString()}</b></span>
          </div>
          {(['フロント', 'プロダクツ'] as const).map((g) => (
            <div key={g} className="seg__group">
              <p className="seg__group-label">{g === 'フロント' ? 'フロント部門（顧客の窓口）' : 'プロダクツ部門（商材・アセット）'}</p>
              {segments.filter((s) => s.group === g).map((s) => (
                <div key={s.name} className="seg__row">
                  <span className="seg__name">{s.name}</span>
                  <span className="seg__track"><span className="seg__fill" style={{ width: `${(s.assets / maxAssets) * 100}%` }} /></span>
                  <span className="seg__val num">{s.assets.toLocaleString()}</span>
                  <span className="seg__share num">{((s.assets / totalAssets) * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          ))}
          <p className="note-sm">会社資料上の全社合計は64,559億円（6部門以外を含む）。2026年3月期までは「国内リース／オートモビリティ／スペシャルティ／国際／環境インフラ」の5<G k="セグメント" />でした。</p>
        </div>

        <div className="partners">
          {partners.map((p) => (
            <div key={p.name} className="card partner">
              <div className="partner__head">
                <h3>{p.name}</h3>
                <span className="tag">{p.stake}</span>
              </div>
              <ul>{p.ties.map((tie) => <li key={tie}>{t(tie)}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>

      <h3 className="sub-title">主な子会社・関連会社（2026年3月末・議決権所有割合）</h3>
      <div className="aff-toolbar">
        <div className="segmented" role="group" aria-label="区分">
          <button type="button" aria-pressed={type === 'all'} onClick={() => setType('all')}>すべて</button>
          <button type="button" aria-pressed={type === '連結子会社'} onClick={() => setType('連結子会社')}>連結子会社</button>
          <button type="button" aria-pressed={type === '持分法適用会社'} onClick={() => setType('持分法適用会社')}>持分法適用会社</button>
        </div>
        <div className="segmented" role="group" aria-label="地域">
          <button type="button" aria-pressed={region === 'all'} onClick={() => setRegion('all')}>国内外</button>
          <button type="button" aria-pressed={region === 'jp'} onClick={() => setRegion('jp')}>国内</button>
          <button type="button" aria-pressed={region === 'overseas'} onClick={() => setRegion('overseas')}>海外</button>
        </div>
        <label className="aff-search">
          <Search size={15} aria-hidden />
          <input type="search" placeholder="会社名・事業・パートナー" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <span className="aff-count">{list.length} 社</span>
      </div>
      <p className="note-sm aff-legend">
        <span><i className="aff-dot aff-dot--c" /><G k="連結子会社" />＝決算にまるごと合算</span>
        <span><i className="aff-dot aff-dot--e" /><G k="持分法適用会社" />＝利益の持分だけ取り込む</span>
      </p>
      <div className="aff-grid">
        {list.map((a) => (
          <div key={a.name} className={`card aff ${a.type === '連結子会社' ? 'aff--c' : 'aff--e'}`}>
            <div className="aff__top">
              <span className="aff__type">{a.type === '連結子会社' ? '連結' : '持分法'}</span>
              {a.partner && <span className="aff__partner">× {a.partner}</span>}
            </div>
            <h4>{a.name}</h4>
            <p className="aff__biz">{a.business}</p>
            <div className="aff__share">
              <span className="aff__track"><span style={{ width: `${a.share}%` }} /></span>
              <span className="num">{a.share.toFixed(1)}%</span>
            </div>
            {a.note && <p className="aff__note">{t(a.note)}</p>}
          </div>
        ))}
      </div>
      <p className="note-sm">ここに挙げたのは主な会社です。このほかにも多数の連結子会社・持分法適用会社があります。</p>
    </Section>
  );
}
