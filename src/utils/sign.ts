import { ec as EC } from 'elliptic'
import { SHA3 } from 'sha3'

const ec: EC = new EC('p256')

const hashMsg = (msg: string) => {
  const sha = new SHA3(256)
  sha.update(Buffer.from(msg, 'hex'))
  return sha.digest()
}

const sign = (privateKey: string, msg: string) => {
  const key = ec.keyFromPrivate(Buffer.from(privateKey, 'hex'))
  const sig = key.sign(hashMsg(msg))
  const n = 32
  const r = sig.r.toArrayLike(Buffer, 'be', n)
  const s = sig.s.toArrayLike(Buffer, 'be', n)
  const signedMessage = Buffer.concat([r, s]).toString('hex')
  return signedMessage
}

export const signingFunction = async (signable: any) => ({
  addr: process.env.FLOW_SMART_CONTRACT_PROFILE ?? '', // In this case it should be the same as above
  keyId: 0, // In this case it should be the same as above
  signature: sign(process.env.FLOW_ACCOUNT_PRIVATE_KEY ?? '', signable?.message ?? ''),
})
