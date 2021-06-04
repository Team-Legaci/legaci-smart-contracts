import { config } from '@onflow/fcl'

export const EMULATOR_ACCESS_NODE = 'http://localhost:8080'
export const EMULATOR_ACCOUNT_ADDR = '0xf8d6e0586b0a20c7'
const EMULATOR_PRIVATE_KEY = 'b732e1d8c421ad2083f514df73dbfb1d6de149b2a5a7c864bff9a70f4a50ea3c'

export const initTestConfig = () => {
  // Point all config values for local Flow SDK to emulator instance
  process.env.FLOW_SMART_CONTRACT_PROFILE = EMULATOR_ACCOUNT_ADDR
  process.env.FLOW_ACCOUNT_PRIVATE_KEY = EMULATOR_PRIVATE_KEY
  config()
    .put('accessNode.api', EMULATOR_ACCESS_NODE) // Configure FCL's Access Node
    .put('challenge.handshake', process.env.FLOW_WALLET_DISCOVERY) // Configure FCL's Wallet Discovery mechanism
    .put('0xLEGACICOLLECTIBLE', EMULATOR_ACCOUNT_ADDR) // Will let us use `0xLEGACICOLLECTIBLE` in our Cadence
}
