import 'express-async-errors'
import express from 'express'

import { errorHandler, notFoundHandler } from './api/middleware'
import routes from './api/routes'

const server = express()

server.disable('etag')
server.disable('x-powered-by')

server.use(express.json())
server.use(express.urlencoded({ extended: false }))

server.use(routes)

server.use(notFoundHandler)
server.use(errorHandler)

export default server
