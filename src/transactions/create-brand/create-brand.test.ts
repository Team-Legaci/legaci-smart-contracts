import { createBrand } from './create-brand.tx'
import { getBrandIds } from '../../scripts/get-brand-ids'
import { initTestConfig } from '../../utils/initTestConfig'

initTestConfig()

describe('create-brand', () => {
  const mockBrandId = 'some-brand-id'

  test('createBrand', async () => {
    const { txId } = await createBrand({ brandId: mockBrandId })
    const brandIds = await getBrandIds()

    if (!brandIds.includes(mockBrandId)) {
      expect(!!txId).toBe(true)
      expect(txId?.length).toBe(64)
    }
    expect(brandIds).toContain(mockBrandId)
  })

  test('createBrand with duplicate brand id', async () => {
    const { txId } = await createBrand({ brandId: mockBrandId })
    expect(txId).toBe(null)
  })
})
