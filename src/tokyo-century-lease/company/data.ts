// 会社詳細ページのデータ。出典は references/tokyo-century-company-research-20261021.md（調査日 2026-10-21）。

/* ---------- 沿革 ---------- */
export type EventKind = '設立' | '上場' | '合併' | 'M&A' | '提携' | '組織' | '計画';

export interface Era { id: string; label: string; period: string; summary: string }
export interface HistoryEvent { era: string; date: string; kind: EventKind; title: string; body: string }

export const eras: Era[] = [
  { id: 'origin', label: '源流', period: '1964–2008', summary: '銀行・商社・生保が出資した2つのリース会社が、それぞれ成長して上場する。' },
  { id: 'merge', label: '合併と誕生', period: '2009–2016', summary: '2社が合併して東京センチュリーリースに。海外にも足場を築き、2016年に現在の社名へ。' },
  { id: 'expand', label: 'M&Aと提携で拡大', period: '2017–2022', summary: '航空機・不動産・建機などを買収し、NTTや地域金融機関と合弁を次々に設立。' },
  { id: 'next', label: '次のステージ', period: '2024–', summary: '組織を6部門に再編し、新しい中期経営計画を公表。ACGの共同経営化にも踏み出す。' },
];

export const events: HistoryEvent[] = [
  { era: 'origin', date: '1964.08', kind: '設立', title: '東京リース設立', body: '日本勧業銀行（現みずほ銀行）、勧銀土地建物、南桜商事（後の2社は現・中央日本土地建物）が共同出資。' },
  { era: 'origin', date: '1969.07', kind: '設立', title: 'センチュリー・リーシング・システム設立', body: '伊藤忠商事、第一銀行（現みずほ銀行）、日本生命、朝日生命が共同出資。現在の法人の母体。' },
  { era: 'origin', date: '1990–2002', kind: '上場', title: '東京リースが上場', body: '1990年に東証二部、2002年に東証一部へ。' },
  { era: 'origin', date: '2003–2004', kind: '上場', title: 'センチュリー・リーシング・システムが上場', body: '2003年に東証二部、2004年に東証一部銘柄に。' },
  { era: 'origin', date: '2005.10', kind: '合併', title: '日本カーソリューションズ発足', body: 'センチュリー・オート・リースとNTTオートリースが対等合併。' },
  { era: 'origin', date: '2008.03', kind: '提携', title: 'オリコオートリース設立', body: 'オリエントコーポレーションとの共同出資会社。' },
  { era: 'merge', date: '2009.04', kind: '合併', title: '2社が合併し「東京センチュリーリース」に', body: 'センチュリー・リーシング・システムと東京リースが合併。' },
  { era: 'merge', date: '2013.10', kind: 'M&A', title: '日本カーソリューションズを連結子会社化', body: '東京オートリースとNCSが合併し、NCSが連結子会社に。' },
  { era: 'merge', date: '2015–2016', kind: 'M&A', title: '米CSI Leasingを取得', body: '2015年に出資して持分法適用会社に。2016年6月に完全子会社化。' },
  { era: 'merge', date: '2016.10', kind: '組織', title: '商号を「東京センチュリー」に変更', body: '東京センチュリーリースから現在の社名へ。' },
  { era: 'expand', date: '2017–2019', kind: 'M&A', title: '米Aviation Capital Group（ACG）を取得', body: '2017年12月に持分20%を取得、2019年12月に完全子会社化。' },
  { era: 'expand', date: '2018.07', kind: 'M&A', title: '神鋼不動産（現TC神鋼不動産）70%取得', body: '連結子会社に。' },
  { era: 'expand', date: '2019.03', kind: 'M&A', title: 'アマダリース60%取得', body: '金属加工機械のリース会社。' },
  { era: 'expand', date: '2019', kind: 'M&A', title: '伊藤忠建機（現伊藤忠TC建機）50%取得', body: '伊藤忠との合弁。取得月は資料により6月／7月と表記が分かれる。' },
  { era: 'expand', date: '2020.02', kind: '提携', title: 'NTTと資本業務提携', body: 'NTTと伊藤忠を割当先とする第三者割当増資を実施。' },
  { era: 'expand', date: '2020.07', kind: '提携', title: 'NTT・TCリースが営業開始', body: 'NTTとの50:50の合弁。' },
  { era: 'expand', date: '2021.03', kind: '提携', title: 'NX・TCリース&ファイナンス 49%取得', body: '旧日通リース&ファイナンス。NX商事との合弁。' },
  { era: 'expand', date: '2022.04', kind: '提携', title: 'プライム市場へ移行／FFGリース25%取得', body: 'ふくおかFGとの合弁（現在の議決権所有割合は50%）。' },
  { era: 'expand', date: '2022.10', kind: '提携', title: '東銀リース（現MUFGファイナンス&リーシング）25%取得', body: '持分法適用会社に。' },
  { era: 'next', date: '2024.01', kind: '組織', title: '株式を1株→4株に分割', body: '普通株式1株を4株に分割。' },
  { era: 'next', date: '2025.12', kind: 'M&A', title: 'Advantage Partners Pte. Ltd.を持分法適用会社に', body: '株式を追加取得。' },
  { era: 'next', date: '2026.04', kind: '組織', title: '組織を刷新し、6部門体制へ', body: 'フロント2部門（国内・海外）× プロダクツ4部門の体制に。' },
  { era: 'next', date: '2026.05', kind: '計画', title: '「長期ビジョン2035」「中期経営計画2030」を公表', body: '2030年度に純利益2,000億円、2035年度に4,000億円を目指す。' },
  { era: 'next', date: '2026.08', kind: '提携', title: 'ACGを伊藤忠と共同経営へ（基本合意）', body: 'ACGの親会社株式の50%を伊藤忠へ譲渡予定（2026年11月実行予定）。連結子会社から持分法適用会社へ。' },
];

