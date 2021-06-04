import * as fcl from '@onflow/fcl'
import * as sdk from '@onflow/sdk'
import * as t from '@onflow/types'
import { FlowTransaction } from '../../types'
import { signingFunction } from '../../utils/sign'

/**
 * This transaction is what an admin would use to mint a single new moment
 * and deposit it in a user's collection
 *
 * Parameters:
 *  brandId: The UUID string of the Legaci Brand ID that the Collectible references
 *  collectionId: The UUID string of the Legaci Collection ID that the Collectible references
 *  unitId: The UUID string of the Legaci Unit ID that the Collectible references
 *
 * Returns:
 *  recipientAddr: the Flow address of the account receiving the newly minted moment
 */
const CODE = fcl.transaction`
import LegaciCollectible from 0xLEGACICOLLECTIBLE

transaction(brandId: String, collectionId: String, unitId: String, recipientAddr: Address) {
  // local variable for the admin reference
  let adminRef: &LegaciCollectible.Admin

  prepare(acct: AuthAccount) {
    // borrow a reference to the Admin resource in storage
    self.adminRef = acct.borrow<&LegaciCollectible.Admin>(from: /storage/LegaciCollectibleAdmin)!
  }

  execute {
    // Borrow a reference to the specified set
    let brandRef = self.adminRef.borrowBrand(brandId: brandId)

    // Mint a new NFT
    let legaciCollectible1 <- brandRef.mintLegaciCollectible(collectionId: collectionId, unitId: unitId)

    // get the public account object for the recipient
    let recipient = getAccount(recipientAddr)

    // get the Collection reference for the receiver
    let receiverRef = recipient
      .getCapability(/public/LegaciCollectibleCollection)
      .borrow<&{LegaciCollectible.LegaciCollectibleCollectionPublic}>()
      ?? panic("Cannot borrow a reference to the recipient's Legaci Collectible collection")

    // deposit the NFT in the receivers collection
    receiverRef.deposit(token: <-legaciCollectible1)
  }
}
`

export const mintLegaciCollectible = async ({
  brandId,
  collectionId,
  unitId,
  recipientAddr,
}: {
  brandId: String
  collectionId: String
  unitId: String
  recipientAddr: String
}): FlowTransaction => {
  try {
    const txId = await fcl
      .send([
        CODE,
        fcl.args([
          fcl.arg(brandId, t.String),
          fcl.arg(collectionId, t.String),
          fcl.arg(unitId, t.String),
          fcl.arg(recipientAddr, t.Address),
        ]),
        // current user is responsible for paying for the transaction
        fcl.payer(sdk.authorization(process.env.FLOW_SMART_CONTRACT_PROFILE, signingFunction, 0)),
        // current user acting as the nonce
        fcl.proposer(sdk.authorization(process.env.FLOW_SMART_CONTRACT_PROFILE, signingFunction, 0)),
        // current user will be first AuthAccount
        fcl.authorizations([sdk.authorization(process.env.FLOW_SMART_CONTRACT_PROFILE, signingFunction, 0)]),
        fcl.limit(100), // set the compute limit
      ])
      .then(fcl.decode)

    // Verifies transaction is sealed and represented on the blockchain
    await fcl.tx(txId).onceSealed()

    return { txId }
  } catch (e) {
    console.warn(`Could not mint Legaci Collectible NFT. ${e}`)
    return { txId: null }
  }
}
