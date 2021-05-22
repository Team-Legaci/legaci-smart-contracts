import LegaciCollectible from 0xf8d6e0586b0a20c7

// This is the script to get a list of all the Legaci Collectible ids an account owns
// Just change the argument to `getAccount` to whatever account you want
// and as long as they have a published Collection receiver, you can see
// the moments they own.

// Parameters:
//
// account: The Flow Address of the account whose moment data needs to be read

// Returns: [UInt64]
// list of all moments' ids an account owns

pub fun main(account: Address): [UInt64] {

    let acct = getAccount(account)

    let collectionRef = acct.getCapability(/public/LegaciCollectibleCollection)
                            .borrow<&{LegaciCollectible.LegaciCollectibleCollectionPublic}>()!

    log(collectionRef.getIDs())

    return collectionRef.getIDs()
}