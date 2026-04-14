---
draft: false
title: Cloudflare Zero Trustで宅外から宅内のネットワークへアクセスする
date: 2025-12-23
description: Cloudflare Zero Trustを使用して、外部から自宅のネットワークに安全にアクセスし、かつ宅内では直結で通信する「管理ネットワーク」の設定方法を解説します。
tags:
  - name: Cloudflare
  - name: Zero Trust
  - name: 自宅サーバー
---

## Cloudflare Zero Trust

Cloudflareが提供するZero Trustセキュリティモデルに基づいた包括的ネットワークセキュリティプラットフォームらしいです。

https://www.cloudflare.com/ja-jp/zero-trust/

らしいんですが今回の目的はセキュリティよりも便利のほうが重要なので、ここらへんのすごさには触れません。
ｽﾝﾏｾﾝ。

## なにがしたいか

外にいるときに家の中のネットーワークにアクセスしたい。これだけです。

旅館やカフェ(田舎にはそんなものは無いが)などから`192.168.0.40`で接続できるようにしたい…って感じ。

## アカウントのセットアップなど

ここでは詳細に説明しません。っていうか使い始めたのが2年前とかなり前なので、覚えていません。
[Cloudflareの管理画面](https://dash.cloudflare.com)のサイドバーに
![](https://storage.googleapis.com/zenn-user-upload/b951970562bd-20251222.png)
Zero Trustという項目があるのでそこをクリックして案内に従ってください。
設定した当時とかなりUIが変わっていて説明できません。すみません。

おそらくチーム名を決めると思うのですが、それを控えておきましょう。

## IDプロバイダーを追加する

デフォルトでメールアドレスを使用したワンタイムコードを利用可能です。しかしこれは不便なのでGoogleアカウントとかでログインできると便利だよね。
ってことで追加しましょう。
![](https://storage.googleapis.com/zenn-user-upload/b7b33758a7af-20251222.png)
Zero Trustのサイドバーの「インテグレーション」の「IDプロバイダー」を開きます。
画像では既にGoogleが追加されていますが気にしないでいいです。

![](https://storage.googleapis.com/zenn-user-upload/d8e30a80fa89-20251222.png)
まずは「IDプロバイダーを追加する」をクリックし、
![](https://storage.googleapis.com/zenn-user-upload/79f49984abf1-20251222.png)
「Google」を選択する。
![](https://storage.googleapis.com/zenn-user-upload/57a89fac6dff-20251222.png)
選択すると画像のような画面に変わります。右側に手順が載っております。英語ですけど。
名前は分かりやすいもの(例:Google)にします。
続いて[Google Cloud Console](https://console.cloud.google.com/)にアクセスし、
![](https://storage.googleapis.com/zenn-user-upload/e0e14d9a8363-20251222.png)
「APIとサービス」を開き、
![](https://storage.googleapis.com/zenn-user-upload/82c2234a065b-20251222.png)
「OAuth同意画面」を開きます。
![](https://storage.googleapis.com/zenn-user-upload/8815353d613b-20251222.png)
「クライアント」を選択し、「クライアントを作成」をクリックします。
![](https://storage.googleapis.com/zenn-user-upload/b9601643ad31-20251222.png)
アプリケーションの種類は「ウェブアプリケーション」、名前は適切なものを入力します。
![](https://storage.googleapis.com/zenn-user-upload/b858aae10ee6-20251222.png)
承認済みのJavaScript生成元には`https://<設定したチーム名>.cloudflareaccess.com`を、承認済みのリダイレクトURIには`https://<設定したチーム名>.cloudflareaccess.com/cdn-cgi/access/callback`を設定します。
![](https://storage.googleapis.com/zenn-user-upload/ff5525003e55-20251222.png)
あとは「作成」をクリックします。
![](https://storage.googleapis.com/zenn-user-upload/1d4485a28781-20251222.png)
すると「クライアントID」と「クライアントシークレット」が表示されるので、
![](https://storage.googleapis.com/zenn-user-upload/785e31de043c-20251222.png)
Cloudflare側の入力欄にそれぞれコピペする。あとは保存するだけです。
![](https://storage.googleapis.com/zenn-user-upload/26db95831097-20251222.png)
IDプロバイダー一覧の画面で先程作成したプロバイダーの欄にある「テスト」をクリックしてみて
![](https://storage.googleapis.com/zenn-user-upload/4c85c58b7376-20251222.png)
画像のようにログイン中のGoogleアカウントの情報が表示されるか、Googleアカウントの選択画面が現れれば大丈夫です。

## トンネルの追加

![](https://storage.googleapis.com/zenn-user-upload/2852721d005f-20251222.png)
サイドバーの「ネットワーク」から「コネクタ」を開き、「トンネルを作成する」をクリックする。
![](https://storage.googleapis.com/zenn-user-upload/0d610b62e1ae-20251222.png)
トンネルの種類は「Cloudflared」にする。
![](https://storage.googleapis.com/zenn-user-upload/e48ae318a8aa-20251222.png)
トンネル名は適当なものを付けます。私は「myhome」と。ひねりもねぇ。
![](https://storage.googleapis.com/zenn-user-upload/20009a0d1000-20251222.png)
次はコネクタのインストールです。お使いのサーバーのOSとアーキテクチャを選択して、表示されるコマンドを実行して`cloudflared`をインストールします。
![](https://storage.googleapis.com/zenn-user-upload/768d47457583-20251222.png)
インストールが終わったら画像の欄にあるコマンドを実行してコネクタを接続します。
![](https://storage.googleapis.com/zenn-user-upload/eb9ad3b579f2-20251222.png)
接続が成功したら「Connectors」に何かが表示されるはずです。
![](https://storage.googleapis.com/zenn-user-upload/ca5c51894b91-20251222.png)
「トラフィックのルーティング」という画面が表示されると思いますがこの画面はスキップしていいです。サイドバーの「ネットワーク」→「コネクタ」をクリックすると戻れます。
![](https://storage.googleapis.com/zenn-user-upload/4f6b79653e5b-20251222.png)
作成したコネクタが表示されてステータスが緑であればOKです。

## ルートを設定

![](https://storage.googleapis.com/zenn-user-upload/9d3c1b0b3062-20251222.png)
さっき作成したコネクタの三点リーダーをクリックし「設定」を開きます。
![](https://storage.googleapis.com/zenn-user-upload/c56570432cce-20251222.png)
「CIDR」タブに移動し、「CIDRルートを追加」をクリックします。
![](https://storage.googleapis.com/zenn-user-upload/955a81a7c3ff-20251222.png)
CIDRと説明を適当に入力します。私の家は`192.168.0.xx`なので`192.168.0.0/24`です。
![](https://storage.googleapis.com/zenn-user-upload/d5f3496f581e-20251222.png)
CIDRの画面に表示されればOK!

## 「管理ネットワーク」の作成

家の中にいるか、外に居るかを判断するためにビーコンみたいなサーバーを立てます。
ラズパイとか自宅サーバーで大丈夫です。TLSエンドポイントが必要だそうです。

今回はDockerで立ててみます。Dockerでなくても大丈夫ですが。

適当なディレクトリを作成し、その中に`certs`ディレクトリと`nginx.conf`を作成します。
`certs`ディレクトリに自己TLS証明書を作成します。

```bash
openssl req -x509 -newkey rsa:4096 -sha256 -days 3650 -nodes -keyout privkey.pem -out fullchain.pem -subj "/CN=Generic SSL Certificate"
```

で作成可能です。
![](https://storage.googleapis.com/zenn-user-upload/c1265ed68131-20251222.png)
作成できました。
次に`nginx.conf`を書きます。次のように。

```nginx [nginx.conf]
events {
    worker_connections 1024;
}

http {
    server {
        listen 443 ssl;
        ssl_certificate /certs/fullchain.pem;
        ssl_certificate_key /certs/privkey.pem;

        location / {
                return 200;
            }
    }
}
```

あとはDocker Composeのファイルを書きます。

```yaml [compose.yml]
services:
  nginx:
    restart: unless-stopped
    image: nginx:latest
    ports:
      - 7676:443
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./certs:/certs:ro
```

今回はポート7676で待ち受けるように。あとは立ち上げるだけです。

```bash
sudo docker compose up -d
```

curlを実行してみて、返ってくれば大丈夫です。
![](https://storage.googleapis.com/zenn-user-upload/ab30bb4f1a28-20251222.png)

次にSHA-256のフィンガープリントを抽出します。

```bash
openssl x509 -noout -fingerprint -sha256 -inform pem -in certs/fullchain.pem | tr -d :
```

上のコマンドを実行して

```text
sha256 Fingerprint=98D.........
```

みたいなのが得られます。`Fingerprint=`以降の文字列を控えておきましょう。

![](https://storage.googleapis.com/zenn-user-upload/e8920360a2dd-20251222.png)
ZeroTrustの管理画面のサイドバーの「チームとリソース」から「デバイス」を開き、「デバイスプロファイル」タブに移動します。
![](https://storage.googleapis.com/zenn-user-upload/82abc7f75759-20251222.png)
「管理ネットワーク」を見つけ、「新しい管理ネットワークを追加する」をクリックします。
![](https://storage.googleapis.com/zenn-user-upload/de57cbe5f878-20251222.png)
名前は適当なものを、ホストとポートは先程立てたWebサーバーのものを、SHA-256は先程控えたフィンガープリントを入力し「保存」

## スプリットトンネルの設定

この設定が結構重要です。
![](https://storage.googleapis.com/zenn-user-upload/12c55b47f3a1-20251222.png)
さっきの「デバイスプロファイル」タブの画面まで戻り、プロファイル一覧の「デフォルト」の三点リーダーを開き、「設定」をクリックします。
![](https://storage.googleapis.com/zenn-user-upload/3610d1996239-20251222.png)
「スプリットトンネル」の項目を見つけ、「IPとドメインを除外する」にチェックが入っていることを確認して「管理」をクリックします。
![](https://storage.googleapis.com/zenn-user-upload/f576126a633e-20251222.png)
開いたら`10.0.0.0/8`と`192.168.0.0/16`にチェックを入れ、「アクション」から「削除を確認」をクリックします。削除できたら前の画面に戻り、一番下にある「プロファイルを保存」をクリック。
![](https://storage.googleapis.com/zenn-user-upload/7cd9d51be6b9-20251222.png)
プロファイル一覧画面で「新しいプロフィールを作成」をクリック。
![](https://storage.googleapis.com/zenn-user-upload/55b27bfe612d-20251222.png)
名前は適当に、式はセレクターに「管理ネットワーク」オペレーターに「is」値を先程作成した管理ネットワークにする。
これを設定したら一番下にある「プロファイルを作成」をクリックする。
続いてさっき新たに作成したプロファイルの設定画面を開き、スプリットトンネルが除外になっていることを確認し「管理」を開く。
![](https://storage.googleapis.com/zenn-user-upload/b2a86a41b727-20251222.png)
セレクターを「IP Address」に、値を家のCIDRにして宛先を保存して、前の画面に戻り、一番下の「プロファイルを保存」をクリックします。

## WARPクライアントをインストール

[Cloudflare WARP ダウンロード](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/warp/download-warp/)

からCloudflare WARPをダウンロードしてインストールします。
インストールが終わり起動したらシステムトレイアイコンをクリックして
![](https://storage.googleapis.com/zenn-user-upload/0797dd0b41b6-20251223.png)
歯車アイコンをクリックし、環境設定を開きます。
![](https://storage.googleapis.com/zenn-user-upload/9a10ad48ea98-20251223.png)
設定ウィンドウのサイドバーの「アカウント」を開き、「Cloudflare Zero Trustにログイン」をクリックし、表示される案内を読み次へとか同意するを押してると
![](https://storage.googleapis.com/zenn-user-upload/d97dbc985b37-20251223.png)
上の画像のようなウィンドウが出ます。ここには設定したチーム名を入力します。
![](https://storage.googleapis.com/zenn-user-upload/f230ca9a4cfe-20251223.png)
ログインが成功するとWARPを開くか聞かれるので開きます。
![](https://storage.googleapis.com/zenn-user-upload/06e6fae4b43a-20251223.png)
表示がオレンジ色のWARPから青色のZero TrustになっていればOKです。

## テスト

Cloudflare WARPをインストールしたスマホからモバイルデータを使用して`192.168.0.30`にアクセスしてみました。
![](https://storage.googleapis.com/zenn-user-upload/e7658c2e2b05-20251223.jpg)
はい。出来ていますね。

## 今回のポイント

実は他の記事で紹介されている方法では家の中で使うときにも一度Cloudflareを経由してしまい、遅くなってしまうんですよね。
そこで「管理ネットワーク」という機能を使って家の中にいるのかを判断してプロファイルを切り替えるっていうそういう感じにしました。

## 以上

以上です。やたら長いので分けて書けば良かったかもしれぬ。
n番煎じ感のある記事で申し訳ないです。
