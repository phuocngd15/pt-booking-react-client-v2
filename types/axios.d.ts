export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;
export interface RequestOptions {
  // Leave blank to use default
  urlPrefix?: string;
  // set token
  specialToken?: string;
  // "Whether to enable custom request error prompts"
  errorMassge?: boolean;
  // Whether to carry token
  withToken?: boolean;
  // Error message prompt type
  errorMessageMode?: ErrorMessageMode;

  useBearerToken?: boolean;

  bearerToken?: string;
}
export interface Result<T = any> {
  code: number;
  message: string;
  data: T;
}
