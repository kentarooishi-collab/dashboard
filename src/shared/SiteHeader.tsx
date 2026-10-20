import { useEffect, useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import { ThemeToggle } from './theme';

export interface NavItem { id: string; label: string }
export interface PageLink { href: string; label: string; current?: boolean }

interface Props {
  /** ダッシュボード名（ポータルでは省略） */
  title?: string;
  /** ページ内セクションへのリンク。スクロール位置に合わせて現在地をハイライトする */
  nav?: NavItem[];
  /** 同じダッシュボード内のページ切り替え（サブページがあるとき） */
  pages?: PageLink[];
}

/** 現在表示中のセクション id を返す（スクロールスパイ） */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (!ids.length) return;
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids.join('|')]);
  return active;
}

export function SiteHeader({ title, nav = [], pages = [] }: Props) {
  const active = useActiveSection(nav.map((n) => n.id));
  const home = import.meta.env.BASE_URL;
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="site-header__brand" href={home}>
          <span className="site-header__logo"><LayoutGrid size={16} /></span>
          Dashboards
        </a>
        {title && <span className="site-header__crumb">/ {title}</span>}
        <nav className="site-header__nav" aria-label="セクション">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} aria-current={active === n.id}>{n.label}</a>
          ))}
        </nav>
        {!nav.length && <span style={{ marginLeft: 'auto' }} />}
        <ThemeToggle />
      </div>
      {pages.length > 0 && (
        <div className="site-header__pages">
          <div className="container site-header__pages-inner">
            {pages.map((p) => (
              <a key={p.href} href={p.href} aria-current={p.current ? 'page' : undefined}>{p.label}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
