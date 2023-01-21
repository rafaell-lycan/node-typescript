import { ExchangeRateResult, Rates } from '../rates'

export const RATES_DATA_MOCK: Rates = {
  rates: { foo: { name: 'Foo', unit: 'FOO', value: 1, type: 'sample' } },
}

export const getExchangeRates = async (): Promise<ExchangeRateResult> =>
  Promise.resolve({
    exchangeRates: RATES_DATA_MOCK,
    timestamp: new Date(),
  })
