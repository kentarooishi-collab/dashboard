import type { ReactNode } from 'react';
import { Term, withTerms, type TermDef } from '../shared/Term';
import type { MetricKey } from './data';

/** このダッシュボードの用語集。キーは本文に出てくる表記。 */
export const glossary: Record<string, TermDef> = {
  ROE: {
    term: 'ROE', full: '自己資本利益率',
    formula: '純利益 ÷ 自己資本',
    desc: '株主が出したお金（自己資本）を元手に、1年でどれだけ利益を出したか。高いほど「お金の使い方が上手い」。',
    example: '10%なら、元手100円で1年に10円の利益。',
  },
  ROA: {
    term: 'ROA', full: '総資産利益率',
    formula: '純利益 ÷ 総資産',
    desc: '持っている資産全体を使って、どれだけ利益を出したか。資産の「稼ぐ力」。このページでは期末の総資産で割った簡易計算。',
    example: '資産を大きく抱えるリース会社は低めに出やすい。この5社は0.5〜2.5%ほど。',
  },
  自己資本比率: {
    term: '自己資本比率',
    formula: '自己資本 ÷ 総資産',
    desc: '資産のうち、返さなくてよいお金（株主の出資や貯めた利益）で賄っている割合。高いほど財務が厚く、不況に強い。',
    example: '高すぎるとROEは上がりにくい。安全性と効率はトレードオフ。',
  },
  総資産: {
    term: '総資産',
    desc: '会社が持っている資産の合計。リース会社では、貸し出している航空機・車・設備などのリース資産や貸付金が中心。会社の規模の目安。',
  },
  純利益: {
    term: '純利益',
    desc: '売上から費用や税金などをすべて差し引いて、最後に残った利益。',
  },
  残価: {
    term: '残価', full: 'ざんか',
    desc: 'リース期間が終わったとき、その資産がいくらで売れるかの見込み額。読みが外れると利益が減る（うまく読めれば増える）。',
    example: '例：10年後、この航空機は中古でいくらで売れるか。',
  },
  アセット: {
    term: 'アセット', full: 'asset／資産',
    desc: 'このページでは、航空機・車・不動産など「将来お金を生む商売道具」のこと。',
  },
  'B/S': {
    term: 'B/S', full: '貸借対照表',
    desc: '会社が持っている資産と、それを何で賄ったか（借金＝負債、自前のお金＝純資産）を一覧にした決算書。「自分のB/Sで持つ」＝自社の資産として抱えること。',
  },
  リース料: {
    term: 'リース料',
    desc: '資産を借りて使う側が、リース会社に払う使用料。',
  },
  社債: {
    term: '社債',
    desc: '会社が投資家からお金を借りるために発行する債券。期日に元本を返し、それまで利息を払う。',
  },
  再リース: {
    term: '再リース',
    desc: 'リース期間が終わった資産を、もう一度貸し出すこと。',
  },
  キャッシュフロー: {
    term: 'キャッシュフロー',
    desc: '実際に入ってくるお金と出ていくお金の流れ。「長期キャッシュフロー型」＝長い期間、安定してお金が入り続けるタイプ。',
  },
  PE: {
    term: 'PE', full: 'プライベート・エクイティ',
    desc: '未上場企業などに投資し、経営を支援して価値を高めてから売却する事業。',
  },
  AM: {
    term: 'AM', full: 'アセットマネジメント',
    desc: '投資家に代わって、不動産などの資産を運用・管理すること。',
  },
  BPO: {
    term: 'BPO', full: 'ビジネス・プロセス・アウトソーシング',
    desc: '企業の業務の一部を、外部がまとめて引き受けること。',
  },
  ホールセール: {
    term: 'ホールセール',
    desc: '大企業など法人向けの大口の取引。',
  },
  投融資: {
    term: '投融資',
    desc: '投資（出資して株主になる）と融資（お金を貸す）を合わせた言葉。',
  },
};

const metricTerm: Record<MetricKey, string> = {
  assets: '総資産', profit: '純利益', roe: 'ROE', equity: '自己資本比率', roa: 'ROA',
};

/** 文章中の用語を自動で解説付きにする */
export const t = (text: string, focusable = true): ReactNode => withTerms(text, glossary, focusable);

/** 用語を明示的に解説付きにする */
export function G({ k, children, focusable }: { k: string; children?: ReactNode; focusable?: boolean }) {
  return <Term def={glossary[k]} focusable={focusable}>{children ?? glossary[k].term}</Term>;
}

/** 指標名を解説付きで出す */
export function MetricTerm({ k, children, focusable }: { k: MetricKey; children?: ReactNode; focusable?: boolean }) {
  return <G k={metricTerm[k]} focusable={focusable}>{children}</G>;
}
