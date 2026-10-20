import { ArrowRight } from 'lucide-react';
import { SiteHeader } from '../../shared/SiteHeader';
import { pageLinks } from '../pages';
import { History } from './History';
import { Group } from './Group';
import { Financials } from './Financials';
import { Shareholders } from './Shareholders';
import { Plan } from './Plan';
import { sources } from './data';
import { G } from './glossary';

const nav = [
  { id: 'history', label: '01 沿革' },
  { id: 'group', label: '02 グループ' },
  { id: 'financials', label: '03 財務' },
  { id: 'shareholders', label: '04 株主' },
  { id: 'plan', label: '05 中計' },
];

const facts = [
  { label: '母体の設立', value: '1969', unit: '年', sub: 'センチュリー・リーシング・システム' },
  { label: '現在の社名', value: '2016', unit: '年〜', sub: '2009年の合併を経て改称' },
  { label: '総資産', value: '7.21', unit: '兆円', sub: '2026年3月末・連結' },
  { label: '筆頭株主', value: '29.94', unit: '%', sub: '伊藤忠商事' },
  { label: '2030年度の目標', value: '2,000', unit: '億円', sub: '純利益（中計2030）' },
];

export function CompanyApp() {
  return (
    <>
      <SiteHeader title="東京センチュリー会社詳細" nav={nav} pages={pageLinks('company')} />
      <main>
        <section className="hero hero--company">
          <div className="container">
            <div className="hero__tags">
              <span className="tag">会社詳細</span>
              <span className="tag">調査日 2026-10-21</span>
            </div>
            <h1>
              <span className="nobr">東京センチュリーを、</span><span className="nobr">もう一歩深く。</span>
            </h1>
            <p className="hero__lead">
              どう生まれ、誰と組み、何を持ち、どこへ向かうのか。<strong>沿革・グループ・財務・株主・中期経営計画</strong>の5つの視点で整理しました。
              業界全体や競合との比較は<a href={pageLinks('company')[0].href}>業界・競合ダッシュボード</a>をご覧ください。
            </p>
            <p className="hero__hint"><span className="term">点線の用語</span>にマウスを乗せる（スマホはタップ）と、意味が表示されます。</p>
            <div className="facts">
              {facts.map((f) => (
                <div key={f.label} className="card fact">
                  <span className="fact__label">{f.label}</span>
                  <span className="fact__value num">{f.value}<small>{f.unit}</small></span>
                  <span className="fact__sub">{f.sub}</span>
                </div>
              ))}
            </div>
            <ol className="hero__path">
              {nav.map((n) => (
                <li key={n.id}><a href={`#${n.id}`}><span className="num">{n.label.slice(0, 2)}</span>{n.label.slice(3)}</a></li>
              ))}
            </ol>
          </div>
        </section>

        <History />
        <Group />
        <Financials />
        <Shareholders />
        <Plan />

        <section className="section">
          <div className="container">
            <div className="card caveats">
              <h3>注意点</h3>
              <ul>
                <li>公開資料をもとに整理したもので、調査日は2026-10-21です。数値は各資料の公表時点の値です。</li>
                <li>主な子会社・関連会社と有価証券報告書の沿革は、EDINETの原本ではなく転載サイトで確認しています。社外で使う前に原本との照合をおすすめします。</li>
                <li>ACG持分の伊藤忠への譲渡は2026年11月実行予定で、調査日時点では完了していない見込みです。</li>
                <li>「有利子負債÷自己資本」と第1四半期の進捗率は、公表値から筆者が計算した値です。</li>
                <li>中計資料に載っている2025年度の部門別数値は、会社自身が「概算値」としています。</li>
              </ul>
              <p className="note-sm">用語：<G k="連結子会社" />／<G k="持分法適用会社" />／<G k="有利子負債" />／<G k="キャピタルライト" /></p>
              <a className="caveats__back" href={pageLinks('company')[0].href}>業界・競合ダッシュボードへ <ArrowRight size={14} /></a>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container">
          <p>出典：</p>
          <ul className="source-list">
            {sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.label}</a></li>)}
          </ul>
        </div>
      </footer>
    </>
  );
}
