import { renderHook, act } from "@testing-library/react";
import { usePageEditor } from "./usePageEditor";

describe("usePageEditor", () => {
  // onSaveが呼ばれたかをチェックするためのモック関数
  const onSaveMock = jest.fn();

  beforeEach(() => {
    // 各テストの前にモックをリセット
    onSaveMock.mockClear();
  });

  describe("Title Validation", () => {
    it("should set an error for an empty title", () => {
      const { result } = renderHook(() =>
        usePageEditor({ onSave: onSaveMock })
      );

      act(() => {
        result.current.setTitle("");
      });

      act(() => {
        result.current.handleSaveTitle();
      });

      expect(result.current.titleError).toBe(
        "タイトルは1文字以上で入力してください"
      );
      expect(onSaveMock).not.toHaveBeenCalled();
    });

    it("should set an error for a title longer than 50 characters", () => {
      const { result } = renderHook(() =>
        usePageEditor({ onSave: onSaveMock })
      );
      const longTitle = "a".repeat(51);

      act(() => {
        result.current.setTitle(longTitle);
      });

      act(() => {
        result.current.handleSaveTitle();
      });

      expect(result.current.titleError).toBe(
        "タイトルは50文字以下で入力してください"
      );
      expect(onSaveMock).not.toHaveBeenCalled();
    });

    it("should not set an error for a valid title and call onSave", () => {
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

  describe("Body Validation", () => {
    it("should set an error for a body shorter than 10 characters", () => {
      const { result } = renderHook(() =>
        usePageEditor({ onSave: onSaveMock })
      );

      act(() => {
        result.current.setBody("short");
      });

      act(() => {
        result.current.handleSaveBody();
      });

      expect(result.current.bodyError).toBe(
        "詳細は10文字以上で入力してください"
      );
      expect(onSaveMock).not.toHaveBeenCalled();
    });

    it("should set an error for a body longer than 2000 characters", () => {
      const { result } = renderHook(() =>
        usePageEditor({ onSave: onSaveMock })
      );
      const longBody = "a".repeat(2001);

      act(() => {
        result.current.setBody(longBody);
      });

      act(() => {
        result.current.handleSaveBody();
      });

      expect(result.current.bodyError).toBe(
        "詳細は2000文字以下で入力してください"
      );
      expect(onSaveMock).not.toHaveBeenCalled();
    });

    it("should not set an error for a valid body and call onSave", () => {
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
