# dashboard

ダッシュボードを管理するレポジトリ。複数のダッシュボードを1つのサイトとして GitHub Pages で公開します。

- 公開URL: https://kentarooishi-collab.github.io/dashboard/
- 技術: Vite + React + TypeScript（グラフは依存ライブラリなしの SVG）

## ダッシュボード一覧

| slug | タイトル | URL |
| --- | --- | --- |
| `tokyo-century-lease` | 東京センチュリー入門｜リース業界ダッシュボード | [/dashboard/tokyo-century-lease/](https://kentarooishi-collab.github.io/dashboard/tokyo-century-lease/) |

## 構成

```
src/
  index.html              ポータル（ダッシュボード一覧）
  registry.ts             一覧に載せるダッシュボードのメタ情報
  portal/                 ポータルの実装
  shared/                 共通デザイントークン・ヘッダー・テーマ切替・スケール関数
  _template/              新規ダッシュボードのひな形（ビルド対象外）
  tokyo-century-lease/    各ダッシュボード（index.html + main.tsx + ...）
references/               元にした資料（オリジナルHTMLなど）
```

`src/<slug>/index.html` があるフォルダは、ビルド時に自動でページとして登録されます（`_` で始まるフォルダは除外）。

## 新しいダッシュボードを追加する

1. `src/_template` を `src/<slug>` にコピーする
2. `src/<slug>/index.html` の `<title>` と説明文を書き換える
3. `src/<slug>/App.tsx` に中身を実装する（共通部品は `src/shared/` から import）
4. `src/registry.ts` に1件追加する → ポータルに表示される
5. `main` に push すると GitHub Actions が自動でビルド・公開する

## 開発

```bash
npm install
npm run dev      # http://localhost:5173/dashboard/
npm run build    # dist/ に出力
npm run preview  # ビルド結果を確認
```
