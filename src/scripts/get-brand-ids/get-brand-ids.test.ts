import { getBrandIds } from './get-brand-ids.script'
import { initTestConfig } from '../../utils/initTestConfig'

initTestConfig()

describe('get-brand-ids', () => {
  test('getBrandIds', async () => {
    const brandIds = await getBrandIds()
    expect(brandIds instanceof Array).toBe(true)
  })
})
