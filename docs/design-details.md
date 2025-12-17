# 詳細設計

## データモデル

### Page インターフェース

```typescript
interface Page {
  id: string;
  title: string;
  body: string;
  createdAt: number;
  updatedAt: number;
}
```

## 実装済みファイル

- `app/hooks/usePages.ts`: ページの CRUD 操作、API 通信、状態管理
- `app/hooks/usePageEditor.ts`: フォームバリデーション、エラー管理
- `app/lib/types.ts`: データモデル定義
- `app/lib/validation.ts`: バリデーションスキーマ

## API データフロー

### 新規ページ作成フロー

1. クライアントで一時 ID（`client-temp-{uuid}`）を生成
2. ローカル状態に一時ページを追加
3. 保存時に POST `/content` でサーバーに送信
4. API から返された正式な ID でページを置き換え
5. currentPageId を正式な ID に更新

### ページ更新フロー

1. PUT `/content/:id` でサーバーに送信
2. API から更新されたページデータを受信
3. Zod でレスポンスを検証
4. ローカル状態を更新

### ページ削除フロー

1. 確認ダイアログを表示（`window.confirm`）
2. DELETE `/content/:id` でサーバーに送信
3. ローカル状態から削除
4. 削除したページが選択中の場合、別のページを自動選択

## バリデーション詳細

### タイトルバリデーション

```typescript
const titleSchema = z
  .string()
  .min(1, { message: "タイトルは1文字以上で入力してください" })
  .max(50, { message: "タイトルは50文字以下で入力してください" });
```

### 本文バリデーション

```typescript
const bodySchema = z
  .string()
  .min(10, { message: "詳細は10文字以上で入力してください" })
  .max(2000, { message: "詳細は2000文字以下で入力してください" });
```

## 状態管理詳細

### usePages フック

**責務**:

- ページ一覧の取得・管理
- CRUD 操作（作成、更新、削除）
- API 通信
- 現在選択中のページの管理

**主要な状態**:

- `pages`: Page[]
- `currentPageId`: string | null
- `isLoading`: boolean

### usePageEditor フック

**責務**:

- タイトル・本文の入力状態管理
- バリデーション実行
- エラーメッセージ管理
- 保存処理のトリガー

**主要な状態**:

- `title`: string
- `body`: string
- `titleError`: string | undefined
- `bodyError`: string | undefined
