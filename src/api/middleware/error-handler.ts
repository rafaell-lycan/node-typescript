import type { ErrorRequestHandler } from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status = err.status ?? 500
  const code = err.code ?? 'UNKNOWN_ERROR'
  const message = err.message ?? err.name ?? 'Internal Server Error'

  res.status(status).json({ code, message })
}

export default errorHandler
