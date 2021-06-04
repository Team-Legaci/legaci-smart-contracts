import { script, send, decode, args, arg } from '@onflow/fcl'
import * as t from '@onflow/types'

/**
 * This script gets the metadata associated with a Legaci Collectible
 *
 * Parameters:
 *  account: The Flow Address of the account whose moment data needs to be read
 *  id: The unique ID for the Legaci Collectible whose data needs to be read
 *
 * Returns:
 *  {String: String}: A dictionary of all the play metadata associated
 *  with the specified moment
 */
const CODE = script`
import LegaciCollectible from 0xLEGACICOLLECTIBLE

pub fun main(account: Address, id: UInt64): {String: String} {

  // get the public capability for the owner's moment collection
  // and borrow a reference to it
  let collectionRef = getAccount(account)
    .getCapability(/public/LegaciCollectibleCollection)
    .borrow<&{LegaciCollectible.LegaciCollectibleCollectionPublic}>()
    ?? panic("Could not get public Legaci Collectible collection reference")

  // Borrow a reference to the specified moment
  let token = collectionRef
    .borrowLegaciCollectible(id: id)
    ?? panic("Could not borrow a reference to the specified Legaci Collectible")

  // Get the Legaci Collectible's metadata to access its associate brand, collection,
  // and unit
  let data = token.data
  let formattedMetadata: {String: String} = {}
  formattedMetadata["brandId"] = data.brandId
  formattedMetadata["collectionId"] = data.collectionId
  formattedMetadata["unitId"] = data.unitId

  log(formattedMetadata)

  return formattedMetadata
}
`

type FlowLegaciCollectibleMetadata = {
  brandId: string
  collectionId: string
  unitId: string
} | null

export const getMetadata = async ({
  accountAddress,
  nftId,
}: {
  accountAddress: String
  nftId: number
}): Promise<FlowLegaciCollectibleMetadata> => {
  try {
    const metadata = await send([
      CODE,
      args([
        arg(accountAddress, t.Address), // account
        arg(nftId, t.UInt64), // NFT Id
      ]),
    ]).then(decode)
    return metadata
  } catch (e) {
    console.warn(`Caught error while getting metadata. ${e}`)
    return null
  }
}
