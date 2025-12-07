class RequestError extends Error {
  constructor(
    message: string,
    public status?: number,
    public responseBody?: string
  ) {
    super(message);
    this.name = 'RequestError';
  }
}

export { RequestError };
