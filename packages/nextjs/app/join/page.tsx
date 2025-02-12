"use client";
import React from 'react'
import EachFilter from '~~/components/custom/EachFilter'
import EqubCard from '~~/components/custom/EqubCard'
import Header from '~~/components/custom/Header'
import JoinTopHeader from '~~/components/custom/JoinTopHeader'
import SearchIcon from '~~/components/custom/SearchIcon'
import EqubDetail from '../equbdetail/page'
import { useState } from 'react'



interface EqubDetailEachProps {
  equbDetails: string[];
}

const Join : React.FC<EqubDetailEachProps> = ({ equbDetails })  => {

  const [filters, setFilters] = useState({
    equbTitle: '',
    poolAmount: '',
    numberOfParticipants: '',
    contributionPerRound: '',
    poolDuration: '',
    minCreditScore: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission and apply filters
    console.log(filters);
  };

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


            <form className="custom-join-side-filters" onSubmit={handleSubmit}>
              <EachFilter name="Equb Title" value={filters.equbTitle} onChange={handleChange} />
              <EachFilter name="Pool Amount" value={filters.poolAmount} onChange={handleChange} />
              <EachFilter name="Number of Participants" value={filters.numberOfParticipants} onChange={handleChange} />
              <EachFilter name="Contribution Per Round" value={filters.contributionPerRound} onChange={handleChange} />
              <EachFilter name="Pool Duration" value={filters.poolDuration} onChange={handleChange} />
              <EachFilter name="Minimum Credit Score" value={filters.minCreditScore} onChange={handleChange} />
            <button type="submit" className="custom-join-side-filter-button">Apply Filters</button>
          </form>
        </div>
        <div className='custom-join-main'>
            <div className='custom-join-main-header'>
                All Pools
            </div>
            <div className='custom-join-main-body'>
               <EqubDetail  />
            </div>
        </div>
    </div>
    </>
  )
}

export default Join;


{/* <div className='custom-join-side-search'>
      <SearchIcon />
    <input type='text' placeholder='Search Input Text' className='custom-join-side-search-input' /> 
</div> */}