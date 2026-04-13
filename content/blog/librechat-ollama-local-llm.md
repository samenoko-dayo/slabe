---
title: LibreChat+OllamaでローカルLLM
date: 2026-03-23
description: LibreChatとOllamaを組み合わせて、ローカル環境で大規模言語モデル（LLM）を動作させる方法を解説します。
tags:
  - name: ai
  - name: docker
  - name: llm
  - name: ローカルllm
---

## LibreChat
https://www.librechat.ai/

ChatGPTみたいなUIを提供するやつです。

## Ollama
https://ollama.com/

ローカルでLLMを動作させることのできるツールです。

以上の２つを合わせてローカルでAIを動作させていきたいっていう話。

## 環境

|  |  |
| --- | --- |
| CPU | **Ryzen 7 5700X** |
| RAM | **32GB** |
| SSD | **1TB** |
| GPU | **NVIDIA RTX 4060 Ti 16GB** |
| OS | **ArchLinux** |

今回はDockerで動かしていきます。

## セットアップ
### リポジトリのクローン
```bash [コマンド]
git clone https://github.com/danny-avila/LibreChat
cd LibreChat
```

### `.env`の作成
リポジトリ内にあるexampleをコピーする。

```bash [コマンド]
cp .env.example .env
```

内容は特にいじらなくていい。

### `librechat.yaml`の作成
これもリポジトリ内にあるexampleをコピーする。

```bash [コマンド]
cp librechat.example.yaml librechat.yaml
```

現時点では内容は編集しない。

### `docker-compose.override.yaml`の作成
これもリポジトリ内にあるexampleをコピーする。

```bash [コマンド]
cp docker-compose.override.yml.example docker-compose.override.yml
```

これも現時点では内容を編集しない。

### `docker-compose.override.yml`の編集
`librechat.yaml`をマウントしたり、Ollamaを追加します。

```yaml [docker-compose.override.yml]
services:
    api:
        volumes:
            - type: bind
              source: ./librechat.yaml
              target: /app/librechat.yaml
    ollama:
        image: ollama/ollama:latest
        container_name: ollama
        restart: unless-stopped
        gpus: all
        ports:
            - "11434:11434"
        volumes:
            - ./ollama:/root/.ollama
```

### `librechat.yaml`の編集
`Ollama`を使うように設定します。

```yaml [librechat.yaml]
version: 1.3.6
endpoints:
  custom:
    - name: "Ollama"
      apiKey: "ollama"
      baseURL: "http://ollama:11434/v1/"
      models:
        default:
          - "qwen3.5"
        fetch: true
      titleConvo: true
      titleModel: "current_model"
      summarize: false
      summaryModel: "current_model"
      modelDisplayLabel: "Ollama"
```

## 起動

ここまで設定を進めたら起動します。

```bash [コマンド]
docker compose up -d
```

ブラウザから`http://localhost:3080`にアクセスすると、

![](https://storage.googleapis.com/zenn-user-upload/8f931ac8ea08-20260323.png)

こんな感じの画面が現れます。Sign upしてください。

![](https://storage.googleapis.com/zenn-user-upload/20c286e091ec-20260323.png)

ログインすると、こんな感じ。

## ollamaのモデルをpull

ollamaでモデルをpullします。今回はqwen3.5を。

```bash [コマンド]
docker exec -it ollama ollama pull qwen3.5
```

モデルをpullしたら再起動します。

```bash [コマンド]
docker compose down && docker compose up -d
```

![](https://storage.googleapis.com/zenn-user-upload/c96a9aae3047-20260323.png)

モデルの選択画面に現れればOKです。

## 話してみる

![](https://storage.googleapis.com/zenn-user-upload/edebedca3cea-20260323.png)

![](https://storage.googleapis.com/zenn-user-upload/39083ef68b05-20260323.png)

ちゃんと話せます。

## おわり
今回はここまでです。
ここでは書いていませんが検索まで設定してます。
![](https://storage.googleapis.com/zenn-user-upload/6e5888869252-20260323.png)

いいぽよ。

## 更新履歴
2026/03/24: 一部内容に誤りがあったため修正
