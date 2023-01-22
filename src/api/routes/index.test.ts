import supertest from 'supertest'

import server from '../../server'
import { RATES_DATA_MOCK } from '../../services/__mocks__/rates'

describe('API:Routes', () => {
  const api = supertest(server)

  describe('[GET] /_health', () => {
    it('returns 200 OK with uptime', async () => {
      const response = await api.get('/_health')

      expect(response.statusCode).toBe(200)
      expect(response.body).toStrictEqual({ uptime: expect.anything() })
    })
  })

  describe('[GET] /exchange-rates', () => {
    it('returns 200 OK with uptime', async () => {
      vi.mock('../../services/rates')
      const response = await api.get('/exchange-rates')

      expect(response.statusCode).toBe(200)
      expect(response.body).toStrictEqual(
        expect.objectContaining({ exchangeRates: RATES_DATA_MOCK }),
      )
    })

    it('returns 500 UNKNOWN_ERROR', async () => {
      vi.spyOn(
        await import('../../services/rates'),
        'getExchangeRates',
      ).mockRejectedValue({})
      const response = await api.get('/exchange-rates')

      expect(response.statusCode).toBe(500)
      expect(response.body).toStrictEqual({
        code: 'UNKNOWN_ERROR',
        message: 'Internal Server Error',
      })
    })
  })

  describe('[*] 404 NOT_FOUND', () => {
    const httpMethods = [
      ['GET', 'get'],
      ['POST', 'post'],
      ['PUT', 'put'],
      ['PATCH', 'patch'],
      ['DELETE', 'delete'],
    ] as const

    it.each(httpMethods)('[%s] returns 404 NOT_FOUND', async (_, method) => {
      const response = await api[method]('/foo')

      expect(response.statusCode).toBe(404)
    })
  })
})
