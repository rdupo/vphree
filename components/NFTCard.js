import React from 'react'
import { useEffect, useState } from 'react'
import Router from 'next/router'

const style = {
  wrapper: `bg-[#83dfb2] md:max-w-[16.66667%] max-w-[70%] h-max pt-2 m-[.75rem] rounded-lg cursor-pointer`,
  imgContainer: `h-4/5 w-full overflow-hidden flex justify-center items-center`,
  nftImg: `w-full object-cover`,
  details: `p-3`,
  info: `flex justify-between drop-shadow-xl`,
  infoLeft: `flex-0.6 flex-wrap`,
  assetName: `font-bold text-lg mt-2`,
  infoRight: `flex-0.4 text-right`,
  priceValue: `flex items-center text-xl`,
}

const NFTCard = ({ nftItem, title, listings }) => {
  const [isListed, setIsListed] = useState(false)
  const [price, setPrice] = useState(0)

  useEffect(() => {
    const listing = listings.find((listing) => listing.asset.id === nftItem.metadata.id)
    if (Boolean(listing)) {
      setIsListed(true)
      setPrice(listing.buyoutCurrencyValuePerToken.displayValue)
    }
   // console.log('listings: ', listings)
  }, [listings, nftItem])

  return (
    <div
      className={style.wrapper}
      onClick={() => {
        Router.push({
          pathname: `/nfts/${nftItem.metadata.id}`,
          query: { isListed: isListed },
        })
      }}
    >
      <div className={style.imgContainer}>
        <img src={nftItem.metadata.image} alt={nftItem.name} className={style.nftImg} />
      </div>
      <div className={style.details}>
        <div className={`${style.info} text-[#202225]`}>v3Phunks</div>
        <div className={style.info}>
          <div className={style.infoLeft}>
            <div className={style.priceValue}>{title}</div>
          </div>
          {isListed && (
            <div className={style.infoRight}>
              <div className={style.priceValue}>
                {price}
                Ξ
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NFTCard