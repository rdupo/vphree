import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../assets/vphreeLogo.png'
import {CgProfile} from 'react-icons/cg'
import {MdOutlineAccountBalanceWallet} from 'react-icons/md'
import {FaStoreAlt} from	'react-icons/fa'
import Router from 'next/router'
import { useWeb3 } from '@3rdweb/hooks'

const style = {
  wrapper: `bg-[#04111d] w-screen px-[1.2rem] py-[0.8rem] flex `,
  logoContainer: `flex items-center cursor-pointer ml-4`,
  logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
  headerItems: ` flex items-center justify-end`,
  headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
  headerIcon: `text-[#83dfb2] text-3xl font-black px-4 hover:text-[#bcf3d8] cursor-pointer`,
}

const Header = () => {
	const {address} = useWeb3()
	return <div className={style.wrapper}>
		<Link href='/'>
			<div className={style.logoContainer}>
				<Image src={Logo} height={40} width={40}/>
				<div className={style.logoText}>vPhree</div>
			</div>
		</Link>
		<div className={`${style.headerItems} aright`}>
			<Link 
				href='/collections/0x169b1CE420F585d8cB02f3b23240a5b90BA54C92'
				className={style.headerIcon}>
				<FaStoreAlt />
			</Link>
			<div 
				className={style.headerIcon}
				onClick={() => {
	        Router.push({
	          pathname: `/profile/${address}`,
	        })
	      }}
			>
				<CgProfile />
			</div>
		</div>
	</div>
}

export default Header