/**
 * ダッシュボード一覧。新しいダッシュボードを追加したらここに1件足すと、ポータルに表示される。
 * slug は src/<slug>/index.html のフォルダ名と一致させる。
 */
export interface DashboardEntry {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  updated: string; // YYYY-MM-DD
}

export const dashboards: DashboardEntry[] = [
  {
    slug: 'tokyo-century-lease',
    title: '東京センチュリー入門｜リース業界ダッシュボード',
    description:
      'リースの仕組み、アセットの種類、主要5社の競合ポジションを触りながら理解する入門ダッシュボード（2026年3月期）。',
    category: '業界研究',
    tags: ['リース', '金融', '競合比較'],
    updated: '2026-10-20',
  },
];
