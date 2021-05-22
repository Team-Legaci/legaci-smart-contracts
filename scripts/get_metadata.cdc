import LegaciCollectible from 0xf8d6e0586b0a20c7

// This script gets the metadata associated with a Legaci Collectible
// in a collection by looking up its NFT ID

// Parameters:
//
// account: The Flow Address of the account whose moment data needs to be read
// id: The unique ID for the Legaci Collectible whose data needs to be read

// Returns: {String: String} 
// A dictionary of all the play metadata associated
// with the specified moment

pub fun main(account: Address, id: UInt64): {String: String} {

    // get the public capability for the owner's moment collection
    // and borrow a reference to it
    let collectionRef = getAccount(account).getCapability(/public/LegaciCollectibleCollection)
        .borrow<&{LegaciCollectible.LegaciCollectibleCollectionPublic}>()
        ?? panic("Could not get public Legaci Collectible collection reference")

    // Borrow a reference to the specified moment
    let token = collectionRef.borrowLegaciCollectible(id: id)
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