import { validateTitle, validateBody, titleSchema, bodySchema } from "./validation";

describe("バリデーション", () => {
  describe("titleSchema", () => {
    it("1文字のタイトルを受け入れる", () => {
      const result = titleSchema.safeParse("a");
      expect(result.success).toBe(true);
    });

    it("50文字のタイトルを受け入れる", () => {
      const result = titleSchema.safeParse("a".repeat(50));
      expect(result.success).toBe(true);
    });

    it("空のタイトルを拒否する", () => {
      const result = titleSchema.safeParse("");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe(
          "タイトルは1文字以上で入力してください"
        );
      }
    });

    it("50文字を超えるタイトルを拒否する", () => {
      const result = titleSchema.safeParse("a".repeat(51));
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe(
          "タイトルは50文字以下で入力してください"
        );
      }
    });
  });

  describe("bodySchema", () => {
    it("10文字の本文を受け入れる", () => {
      const result = bodySchema.safeParse("a".repeat(10));
      expect(result.success).toBe(true);
    });

    it("2000文字の本文を受け入れる", () => {
      const result = bodySchema.safeParse("a".repeat(2000));
      expect(result.success).toBe(true);
    });

    it("10文字未満の本文を拒否する", () => {
      const result = bodySchema.safeParse("short");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe(
          "詳細は10文字以上で入力してください"
        );
      }
    });

    it("2000文字を超える本文を拒否する", () => {
      const result = bodySchema.safeParse("a".repeat(2001));
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe(
          "詳細は2000文字以下で入力してください"
        );
      }
    });
  });

  describe("validateTitle", () => {
    it("有効なタイトルの場合、成功を返す", () => {
      const result = validateTitle("Valid Title");
      expect(result.success).toBe(true);
    });

    it("無効なタイトルの場合、エラーを返す", () => {
      const result = validateTitle("");
      expect(result.success).toBe(false);
    });
  });

  describe("validateBody", () => {
    it("有効な本文の場合、成功を返す", () => {
      const result = validateBody("This is a valid body content.");
      expect(result.success).toBe(true);
    });

    it("無効な本文の場合、エラーを返す", () => {
      const result = validateBody("short");
      expect(result.success).toBe(false);
    });
  });
});
