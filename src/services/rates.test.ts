import nock from 'nock'
import { AxiosError } from 'axios'

import { API_URL, getExchangeRates } from './rates'
import { RATES_DATA_MOCK } from './__mocks__/rates'

const scope = nock(API_URL)

describe('getExchangeRates', () => {
  it('returns ExchangeRateResult', async () => {
    scope.get('').reply(200, RATES_DATA_MOCK)
    await expect(getExchangeRates()).resolves.toStrictEqual(
      expect.objectContaining({ exchangeRates: RATES_DATA_MOCK }),
    )
  })

  it('returns AxiosError', async () => {
    scope.get('').replyWithError({})
    await expect(getExchangeRates()).rejects.toThrow(AxiosError)
  })
})
