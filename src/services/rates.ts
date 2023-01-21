import axios from 'axios'

type Currency = {
  name: string
  unit: string
  value: number
  type: string
}

export type Rates = {
  rates: Record<string, Currency>
}

export type ExchangeRateResult = {
  timestamp: Date
  exchangeRates: Rates
}

export const API_URL = 'https://api.coingecko.com/api/v3/exchange_rates'

const headers = {
  Accept: 'application/json',
}

export const getExchangeRates = async (): Promise<ExchangeRateResult> => {
  const response = await axios.get<Rates>(API_URL, { headers })

  return {
    timestamp: new Date(),
    exchangeRates: response.data,
  }
}
