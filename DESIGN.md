# サイトデザイン規則 (Design Guidelines)

このファイルは、本プロジェクトで一貫した UI を維持するためのデザイン規則をまとめたものです。
デザインやスタイリングは Tailwind CSS のクラス名をベースに構築されています。

ダークモード対応は現時点で行わない。

## タイポグラフィ (Typography)
- **ベースフォント**: `"Inter Variable", "Noto Sans JP Variable", sans-serif`
  - 英字は Inter、日本語は Noto Sans JP を利用する。
- **テキストカラー**: 
  - メインテキスト: `text-slate-900`
  - サブテキスト・日付など: `text-slate-500` または `text-slate-700`

## カラーパレット (Colors)
- **背景**:
  - ベース背景: `bg-white`
  - ヘッダー背景: `bg-white/80` (半透明)
- **アクセント/インタラクション**:
  - ホバー時のテキスト: `hover:text-slate-700` または `hover:text-slate-900`
  - ホバー時のボーダー: `hover:border-slate-400`
  - テキスト選択時 (Selection): `selection:bg-slate-950 selection:text-white`
- **境界線 (Border)**: `border-slate-200` または `border-slate-100`

## レイアウトとグリッド (Layout & Grid)
- **メインコンテンツ最大幅**: `max-w-7xl`
- **水平方向のパディング**: スマホでは `px-4`、タブレット (md) 以上では `md:px-8`
- **ページ全体の構造**: `min-h-screen` と `flex flex-col`、`main` 要素に `grow` を適用し、フッターが常に画面下部に配置されるようにする。

## 主要コンポーネントのスタイル (Components)

### ヘッダー (Header)
- 常に最上部に固定する (`fixed z-50`)。
- 高さは `h-20`。
- グラスモーフィズム効果: 背景 `bg-white/80` に `backdrop-blur-md` と下部の境界線 `border-b border-slate-200` を付与。

### フッター (Footer)
- 上部の境界線: `border-t border-slate-200`
- 背景: `bg-white`
- 上下パディング: `py-4`

### リンクカード (Remark Link Card)
- ベーススタイル: `border border-slate-200 rounded-lg overflow-hidden bg-white`
- ホバー時: `hover:border-slate-400 hover:shadow-md transition-all duration-200`
- タイトル: `font-bold text-sm sm:text-base text-slate-900 line-clamp-1`
- 説明文: `text-xs sm:text-sm text-slate-500 line-clamp-2`

### OGP 画像 (OgImage)
- 背景: `bg-white`
- パディング: `p-16`
- テキスト: `text-slate-900` (メインタイトル)、`text-slate-700` (日付)

## エフェクトとトランジション (Effects & Transitions)
- ベースのトランジション: `transition-colors duration-300` (body 全体などに適用)
- リンクカードやボタントランジション: `transition-all duration-200`
- アンチエイリアス: `antialiased` を body に適用。
