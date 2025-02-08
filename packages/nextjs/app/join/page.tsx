import React from 'react'
import EachFilter from '~~/components/custom/EachFilter'
import EqubCard from '~~/components/custom/EqubCard'
import Header from '~~/components/custom/Header'
import JoinTopHeader from '~~/components/custom/JoinTopHeader'
import SearchIcon from '~~/components/custom/SearchIcon'

const Join = () => {
  return (
    <>
    <JoinTopHeader />
    <Header />
    <div className='custom-join'>
        <div className='custom-join-side'>
            <div className='custom-join-side-title'>
                Filters
            </div>
            <div className='custom-join-side-search'>
                <SearchIcon />
                <input type='text' placeholder='Search Input Text' className='custom-join-side-search-input' />
            </div>

            <div className='custom-join-side-filters'>
                <EachFilter name='Number of Pool Participants' />
                <EachFilter name='Fixed Contribution Per Round' />
                <EachFilter name='Pool Duration' />
                <EachFilter name='Payment Frequency' />
                <EachFilter name='Minimum Credit Score' />
                <EachFilter name='Participant Location' />
            </div>
        </div>
        <div className='custom-join-main'>
            <div className='custom-join-main-header'>
                All Pools
            </div>
            <div className='custom-join-main-body'>
                <EqubCard />
                <EqubCard />
                <EqubCard />
                <EqubCard />
                <EqubCard />
                <EqubCard />
            </div>
        </div>
    </div>
    </>
  )
}

export default Join;