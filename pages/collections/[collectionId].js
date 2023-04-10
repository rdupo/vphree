import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import Header from '../../components/Header'
import NFTCard from '../../components/NFTCard'
import { FaDiscord, FaTwitter, FaEthereum } from 'react-icons/fa'
import { CgWebsite } from 'react-icons/cg'

const style = {
  bannerImageContainer: `h-[250px] w-screen overflow-hidden flex justify-center items-center bg-[url(../assets/v3-banner.png)] bg-cover`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-12`,
  midRow: `w-full flex justify-center text-white`,
  socialIconsContainer: `flex text-3xl items-center`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  title: `flex-auto text-5xl font-bold`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
}

const Collection = () => {
  const router = useRouter()
  const { provider } = useWeb3()
  const { collectionId } = router.query
  const [collection, setCollection] = useState({})
  const [nfts, setNfts] = useState([])
  const [listings, setListings] = useState([])
  const [page, setPage] = useState(0)
  const phunkMarket = '0x8aC28C421d2CB0CbE06d47D617314159247Cd2dc'
  const alchApi = 'https://eth-goerli.g.alchemy.com/v2/Xq9-5SRgOVU_UxK6uHdIk-oNvvO_n1iZ'
  const sdk = new ThirdwebSDK('goerli');

  (async () => {
    const nftModule = await sdk.getContract('0x169b1CE420F585d8cB02f3b23240a5b90BA54C92');
    const marketPlaceModule = await sdk.getContract(phunkMarket, 'marketplace');
    const nfts = await nftModule.erc721.getAll({count: 100, start: page});
    const listings = await marketPlaceModule.getActiveListings();
    setNfts(nfts)    
    setListings(listings)
  })()

  return (
    <div className="overflow-hidden">
      <Header />
      <div className={style.bannerImageContainer}>
      </div>
      <div className={style.infoContainer}>
        <div className={`${style.midRow}  my-4`}>
          <div className={style.title}>v3 Phunks</div>
          <div className={style.socialIconsContainer}>
            <div className={style.socialIconsWrapper}>
              <div className={style.socialIconsContent}>
                <div className={style.socialIcon}>
                  <a href='https://cryptophunks.com/' target='_blank'>
                    <CgWebsite className={'hover:text-[#bcf3d8]'} />
                  </a> 
                </div>
                <div className={style.divider}></div>
                <div className={style.socialIcon}>
                  <a href='http://discord.gg/phunks' target='_blank'>
                    <FaDiscord className={'hover:text-[#bcf3d8]'} />
                  </a>
                </div>
                <div className={style.divider}></div>
                <div className={style.socialIcon}>
                  <a href='https://twitter.com/v3phunks' target='_blank'>
                    <FaTwitter className={'hover:text-[#bcf3d8]'} />
                  </a>
                </div>
                <div className={style.divider}></div>
                <div className={style.socialIcon}>
                  <a href='https://etherscan.io/address/0xb7d405bee01c70a9577316c1b9c2505f146e8842' target='_blank'>
                    <FaEthereum className={'hover:text-[#bcf3d8]'} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${style.midRow} mb-[2rem]`}>
          <div className={style.description}>v3Phunks are a low entry-point evolution of the CryptoPhunks ecosystem. 10,000 Phunks minting for .005ETH each with absolutely 100% of proceeds going directly and trustlessly to <a href='https://www.maps.org' target='_blank' className='text-[#83dfb2] hover:text-[#bcf3d8] font-semibold'>MAPS</a>, a mental health organization. A Philanthropic, Phree, and Phunky arm of the overall CryptoPhunk community.</div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {nfts.map((nftItem, id) => (
          (typeof(nftItem.metadata.image) != 'undefined' ?
            <NFTCard
              key={id}
              nftItem={nftItem}
              title= {'#' + nftItem.metadata.id}
              listings={listings} 
            />
          : null )  
        ))}
      </div>
    </div>
  )
}

export default Collection