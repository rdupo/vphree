import React from 'react'

const style = {
  wrapper: `relative`,
  container: `before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('../assets/vphree-bg.png')] before:bg-cover before:bg-center before:opacity-20`,
  contentWrapper: `flex h-screen relative justify-center flex-wrap items-center`,
  copyContainer: `w-1/2`,
  title: `relative text-[#83dfb2] text-[46px] font-semibold`,
  description: `text-white container-[400px] text-2xl mt-[0.8rem] mb-[2.5rem]`,
  ctaContainer: `flex`,
  accentedButton: ` relative text-lg font-semibold px-12 py-4 bg-[#83dfb2] rounded-lg mr-5 text-[#2d2d2d] hover:bg-[#bcf3d8] cursor-pointer`,
  button: ` relative text-lg font-semibold px-12 py-4 bg-[#363840] rounded-lg mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer`,
  cardContainer: `rounded-[3rem]`,
  infoContainer: `h-20 bg-[#313338] p-4 rounded-b-lg flex items-center text-white`,
  author: `flex flex-col justify-center ml-4`,
  name: ``,
  infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
}

const Hero = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.contentWrapper}>
          <div className={style.copyContainer}>
            <div className={style.title}>
              Welcome to vPhree
            </div>
            <div className={style.description}>
              vPhree is a phee-phree marketplace to buy and sell your v3 Phunks
            </div>
            <div className={style.ctaContainer}>
              <a href='/collections/0x169b1CE420F585d8cB02f3b23240a5b90BA54C92'>
                <button className={style.accentedButton}>Browse v3 Phunks</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero