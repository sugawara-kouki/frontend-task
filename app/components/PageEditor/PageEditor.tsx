"use client";
import { usePageEditor } from "../../hooks/usePageEditor";
import { useState } from "react";
import { SaveButton } from "../Button/SaveButton";
import { EditButton } from "../Button/EditButton";
import { CancelButton } from "../Button/CancelButton";

interface PageEditorProps {
  title: string;
  body: string;
  onSave: (title: string, body: string) => void;
}

export function PageEditor({
  title: initialTitle,
  body: initialBody,
  onSave,
}: PageEditorProps) {
  const {
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
  } = usePageEditor({
    initialTitle,
    initialBody,
    onSave,
  });

  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [isContentEdit, setIsContentEdit] = useState(false);

  const onSaveTitle = () => {
    if (handleSaveTitle()) {
      setIsTitleEdit(false);
    }
  };

  const onCancelTitle = () => {
    setTitle(initialTitle);
    clearTitleError();
    setIsTitleEdit(false);
  };

  const onSaveContent = () => {
    if (handleSaveBody()) {
      setIsContentEdit(false);
    }
  };

  const onCancelContent = () => {
    setBody(initialBody);
    clearBodyError();
    setIsContentEdit(false);
  };

  const onStartTitleEdit = () => {
    setTitle(initialTitle); // 編集開始時に初期値をセット
    clearTitleError();
    setIsTitleEdit(true);
  };

  const onStartContentEdit = () => {
    setBody(initialBody); // 編集開始時に初期値をセット
    clearBodyError();
    setIsContentEdit(true);
  };

  return (
    <div className="h-full flex flex-col">
      {/* タイトル入力 */}
      <div className="mb-5">
        {isTitleEdit ? (
          <div className="flex items-start gap-5">
            <div className="flex-1">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="タイトルを入力"
                autoFocus
                className={`w-full text-2xl bg-white font-bold px-7.5 py-2 rounded-2xl border border-[#4EACF5] transition-colors outline-none ${
                  titleError ? "border-red-500" : ""
                }`}
              />
              {titleError && (
                <p className="text-red-500 text-sm mt-2 px-7.5">{titleError}</p>
              )}
            </div>
            <div className="flex gap-2.5">
              <CancelButton onClick={onCancelTitle} className="w-10 h-10" />
              <SaveButton onClick={onSaveTitle} className="w-10 h-10" />
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-5">
            <h1 className="flex-1 text-2xl font-bold px-7.5 py-3 cursor-pointer rounded-2xl transition-colors">
              {initialTitle || "タイトルを入力"}
            </h1>
            <EditButton className="w-22.5" onClick={onStartTitleEdit} />
          </div>
        )}
      </div>

      {/* 本文入力 */}
      <div className="flex-1 flex gap-5 min-h-0">
        {isContentEdit ? (
          // 編集モード時の表示
          <>
            <div className="flex-1 flex flex-col">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="本文を入力（10文字以上）"
                autoFocus
                className={`flex-1 bg-white rounded-2xl p-7.5 border border-[#4EACF5] transition-colors resize-none outline-none min-h-0 ${
                  bodyError ? "border-red-500" : ""
                }`}
              />
              {bodyError && (
                <p className="text-red-500 text-sm mt-2 px-7.5">{bodyError}</p>
              )}
            </div>
            <div className="flex gap-2.5">
              <CancelButton onClick={onCancelContent} className="w-10 h-10" />
              <SaveButton onClick={onSaveContent} className="w-10 h-10" />
            </div>
          </>
        ) : (
          // プレビューモード時の表示
          <>
            <div className="flex-1 bg-white rounded-2xl p-7.5 border border-[#4EACF5] transition-colors overflow-y-auto">
              <p className="whitespace-pre-wrap">
                {initialBody || "本文を入力（10文字以上）"}
              </p>
            </div>
            <div className="shrink-0">
              <EditButton className="w-22.5" onClick={onStartContentEdit} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
