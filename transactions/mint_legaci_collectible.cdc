import LegaciCollectible from 0xa5ed1fedf146ddb6

// This transaction is what an admin would use to mint a single new moment
// and deposit it in a user's collection

// Parameters:
// Parameters: 
//     brandId: The UUID string of the Legaci Brand ID that the Collectible references
//     collectionId: The UUID string of the Legaci Collection ID that the Collectible references
//     unitId: The UUID string of the Legaci Unit ID that the Collectible references
//
// recipientAddr: the Flow address of the account receiving the newly minted moment

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
        let receiverRef = recipient.getCapability(/public/LegaciCollectibleCollection).borrow<&{LegaciCollectible.LegaciCollectibleCollectionPublic}>()
            ?? panic("Cannot borrow a reference to the recipient's Legaci Collectible collection")

        // deposit the NFT in the receivers collection
        receiverRef.deposit(token: <-legaciCollectible1)
    }
}