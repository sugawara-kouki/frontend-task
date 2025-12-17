import { renderHook, act } from "@testing-library/react";
import { usePageEditor } from "./usePageEditor";

describe("usePageEditor", () => {
  const onSaveMock = jest.fn();

  beforeEach(() => {
    onSaveMock.mockClear();
  });

  describe("handleSaveTitle", () => {
    it("無効なタイトルの場合、エラーを設定しonSaveを呼ばない", () => {
      const { result } = renderHook(() =>
        usePageEditor({ onSave: onSaveMock })
      );

      act(() => {
        result.current.setTitle("");
      });

      act(() => {
        result.current.handleSaveTitle();
      });

      expect(result.current.titleError).toBeDefined();
      expect(onSaveMock).not.toHaveBeenCalled();
    });

    it("有効なタイトルの場合、エラーをクリアしonSaveを呼ぶ", () => {
      const { result } = renderHook(() =>
        usePageEditor({ onSave: onSaveMock })
      );

      act(() => {
        result.current.setTitle("Valid Title");
      });

      act(() => {
        result.current.handleSaveTitle();
      });

      expect(result.current.titleError).toBeUndefined();
      expect(onSaveMock).toHaveBeenCalledWith("Valid Title", "");
    });
  });

  describe("handleSaveBody", () => {
    it("無効な本文の場合、エラーを設定しonSaveを呼ばない", () => {
      const { result } = renderHook(() =>
        usePageEditor({ onSave: onSaveMock })
      );

      act(() => {
        result.current.setBody("short");
      });

      act(() => {
        result.current.handleSaveBody();
      });

      expect(result.current.bodyError).toBeDefined();
      expect(onSaveMock).not.toHaveBeenCalled();
    });

    it("有効な本文の場合、エラーをクリアしonSaveを呼ぶ", () => {
      const { result } = renderHook(() =>
        usePageEditor({ onSave: onSaveMock })
      );

      act(() => {
        result.current.setBody("This is a valid body content.");
      });

      act(() => {
        result.current.handleSaveBody();
      });

      expect(result.current.bodyError).toBeUndefined();
      expect(onSaveMock).toHaveBeenCalledWith(
        "",
        "This is a valid body content."
      );
    });
  });
});
