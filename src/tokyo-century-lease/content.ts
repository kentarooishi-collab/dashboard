import type { LucideIcon } from 'lucide-react';
import { Banknote, Building2, Car, Compass, Factory, Monitor, Plane, Scale, Sun } from 'lucide-react';

/** リースの流れ（仕組み図のステップ） */
export type NodeId = 'market' | 'tc' | 'asset' | 'client';

export interface FlowStep {
  id: string;
  from: NodeId;
  to: NodeId;
  label: string;
  title: string;
  body: string;
  risk: RiskId;
}

export const flowSteps: FlowStep[] = [
  {
    id: 'fund', from: 'market', to: 'tc', label: '資金',
    title: '資金を調達する',
    body: '銀行借入や社債などで、巨額の資金を長期で調達する。顧客の設備投資を肩代わりするための原資。',
    risk: 'funding',
  },
  {
    id: 'own', from: 'tc', to: 'asset', label: '購入・保有',
    title: 'アセットを買い、自社で持つ',
    body: '航空機・車・不動産などを、東京センチュリー自身のB/S（貸借対照表）で保有する。',
    risk: 'value',
  },
  {
    id: 'use', from: 'asset', to: 'client', label: '利用',
    title: '利用企業に使ってもらう',
    body: '顧客は「使いたい。でも持ちたくない」。所有せずに必要な資産を使える。',
    risk: 'business',
  },
  {
    id: 'fee', from: 'client', to: 'tc', label: 'リース料',
    title: 'リース料を受け取る',
    body: '利用の対価としてリース料を回収する。ここで資金調達コストを上回るリターンを得る。',
    risk: 'funding',
  },
  {
    id: 'exit', from: 'asset', to: 'market', label: '売却・再リース',
    title: '期間が終わったら売る／また貸す',
    body: '「10年後にいくらで売れるか」＝残価。これを読み違えると利益が吹き飛ぶ。',
    risk: 'value',
  },
];

export type RiskId = 'funding' | 'value' | 'business';

export interface Risk { id: RiskId; icon: LucideIcon; title: string; body: string }

export const risks: Risk[] = [
  { id: 'funding', icon: Banknote, title: '資金', body: '巨額の資金を長期で調達し、顧客の設備投資を肩代わりする。' },
  { id: 'value', icon: Scale, title: '資産価値（残価）', body: '10年後にいくらで売れるか。残価を読む力が利益に直結。' },
  { id: 'business', icon: Compass, title: '事業理解', body: 'リスクを減らすには、その資産が使われる業界・事業そのものを理解する必要がある。' },
];

/** アセットの種類 */
export type AssetType = '残価が効く' | 'サービスへ拡張' | '保有・運営' | '長期キャッシュフロー' | 'ライフサイクル管理' | '王道リース';

export interface Asset {
  id: string;
  icon: LucideIcon;
  name: string;
  type: AssetType;
  examples: string[];
  earn: string;
  watch: string;
  desc: string;
}

export const assets: Asset[] = [
  {
    id: 'aircraft', icon: Plane, name: '航空機', type: '残価が効く',
    examples: ['旅客機'],
    earn: 'リース料 ＋ 将来の売却価値',
    watch: '機種・需給・整備状態。すべてが残価に効く。',
    desc: 'リース料＋将来の売却価値。機種・需給・整備状態まで残価に効く。',
  },
  {
    id: 'mobility', icon: Car, name: 'モビリティ', type: 'サービスへ拡張',
    examples: ['車両', 'EV', '充電設備'],
    earn: '車両リース ＋ 管理・EV・充電・データ活用',
    watch: '車両そのものから、運用サービスへどこまで広げられるか。',
    desc: '車両そのものだけでなく、管理・EV・充電・データ活用へ広がる。',
  },
  {
    id: 'realestate', icon: Building2, name: '不動産', type: '保有・運営',
    examples: ['オフィス', '物流施設', 'ホテル', 'データセンター'],
    earn: '保有・投資・運営から生まれる収益',
    watch: '用途ごとの需要と、運営まで踏み込めるか。',
    desc: 'オフィス、物流施設、ホテル、データセンターなど。保有・投資・運営へ。',
  },
  {
    id: 'infra', icon: Sun, name: '社会インフラ', type: '長期キャッシュフロー',
    examples: ['太陽光', '蓄電池', 'エネルギー設備'],
    earn: '長期にわたって安定的に生まれるキャッシュフロー',
    watch: '長期間、設備を止めずに運用し続けられるか。',
    desc: '太陽光、蓄電池、エネルギー設備。長期キャッシュフロー型。',
  },
  {
    id: 'it', icon: Monitor, name: 'IT機器', type: 'ライフサイクル管理',
    examples: ['PC', 'サーバー'],
    earn: '導入から回収・再利用までのライフサイクル',
    watch: '回収した機器を再利用につなげられるか。',
    desc: 'PC・サーバー等の導入から回収・再利用までライフサイクル管理。',
  },
  {
    id: 'equipment', icon: Factory, name: '設備', type: '王道リース',
    examples: ['製造ライン', '工作機械', '医療機器'],
    earn: '設備の利用料（リース料）',
    watch: '祖業に近い王道。顧客の設備投資ニーズそのもの。',
    desc: '製造ライン、工作機械、医療機器など。祖業に近い王道リース。',
  },
];
