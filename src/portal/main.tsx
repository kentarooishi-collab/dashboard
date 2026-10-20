import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Search } from 'lucide-react';
import '../shared/tokens.css';
import './portal.css';
import { SiteHeader } from '../shared/SiteHeader';
import { dashboards } from '../registry';

function Portal() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('すべて');
  const categories = ['すべて', ...new Set(dashboards.map((d) => d.category))];

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return dashboards
      .filter((d) => category === 'すべて' || d.category === category)
      .filter((d) => !q || [d.title, d.description, ...d.tags].join(' ').toLowerCase().includes(q))
      .sort((a, b) => b.updated.localeCompare(a.updated));
  }, [query, category]);

  return (
    <>
      <SiteHeader />
      <main className="container portal">
        <section className="portal__hero">
          <p className="portal__eyebrow">Dashboards</p>
          <h1>ダッシュボード一覧</h1>
          <p className="portal__lead">業界研究やデータ可視化のダッシュボードをまとめています。カードを選ぶと各ダッシュボードが開きます。</p>
        </section>

        <div className="portal__toolbar">
          <label className="portal__search">
            <Search size={16} aria-hidden />
            <input
              type="search"
              placeholder="タイトル・タグで検索"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <div className="segmented" role="group" aria-label="カテゴリ">
            {categories.map((c) => (
              <button key={c} type="button" aria-pressed={c === category} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
          <span className="portal__count">{items.length} 件</span>
        </div>

        <ul className="portal__grid">
          {items.map((d) => (
            <li key={d.slug}>
              <a className="card portal__card" href={`${import.meta.env.BASE_URL}${d.slug}/`}>
                <div className="portal__card-top">
                  <span className="tag">{d.category}</span>
                  <ArrowUpRight size={18} className="portal__arrow" aria-hidden />
                </div>
                <h2>{d.title}</h2>
                <p>{d.description}</p>
                <div className="portal__card-foot">
                  <div className="portal__tags">{d.tags.map((t) => <span key={t}>#{t}</span>)}</div>
                  <time dateTime={d.updated}>更新 {d.updated.replaceAll('-', '.')}</time>
                </div>
              </a>
            </li>
          ))}
        </ul>
        {!items.length && <p className="portal__empty">該当するダッシュボードがありません。</p>}
      </main>
      <footer className="site-footer">
        <div className="container">© kentarooishi-collab / dashboard</div>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><Portal /></StrictMode>);
