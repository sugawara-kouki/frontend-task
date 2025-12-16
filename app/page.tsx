"use client";

import { Sidebar } from "./components/Sidebar/Sidebar";
import { usePages } from "./hooks/usePages";
import { PageEditor } from "./components/PageEditor/PageEditor";

export default function Page() {
  const {
    pages,
    currentPage,
    currentPageId,
    setCurrentPageId,
    createPage,
    updatePage,
    deletePage,
  } = usePages();

  const handleSave = (title: string, body: string) => {
    if (currentPage) {
      updatePage(currentPage.id, { title, body });
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        pages={pages}
        currentPageId={currentPageId}
        setCurrentPageId={setCurrentPageId}
        createPage={createPage}
        deletePage={deletePage}
      />
      <main className="flex-1 px-10 pt-7.5 pb-5 overflow-auto">
        {pages === undefined ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            読込中...
          </div>
        ) : currentPage ? (
          <div className="h-full flex flex-col">
            <PageEditor
              key={currentPage.id} // ページが切り替わったことをコンポーネントに伝える
              title={currentPage.title}
              body={currentPage.body}
              onSave={handleSave}
            />
            <div className="flex justify-between py-5">
              <p className="text-[12px]">Copyright ©︎ 2021 Sample</p>
              <p className="text-[12px]">運営会社</p>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p className="text-lg mb-4">ページがありません</p>
              <button
                onClick={createPage}
                className="px-6 py-3 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                最初のページを作成
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
