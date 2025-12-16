import { Page } from '../types/page';

const STORAGE_KEY = 'pages';

/**
 * localStorageからページ一覧を取得
 */
export function loadPages(): Page[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return [];
    }
    return JSON.parse(data) as Page[];
  } catch (error) {
    console.error('Failed to load pages from localStorage:', error);
    return [];
  }
}

/**
 * localStorageにページ一覧を保存
 */
export function savePages(pages: Page[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
  } catch (error) {
    console.error('Failed to save pages to localStorage:', error);
  }
}

/**
 * 新しいページIDを生成
 */
export function generatePageId(): string {
  return Date.now().toString();
}
