import { script, send, decode } from '@onflow/fcl'

/**
 * This script returns an array of the brandIds
 *
 * Parameters:
 *  None
 *
 * Returns:
 *  [String]: Array of brands UUID
 */
const CODE = script`
import LegaciCollectible from 0xLEGACICOLLECTIBLE

pub fun main(): [String] {
  return LegaciCollectible.getBrands()
}
`

type FlowBrandIds = String[]

export const getBrandIds = async (): Promise<FlowBrandIds> => {
  try {
    const brandIds = await send([CODE]).then(decode)
    return brandIds
  } catch (e) {
    console.warn(`Caught error while getting brand IDs. ${e}`)
    return []
  }
}
