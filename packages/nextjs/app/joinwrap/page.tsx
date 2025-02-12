"use client";
import React, { use, useState } from 'react'
import EachFilter from '~~/components/custom/EachFilter'
import EqubCard from '~~/components/custom/EqubCard'
import Header from '~~/components/custom/Header'
import JoinTopHeader from '~~/components/custom/JoinTopHeader'
import SearchIcon from '~~/components/custom/SearchIcon'
import EqubDetail from '../equbdetail/page'
import { useEffect } from 'react'

interface EqubDetailEachProps {
  equbDetails: string[];
}

const JoinWrap: React.FC<EqubDetailEachProps> = ({ equbDetails })  => {

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
    console.log(name, value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name as keyof typeof filters]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission and apply filters
    console.log(filters);
  };

  useEffect(() => {
    console.log(equbDetails);
  }
  , [equbDetails]);
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
            <EachFilter name="equbTitle" value={filters.equbTitle} onChange={handleChange} />
            <EachFilter name="poolAmount" value={filters.poolAmount} onChange={handleChange} />
            <EachFilter name="numberOfParticipants" value={filters.numberOfParticipants} onChange={handleChange} />
            <EachFilter name="contributionPerRound" value={filters.contributionPerRound} onChange={handleChange} />
            <EachFilter name="poolDuration" value={filters.poolDuration} onChange={handleChange} />
            <EachFilter name="minCreditScore" value={filters.minCreditScore} onChange={handleChange} />
            <button type="submit" className="custom-join-side-filter-button">Apply Filters</button>
          </form>
        </div>
        <div className='custom-join-main'>
          <div className='custom-join-main-header'>
            All Pools
          </div>
          <div className='custom-join-main-body'>
            <EqubDetail equbDetails={equbDetails} filters={filters} />
          </div>
        </div>
      </div>
    </>
  )
}

export default JoinWrap;