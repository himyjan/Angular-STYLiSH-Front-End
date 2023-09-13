type AuthResponse = {
  accessToken: string;
};

export type Response = {
  authResponse: AuthResponse;
  status: string;
  statusText: string;
  error: Error;
  text: () => string;
  json: () => string;
};
