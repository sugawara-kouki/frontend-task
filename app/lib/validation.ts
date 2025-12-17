import { z } from "zod";

/**
 * ページタイトルのバリデーションスキーマ
 * - 1文字以上50文字以下
 */
export const titleSchema = z
  .string()
  .min(1, "タイトルは1文字以上で入力してください")
  .max(50, "タイトルは50文字以下で入力してください");

/**
 * ページ本文のバリデーションスキーマ
 * - 10文字以上2000文字以下
 */
export const bodySchema = z
  .string()
  .min(10, "詳細は10文字以上で入力してください")
  .max(2000, "詳細は2000文字以下で入力してください");

/**
 * タイトルをバリデーションする
 * @param value - バリデーション対象の文字列
 * @returns バリデーション結果（成功時はsuccess: true、失敗時はerrorメッセージを含む）
 */
export function validateTitle(value: string) {
  return titleSchema.safeParse(value);
}

/**
 * 本文をバリデーションする
 * @param value - バリデーション対象の文字列
 * @returns バリデーション結果（成功時はsuccess: true、失敗時はerrorメッセージを含む）
 */
export function validateBody(value: string) {
  return bodySchema.safeParse(value);
}
