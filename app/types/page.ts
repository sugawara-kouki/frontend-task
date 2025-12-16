export interface Page {
  id: string;
  title: string;
  body: string;
  createdAt: number;
  updatedAt: number;
}

export type PageInput = Omit<Page, "id" | "createdAt" | "updatedAt">;
