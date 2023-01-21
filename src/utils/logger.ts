import { createLogger, format, transports } from 'winston'

import config from '../config'

const { combine, timestamp, json } = format

const logger = createLogger({
  level: config.logLevel,
  format: combine(timestamp(), json()),
  transports: [new transports.Console()],
})

export default logger