/* ---------- グループ ---------- */
export interface Segment { name: string; group: 'フロント' | 'プロダクツ'; assets: number; profit2030: number; desc: string }

// 資産残高は2026年6月末（億円）、純利益計画は中計2030の2030年度（億円）
export const segments: Segment[] = [
  { name: '国内ビジネス', group: 'フロント', assets: 12906, profit2030: 320, desc: 'フロント部門' },
  { name: '海外ビジネス', group: 'フロント', assets: 9554, profit2030: 350, desc: 'フロント部門' },
  { name: 'トランスポート', group: 'プロダクツ', assets: 23487, profit2030: 470, desc: 'プロダクツ部門' },
  { name: '社会インフラ', group: 'プロダクツ', assets: 11056, profit2030: 450, desc: 'プロダクツ部門' },
  { name: 'モビリティ', group: 'プロダクツ', assets: 5712, profit2030: 300, desc: 'プロダクツ部門' },
  { name: '企業投資', group: 'プロダクツ', assets: 919, profit2030: 220, desc: 'プロダクツ部門' },
];

export type AffiliateType = '連結子会社' | '持分法適用会社';
export interface Affiliate { type: AffiliateType; name: string; business: string; share: number; note?: string; partner?: string; overseas?: boolean }

export const affiliates: Affiliate[] = [
  { type: '連結子会社', name: '日本カーソリューションズ', business: '自動車リース', share: 59.5, note: 'NTTオートリースとの合併で発足', partner: 'NTT' },
  { type: '連結子会社', name: 'ニッポンレンタカーサービス', business: 'レンタカー', share: 88.6 },
  { type: '連結子会社', name: 'FLCS', business: '総合リース', share: 80.0, note: '旧富士ゼロックスリース' },
  { type: '連結子会社', name: 'IHIファイナンスサポート', business: 'リース・ファイナンス', share: 66.5 },
  { type: '連結子会社', name: 'アマダリース', business: '金属加工機械リース', share: 60.0 },
  { type: '連結子会社', name: 'TC神鋼不動産', business: '不動産', share: 70.0 },
  { type: '連結子会社', name: '京セラTCLソーラー', business: '太陽光発電', share: 81.0, note: '京セラとの共同事業', partner: '京セラ' },
  { type: '連結子会社', name: '周南パワー', business: '電力販売', share: 60.0 },
  { type: '連結子会社', name: 'CSI Leasing', business: '総合リース（米国）', share: 100, overseas: true },
  { type: '連結子会社', name: 'Aviation Capital Group', business: '航空機リース（米国）', share: 100, note: '2026年11月に持分法適用会社となる予定', overseas: true },
  { type: '連結子会社', name: 'BPI Century Tokyo Lease & Finance', business: '総合リース（フィリピン）', share: 51.0, note: '合弁', overseas: true },
  { type: '連結子会社', name: 'TISCO Tokyo Leasing', business: '総合リース（タイ）', share: 49.0, note: '支配力基準で連結', overseas: true },
  { type: '持分法適用会社', name: 'NTT・TCリース', business: '総合リース', share: 50.0, note: '合弁', partner: 'NTT' },
  { type: '持分法適用会社', name: 'NX・TCリース&ファイナンス', business: '総合リース', share: 49.0, note: '合弁', partner: 'NX商事' },
  { type: '持分法適用会社', name: 'FFGリース', business: '総合リース', share: 50.0, note: '合弁（取得時は25%）', partner: 'ふくおかFG' },
  { type: '持分法適用会社', name: 'MUFGファイナンス&リーシング', business: '総合リース', share: 25.0, note: '旧東銀リース' },
  { type: '持分法適用会社', name: '伊藤忠TC建機', business: '建機の販売・レンタル', share: 50.0, note: '合弁', partner: '伊藤忠' },
  { type: '持分法適用会社', name: 'オリコオートリース', business: '自動車リース', share: 34.0, note: '合弁', partner: 'オリコ' },
  { type: '持分法適用会社', name: '中央日土地アセットマネジメント', business: '不動産AM', share: 30.0 },
  { type: '持分法適用会社', name: '統一東京', business: '総合リース（台湾）', share: 49.0, note: '合弁', overseas: true },
  { type: '持分法適用会社', name: 'GA Telesis', business: '航空機部品（米国）', share: 49.2, note: '間接保有', overseas: true },
  { type: '持分法適用会社', name: 'Advantage Partners Pte. Ltd.', business: '投資', share: 34.1, note: '間接保有', overseas: true },
  { type: '持分法適用会社', name: 'ビープラッツ', business: 'サブスクリプション', share: 25.8 },
];

