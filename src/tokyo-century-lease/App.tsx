import { useState } from 'react';
import { SiteHeader } from '../shared/SiteHeader';
import { Hero } from './components/Hero';
import { Mechanism } from './components/Mechanism';
import { Assets } from './components/Assets';
import { CompetitorMap } from './components/CompetitorMap';
import { Compare } from './components/Compare';
import { sources } from './data';
import { pageLinks } from './pages';

const nav = [
  { id: 'mechanism', label: '01 仕組み' },
  { id: 'assets', label: '02 アセット' },
  { id: 'map', label: '03 競合マップ' },
  { id: 'compare', label: '04 会社比較' },
];

export function App() {
  // 競合マップと会社比較で共有する「選択中の会社」
  const [selected, setSelected] = useState('tc');

  return (
    <>
      <SiteHeader title="東京センチュリー入門" nav={nav} pages={pageLinks('overview')} />
      <main>
        <Hero />
        <Mechanism />
        <Assets />
        <CompetitorMap selected={selected} onSelect={setSelected} />
        <Compare selected={selected} onSelect={setSelected} />
      </main>
      <footer className="site-footer">
        <div className="container">
          <p>数値は2026年3月期／3月末の各社公表値をベースに整理。ROAは「純利益÷期末総資産」で算出した簡易値です。</p>
          <p className="sources">
            出典：
            {sources.map((s, i) => (
              <span key={s.url}>
                {i > 0 && ' / '}
                <a href={s.url} target="_blank" rel="noreferrer">{s.name}</a>
              </span>
            ))}
          </p>
        </div>
      </footer>
    </>
  );
}
