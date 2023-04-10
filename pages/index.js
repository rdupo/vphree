import Header from '../components/Header'
import Hero from '../components/Hero'
import {useWeb3} from '@3rdweb/hooks'
import {useEffect} from 'react'
import toast, {Toaster} from 'react-hot-toast'

const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#83dfb2] bg-[#83dfb2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text-white font-semibold mt-4`,
}

export default function Home() {
  const {address, connectWallet} = useWeb3()

  return (
    <div className={style.wrapper}>
      <Toaster position='top-center' reverseOrder={false} />
      {address ? (
      <>
        <Header />
        <Hero />
      </>
      ):(
      <div className={style.walletConnectWrapper}>
        <button
          className={style.button}
          onClick={() => connectWallet('injected')}
        >
          Connect Wallet
        </button>
        <div className={style.details}>
          Please connect your wallet to view 
          <br/>the vPhree marketplace.
        </div>
      </div>
      )}
    </div>
  )
}
