import LegaciCollectible from 0xa5ed1fedf146ddb6

// This script returns an array of the brandIds

// Parameters:

// Returns: [String]
// Array of UUID Brand IDs

pub fun main(): [String] {
    return LegaciCollectible.getBrands()
}