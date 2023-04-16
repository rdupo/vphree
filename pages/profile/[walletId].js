import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import Header from '../../components/Header'
import NFTCard from '../../components/NFTCard'
import { FaDiscord, FaTwitter, FaEthereum } from 'react-icons/fa'
import { CgWebsite } from 'react-icons/cg'
import {v3} from '../../data/v3'

const style = {
  infoContainer: `w-screen px-12`,
  midRow: `w-full flex justify-center text-white`,
  socialIconsContainer: `flex text-3xl items-center`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  title: `flex-auto text-5xl font-bold`,
  subtitle: `flex-auto text-3xl`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
}

const Profile= () => {
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
    const address = '0xc672c35EAd53fFE8099593393547c2A0a6E7B625';
    const nfts = await nftModule.erc721.getOwned(address);
    setNfts(nfts)    
    //console.log('nfts: ',nfts);
    
    const marketPlaceModule = await sdk.getContract(phunkMarket, 'marketplace');
    const listings = await marketPlaceModule.getActiveListings();
    setListings(listings)
  })()

  return (
    <div className="overflow-hidden">
      <Header />
      <div className={style.infoContainer}>
        <div className={`${style.midRow}  my-4`}>
          <div className={style.title}>Profile</div>          
        </div>
        <div className={style.midRow}>
          <div className={`${style.subtitle} text-[#83dfb2]`}>0xc67...B625</div>
        </div>
        <div className={`${style.midRow} mb-[2rem]`}>
          <div className={style.description}></div>
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

export default Profile