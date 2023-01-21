import type { Server } from 'http'

import config from './config'
import server from './server'
import logger from './utils/logger'

/**
 * Start Express server.
 */
let serverInstance: Server

function main() {
  serverInstance = server.listen(config.port, () => {
    logger.info(`Server is running on port ${config.port}`)
  })
}

process.on('unhandledRejection', (reason) => {
  if (reason) logger.error(reason)
  process.kill(process.pid, 'SIGTERM')
})

process.on('uncaughtException', (err) => {
  if (err) logger.error(err)
  process.kill(process.pid, 'SIGTERM')
})

/**
 * Graceful shut downs.
 */
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.')
  logger.info('Closing http server.')
  serverInstance.close(() => logger.info('Http server closed.'))
})

main()
