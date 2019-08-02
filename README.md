# これは何？

* JavaScriptでアルゴリズムのライブラリを作って遊ぶ遊び場

## 開発環境

* Node.js v10

```
node -v
v10.15.0
```

だけどまあ適当なので12とかでも

```
git clone https://github.com/nobishino/js-algorithm-study.git
cd js-algorithm-study
npm install
```

### Test

テストの実行

```
npm test
```

カバレッジレポートをみる

```
npm run coverage
```

## How to コントリビュート

### 流れ

* Forkしてプルリクエストを送ってください
* 基本何が来てもマージします
* GitHubよくわかってないので手探りでやります

### コードの書き方

* srcにクラスか関数かを書いてtestにテストを書く
* testディレクトリ以下のすべてのファイルがnpm testで実行されますのでソース1ファイルに対してテスト1ファイルを対応させるといいと思います
* test書かなくても別にいいです
* testは自分はmochaで書きます
* testの内容は適当に書いて最後にそのモジュールを使って解けるAtCoderか何かの問題のサンプル入出力をつかったテストを追加するといいかも

## JSDoc

* https://nobishino.github.io/js-algorighm-study/

