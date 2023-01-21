import type { RequestHandler } from 'express'
import { NotFoundError } from '../../utils/errors/http/HttpError'

const notFoundHandler: RequestHandler = (_req, _res, next) => {
  next(new NotFoundError())
}

export default notFoundHandler
