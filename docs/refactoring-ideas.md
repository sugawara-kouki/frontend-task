# リファクタリング案

時間の都合で実装できなかった、今後のリファクタリング案をまとめます。

## 1. Button コンポーネントの共通化

### 現状

各ボタンコンポーネント（EditButton、SaveButton、CancelButton など）が個別に実装されており、共通のインターフェースがありません。

**対象ファイル**:

- `app/components/Button/EditButton.tsx`
- `app/components/Button/SaveButton.tsx`
- `app/components/Button/CancelButton.tsx`
- `app/components/Button/DeleteButton.tsx`
- `app/components/Button/DoneButton.tsx`
- `app/components/Button/NewPageButton.tsx`

### 改善案

共通の `BaseButton` コンポーネントを作成し、各ボタンはそれをラップする形で実装します。バリアント（primary、secondary、danger）やサイズ（sm、md、lg）を props で制御できるようにします。

### メリット

- スタイルの一貫性が保たれる
- 変更時の修正箇所が減る
- 新しいボタンの追加が容易

## 2. hooks の分離

### 現状

`usePages` フックが以下の責務を全て持っています：

- ページ一覧の取得・管理
- CRUD 操作（作成・更新・削除）
- 現在選択中のページの管理
- API 通信
- エラーハンドリング

### 改善案

責務ごとにフックを分離します：

- `usePageList`: ページ一覧の取得・管理
- `usePageCRUD`: CRUD 操作
- `useCurrentPage`: 現在選択中のページの管理

これらを `usePages` で組み合わせて公開することで、インターフェースは変えずに内部構造を改善できます。

### メリット

- 単一責任の原則に従う
- テストが書きやすくなる
- 再利用性が高まる
- 各フックの理解が容易になる

## 3. エラーハンドリングの統一

### 現状

API エラーのハンドリングが各関数内で個別に実装されており、統一されていません。エラーメッセージの表示方法も `console.error` のみで、ユーザーへの通知が不十分です。

### 改善案

共通の API クライアントを作成し、以下を実装します：

- カスタム `ApiError` クラスでエラーの型を統一
- レスポンスの成功・失敗判定を一元化
- エラー通知の仕組みを共通化（トースト通知など）

### メリット

- エラーハンドリングの一貫性
- デバッグが容易
- エラー通知の統一的な実装が可能
- リトライロジックなどの共通機能を追加しやすい

## 4. 定数の外出し

### 現状

エラーメッセージ、API エンドポイント、バリデーションルールのマジックナンバーなどが各ファイルに散在しています。

**例**:

- バリデーションメッセージが `validation.ts` に直接記述
- API エンドポイントが `usePages.ts` に直接記述
- 文字数制限（1、50、10、2000）がマジックナンバー

### 改善案

`app/lib/constants.ts` を作成し、以下を一元管理します：

- `API_ENDPOINTS`: API エンドポイント
- `API_BASE_URL`: ベース URL（環境変数から取得）
- `VALIDATION_RULES`: バリデーションの数値ルール
- `ERROR_MESSAGES`: エラーメッセージ

### メリット

- 値の変更が一箇所で済む
- 定数の再利用が容易
- 型安全性の向上（`as const` による厳密な型推論）
- 環境変数の管理が明確になる
- マジックナンバー・マジックストリングの排除
