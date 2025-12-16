export interface ValidationError {
  field: 'title' | 'content';
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * タイトルのバリデーション
 * - 最小文字数: 1文字
 * - 最大文字数: 50文字
 */
export function validateTitle(title: string): ValidationError | null {
  if (title.length === 0) {
    return {
      field: 'title',
      message: 'タイトルを入力してください',
    };
  }
  if (title.length > 50) {
    return {
      field: 'title',
      message: 'タイトルは50文字以内で入力してください',
    };
  }
  return null;
}

/**
 * 本文のバリデーション
 * - 最小文字数: 10文字
 * - 最大文字数: 2000文字
 */
export function validateContent(content: string): ValidationError | null {
  if (content.length < 10) {
    return {
      field: 'content',
      message: '本文は10文字以上入力してください',
    };
  }
  if (content.length > 2000) {
    return {
      field: 'content',
      message: '本文は2000文字以内で入力してください',
    };
  }
  return null;
}

/**
 * ページ全体のバリデーション
 */
export function validatePage(title: string, content: string): ValidationResult {
  const errors: ValidationError[] = [];

  const titleError = validateTitle(title);
  if (titleError) {
    errors.push(titleError);
  }

  const contentError = validateContent(content);
  if (contentError) {
    errors.push(contentError);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
