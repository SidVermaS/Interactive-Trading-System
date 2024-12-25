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