"use client";

import Image from "next/image";
import { MouseEvent, useState } from "react";
import { EditButton } from "../Button/EditButton";
import { DeleteButton } from "../Button/DeleteButton";
import { NewPageButton } from "../Button/NewPageButton";
import { DoneButton } from "../Button/DoneButton";
import { Page } from "@/app/lib/types";

type SidebarProps = {
  pages: Page[] | undefined;
  currentPageId: string | null;
  setCurrentPageId: (id: string) => void;
  createPage: () => void;
  deletePage: (id: string) => void;
};

export function Sidebar({
  pages,
  currentPageId,
  setCurrentPageId,
  createPage,
  deletePage,
}: SidebarProps) {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleDone = () => {
    setIsEditMode(false);
  };

  const handleNewPage = () => {
    createPage();
    setIsEditMode(false);
  };

  const handleDelete = (e: MouseEvent, id: string) => {
    e.stopPropagation(); // 親要素のクリックイベントを発火させない
    deletePage(id);
  };

  const handleSelectPage = (id: string) => {
    if (!isEditMode) {
      setCurrentPageId(id);
    }
  };

  return (
    <div className="flex flex-col h-screen w-70 border-r border-gray-200">
      <aside className="flex-1 pt-7.5 pl-10 pr-2.5 overflow-y-auto">
        {/* ロゴとサービス名 */}
        <div className="flex gap-1 items-center">
          <Image
            src="/icon/logo.svg"
            width={32}
            height={32}
            alt="ServiceName Logo"
          />
          <h1 className="font-extrabold text-2xl">ServiceName</h1>
        </div>
        {/* 投稿一覧 */}
        <nav className="pt-5">
          <ul>
            {pages?.map((page) => (
              <li
                key={page.id}
                onClick={() => handleSelectPage(page.id)}
                className={`flex items-center gap-2 p-2.5 hover:bg-[#F5F8FA] hover:text-[#32A8F8] hover:font-bold ${
                  currentPageId === page.id && !isEditMode
                    ? "bg-[#F5F8FA] text-[#32A8F8] font-bold"
                    : ""
                } ${isEditMode ? "" : "cursor-pointer"}`}
              >
                <span className="flex-1 truncate">
                  {page.title || "無題のページ"}
                </span>
                {isEditMode && (
                  <DeleteButton
                    onClick={(e) => handleDelete(e, page.id)}
                    className="w-6 h-6 shrink-0"
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* 操作ボタンエリア */}
      <div
        className={`pl-10 pr-2.5 py-2.5 flex gap-2.5 bg-[#F6F8FA] ${
          isEditMode ? "justify-between" : "justify-end"
        }`}
      >
        {isEditMode ? (
          <>
            <NewPageButton onClick={handleNewPage} className="w-22.5" />
            <DoneButton onClick={handleDone} className="w-22.5" />
          </>
        ) : (
          <EditButton className="w-22.5" onClick={() => setIsEditMode(true)} />
        )}
      </div>
    </div>
  );
}
