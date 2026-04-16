# slabe

https://slabe.samenoko.work/

暇人のブログ(β)

## 概要

Astroで構築されたブログです。

## 機能

- ブログ
- タグ毎ページ
- パンくずリスト
- 目次
- OG画像自動生成

## スタック

- Astro
- tailwindcss
    - tailwindcss/typography
- takumi

## AIの利用について

開発にあたってAIを利用しています。  
Google Antigravityを使用しています。

なお記事の執筆に関してはAIは利用していません。

## コマンド

### 依存関係のインストール

```shell
bun install
```

### 開発サーバーの起動

```shell
bun run dev
```

### ビルド

```shell
bun run build
```

### デプロイ

```shell
bunx wrangler deploy
```