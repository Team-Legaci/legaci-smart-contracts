import { getAccount, getLegaciAccountSequenceNumber } from './get-account.script'
import { initTestConfig, EMULATOR_ACCOUNT_ADDR } from '../../utils/initTestConfig'

initTestConfig()

describe('get-account', () => {
  test('getAccount', async () => {
    const account = await getAccount(EMULATOR_ACCOUNT_ADDR)
    expect(account.address).toBe(EMULATOR_ACCOUNT_ADDR)
    expect(Object.keys(account.contracts).length).not.toBe(0)
  })

  test('getLegaciAccountSequenceNumber', async () => {
    const sequenceNumber = await getLegaciAccountSequenceNumber(EMULATOR_ACCOUNT_ADDR)
    expect(sequenceNumber).not.toBe(undefined)
    expect(sequenceNumber).not.toBe(null)
  })
})
