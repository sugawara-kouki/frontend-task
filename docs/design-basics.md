# 基本設計

## アーキテクチャの決定事項

### 1. 状態管理

カスタムフック（usePages, usePageEditor）による状態管理

- シンプルで理解しやすい
- API との連携が容易
- テスタビリティが高い
- 追加の依存関係が不要（Zod のみバリデーション用に使用）

### 2. バリデーション

Zod によるスキーマバリデーション

- 型安全なバリデーション
- API レスポンスの検証にも使用
- エラーメッセージのカスタマイズが容易
- バリデーションルール:
  - タイトル: 1〜50 文字
  - 本文: 10〜2000 文字

## コンポーネント構造

```
app/
├── layout.tsx (ルートレイアウト)
├── page.tsx (ホーム - リダイレクトまたは最初のページを表示)
├── components/
│   ├── Sidebar.tsx
│   ├── PageList.tsx
│   ├── PageEditor.tsx
│   ├── PageItem.tsx
│   └── ConfirmDialog.tsx (オプション)
├── hooks/
│   ├── usePages.ts (ページ一覧の状態管理・API 呼び出し)
│   └── usePageEditor.ts (個別ページ編集の状態管理・バリデーション)
└── lib/
    ├── types.ts (Page インターフェース定義)
    └── validation.ts (バリデーションスキーマ)
```

## テスト戦略

**ユニットテスト**:

- バリデーションロジック（`app/lib/validation.test.ts`）
  - Zod スキーマの境界値テスト
  - エラーメッセージの検証
- カスタムフック（`app/hooks/usePageEditor.test.ts`）
  - エラー状態管理
  - コールバック呼び出しの検証

### テストツール

Jest + React Testing Library

- Next.js との公式統合（next/jest）
- jsdom 環境でコンポーネントテスト
- ts-jest による TypeScript サポート
- テストコマンド: `npm test`
