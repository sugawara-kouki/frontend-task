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
  const createPage = () => {
    // APIを呼び出さず、クライアント側で一時的なページを作成
    const tempId = `client-temp-${crypto.randomUUID()}`; // 一時的なIDを生成
    const newPage: Page = {
      id: tempId,
      title: "",
      body: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setPages((prevPages) => (prevPages ? [...prevPages, newPage] : [newPage]));
    setCurrentPageId(newPage.id); // 新しい一時ページを選択状態にする
  };

  // ページ更新
  const updatePage = async (
    id: string,
    updates: Partial<Pick<Page, "title" | "body">>
  ) => {
    const isNewPage = id.startsWith("client-temp-"); // 一時IDかどうかで新規作成か更新かを判断
    let response;
    let method;
    let url;

    if (isNewPage) {
      // 新規ページの場合はPOSTリクエスト
      method = "POST";
      url = `${API_BASE_URL}/content`;
      response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates), // 更新内容をそのまま送信
      });
    } else {
      // 既存ページの場合はPUTリクエスト
      method = "PUT";
      url = `${API_BASE_URL}/content/${id}`;
      response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
    }

    if (!response.ok) {
      console.error(`Failed to ${method} page:`, await response.text());
      // エラーハンドリングをここに追加することも検討
      return;
    }

    const apiPageData = await response.json();
    const processedPage = pageSchema.parse(apiPageData);

    setPages((prevPages) => {
      if (!prevPages) return [processedPage];
      // 一時ページをAPIから返されたページに置き換える、または既存ページを更新
      return prevPages.map((page) => (page.id === id ? processedPage : page));
    });

    // 新規ページだった場合、currentPageIdをAPIから返された実際のIDに更新
    if (isNewPage) {
      setCurrentPageId(processedPage.id);
    }
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
