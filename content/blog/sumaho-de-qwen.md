---
draft: false
title: Qwen3.5をAndroidスマホで動かしてみよう！(not 実用的)
date: 2026-04-09
description: Qwen3.5をAndroidスマホで動かしてみたかったログ
tags:
  - name: Android
  - name: Termux
  - name: llama.cpp
---
## え!! AndroidスマホでLLMを!?
出来らあっ！

…。始めます。

## 今回の環境
Galaxy S26 12/256GBを使います。

* Snapdragon 8 Elite gen 5
* DDR5X 12GB
* UFS4.1 256GB
* Android 16

みたいな感じです。一応最新ハイエンド。

## Termuxの準備
https://f-droid.org/ja/packages/com.termux/

からapkをダウンロードして、インストールします。
起動したらミラーの最適化とパッケージのアップデートを行いましょう。

```shell
termux-change-repo
pkg upgrade -y
```

完全に蛇足ですが、私はSSHできるようにしておきました。

```shell
# sshと自動起動用のパッケージをインストール
pkg install openssh termux-services
# パスワードを設定
passwd
# 自動起動の設定
sv-enable sshd
```

接続するときは

```shell
ssh a@<スマホのIP> -p 8022
```

ユーザー名は何を指定しても大丈夫です。

## 必須パッケージのインストール
今回はllama.cppを使用して動かすので、ビルドするために必要なパッケージを入れていきます。

```shell
pkg install git clang cmake wget libandroid-spawn
```

## llama.cppのビルド
https://github.com/ggml-org/llama.cpp

を使ってLLMを動かします。
まずはビルドを行いますよ。

```shell
git clone https://github.com/ggml-org/llama.cpp.git
cd llama.cpp
cmake -B build
cmake --build build --config Release -j6
```

ビルド中にエラーで落ちることがあります。その際は

```shell
cmake --build build --config Release -j6
```

を連打すると終わります。

```shell
ls ./build/bin
```

で`llama-server`とか`llama-cli`が見えればOKです。

## 動かしてみる
さて動かしてみますよ。Qwenを。今回はunslothのQwen3.5-0.8B-GGUFを動かしてみます。

https://huggingface.co/unsloth/Qwen3.5-0.8B-GGUF

次のコマンドを実行します。

```shell
./build/bin/llama-server -hf unsloth/Qwen3.5-0.8B-GGUF --host 0.0.0.0 --port 2323 --reasoning-budget 0
```

この状態で`http://<スマホのIP>:2323`にアクセスすると…。

![](https://storage.googleapis.com/zenn-user-upload/e032c563fd07-20260406.png)

こんな画面が出ます。適当に会話を試みましょう。

![](https://storage.googleapis.com/zenn-user-upload/569cef96f1ec-20260406.png)

日本語は荷が重そうです。

![](https://storage.googleapis.com/zenn-user-upload/d83426738787-20260406.png)

私は英弱なので翻訳を。

```
こんにちは！私はTongyi Labが開発した最新の大規模言語モデル、Qwen3.5です。
膨大なテキストコーパスで学習済みで、質問への回答からクリエイティブなコンテンツの生成まで、幅広いタスクでお手伝いできます。今日はどのようなお手伝いができますか？😊
```

開発元はアリババな気もしますけど、なにせ0.8Bなので。気にしない気にしない。

生成自体は1.4トークン/秒と激遅です。ちなみに私のメインパソコン(R7 5770X+RTX 4060 Ti)では

![](https://storage.googleapis.com/zenn-user-upload/ce80ba874e37-20260406.png)

216トークン/秒です。こっちはGPUでAndroidはCPUですからね。分が悪いレベルの話ではないのですけど。

## 以上
以上です。完全に自己満足ですが、一応動いたのに驚いてます。
できればOpenCLを使った推論もやらせてみたいですね。出来たらですけど。

それでは！