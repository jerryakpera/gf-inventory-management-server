export interface ErrorStatus extends Error {
  code: number;
  message: string;
}
