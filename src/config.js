import { config } from '@onflow/fcl'

/**
 * Configure FCL (Flow Control Library)
 *
 * TypeScript not yet supported for the Flow SDK
 */
config()
  .put('accessNode.api', process.env.FLOW_ACCESS_NODE) // Configure FCL's Access Node
  .put('challenge.handshake', process.env.FLOW_WALLET_DISCOVERY) // Configure FCL's Wallet Discovery mechanism
  .put('0xLEGACICOLLECTIBLE', process.env.FLOW_SMART_CONTRACT_PROFILE) // Will let us use `0xLEGACICOLLECTIBLE` in our Cadence
