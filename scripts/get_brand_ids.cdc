import LegaciCollectible from 0xf8d6e0586b0a20c7

// This script returns an array of the brandIds

// Parameters:

// Returns: [String]
// Array of UUID Brand IDs

pub fun main(): [String] {
    return LegaciCollectible.getBrands()
}