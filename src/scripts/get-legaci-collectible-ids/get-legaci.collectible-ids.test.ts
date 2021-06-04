import { getLegaciCollectibleIds } from './get-legaci-collectible-ids.script'
import { initTestConfig, EMULATOR_ACCOUNT_ADDR } from '../../utils/initTestConfig'

initTestConfig()

describe('get-legaci-collectible-ids', () => {
  test('getLegaciCollectibleIds', async () => {
    const collectibleIds = await getLegaciCollectibleIds({ accountAddress: EMULATOR_ACCOUNT_ADDR })
    expect(collectibleIds instanceof Array).toBe(true)
  })
})
