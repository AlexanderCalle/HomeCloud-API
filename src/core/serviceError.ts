const NOT_FOUND = 'NOT_FOUND';
const VALIDATION_FAILED = 'VALIDATION_FAILED';
const UNAUTHORIZED = 'UNAUTHORIZED';
const FORBIDDEN = 'FORBIDDEN';

class ServiceError extends Error {
  code: string;
  details: object | null;
  constructor(code: string, message: string, details: object | null = null) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = 'ServiceError';
  }

  static notFound(message: string, details?: object) {
    return new ServiceError(NOT_FOUND, message, details);
  }

  static validationFailed(message: string, details?: object) {
    return new ServiceError(VALIDATION_FAILED, message, details);
  }

  get isNotFound() {
    return this.code === NOT_FOUND;
  }

  get isValidationFailed() {
    return this.code === VALIDATION_FAILED;
  }

  static unauthorized(message: string, details?: object) {
    return new ServiceError(UNAUTHORIZED, message, details);
  }

  static forbidden(message: string, details?: object) {
    return new ServiceError(FORBIDDEN, message, details);
  }

  get isUnauthorized() {
    return this.code === UNAUTHORIZED;
  }

  get isForbidden() {
    return this.code === FORBIDDEN;
  }
}

export { ServiceError };