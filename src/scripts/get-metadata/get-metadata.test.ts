import { getMetadata } from './get-metadata.script'
import { initTestConfig, EMULATOR_ACCOUNT_ADDR } from '../../utils/initTestConfig'

initTestConfig()

describe('get-metadata', () => {
  test('getMetadata', async () => {
    const metadata = await getMetadata({ accountAddress: EMULATOR_ACCOUNT_ADDR, nftId: 1000 })
    expect(metadata).toBe(null)
  })
})
