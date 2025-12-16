"use client";

import { useState } from "react";
import { z } from "zod";

// Zodバリデーションスキーマ（個別フィールド用）
export const titleSchema = z
  .string()
  .min(1, "タイトルは1文字以上で入力してください")
  .max(50, "タイトルは50文字以下で入力してください");

export const bodySchema = z
  .string()
  .min(10, "詳細は10文字以上で入力してください")
  .max(2000, "詳細は2000文字以下で入力してください");

interface UsePageEditorProps {
  initialTitle?: string;
  initialBody?: string;
  onSave: (title: string, body: string) => void;
}

export function usePageEditor({
  initialTitle = "",
  initialBody = "",
  onSave,
}: UsePageEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [titleError, setTitleError] = useState<string | undefined>();
  const [bodyError, setBodyError] = useState<string | undefined>();

  // タイトルのバリデーション
  const validateTitle = (value: string): boolean => {
    const result = titleSchema.safeParse(value);
    if (!result.success) {
      setTitleError(result.error.issues[0]?.message);
      return false;
    }
    setTitleError(undefined);
    return true;
  };

  // 本文のバリデーション
  const validateBody = (value: string): boolean => {
    const result = bodySchema.safeParse(value);
    if (!result.success) {
      setBodyError(result.error.issues[0]?.message);
      return false;
    }
    setBodyError(undefined);
    return true;
  };

  // タイトル保存処理
  const handleSaveTitle = () => {
    if (validateTitle(title)) {
      onSave(title, body);
      return true;
    }
    return false;
  };

  // 本文保存処理
  const handleSaveBody = () => {
    if (validateBody(body)) {
      onSave(title, body);
      return true;
    }
    return false;
  };

  // エラーをクリア
  const clearTitleError = () => setTitleError(undefined);
  const clearBodyError = () => setBodyError(undefined);

  return {
    title,
    body,
    setTitle,
    setBody,
    titleError,
    bodyError,
    setBodyError,
    handleSaveTitle,
    handleSaveBody,
    clearTitleError,
    clearBodyError,
  };
}
