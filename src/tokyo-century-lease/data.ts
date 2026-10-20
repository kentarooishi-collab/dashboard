// 2026年3月期 / 3月末の各社公表値ベース（元HTMLの値をそのまま使用）。
// 純利益は元データの「十億円」を「億円」に換算して保持する。

export type MetricKey = 'assets' | 'profit' | 'roe' | 'equity' | 'roa';

export interface Company {
  id: string;
  name: string;
  short: string;
  color: string; // CSS 変数名
  assets: number; // 兆円
  profit: number; // 億円
  roe: number; // %
  equity: number; // 自己資本比率 %
  roa: number; // 純利益 ÷ 総資産（期末・簡易計算）%
  summary: string;
  focus: string[];
  financial: string;
  business: string;
}

const raw = [
  {
    id: 'tc', name: '東京センチュリー', short: 'TC', assets: 7.2148, profitBn: 111.299, roe: 10.4, equity: 15.5,
    summary: '国内・海外の顧客起点ビジネスに、社会インフラ／トランスポート／モビリティ／企業投資を組み合わせる。',
    focus: ['社会インフラ', 'トランスポート', 'モビリティ', '企業投資'],
    financial: 'https://www.tokyocentury.co.jp/jp/ir/library/pdf/2025_4q_jp_earnings-call.pdf',
    business: 'https://www.tokyocentury.co.jp/jp/company/info/outline/',
  },
  {
    id: 'mhc', name: '三菱HCキャピタル', short: 'MHC', assets: 13.089557, profitBn: 162.2, roe: 8.6, equity: 15.2,
    summary: 'グローバルなアセットファイナンス。航空・物流・不動産・環境エネルギーなど専門事業を広く展開。',
    focus: ['航空', '物流', '不動産', '環境エネルギー'],
    financial: 'https://www.mitsubishi-hc-capital.com/investors/library/assets/pdf/2026052101.pdf',
    business: 'https://www.mitsubishi-hc-capital.com/investors/individual/at-a-glance.html',
  },
  {
    id: 'orix', name: 'オリックス', short: 'ORIX', assets: 18.002776, profitBn: 447.265, roe: 10.4, equity: 24.9,
    summary: 'リースから発展した総合事業会社。法人金融、不動産、PE、環境、保険、銀行、輸送機器まで多角化。',
    focus: ['法人金融', '不動産', 'PE', '環境', '保険', '銀行', '輸送機器'],
    financial: 'https://www.orix.co.jp/grp/pdf/company/ir/financial_highlight/ORIX5YPDF2026.pdf',
    business: 'https://www.orix.co.jp/grp/company/ir/financial/segment/',
  },
  {
    id: 'smfl', name: '三井住友ファイナンス＆リース', short: 'SMFL', assets: 10.894144, profitBn: 120.069, roe: 10.2, equity: 11.1,
    summary: 'SMFG×住友商事。ホールセール、グローバル、環境、不動産、投融資。航空機・不動産AMにも展開。',
    focus: ['ホールセール', 'グローバル', '環境', '不動産', '投融資'],
    financial: 'https://www.smfl.co.jp/corporate/assets/260513.pdf',
    business: 'https://www.smfl.co.jp/corporate/strength/',
  },
  {
    id: 'fgl', name: '芙蓉総合リース', short: 'FGL', assets: 3.843725, profitBn: 21.565, roe: 4.4, equity: 13.1,
    summary: '不動産、航空、環境、BPO/ICT、ヘルスケア、モビリティ/物流、循環型経済へ拡張。',
    focus: ['不動産', '航空', '環境', 'BPO/ICT', 'ヘルスケア', 'モビリティ/物流'],
    financial: 'https://www2.jpx.co.jp/disc/84240/140120260511523036.pdf',
    business: 'https://www.fgl.co.jp/fgl/about.html',
  },
];

export const companies: Company[] = raw.map(({ profitBn, ...c }) => {
  const profit = profitBn * 10; // 十億円 → 億円
  return {
    ...c,
    color: `var(--c-${c.id})`,
    profit,
    roa: (profit / (c.assets * 10000)) * 100,
  };
});

export const byId = (id: string) => companies.find((c) => c.id === id) ?? companies[0];

export interface Metric {
  key: MetricKey;
  label: string;
  unit: string;
  fmt: (v: number) => string;
  hint: string;
}

export const metrics: Record<MetricKey, Metric> = {
  assets: { key: 'assets', label: '総資産', unit: '兆円', fmt: (v) => v.toFixed(2), hint: 'どれだけの資産をB/Sに抱えているか＝規模' },
  profit: { key: 'profit', label: '純利益', unit: '億円', fmt: (v) => Math.round(v).toLocaleString('ja-JP'), hint: '最終的に残った利益の額' },
  roe: { key: 'roe', label: 'ROE', unit: '%', fmt: (v) => v.toFixed(1), hint: '株主のお金でどれだけ稼いだか＝資本効率' },
  equity: { key: 'equity', label: '自己資本比率', unit: '%', fmt: (v) => v.toFixed(1), hint: '資産のうち自前の資本の割合＝財務の厚み' },
  roa: { key: 'roa', label: 'ROA', unit: '%', fmt: (v) => v.toFixed(2), hint: '資産1単位あたりの稼ぐ力（純利益÷期末総資産の簡易計算）' },
};

export const metricKeys: MetricKey[] = ['assets', 'profit', 'roe', 'equity', 'roa'];

/** 指定指標での順位（1 = 最大） */
export function rankOf(id: string, key: MetricKey) {
  const v = byId(id)[key];
  return 1 + companies.filter((c) => c[key] > v).length;
}

/** 同率がある場合は「1位タイ」と表示する */
export function rankLabel(id: string, key: MetricKey) {
  const v = byId(id)[key];
  const tie = companies.some((c) => c.id !== id && c[key] === v);
  return `${rankOf(id, key)}位${tie ? 'タイ' : ''}`;
}

export const sources = companies.map((c) => ({ name: c.name, url: c.financial }));
