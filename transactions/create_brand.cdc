import LegaciCollectible from 0xf8d6e0586b0a20c7

// This transaction is for the admin to create a new brand resource
// and store it in the Legaci Collectible smart contract

// Parameters:
//
// brandId: the UUID String of the Brand

transaction(brandId: String) {
    
    // Local variable for the topshot Admin object
    let adminRef: &LegaciCollectible.Admin

    prepare(acct: AuthAccount) {
        // borrow a reference to the Admin resource in storage
        self.adminRef = acct.borrow<&LegaciCollectible.Admin>(from: /storage/LegaciCollectibleAdmin)
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
