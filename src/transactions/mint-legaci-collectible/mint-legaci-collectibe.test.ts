import { mintLegaciCollectible } from './mint-legaci-collectible.tx'
import { getMetadata } from '../../scripts/get-metadata'
import { createBrand } from '../../transactions/create-brand'
import { getBrandIds } from '../../scripts/get-brand-ids'
import { getLegaciCollectibleIds } from '../../scripts/get-legaci-collectible-ids'
import { initTestConfig, EMULATOR_ACCOUNT_ADDR } from '../../utils/initTestConfig'

initTestConfig()

describe('mint-legaci-collectibles', () => {
  test('mintLegaciCollectible', async () => {
    const mockBrandId = 'some-brand-id-for-minting'
    const mockCollectionId = 'some-collection-id'
    const mockUnitId = 'some-unit-id'
    const nftData = {
      brandId: mockBrandId,
      collectionId: mockCollectionId,
      unitId: mockUnitId,
    }

    const brandIds = await getBrandIds()
    if (!brandIds.includes(mockBrandId)) {
      await createBrand({ brandId: mockBrandId })
    }

    const { txId } = await mintLegaciCollectible({
      ...nftData,
      recipientAddr: EMULATOR_ACCOUNT_ADDR,
    })

    const collectibleIds = await getLegaciCollectibleIds({ accountAddress: EMULATOR_ACCOUNT_ADDR })
    const recentlyCreatedCollectibleId = parseInt(collectibleIds[collectibleIds.length - 1] as string)
    const nftMetadata = await getMetadata({
      accountAddress: EMULATOR_ACCOUNT_ADDR,
      nftId: recentlyCreatedCollectibleId,
    })

    // Validate minting transaction has been completed
    expect(!!txId).toBe(true)
    expect(txId?.length).toBe(64)

    // Validate the newly minted NFT is stored in the account
    expect(collectibleIds.length).not.toBe(0)

    // Validate the NFT has the correct data
    expect(nftMetadata).toStrictEqual(nftData)
  })

  test('mintLegaciCollectible without brand being created', async () => {
    const mockBrandId = 'some-brand-id-for-minting-two'
    const mockCollectionId = 'some-collection-id'
    const mockUnitId = 'some-unit-id'
    const nftData = {
      brandId: mockBrandId,
      collectionId: mockCollectionId,
      unitId: mockUnitId,
    }

    const { txId } = await mintLegaciCollectible({
      ...nftData,
      recipientAddr: EMULATOR_ACCOUNT_ADDR,
    })

    // Transaction ID should be null if the brand hasn't been created
    expect(txId).toBe(null)
  })
})
