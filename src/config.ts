const config = {
  env: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8080,
} as const

export default config
