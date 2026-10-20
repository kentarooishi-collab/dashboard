import { SiteHeader } from '../shared/SiteHeader';

const nav = [{ id: 'overview', label: '01 概要' }];

export function App() {
  return (
    <>
      <SiteHeader title="新しいダッシュボード" nav={nav} />
      <main className="container">
        <section id="overview" style={{ padding: '64px 0' }}>
          <h1>新しいダッシュボード</h1>
          <p style={{ color: 'var(--muted)', marginTop: 8 }}>ここに内容を実装します。</p>
        </section>
      </main>
    </>
  );
}
