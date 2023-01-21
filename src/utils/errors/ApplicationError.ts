export const ERROR_CODES = {
  unknown: 'UNKNOWN_ERROR',
}

export interface ErrorProps {
  message: string
  code: string
}

export class ApplicationError extends Error implements ErrorProps {
  code: string

  constructor(message: string, code?: string) {
    super(message)

    this.code = code || ERROR_CODES.unknown
    this.name = ApplicationError.name

    Error.captureStackTrace(this, this.constructor)
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      name: this.name,
    }
  }
}
