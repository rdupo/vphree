import React from 'react'
import {CgArrowsExchangeV} from 'react-icons/cg'
import {AiOutlineDown, AiOutlineUp} from 'react-icons/ai'
import {useState} from 'react'
import {dummyEvents} from '../../static/dummyEvents'
import EventItem from './ItemActivity/EventItem'

const style = {
  eventItem: `flex px-4 py-5 font-medium`,
  event: `flex items-center`,
  eventIcon: `mr-2 text-xl`,
  eventName: `text-lg font-semibold`,
  eventPrice: `flex items-center`,
  eventPriceValue: `text-lg`,
  ethLogo: `h-5 mr-2`,
  accent: `text-[#2081e2]`,
}

const ItemActivity = () => {
	const [toggle, setToggle] = useState(true)
	return(
		<div className={style.wrapper}>
			<div className={style.title} onClick={() => setToggle(!toggle)}>
				<div className={style.titleLeft}>
					<span className={style.titleIcon}>
						<CgArrowsExchangeV />
					</span>
					Item ItemActivity
				</div>
				<div className={style.titleRight}>
					{toggle ? <AiOutlineUp /> : <AiOutlineDown />}
				</div>
			</div>
				{toggle && (
					<div className={style.activityTable}>
						<div className={style.filter}>
							<div className={style.filterTitle}>Filter</div>						
							<div className={style.filterIcon}>
								{' '}
								<AiOutlineDown />{' '}
							</div>
						</div>
						<div className={style.tableHeader}>
							<div className={`${style.tableHeaderElement} flex-[2]`}>Event</div>
							<div className={`${style.tableHeaderElement} flex-[2]`}>Price</div>
							<div className={`${style.tableHeaderElement} flex-[2]`}>From</div>
							<div className={`${style.tableHeaderElement} flex-[2]`}>To</div>
							<div className={`${style.tableHeaderElement} flex-[2]`}>Date</div>
						</div>
							{dummyEvents.map((event, id) => (
								<EventItem key={id} event={event} />
							))}
					</div>
				)}	
		</div>
	)
}

export default ItemActivity