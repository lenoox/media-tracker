export interface Response<T> {
  data?: T;
  error?: ErrorMessageResponse;
}

export interface ErrorMessageResponse {
  message: string;
}
