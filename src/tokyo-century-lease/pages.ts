const base = `${import.meta.env.BASE_URL}tokyo-century-lease/`;

/** このダッシュボード内のページ（ヘッダーのタブ） */
export const pageLinks = (current: 'overview' | 'company') => [
  { href: base, label: '業界・競合ダッシュボード', current: current === 'overview' },
  { href: `${base}company/`, label: '会社詳細（沿革・グループ・財務・中計）', current: current === 'company' },
];