export interface Partner { name: string; stake: string; ties: string[] }
export const partners: Partner[] = [
  { name: '伊藤忠商事', stake: '議決権 30.0%（筆頭株主）', ties: ['1969年の創業時からの出資者', '伊藤忠TC建機を合弁で運営', 'ACGを50:50で共同経営へ（2026年8月基本合意）', '社債型種類株式100億円を引き受け'] },
  { name: 'NTT', stake: '持株比率 10.03%', ties: ['2020年に資本業務提携', 'NTT・TCリースを50:50で運営', '日本カーソリューションズの源流にNTTオートリース'] },
  { name: '中央日本土地建物', stake: '持株比率 14.00%', ties: ['東京リース設立時の出資者（勧銀土地建物・南桜商事）の流れ', '中央日土地アセットマネジメントに30%出資'] },
  { name: 'みずほ', stake: 'みずほ銀行 3.82%', ties: ['前身2社とも源流は旧第一勧銀系（勧業銀行・第一銀行）'] },
];

/* ---------- 財務（連結、各年3月末、百万円） ---------- */
export interface BsYear {
  fy: string; label: string;
  total: number; rental: number; leaseRecv: number; loans: number; securities: number;
  debt: number; netAssets: number; equity: number; equityRatio: number; profit: number; roe: number;
}

export const bs: BsYear[] = [
  { fy: 'FY2021', label: '2022/3', total: 5663787, rental: 1991616, leaseRecv: 1575049, loans: 407370, securities: 234951, debt: 4247383, netAssets: 795580, equity: 673024, equityRatio: 11.9, profit: 50290, roe: 8.1 },
  { fy: 'FY2022', label: '2023/3', total: 6082114, rental: 2229830, leaseRecv: 1565153, loans: 450576, securities: 325745, debt: 4514658, netAssets: 888985, equity: 761597, equityRatio: 12.5, profit: 4765, roe: 0.7 },
  { fy: 'FY2023', label: '2024/3', total: 6460930, rental: 2496294, leaseRecv: 1391310, loans: 435091, securities: 404150, debt: 4748995, netAssets: 1011176, equity: 872230, equityRatio: 13.5, profit: 72136, roe: 8.8 },
  { fy: 'FY2024', label: '2025/3', total: 6862861, rental: 2638974, leaseRecv: 1488603, loans: 409423, securities: 451367, debt: 4912561, netAssets: 1176889, equity: 1029614, equityRatio: 15.0, profit: 85279, roe: 9.0 },
  { fy: 'FY2025', label: '2026/3', total: 7214810, rental: 2837562, leaseRecv: 1588984, loans: 361709, securities: 615698, debt: 5142485, netAssets: 1252593, equity: 1120503, equityRatio: 15.5, profit: 111299, roe: 10.4 },
];

export interface Part { key: string; label: string; color: string; term?: string; value: (y: BsYear) => number }

export const assetParts: Part[] = [
  { key: 'rental', label: '賃貸資産', term: '賃貸資産', color: 'var(--c-tc)', value: (y) => y.rental },
  { key: 'leaseRecv', label: 'リース債権等', term: 'リース債権', color: 'var(--c-mhc)', value: (y) => y.leaseRecv },
  { key: 'loans', label: '営業貸付債権', term: '営業貸付債権', color: 'var(--c-orix)', value: (y) => y.loans },
  { key: 'securities', label: '投資有価証券', term: '投資有価証券', color: 'var(--c-smfl)', value: (y) => y.securities },
  { key: 'other', label: 'その他', color: 'var(--line-strong)', value: (y) => y.total - y.rental - y.leaseRecv - y.loans - y.securities },
];

