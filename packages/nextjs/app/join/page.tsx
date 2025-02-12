import React from 'react'
import EachFilter from '~~/components/custom/EachFilter'
import EqubCard from '~~/components/custom/EqubCard'
import Header from '~~/components/custom/Header'
import JoinTopHeader from '~~/components/custom/JoinTopHeader'
import SearchIcon from '~~/components/custom/SearchIcon'
import EqubDetail from '../equbdetail/page'

const Join = () => {
  return (
    <>
      <div  className="custom-sticky"> 
        <JoinTopHeader />
        <Header />
      </div>
    <div className='custom-join'>
        <div className='custom-join-side'>
            <div className='custom-join-side-title'>
                Filters
            </div>
            <div className='custom-join-side-search'>
                {/* <SearchIcon />
                <input type='text' placeholder='Search Input Text' className='custom-join-side-search-input' /> */}
            </div>

            <div className='custom-join-side-filters'>
                <EachFilter name='Equb Title' />
                <EachFilter name='Pool Amount' />
                <EachFilter name='Number of Participants' />
                <EachFilter name='Contribution Per Round' />
                <EachFilter name='Pool Duration' />
                <EachFilter name='Minimum Credit Score' />
            </div>
        </div>
        <div className='custom-join-main'>
            <div className='custom-join-main-header'>
                All Pools
            </div>
            <div className='custom-join-main-body'>
               <EqubDetail />
            </div>
        </div>
    </div>
    </>
  )
}

export default Join;