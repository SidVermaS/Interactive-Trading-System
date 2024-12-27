export type StringUnknownI = Record<string, unknown>

export type PaginationResponseI<T> = {
  data: T[]
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  }
}
export type PickAtLeastOne<T, Keys extends keyof T> = {
  [K in Keys]: Pick<T, K> & Partial<Pick<T, Exclude<Keys, K>>>;
}[Keys];