export const fundingParts: Part[] = [
  { key: 'debt', label: '有利子負債', term: '有利子負債', color: 'var(--c-fgl)', value: (y) => y.debt },
  { key: 'otherLiab', label: 'その他の負債', color: 'var(--line-strong)', value: (y) => y.total - y.debt - y.netAssets },
  { key: 'netAssets', label: '純資産', term: '純資産', color: 'var(--c-tc)', value: (y) => y.netAssets },
];

/* ---------- 株主（2026年3月31日） ---------- */
export interface Holder { name: string; pct: number; kind: 'partner' | 'finance' | 'other' }
export const holders: Holder[] = [
  { name: '伊藤忠商事', pct: 29.94, kind: 'partner' },
  { name: '中央日本土地建物', pct: 14.0, kind: 'partner' },
  { name: 'NTT', pct: 10.03, kind: 'partner' },
  { name: 'ケイ・エス・オー', pct: 8.43, kind: 'other' },
  { name: '日本マスタートラスト信託銀行（信託口）', pct: 5.26, kind: 'finance' },
  { name: 'みずほ銀行', pct: 3.82, kind: 'finance' },
  { name: '清和綜合建物', pct: 3.26, kind: 'other' },
  { name: '日本カストディ銀行（信託口）', pct: 2.89, kind: 'finance' },
  { name: '日本生命保険', pct: 1.73, kind: 'finance' },
  { name: 'みずほ信託銀行 退職給付信託 オリエントコーポレーション口', pct: 1.55, kind: 'finance' },
];

export const ownership = [
  { label: 'その他の国内法人', pct: 66.8, color: 'var(--c-tc)' },
  { label: '金融機関', pct: 17.5, color: 'var(--c-mhc)' },
  { label: '外国法人等', pct: 8.0, color: 'var(--c-orix)' },
  { label: '個人・その他', pct: 5.2, color: 'var(--c-smfl)' },
];

export const dividends = [
  { label: '2025年3月期', interim: 29, final: 33, total: 62, payout: 35.5 },
  { label: '2026年3月期', interim: 36, final: 44, total: 80, payout: 35.1 },
  { label: '2027年3月期（予想）', interim: 45, final: 45, total: 90, payout: 35.8, forecast: true },
];

/* ---------- 中期経営計画 ---------- */
export const plan2027 = [
  { label: '純利益', target: 1000, actual: 1113, unit: '億円' },
  { label: 'ROA', target: 1.4, actual: 1.6, unit: '%' },
  { label: 'ROE', target: 10, actual: 10.4, unit: '%' },
];

export const roadmap = [
  { year: '2025年度', sub: '実績', profit: 1113, roe: 10.4 },
  { year: '2030年度', sub: '中計2030 目標', profit: 2000, roe: 12.5 },
  { year: '2035年度', sub: '長期ビジョン', profit: 4000, roe: 15 },
];

export const drivers = [
  { label: '機能拡大', amount: 400, desc: '保守・メンテナンス、部品売買、蓄電池、船舶運航管理など、バリューチェーンを広げる' },
  { label: '地域拡大', amount: 300, desc: '豪州のオート事業、FMVリースの海外展開、M&Aなど' },
  { label: 'キャピタルライト', amount: 200, desc: 'アセットファンドの組成、フィービジネスなど外部の資本を活用' },
];

export const investment = [
  { label: 'M&A', amount: 10000, color: 'var(--c-tc)' },
  { label: 'パートナーとの協業', amount: 5000, color: 'var(--c-mhc)' },
  { label: 'その他', amount: 5000, color: 'var(--c-orix)' },
];

export const sources = [
  { label: '沿革（東京センチュリー）', url: 'https://www.tokyocentury.co.jp/jp/corporate/history/' },
  { label: 'データブック（2026年3月期）', url: 'https://www.tokyocentury.co.jp/jp/ir/library/docs/2025_4q_jp_data-book.xlsx' },
  { label: '決算短信（2026年3月期）', url: 'https://www.tokyocentury.co.jp/jp/ir/library/pdf/2025_4q_jp_financial-results.pdf' },
  { label: '決算短信（2027年3月期 第1四半期）', url: 'https://www.tokyocentury.co.jp/jp/ir/library/pdf/2026_1q_jp_financial-results.pdf' },
  { label: '長期ビジョン2035・中期経営計画2030', url: 'https://ssl4.eir-parts.net/doc/8439/tdnet/2802715/00.pdf' },
  { label: '中期経営計画（IRページ）', url: 'https://www.tokyocentury.co.jp/jp/ir/management-plan/' },
  { label: '株式情報', url: 'https://www.tokyocentury.co.jp/jp/ir/stock/basic.html' },
  { label: '伊藤忠商事・東京センチュリー共同説明資料（2026/8/3）', url: 'https://www.itochu.co.jp/ja/files/ITC260803_J_s.pdf' },
  { label: '有価証券報告書の転載（edinetdb.jp）', url: 'https://edinetdb.jp/company/E05346/text' },
];
