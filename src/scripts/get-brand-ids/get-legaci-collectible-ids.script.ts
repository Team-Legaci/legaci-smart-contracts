import { script, send, decode, args, arg } from '@onflow/fcl'
import * as t from '@onflow/types'

/**
 * This is the script to get a list of all the Legaci Collectible ids an account owns.
 * Just change the argument to `getAccount` to whatever account you want
 * and as long as they have a published Collection receiver, you can see
 * the Legaci Collectibles they own.
 *
 * Parameters:
 *  account: The Flow Address of the account whose moment data needs to be read
 *
 * Returns:
 *  [UInt64]: List of all Legaci Collectible ids an account owns
 *
 */

const CODE = script`
import LegaciCollectible from 0xLEGACICOLLECTIBLE

pub fun main(account: Address): [UInt64] {

  let acct = getAccount(account)

  let collectionRef = acct
    .getCapability(/public/LegaciCollectibleCollection)
    .borrow<&{LegaciCollectible.LegaciCollectibleCollectionPublic}>()!

  log(collectionRef.getIDs())

  return collectionRef.getIDs()
}
`
type FlowLegaciCollectibleIds = String[]

export const getLegaciCollectibleIds = async ({
  accountAddress,
}: {
  accountAddress: String
}): Promise<FlowLegaciCollectibleIds> => {
  const collectibleIds = await send([
    CODE,
    args([
      arg(accountAddress, t.Address), // account
    ]),
  ]).then(decode)
  return collectibleIds
}
