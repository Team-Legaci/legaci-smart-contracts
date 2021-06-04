import * as fcl from '@onflow/fcl'

export const getAccount = async (address: string) => {
  const { account } = await fcl.send([fcl.getAccount(address)])
  return account
}

export const getLegaciAccountSequenceNumber = async (address: string): Promise<number> => {
  const account = await getAccount(address ?? '')
  const key = account?.keys?.[0] ?? { sequenceNumber: 0 }
  return key.sequenceNumber ?? 0
}
