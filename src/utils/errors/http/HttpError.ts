import { ApplicationError, ErrorProps } from '../ApplicationError'

export const HTTP_ERROR_CODES = {
  internalError: 'INTERNAL_SERVER_ERROR',
  notFound: 'NOT_FOUND',
}

interface HttpErrorProps extends Omit<ErrorProps, 'code'> {
  code?: string
  status: number
}

const defaultParams: HttpErrorProps = {
  message: 'Something went wrong',
  status: 500,
}

export abstract class HttpError
  extends ApplicationError
  implements HttpErrorProps
{
  status: number

  constructor({ message, code, status }: HttpErrorProps = defaultParams) {
    super(message, code)
    this.message = message
    this.status = status
    this.name = HttpError.name
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      name: this.name,
      status: this.status,
    }
  }
}

export class InternalError extends HttpError {
  status = 500
  code = HTTP_ERROR_CODES.internalError
  message = 'Internal Server Error'
}

export class NotFoundError extends HttpError {
  status = 404
  code = HTTP_ERROR_CODES.notFound
  message = 'Not Found'
}
