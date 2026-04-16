---
title: matugenでBraveのテーマを変える
date: 2026-04-16
description: matugenでBraveのテーマを変える方法です
draft: false
---
## matugen

[https://github.com/InioX/matugen](https://github.com/InioX/matugen)

渡された画像とかからカラーパレットを生成するツールです。
私の環境ではこれで様々な場所の色を壁紙を変えるたびに変わるようにしています。

## braveのテーマも変えたい…!

braveのテーマも変えてぇなって思いました。
しかし公式のテーマリポジトリにもそんなテンプレートファイルはないし…。

どうしようかとGeminiとこねくり回してもうまくいかず。

## Omarchyの実装をパクった

最終的には先人の知恵を拝借…という感じでパクりました。

[https://github.com/basecamp/omarchy/blob/dev/bin/omarchy-theme-set-browser](https://github.com/basecamp/omarchy/blob/dev/bin/omarchy-theme-set-browser)

これですね。hexを渡して管理ポリシーのやつを書き換えてリロードするという。
これをそのまま拝借しまして…

## 書いたもの

### `~/.config/matugen/brave-reload.sh`

```sh
#!/bin/bash
HEX_COLOR=$(cat /tmp/brave_hex)


echo "{\"BrowserThemeColor\": \"$HEX_COLOR\", \"BrowserColorScheme\": \"device\"}" | tee "/etc/brave/policies/managed/color.json" >/dev/null
brave --refresh-platform-policy --no-startup-window &>/dev/null
```

※`chmod +x`しておく

### `~/.config/matugen/templates/brave`

```
{{colors.primary.light.hex}}
```

プライマリの色を渡すので`primary`

### `~/.config/matugen/config.toml`

以下を追記

```toml
[templates.brave]
input_path = "~/.config/matugen/templates/brave"
output_path = "/tmp/brave_hex"
post_hook = "~/.config/matugen/reload-theme.sh"
```

## 準備

まず`/etc/brave/policies/managed/color.json`を作成します。

```shell
sudo touch /etc/brave/policies/managed/color.json
```

次に所有権を自分にします。

```shell
sudo chown $USER:$USER /etc/brave/policies/managed/color.json
```

## 使えるか

![](https://storage.googleapis.com/zenn-user-upload/7501e771dd1c-20260416.gif)

画像のように切り替わればOKです！

## 終わり

以上です。そこまでやるならOmarchy使えよというのは御法度ですよ。