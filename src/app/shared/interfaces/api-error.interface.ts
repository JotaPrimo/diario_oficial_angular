export interface ApiError {
  path:       string;
  method:     string;
  status:     number;
  statusText: string;
  message:    string;
  errors:     Errors;
}

export interface Errors {
  [key: string]: string;
}
