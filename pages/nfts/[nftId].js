import Header from '../../components/Header'
import { useEffect, useMemo, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import Router, { useRouter } from 'next/router'
import NFTImage from '../../components/nft/NFTImage'
import GeneralDetails from '../../components/nft/GeneralDetails'
import ItemActivity from '../../components/nft/ItemActivity'
import Purchase from '../../components/nft/Purchase'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  title: `text-xl font-semibold`,
  a: `text-[#83dfb2] hover:text-[#bcf3d8] cursor-pointer`,
  button: `mr-8 my-3 flex items-center py-2 px-12 rounded-lg cursor-pointer border-2 bg-[#83dfb2] border-[#83dfb2] text-[#202225] hover:bg-[#bcf3d8]`,
  buttonAlt: `mr-8 my-3 flex items-center py-2 px-12 rounded-lg cursor-pointer border-2 border-[#83dfb2] text-[#83dfb2] hover:bg-[#3a3d42]`,
  nftImgContainer: `flex-1 mr-4 max-w-[33.3333%]`,
  detailsContainer: `flex-[2] ml-4`,
}

const Nft = () => {
  const { provider, address } = useWeb3()
  const [selectedNft, setSelectedNft] = useState()
  const [nftModule, setNftModule] = useState()
  const [listings, setListings] = useState([])
  const [price, setPrice] = useState()
  const router = useRouter()
  const phunkMarket = '0x8aC28C421d2CB0CbE06d47D617314159247Cd2dc'
  const alchApi = 'https://eth-goerli.g.alchemy.com/v2/Xq9-5SRgOVU_UxK6uHdIk-oNvvO_n1iZ'
  const sdk = new ThirdwebSDK('goerli')
  const id = router.query.nftId

  useEffect(() => {
    (async () => {
      const cont = await sdk.getContract('0x169b1CE420F585d8cB02f3b23240a5b90BA54C92')
      setNftModule(cont)
      if(!nftModule) return;
      //(console.log('m: ',nftModule))
      if (!id) return;
      (async () => {      
        const nfts = await nftModule.erc721.get(id);
        //console.log('id: ', id, 'nft: ', nfts)
        setSelectedNft(nfts)

        const marketPlaceModule = await sdk.getContract(phunkMarket, 'marketplace');
        const listings = await marketPlaceModule.getActiveListings();
        setListings(listings)
        const ml = listings.find((listing) => listing.asset.id === id)
        setPrice(eval(ml.buyoutPrice._hex) / 10 ** 18)
      })()
    })()
  })

  if(!selectedNft) return;
  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>              
            <div className={style.nftImgContainer}>
              <img src={selectedNft.metadata.image}/>
            </div>
            <div className={style.detailsContainer}>
              <div>
                <a 
                  className={style.a}
                  href='/collections/0x169b1CE420F585d8cB02f3b23240a5b90BA54C92'
                  >
                  v3Phunks
                </a>
              </div>
              <div className='my-4'>
                <div className={style.title}>{selectedNft.metadata.description}</div>
                <div>
                  Owner: 
                  <a 
                    className={style.a}
                    href={`/profile/${selectedNft.owner}`}
                  >
                    {' ' + selectedNft.owner.substr(0,5) + '...' + selectedNft.owner.substr(38)}
                  </a>
                </div>
              </div>
              <div>
                <div className={style.title}>Attributes</div>
                <div>
                  {selectedNft.metadata.attributes.map((attribute, id) => (
                    <div>
                      <span>{selectedNft.metadata.attributes[id].trait_type}:&nbsp;</span> 
                      <span>{selectedNft.metadata.attributes[id].value}&nbsp;</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={style.detailsContainer}>
              <div>
                <p className={style.title}>Price: {price}</p>
                {/*<p>Top Bid:</p>
                <p>High Bidder:</p>*/}
              </div>
              <div>
              {price > 0 ? (
                <>
                  <button className={style.buttonAlt}>BID</button>
                  <button className={style.button}>BUY</button>
                </>
                ) : (
                <>
                  <button className={style.button}>LIST</button>
                  <button className={style.buttonAlt}>ACCEPT BID</button>
                </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nft