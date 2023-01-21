import { ApplicationError } from './ApplicationError'
import { InternalError, NotFoundError } from './http/HttpError'

describe('Errors', () => {
  it('returns an ApplicationError', () => {
    const error = new ApplicationError('Foo')
    try {
      throw error
    } catch (err) {
      expect(err).toBeInstanceOf(ApplicationError)
      expect(JSON.stringify(err)).toContain(error.name)
      expect(JSON.stringify(err)).toContain(error.code)
      expect(JSON.stringify(err)).toContain(error.message)
    }
  })

  it('returns an InternalError', () => {
    try {
      throw new InternalError()
    } catch (err) {
      expect(err).toBeInstanceOf(InternalError)
      expect(JSON.stringify(err)).toContain('500')
      expect(JSON.stringify(err)).toContain('INTERNAL_SERVER_ERROR')
    }
  })

  it('returns an NotFoundError', () => {
    try {
      throw new NotFoundError()
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundError)
      expect(JSON.stringify(err)).toContain('404')
      expect(JSON.stringify(err)).toContain('NOT_FOUND')
    }
  })
})
