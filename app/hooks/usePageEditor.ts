"use client";

import { useState } from "react";
import { titleSchema, bodySchema } from "../lib/validation";

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
      onSave(title, initialBody); // 本文は元の値を使う
      return true;
    }
    return false;
  };

  // 本文保存処理
  const handleSaveBody = () => {
    if (validateBody(body)) {
      onSave(initialTitle, body); // タイトルは元の値を使う
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
    handleSaveTitle,
    handleSaveBody,
    clearTitleError,
    clearBodyError,
  };
}
