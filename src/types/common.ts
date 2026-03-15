export interface ApiResponse<T = any> {
  succeeded: boolean;
  message: string;
  code: string;
  data: T;
  meta: any | null;
  errors: any | null;
}

export type ApiData<T> = T extends ApiResponse<infer D> ? D : never;