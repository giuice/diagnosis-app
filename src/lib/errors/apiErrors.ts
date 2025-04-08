export class APIError extends Error {
  constructor(message: string, public statusCode?: number, public details?: any) {
    super(message);
    this.name = 'APIError';
  }
}

export class NetworkError extends Error {
  constructor(message = 'Network error occurred') {
    super(message);
    this.name = 'NetworkError';
  }
}

export class ValidationError extends Error {
  constructor(message = 'Invalid request data') {
    super(message);
    this.name = 'ValidationError';
  }
}

export class QuotaError extends Error {
  constructor(message = 'API quota exceeded') {
    super(message);
    this.name = 'QuotaError';
  }
}

export class UnknownError extends Error {
  constructor(message = 'An unknown error occurred') {
    super(message);
    this.name = 'UnknownError';
  }
}

export function classifyError(error: any): Error {
  if (error instanceof Error) return error;

  if (error?.response?.status) {
    const status = error.response.status;
    if (status === 400) return new ValidationError(error.message);
    if (status === 401 || status === 403) return new APIError('Unauthorized or forbidden', status);
    if (status === 429) return new QuotaError();
    if (status >= 500) return new APIError('Server error', status);
    return new APIError(error.message, status);
  }

  if (error?.message?.includes('Network')) return new NetworkError();

  return new UnknownError(typeof error === 'string' ? error : undefined);
}
