---
title: ほぼ無料でMisskeyインスタンスを立てたよ
date: 2026-04-09
description: ほぼ無料でMisskeyインスタンスを立てただけ
tags:
  - name: 雑記
---
## ほぼ無料

  私はMisskeyのインスタンスを立てました。  
  [ここから](https://msk.samenoko.work)から見ることが出来ます。

  これを運営するにあたってほとんどお金がかかりません。(電気代を除く)

## スタック

### サーバー

  まずMisskeyを動かしているサーバーは**自宅サーバー**です。  
  毎月固定でお金がかかるわけではないので素晴らしいです。イニシャルコストはかかりますけど。

  電気代は除きます。

### 公開

  インターネットへの公開は[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/)を使用しています。
  ポート開放が不要でついでにHTTPSになるし、DDoS保護も付いてくる。

### メール

  パスワードの再設定などのお知らせメールを配信するために[Resend](https://resend.com/)を使用しています。  
  ユーザー数なんて無いから無料枠に収まります。

### オブジェクトストレージ

  オブジェクトストレージにはCloudflare R2を使用しています。

