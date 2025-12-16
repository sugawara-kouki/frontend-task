"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { Page } from "../types/page"; // 既存の型定義を流用

// Zodスキーマを定義
// APIからのレスポンス(id: number)
const apiPageSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// フロントエンドで扱うPage型に変換(id: string, createdAt/updatedAt: number)
const pageSchema = apiPageSchema.transform((data) => ({
  ...data,
  id: String(data.id),
  createdAt: new Date(data.createdAt).getTime(),
  updatedAt: new Date(data.updatedAt).getTime(),
}));

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export function usePages() {
  // APIから取得するまでpagesは未定義
  const [pages, setPages] = useState<Page[] | undefined>(undefined);
  const [currentPageId, setCurrentPageId] = useState<string | null>(null);

  // 初期化: APIからページを読み込み
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/content`);
        if (!response.ok) {
          throw new Error("Failed to fetch pages");
        }
        const data = await response.json();
        const loadedPages = z.array(pageSchema).parse(data);
        setPages(loadedPages);
        if (loadedPages.length > 0) {
          setCurrentPageId(loadedPages[0].id);
        }
      } catch (error) {
        console.error(error);
        setPages([]); // エラー時は空配列をセット
      }
    };
    fetchPages();
  }, []);

  // 現在選択中のページを取得
  const currentPage = pages?.find((page) => page.id === currentPageId) || null;

  // 新規ページ作成
  const createPage = async () => {
    const response = await fetch(`${API_BASE_URL}/content`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "", body: "" }),
    });
    const newPageData = await response.json();
    const newPage = pageSchema.parse(newPageData);
    setPages(pages ? [...pages, newPage] : [newPage]);
    setCurrentPageId(newPage.id);
  };

  // ページ更新
  const updatePage = async (
    id: string,
    updates: Partial<Pick<Page, "title" | "body">>
  ) => {
    const response = await fetch(`${API_BASE_URL}/content/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const updatedPageData = await response.json();
    const updatedPage = pageSchema.parse(updatedPageData);
    setPages(pages?.map((page) => (page.id === id ? updatedPage : page)));
  };

  // ページ削除
  const deletePage = async (id: string) => {
    if (!window.confirm("このページを本当に削除しますか？")) {
      return;
    }

    await fetch(`${API_BASE_URL}/content/${id}`, { method: "DELETE" });
    const newPages = pages?.filter((page) => page.id !== id) || [];
    setPages(newPages);

    // 削除したページが現在選択中の場合、別のページを選択
    if (currentPageId === id) {
      setCurrentPageId(newPages.length > 0 ? newPages[0].id : null);
    }
  };

  return {
    pages,
    currentPage: pages === undefined ? undefined : currentPage,
    currentPageId,
    setCurrentPageId,
    createPage,
    updatePage,
    deletePage,
  };
}
