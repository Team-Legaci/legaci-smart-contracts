import * as fcl from '@onflow/fcl'
import * as sdk from '@onflow/sdk'
import * as t from '@onflow/types'
import { FlowTransaction } from '../../types'
import { signingFunction } from '../../utils/sign'

/**
 * This transaction is for the admin to create a new brand resource
 * and store it in the Legaci Collectible smart contract
 *
 * Parameters:
 *  brandId: The UUID string of the Legaci Brand ID that the Collectible references
 *
 * Returns:
 *  None
 */
const CODE = fcl.transaction`
import LegaciCollectible from 0xLEGACICOLLECTIBLE

transaction(brandId: String) {
    
  // Local variable for the Legaci Collectible Admin object
  let adminRef: &LegaciCollectible.Admin

  prepare(acct: AuthAccount) {
    // borrow a reference to the Admin resource in storage
    self.adminRef = acct
      .borrow<&LegaciCollectible.Admin>(from: /storage/LegaciCollectibleAdmin)
      ?? panic("Could not borrow a reference to the Admin resource")
  }

  execute {
    // Create a set with the specified name
    self.adminRef.createBrand(brandId: brandId)
  }

  post {
    self.adminRef.getBrandMintedCollectibles(brandId: brandId) == UInt64(0):
      "Could not find the specified brand"
  }
}
`

export const createBrand = async ({ brandId }: { brandId: String }): FlowTransaction => {
  try {
    const txId = await fcl
      .send([
        CODE,
        fcl.args([fcl.arg(brandId, t.String)]),
        fcl.payer(sdk.authorization(process.env.FLOW_SMART_CONTRACT_PROFILE, signingFunction, 0)), // current user is responsible for paying for the transaction
        fcl.proposer(sdk.authorization(process.env.FLOW_SMART_CONTRACT_PROFILE, signingFunction, 0)), // current user acting as the nonce
        fcl.authorizations([sdk.authorization(process.env.FLOW_SMART_CONTRACT_PROFILE, signingFunction, 0)]), // current user will be first AuthAccount
        fcl.limit(100), // set the compute limit
      ])
      .then(fcl.decode)

    // Verifies transaction is sealed and represented on the blockchain
    await fcl.tx(txId).onceSealed()
    return { txId }
  } catch (e) {
    console.warn(`Could not create brand. ${e}`)
    return { txId: null }
  }
}
