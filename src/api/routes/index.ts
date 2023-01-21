import { Router } from 'express'

const routes = Router()

routes.get('/_health', (_req, res) =>
  res.status(200).send({ uptime: process.uptime() }),
)

routes.get('/exchange-rates', async (_req, res) => {
  const { getExchangeRates } = await import('../../services/rates')
  const rates = await getExchangeRates()
  res.json(rates)
})

export default routes
